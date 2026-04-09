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

const letter = route.params.letter
const currentLetter = alphabetData[letter]
import { triggerGuestOverlay } from '../stores/guest';



async function markDone() {
    if ( !userStore.user?._id) {
        triggerGuestOverlay()
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
    background: #f7f4e8;
    min-height: 100vh;
    padding: 20px 16px;
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
    color: #333;
   }

   .title {
    font-size: 18px;
    font-weight: 700;
    color: #4E4E4C;
   }

   .card {
    background: white;
    border-radius: 20px;
    display: flex;
    flex-direction:column ;
    align-items: center;
    padding: 24px;
    
   }


   .letterImage{
    width: 180px;
    height: 180px;
    object-fit: contain;
   }

   .letterLabel{
    font-size: 48px;
    font-weight: 700;
    color: #4E4E4C;
    margin: 12px 0 0;
   }

   .description {
    font-size: 18px;
    color: #4E4E4C;
    text-align: center;
    line-height: 1.6;
    margin: 0;
   }

   .tryIt{
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 120px;
   }

   .tryTitle {
    font-size: 18px;
    font-weight: 700;
    color: #4E4E4C;
    margin: 0;
   }

   .tip{
    font-size: 13px;
    color: #4E4E4C;
    margin: 0;
   }

   .tryIt button {
    width: 100%;
    height: 56px;
    background-color: #e99627;
    color: white;
    border: none;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0 8px 18px rgba(233, 150, 39, 0.25);
    transition: 0.2s ease;
    margin-top: 20px;
    justify-content: center;
   }


</style>