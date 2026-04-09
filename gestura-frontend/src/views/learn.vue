<template>
    <div class="learn">
    <Header />
    <NavBar />

    <div class="title">
        <h1 class="heading">Learn</h1>
        <p class="subheading">Master ASL basics at your own pace</p>
    </div>

    <div class="bodyContainer">
        <div class="cardContainer" v-on:click="router.push('/aslAlphabet')">
            <div class="imageContainer">
                <img class="aslImage" src="/public/images/ASL.png" alt="">
            </div>
            
            <div class="aslBody">
                <div class="textblock"> 
                    <p class="type">Fundamentals</p> 
                    <span><i class="fa-solid fa-arrow-right-long"></i></span>
                </div>
                
                  <p class="ASL">ASL Alphabet</p>
            
            </div>

            <div class="progressContainer">
                <p>A-Z</p>
                <div class="progressbar">
                    <div class="completed" :style="{width: progressPercent + '%'}"></div>
                </div>
                <p class="percentage">{{ progressPercent }}% Completed</p>
            </div>
        </div>


        <div class="cardContainer" v-on:click="router.push('/commonWords')">
            <div class="imageContainer">
                <img src="/public/images/commonWords.png" alt="">
            </div>
            
            <div class="aslBody">
                 <div class="textblock"> 
                <p class="type">Fundamentals</p> 
                 <span><i class="fa-solid fa-arrow-right-long"></i></span>
                 </div>
                     <p class="ASL">Common Words</p>
            </div>

            <div class="progressContainer">
                <p>A-Z</p>
                <div class="progressbar">
                    <div class="completed" :style="{width: progressPercent + '%'}"></div>
                </div>
                
                <p class="percentage">{{ progressPercent }}% Completed</p>
            </div>
        </div>
    </div>

        <div class="quiz" v-on:click="router.push('/quiz')">
            <p class="dailyP">Daily Practice</p>
            <div class="quizBlock">
                <span class="iconbg">
                    <i class="fa-solid fa-book-open-reader"></i>
                </span>
                <p>Quiz</p>
            </div>
        </div>

    </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import { ref, onMounted } from 'vue';
import NavBar from '../components/navBar.vue';
import Header from '../components/header.vue'
import { useUserStore } from '../stores/user';

const router  = useRouter()
const userStore = useUserStore()

const totalLetters =  ref(26)
const completedLetters =  ref(0)
const progressPercent = ref(0)

async function userProgress(word) {
    word = word || null;
    if(!userStore.user?._id) return

    try{
        const moduleName = word ? 'Common Words' : 'ASL Alphabet'
        const response = await fetch('https://gestura-backend-femr.onrender.com/gestura/userStats', {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ 
                userId: userStore.user._id,
                module: moduleName,
                letter: null || word
            }),
            
        })
        const data = await response.json()

        if(word) {
            totalLetters.value = word.replace(/\s/g, '')
        }
        else {
            totalLetters.value = 26
        }

        completedLetters.value = data.completedLetters?.length || 0
        progressPercent.value = Math.round((completedLetters.value / totalLetters.value) * 100)
    } catch (err) {
        console.error("Error fetching user progress:", err)
    }
}

onMounted(() => userProgress())

</script>

<style scoped>
   .learn {
    background: #f7f4e8;
    min-height: 100vh;
    padding: 20px 16px 100px;
   }

   .title {
    margin-top: 10px;
    margin-bottom: 24px;
   }

   .heading {
    font-size: 28px;
    font-weight: 700;
    margin: 0;
  
   }

   .subheading {
    color: #666;
    font-size: 14px;
   }

   .bodyContainer {
    display: flex;
    flex-direction: column;
    gap: 20px;
   }

   .cardContainer {
    background: #ffffff;
    border-radius: 22px;
    padding: 18px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    
   }

   .imageContainer {
    width: 100%;
    height: 200px;
    background: #f2f2f2;
   
    border-radius:16px ;

    justify-content: center;
    align-items: center;
    display: flex;

   }

   .imageContainer img {
    width: 75%;
    height: auto;

   }

   .imageContainer .aslImage {
    width: 58%;
   }

   .aslBody {
    display: flex;
    flex-direction: column;
    gap: 4px;
  
   }

   .type {
    font-size: 12px;
    color: #9a9a9a9a;
   }

   .textblock {
    display: flex;
    justify-content: space-between;
    align-items: center;
   }

   .ASL {
    font-size: 18px;
    font-weight: 600;
   }

   .aslBody span{
    font-size: 18px;
    color: #888;
   }


   .progressContainer {
    display: flex;
    flex-direction: column;

   }

   .progressbar {
    width: 100%;
    height: 6px;
    background-color: #ddd;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
   }

   .completed {
    height: 100%;
    background: #e99627;
   }

   .percentage {
    font-size: 12px;
    color: #777;
   }


   .quiz .dailyP {
    font-size: 28px;
   }


   .quizBlock{
    background: white;
    width: 100px;
    height:100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #e99627;
    border-radius: 10px;
    margin-top: 20px ;
    gap:2px;  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
   }

   .quizBlock i {
     font-size:30px;
   
    
   }

   .quizBlock span{
    background: #f1f1f1;
    margin-top: 25px;
    padding: 20px;
    border-radius: 500px;

   }

   .quizBlock p {
    font-size: 20px;
    margin-top: 13px;
    font-weight: 500;
   }

</style>