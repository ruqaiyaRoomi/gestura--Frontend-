<template>
    
    <div class="translate">
    <header>
        <span class="close"  v-on:click="exit"><i class="fa-solid fa-xmark"></i></span>
        <span>Sign <span class="arrow"><i class="fa-solid fa-arrow-right-long"></i></span> Text</span>
        <span></span>
    </header>

    <div class="cameraInput">
        <video ref="videoRef" autoplay playsinline v-show="!frozen"></video>
        <canvas ref="snapShot" v-show="frozen" class="snapshot"></canvas>
        <div class="predicted" :class="{frozen: frozen}">
            <p class="translatedText">{{ predictedText }}</p>
        </div>
    </div>

    <div class="actions">
        <button class="btn-done" v-on:click="handleDone"><span><i class="fa-solid fa-check"></i></span> Done</button>
        <button class="btn-retry" v-on:click="retry"><span><i class="fa-solid fa-arrow-rotate-right"></i></span> Retry</button>
    </div>
    <NavBar />
    </div>


</template>

<script setup>
import {ref, onMounted, nextTick, onUnmounted} from 'vue'
import {useRouter} from 'vue-router'

import NavBar from '../components/navBar.vue';
import { useGesture } from '../composables/useGesture';

const router = useRouter()
const videoRef = ref(null)


const frozen = ref(false)
const snapShot = ref(null)


const {predictedText, noHandDetected,  startDetection, stopDetection} = useGesture(videoRef)

onMounted( async () => {
    await nextTick()
    startDetection()
    window.addEventListener('beforeunload', stopDetection)
})

onUnmounted(() => {
    stopDetection()
    window.removeEventListener('beforeunload', stopDetection)
})


function captureFrame() {
    const video = videoRef.value
    const canvas = snapShot.value

    if (!video || video.videoWidth === 0 ) {
        console.log('video not ready')
        return
    }

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext('2d')
    ctx.drawImage(video, 0,0, canvas.width, canvas.height)
}

function handleDone (){
    frozen.value = true
    captureFrame()
    stopDetection()
 
    
   
}

function exit() {
    stopDetection()
    router.back()
}

function retry(){
    frozen.value = false
    predictedText.value = ''
    startDetection()
}

</script>

<style scoped>
   
    .translate{
        background-color: #f7f4e8;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        padding: 20px 16px;
        box-sizing: border-box;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    .close {
        font-size: 20px;
        color: #333;
    }

    .title {
        font-size: 20px;
        font-weight: 700;
        color: #333;
    }
    .arrow {
        margin: 0 4px;
    }

    .cameraInput {
        flex: 1;
        border: 1.5px solid #333;
        border-radius: 18px;
        overflow: hidden;
        margin-bottom: 24px;
        background-color: #f7f4e8;
        position: relative;
        aspect-ratio: 3/4;
     
    }

    .cameraInput video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scaleX(-1);
    }

    .actions {
        display: flex;
        gap: 12px;
        margin-bottom: 80px;
    }

    .actions button {
        flex: 1;
        height: 54px;
        border-radius: 14px;
        font-size: 16px;
        font-weight: 600;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

    .btn-done {
    
        background-color: #E99627;
        color: white;
        border: none;
        box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08);
        
    }

     .btn-retry {
        background-color: transparent;
        color:  #E99627;
        border: 2px solid #E99627;
      
    }

    .predicted {
        position: absolute;
        bottom: 0;
        left: 0;
        right:0 ;
        background-color: #e9952765;
        border-radius:18px ;
        padding: 24px;
        margin: 16px;
        display: flex;
        align-items: center;
        transition: all 0.3s ease;
        font-size: 30px;
        letter-spacing: 5px;
    }

    .predicted.frozen {
        background-color: rgba(233, 149, 39, 0.432);
        font-weight: 900;
        font-size:34px ;
        letter-spacing: 5px;
    }

    .translatedText {
        font-size: 30px;
        letter-spacing: 5px;
    }

    .cameraInput canvas.snapshot {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 18px;
        opacity: 0.85;
        transform: scaleX(-1);
    }



</style>