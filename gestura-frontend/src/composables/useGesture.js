import {ref, onMounted, onUnmounted} from 'vue'


export function useGesture(videoRef) {
    const predictedText = ref('')
    const isDetecting = ref(false)
    const noHandDetected = ref(false)

    let interval = null
    let cameraInstance = null
    let handsInstance = null
    


    async function extractLandmarks(){
        const {Hands} = await import('@mediapipe/hands')
        const {Camera} =  await import('@mediapipe/camera_utils')

        handsInstance = new Hands({
        
            locateFile: (file) =>   `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        })

        handsInstance.setOptions({
            maxNumHands: 1,
            modelComplexity: 1,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.7
        })


        let latestLandmarks = null
        let isLeft = false

        let intervalStarted = false

        handsInstance.onResults((results) => {
            if (results.multiHandLandmarks?.length > 0 
                && results.multiHandedness?.length > 0 
                && results.multiHandedness[0].score > 0.8 )  

            
                {
                noHandDetected.value = false
                const hand = results.multiHandLandmarks[0]
                isLeft = results.multiHandedness[0].label === 'Left'
                latestLandmarks = hand.map(lm => [lm.x, lm.y, lm.z]).flat()
                console.log('Landmarks captured:', latestLandmarks.length)

                if(!intervalStarted) {
                    intervalStarted = true
                    startInterval()
                }
           
            } else {
                latestLandmarks = null
                noHandDetected.value =  true
            }

        })



        let holdCount = 0
        let lastSeenLabel = null
        let letterLocked = false
       let lastFrameTime = 0

        cameraInstance = new Camera (videoRef.value, {
            onFrame: async () => {
                const now = Date.now()
                if (now - lastFrameTime < 100) return
                lastFrameTime = now
                await handsInstance.send({image: videoRef.value})
            }
        })

        cameraInstance.start()

    function startInterval(){
        console.log('inverval tick')
            interval = setInterval(async () => {
            if(!latestLandmarks) {
                noHandDetected.value = true
                holdCount = 0
                lastSeenLabel = null
                return
            }

            try {
                const response = await fetch('http://localhost:3000/gestura/predict', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify({landmarks : latestLandmarks, is_left: isLeft})
                })

                const data = await response.json()
                console.log('prediction: ', data)
                

                if(data.confidence >= 85) {
                   if(data.label === lastSeenLabel) {
                       if(!letterLocked) holdCount++
                   } else {
                    holdCount = 1
                    lastSeenLabel = data.label
                    letterLocked = false
                   }

                   if (holdCount >= 2 && !letterLocked) {
                        letterLocked = true
                        holdCount = 0
                        predictedText.value += data.label === 'space' ? '_' : data.label
                        console.log('ADDINF LETTER:', data.label)
            
                   }
                }  
                else {
                    holdCount = 0 
                }
                console.log('holdCount:', holdCount, 'label:', data.label, 'lastSeenLabel:', lastSeenLabel)
            } catch (err){
                console.error('prediction error', err)
            }
        }, 200)
    }
        }

    function startDetection() {
        console.log("started")
        isDetecting.value = true
        extractLandmarks()
    }

    function stopDetection () {
        isDetecting.value = false
        if (interval) 
            {clearInterval(interval) 
        interval = null}

        if (cameraInstance) {
            cameraInstance.stop()
            cameraInstance = null
        }

        if(handsInstance) {
            handsInstance.close()
            handsInstance = null
        }
    }

    onUnmounted(() => stopDetection())


    return {predictedText, noHandDetected, startDetection, stopDetection}
}