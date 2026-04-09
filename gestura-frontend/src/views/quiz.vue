<template>
        <Header/>
    <div class="quiz">
         <div class="header">
            <span class="back" v-on:click="router.back()"><i class="fa-solid fa-arrow-left"></i></span>
            <span class="title">Quiz</span>
            <span></span>
        </div>

        <div class="body">
            
        <div class="image">
            <img src="/images/quiz.png" alt="">
        </div>

        <div class="textBlock">
            <p class="blockTitle">Finger-spelling Quiz</p>
            <p class="subheading">Sign the correct Alphabet</p>
        </div>

        <div class="questions">
            <p class="questionTitle">Number of Questions</p>
            <div class="noQuestions">
                <div class="slider" :style="{transform: `translateX(${[5,10,15].indexOf(selected) * 100}%)`}"></div>
                <button :class="{active: selected === 5}" v-on:click="selected = 5">5</button>
                <button :class="{active: selected === 10}" v-on:click="selected= 10">10</button>
                <button :class="{active: selected === 15}" v-on:click="selected = 15">15</button>
            </div>

            <button class="startQuiz" v-on:click="router.push(`/quizQuestion/${selected}`)">
                Start Quiz
            </button>
        </div>
        </div>
    </div>

    <NavBar/>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import NavBar from '../components/navBar.vue';
import Header from '../components/header.vue';

const router = useRouter();
const selected = ref(5)

</script>

<style scoped>

    .quiz {
        background: #f7f4e8;
        min-height: 100vh;
        padding: 20px 16px 100px;
        display: flex;
        flex-direction: column;
        gap: 20px;
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

   .textBlock {
    display: flex;
    flex-direction: column;
    gap: 2px;
    justify-content: center;
    align-items: center;
   }

   .textBlock .blockTitle {
    font-size: 25px;
    text-align: center;
    margin-bottom: 0;
   }

   .textBlock .subheading {
    font-size: 15px;
   }

   .questions{
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 10px;
   }

   .noQuestions{
    position: relative;
     width: 100%;
     height: 55px;
     border-radius: 12px;
     display: flex;
     justify-content: center;
     align-items: center;
     padding: 4px;
     box-sizing: border-box;
     box-shadow: none;

   }

   .slider {
    position: absolute;
    width: calc(33.33% - 3px);
    height: calc(100% -8px);
    background-color: #e99627;
    border-radius: 10px;
    transition: transform 0.3s ease; 
    left: 4;
   }

   .noQuestions button {
   position: relative;
   z-index: 1;
   border-radius: 10px;
   border: none;
   height: 100%;
   width: 33.33%;
   background-color: none;
   color: #5e5e5e;
   font-weight: 600;
   font-size: 15px;
   transition: 0.3s ease;

   }

   .noQuestions button.active {
    background: #e99627;
    color: white;
   }

   .startQuiz {
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

   }

   .questions .questionTitle {
        text-align: center;
        font-size:20px ;
   }

   .image{
    text-align: center;
   }


</style>