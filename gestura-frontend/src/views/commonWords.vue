<template>
    <Header/>
    <div class="commonWords">
        <div class="header">
            <span class="back" v-on:click="router.back()"><i class="fa-solid fa-arrow-left"></i></span>
            <span class="title">Common Words</span>
            <span></span>
        </div>
        <div class="cardContainer">
            <div class="cards" v-for="word in words" :key="word.word" v-on:click="openWord(word.word)">
                <p class="cardTitle">{{ word.word }}</p> 
                <span><i class="fa-solid fa-arrow-right-long"></i></span>
            </div>
        </div>
    <NavBar/>
    </div>
</template>

<script setup>

import {useRouter} from 'vue-router'
import NavBar from '../components/navBar.vue';
import header from '../components/header.vue';
import Header from '../components/header.vue';

const router  = useRouter()

const words = [
    {word: 'Hello'},
    {word: 'Thank you'},
    {word: 'Youre welcome'},
    {word: 'Sorry'},
    {word: 'Yes'},
    {word: 'No'},
    {word: 'Help'},
    {word: 'Please'}


]

function openWord(word){
    router.push(`/commonWords/${word}`)
}


</script>

<style scoped>
   .commonWords {
     background: #f7f4e8;
    min-height: 100vh;
    padding: 20px 16px 100px;
   }

    .title {
    font-size: 20px;
    margin-top: 10px;
    margin-bottom: 24px;

   }

   .back {
    margin-left: 5px;
    margin-right: 8px;
   }

   .cardContainer {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;


   }

   .cards{
     display: flex;
    justify-content: space-between;
    align-items: center;
    background: white;
    width: 100%;
    height: 80px;
    font-size: 18px;
    border-radius: 10px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
   }

   .cards p {
    margin-left: 13px;
   }

   .cards i {
    margin-right: 15px;
   }
   


</style>