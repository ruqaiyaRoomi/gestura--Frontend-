import {ref, onMounted, onUnmounted, isRef} from 'vue'

export function practice(videoRef, targetLetter, detectionActive = ref(true)) {

    const isMatch = ref(false) // whether detected latter matches target
    const detectedLabel = ref(null) // predicted letter from model
    const detectionConfidence = ref(0) // confidence of prediction
    const noHandDetected = ref(false)  // true if no hand is visibke

    let interval = null // interval for prediction call
    let cameraInstance = null 
    let handsInstance = null // MediaPipe Hands instance

    let holdCount = 0 
    let lastSeenLabel = null // last predicted lable
    let letterLocked = false // prevents multiple triggers
    let lastSent = null // prevents duplicate requests

    // get target letter
    const getTarget = () => isRef(targetLetter) ? targetLetter.value : targetLetter

    // reset detection state
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
        // MediaPipe modules
        const {Hands} = await import('@mediapipe/hands')
        const {Camera} =  await import('@mediapipe/camera_utils')

        // Initialize hand tracking
        handsInstance = new Hands({
        
            locateFile: (file) =>   `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
        })

        // detection settings
        handsInstance.setOptions({
            maxNumHands: 1,
            modelComplexity: 0,
            minDetectionConfidence: 0.7,
            minTrackingConfidence: 0.7
        })


        let latestLandmarks = null // latest hand landmarks
        let isLeft = false  // whether hand is left
        let intervalStarted = false // ensures interval runs once
        let lastFrameTime = 0 // throttle frames

        // Called every time MediaPipe processes a frame
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
                    // flatten landmarks
                    latestLandmarks = hand.map(lm => [lm.x, lm.y, lm.z]).flat()
                    console.log('Landmarks captured:', latestLandmarks.length)
                    // Start prediction loop once
                    if(!intervalStarted) {
                        intervalStarted = true
                        startInterval()
                    }
           
            } else {
                latestLandmarks = null
                noHandDetected.value =  true
            }

        })
        // Initialize camera
        cameraInstance = new Camera (videoRef.value, {
            onFrame: async () => {
                if (!handsInstance) return
                const now = Date.now()
                // Limit processing to 10fps
                if (now - lastFrameTime < 100) return
                lastFrameTime = now
                await handsInstance.send({image: videoRef.value})
            }
        })

        cameraInstance.start()
    // Prediction loop - runs every 250ms
    function startInterval(){
            interval = setInterval(async () => {
            if(detectionActive && !detectionActive.value) return
            // reset if no hand is detected
            if(!latestLandmarks) {
                holdCount = 0
                lastSeenLabel = null
                return
            }
            // Prevent duplicate requests
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
                
                if(data.confidence >= 85) {
                    //  // Same label seen again - increment hold count
                   if(data.label === lastSeenLabel) {
                       if(!letterLocked) holdCount++
                   } else {
                    holdCount = 1
                    lastSeenLabel = data.label
                    letterLocked = false
                   }
                   // resgister letter only after 3 consistent predictions
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
// Move to nect letter
    function nextLetter() {
       resetDetection()
    }

    onUnmounted(() => stopDetection())


    return { noHandDetected, startDetection, stopDetection, isMatch, detectionConfidence, detectedLabel, nextLetter}
}