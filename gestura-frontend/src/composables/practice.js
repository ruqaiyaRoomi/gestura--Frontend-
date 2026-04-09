import {ref, onMounted, onUnmounted, isRef} from 'vue'


export function practice(videoRef, targetLetter, detectionActive = ref(true)) {

    const isMatch = ref(false)
    const detectedLabel = ref(null)
    const detectionConfidence = ref(0)
    const noHandDetected = ref(false)

    let interval = null
    let cameraInstance = null
    let handsInstance = null

    let holdCount = 0
    let lastSeenLabel = null
    let letterLocked = false
    let lastSent = null

    const getTarget = () => isRef(targetLetter) ? targetLetter.value : targetLetter

   function resetDetection () {
        isMatch.value = false
        detectedLabel.value = null
        detectionConfidence.value = 0
        holdCount = 0
        lastSeenLabel = null
        letterLocked = false
    } 

    async function startDetection(){
        resetDetection()

        const {Hands} = await import('@mediapipe/hands')
        const {Camera} =  await import('@mediapipe/camera_utils')

        handsInstance = new Hands({
        
            locateFile: (file) =>   `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        })

        handsInstance.setOptions({
            maxNumHands: 1,
            modelComplexity: 0,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.7
        })


        let latestLandmarks = null
        let isLeft = false
        let intervalStarted = false
        let lastFrameTime = 0

        handsInstance.onResults((results) => {
            if (
                results.multiHandLandmarks?.length > 0 
                && results.multiHandedness?.length > 0 
                && results.multiHandedness[0].score > 0.8 
            ) 
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

        

        cameraInstance = new Camera (videoRef.value, {
            onFrame: async () => {
                if (!handsInstance) return
                const now = Date.now()
                if (now - lastFrameTime < 100) return
                lastFrameTime = now
                await handsInstance.send({image: videoRef.value})
            }
        })

        cameraInstance.start()

    function startInterval(){
            interval = setInterval(async () => {
            if(detectionActive && !detectionActive.value) return

            if(!latestLandmarks) {
                holdCount = 0
                lastSeenLabel = null
                return
            }

            const currentData = JSON.stringify(latestLandmarks)
            if(currentData === lastSent) return
            lastSent = currentData

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

                   if (holdCount >= 3 && !letterLocked) {
                        letterLocked = true
                        holdCount = 0
                        detectedLabel.value = data.label
                        detectionConfidence.value = Math.round(data.confidence)
                        isMatch.value = data.label === getTarget()
                      
                   }
                }  
                else {
                    holdCount = 0 
                }
                console.log('holdCount:', holdCount, 'label:', data.label, 'lastSeenLabel:', lastSeenLabel)
            } catch (err){
                console.error('prediction error', err)
            }
        }, 250)
    }
        }


    function stopDetection () {
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
        resetDetection()
    }


    function nextLetter() {
       resetDetection()
    }

    onUnmounted(() => stopDetection())


    return { noHandDetected, startDetection, stopDetection, isMatch, detectionConfidence, detectedLabel, nextLetter}
}