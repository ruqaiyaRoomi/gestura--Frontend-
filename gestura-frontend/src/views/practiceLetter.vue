<template>
    
    <div class="translate">
    <header>
        <span class="close"  v-on:click="router.back()"><i class="fa-solid fa-xmark"></i></span>
        <span>Practice</span>
        <span></span>
    </header>

    <div class="cameraInput">
        <video ref="videoRef" autoplay playsinline></video>

        <div class="tip">
            <i class="fa-solid fa-circle-info"></i>
            <span>Place your hand in the center of the screen</span>
        </div>

        <div class="practiceInfo">
            <p class="practiceTitle">Practice Letter {{ letter }}</p>
            <p class="practiceTip">Tip {{currentLetter.tip }}</p>
        </div>
    </div>

    <Transition name="fade">
        <div class="overlay" v-if="showCheck">
            <i class="fa-solid fa-circle-check"></i>
        </div>
    </Transition>

    <div class="actions">
        <button class="btn-done" v-on:click="handleDone"><span><i class="fa-solid fa-check"></i></span> Done</button>
        <button class="btn-retry"><span><i class="fa-solid fa-arrow-rotate-right"></i></span> Retry</button>
    </div>
    <NavBar />
    </div>


</template>

<script setup>
import {ref, onMounted, nextTick, onUnmounted, watch} from 'vue'
import {useRouter , useRoute} from 'vue-router'

import NavBar from '../components/navBar.vue';
import {alphabetData} from '../data/alphabetData.js';
import { practice } from '../composables/practice.js';
import { useUserStore } from '../stores/user.js';


const router = useRouter()
const route = useRoute()


const letter = route.params.letter
const currentLetter = alphabetData[letter]
const videoRef = ref(null)
const showCheck = ref(false)
const isSaving = ref(false)
const userStore = useUserStore()

const translationHistory = ref([])



const {predictedText, noHandDetected,  startDetection, stopDetection, isMatch, detectedLabel, detectionConfidence} 
= practice(videoRef, letter)

watch(isMatch, async (val) => {
    if(!val) return
    if(showCheck.value) return
    if( detectedLabel.value !== letter) return
    if(detectionConfidence.value < 85) return

    showCheck.value = true
    stopDetection()

    await markDone()

    setTimeout(() => {
        goNextLetter()
    }, 1000)
    
})

async function markDone() {
    if ( !userStore.user?._id) {
    alert('You need to be logged in!')
    return; }

    isSaving.value = true
    try {
        const response = await fetch('http://localhost:3000/gestura/userStats', {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ 
                userId: userStore.user._id,
                module: 'ASL Alphabet',
                letter: letter
            }),
            
        })
        const result = await response.json()
        if (letter && !translationHistory.value.includes(letter)) {
            translationHistory.value.unshift(letter)
        }
    }  catch (err) {
        console.error('Error saving letter')
        alert('Error saving progress')
     } finally {
        isSaving.value = false
     }
}

function goNextLetter() {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    const index = letters.indexOf(letter)

    if(index < letter.length - 1) {
        const next = letters[index + 1]
        router.push(`/aslAlphabet/${next}`)
    } else {
        router.push('/aslAlphabet')
    }

}


onMounted( async () => {
  await nextTick()
  startDetection()
})

onUnmounted(() => stopDetection())

async function handleDone (){
    stopDetection()

    await markDone()

    setTimeout(()=> {
        router.push({
        path:`/practiceLetterResult/${letter}`,
        query: {
            correct:isMatch.value,
            confidence: detectionConfidence.value,
            detected: detectedLabel.value
        }
        })
    }, 500)
    
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

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 60px;
        color: #4CAF50;
    }

</style>