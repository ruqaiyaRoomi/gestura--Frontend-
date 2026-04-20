<template>
    <div v-if="currentLetter">

  
    <Header/>
    <div class="letterDetail">
        <div class="header">
            <span class="back" v-on:click="router.back()"><i class="fa-solid fa-xmark"></i></span>
            <span class="title">ASL Alphabet</span>
            <span></span>
        </div>

        <div class="card">
            <img :src="currentLetter.image" alt="" class="letterImage">
            <p class="letterLabel">{{letter}}</p>
        </div>

        <p class="description">
            {{ currentLetter.description }}
        </p>


        <div class="tryIt">
            <p class="tryTitle">Try it yourself</p>
            <p class="tip"> {{ currentLetter.tip }}</p>
            <button class="button" v-on:click="router.push(`/practice/${letter}`)">
                Open Camera <i class="fa-solid fa-camera"></i>
            </button>

            <button class="markDoneButton" @click="markDone">Mark as Done</button>
        </div>
    </div>

    <NavBar />
    </div>

    <div v-else>

        letter not found
    </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import Header from '../components/header.vue';
import NavBar from '../components/navBar.vue';
import {alphabetData} from '../data/alphabetData.js';
import { useUserStore } from '../stores/user.js';
import { ref, watch } from 'vue';

const userStore = useUserStore()
const route = useRoute();
const router = useRouter();

const isSaving = ref(false)
const letter = route.params.letter
const currentLetter = alphabetData[letter]
import { triggerGuestOverlay } from '../stores/guest';



async function markDone() {
    if ( !userStore.user?._id) {
        triggerGuestOverlay()
    return; }

    isSaving.value = true
    try {
        const response = await fetch('https://gestura-backend-production.up.railway.app/gestura/userStats', {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ 
                userId: userStore.user._id,
                module: 'ASL Alphabet',
                letter: letter
            }),
            
        })
         const data = await response.json()
     if( data.saved) {
        alert(`Letter ${letter} marked as done` )
     } else {
        alert('Could not save progress') }
    }  catch (err) {
        console.error('Error saving letter')
        alert('Error saving progress')
     } finally {
        isSaving.value = false;
     }
}


console.log("letter:", letter)
console.log("currentLetter:", currentLetter)



</script>

<style scoped>
   .letterDetail {
    background: var( --bg-primary);
    min-height: 100vh;
    padding: 20px 16px 100px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
   }

   .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
   }

   .back{
    font-size: 20px;
    color: var(--text-primary);
   }

   .title {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
   }

   .card {
    background: var(--bg-card);
    border-radius: 20px;
    display: flex;
    flex-direction:column ;
    align-items: center;
    padding: 24px;
    box-shadow: var(--shadow-card);
    
   }

   .letterImage{
    width: 180px;
    height: 180px;
    object-fit: contain;
   }

   .letterLabel{
    font-size: 48px;
    font-weight: 700;
    color: var(--text-primary);
    margin: 12px 0 0;
   }

   .description {
    font-size: 18px;
    color: var(--text-primary);
    text-align: center;
    line-height: 1.6;
    margin: 0;
   }

   .tryIt{
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 15px;
   }

   .tryTitle {
    font-size: 18px;
    font-weight: 700;
    color: var(--text-primary);
    margin: 0;
   }

   .tip{
    font-size: 13px;
    color: var(--text-muted);
    margin: 0;
   }

   .tryIt button {
    width: 100%;
    height: 56px;
    background-color: var(--accent);
    color: white;
    border: none;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0 8px 18px var(--accent-shadow);
    transition: 0.2s ease;
    margin-top: 20px;
    justify-content: center;
   }

   .markDoneButton {
    background: transparent !important;
    color: var(--accent);
    border: 1.5px solid var(--accent) !important;
    box-shadow: none !important;
   }

   @media (min-width: 768px) {
        .letterDetail {
            max-width: 480px;
            margin: 0 auto;
        }

        .letterImage {
            width: 220px;
            height: 220px;
        }

        .letterLabel {
            font-size: 56px;
        }
   }


</style>