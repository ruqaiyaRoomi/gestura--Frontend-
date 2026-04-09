<template>

    <div class="translate">
    <header>
        <span class="close"  v-on:click="router.back()"><i class="fa-solid fa-xmark"></i></span>
        <span>Sign Letter {{ currentLetter }}</span>
        <span></span>
    </header>

    <div class="cameraInput">
        <video ref="videoRef" autoplay playsinline></video>

        <div class="progress">
            {{ index + 1 }} / {{ letters.length }}
        </div>
       <Transition name="fade">
            <div class="overlay" v-if="showCheck">
            <i class="fa-solid fa-circle-check"></i>
            </div>
       </Transition>
        
    </div>

    <div class="actions">
        <button class="btn-done" v-on:click="done">
            <span><i class="fa-solid fa-check"></i></span>{{ index === letters.length - 1? 'Done' : 'Next' }}</button>
        <button class="btn-retry"><span><i class="fa-solid fa-arrow-rotate-right"></i></span> Retry</button>
    </div>
    <NavBar />
    </div>


</template>

<script setup>
import {ref, onMounted, watch, nextTick, onUnmounted} from 'vue'
import {useRouter , useRoute} from 'vue-router'
import { practice } from '../composables/practice.js';
import NavBar from '../components/navBar.vue';
import { useUserStore } from '../stores/user.js';


const router = useRouter()
const route = useRoute()

const word = route.params.word
const letters = word.replace(/\s/g,'').split("")
const index = ref(0)

const currentLetter = ref(letters[0])


const videoRef = ref(null)
const showCheck = ref(false)

const userStore = useUserStore()
const isSaving = ref(false)
const isDone = ref(false)

const { startDetection, stopDetection, isMatch, detectionConfidence, nextLetter, detectedLabel} 
= practice(videoRef, currentLetter)

onMounted( async () => {
    await nextTick()
    startDetection()
})


watch(isMatch ,(val) => {
    if(!val) return
    if(showCheck.value) return
    if(detectedLabel.value !== currentLetter.value) return
    if(detectionConfidence.value < 85) return
    
    showCheck.value = true
    
    setTimeout(() => {
        showCheck.value = false

        if(index.value < letters.length - 1){
            index.value++

            currentLetter.value = letters[index.value]
            nextLetter()
        } else{
            done()
        }
    }, 400);
})


function done() {
    stopDetection()
    router.push(`/commonWords/${word}`)
    
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
        position: relative;
        flex: 1;
        border: 1.5px solid #333;
        border-radius: 18px;
        overflow: hidden;
        margin-bottom: 24px;
        background-color: #f7f4e8;

        aspect-ratio: 3/4;
     
    }

    .cameraInput video {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transform: scaleX(-1);
    }


    .tip {
        position: absolute;
        top: 12px;
        left: 12px;
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 6px 12px;
        border-radius: 20px ;
        font-size: 15px;
        color: #333;
    }

    .practiceInfo {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 16px;   
    }

    .practiceTitle {
        font-size: 20px;
        font-weight: 700;
        color: #333;
        margin: 0 0 4px 0;
    }

    .practiceTip {
        font-size: 18px;
        color: #666;
        margin: 0;
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

    .progress {
        position: absolute;
        top: 12px;
        right: 12px;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        border-radius: 20px;
        font-size: 13px;
        padding: 4px 20px;     
    }

    .overlay {
        position: absolute;
        inset: 0;
        background-color: #E99627;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 18px;
    }

    .overlay i {
        font-size: 100px;
        color: white;
    }

    .fade-enter-active {
        transition: opacity 0.2s ease;
    }

    .fade-leave-active {
        transition: opacity 0.6s ease;
    }

    .fade-enter-from, .fade-leave-to {
        opacity: 0;
    }


</style>