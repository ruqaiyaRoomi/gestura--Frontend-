<template>
    <Header />
    <div class="wordDetails">
         <div class="header">
            <span class="back" v-on:click="router.back()"><i class="fa-solid fa-arrow-left"></i></span>
            <span class="title">{{ word }}</span>
            <span></span>
        </div>


        <div class="lettersContainer">
            <div class="letterCard" v-for="(letter, index) in letters" :key="index">
                    <img :src="`/public/images/${letter}.png`" alt="">

                <p>{{ letter }}</p>
            </div>
        </div>

        <div class="buttons">
            <button class="mark" v-on:click="markDone">Mark as Done</button>
            <button class="ready" v-on:click="router.push(`/wordDetailsPractice/${word.toUpperCase()}/0`)">Ready to Practice?</button>
        </div>

    </div>
<NavBar />
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import Header from '../components/header.vue';
import NavBar from '../components/navBar.vue';
import { useUserStore } from '../stores/user.js';
import { ref } from 'vue';

const route = useRoute();
const router = useRouter();


const word = route.params.word 
const letters = word.toUpperCase().replace(/\s/g,'').split("")

const userStore = useUserStore()
const isSaving = ref(false)
const isDone = ref(false)


async function markDone() {
    if ( !userStore.user?._id) {
    alert('You need to be logged in!')
    return; }

    if (isDone.value) return

    isSaving.value = true
    try {
        const response = await fetch('https://gestura-backend-femr.onrender.com/gestura/userStats', {

            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({ 
                userId: userStore.user._id,
                module: 'Common Words',
                letter: word
            }),
            
        })
            isDone.value = true
    }  catch (err) {
        console.error('Error saving word')
        alert('Error saving word')
     } finally {
        isSaving.value = false
        router.push('/commonWords')
     }
}


</script>

<style scoped>

.wordDetails {
    background: #f7f4e8;
    min-height: 100vh;
    padding: 20px 16px 100px;
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.header{
    font-size: 18px;
    display: flex;
    justify-content: space-between;

}

.title{
    font-size: 25px;
}

.lettersContainer {
    display: flex;
    gap: 16px;
    margin-top: 40px;
    overflow-x: auto;
    margin-bottom: 12px;
    scrollbar-width: none;
}

.letterCard::-webkit-scrollbar {
    display: none;
}

.letterCard{
    background: white;
    min-width: 190px;
    height: 250px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-shrink:0;
}

.letterCard img {
    width: 110px;
}

.letterCard p {
    font-size: 20px;
    font-weight: 600;
    color: #555;
    text-align: center;
}

.buttons {
    margin-top: 50px;
    width: 100%;
    display: flex;
    flex-direction: column ;
    gap: 16px;
    
}

.mark {
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

.mark:hover{
    transform: translateY(-1px);
    opacity: 0.9;
}


.ready {
    width: 100%;
    height: 56px;
    background-color: transparent;
    color: #e99627;
    border: 2px solid #e99627;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 600;
    transition: 0.2s ease;
}


.ready:hover {
     background-color: #e9962710;
}



</style>