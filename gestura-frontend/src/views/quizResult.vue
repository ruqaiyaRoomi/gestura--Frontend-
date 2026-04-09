<template>
    <Header/>
    <div class="result">
        <div class="header">
            <span class="back" v-on:click="router.back()"><i class="fa-solid fa-arrow-left"></i></span>
            <span class="title">Quiz</span>
            <span></span>
        </div>

        <div class="trophy">
            <i class="fa-solid fa-trophy"></i>
        </div>

        <p class="score" >{{ score }}/{{ total }}</p>

        <div class="stats">
            <div class="statCard">
                <p class="statLabel">Time Taken</p>
                <p class="satValue" >{{ time }}</p>
            </div>
            <div class="statCard">
                <p class="statLabel">Accuracy</p>
                <p class="statValue" >{{ accuracy }}</p>
            </div>
        </div>

        <p class="reviewTitle">Review</p>

        <div class="reviewList">
            <div v-for="(item, index) in results" :key="index" :class="['reviewItem', item.correct ? 'correct' : 'wrong']">
                <div>
                    <p class="letterName">Letter {{ item.letter }}</p>
                    <p class="signed" v-if="item.skipped">Skipped</p>
                </div>
                <i :class="item.correct ? 'fa-solid fa-circle-check' : 'fa-solid fa-circle-xmark'"></i>
            </div>

            <button class="doneBtn" v-on:click="router.push('/learn')">Done</button>

    </div>
    </div>
    <NavBar/>
</template>

<script setup>

import { ref , onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import Header from '../components/header.vue';
import NavBar from '../components/navBar.vue';
import { useUserStore } from '../stores/user';


const router = useRouter();
const route = useRoute();
const userStore = useUserStore();

const score = parseInt(route.query.score)
const total = parseInt(route.query.total)
const time = route.query.time
const accuracy =  Math.round((score/total) * 100)
const results = JSON.parse(route.query.results || '[]') 


console.log(userStore.user)


onMounted(async () =>{
  console.log('userStore.user:', userStore.user)
   console.log('score:', score, 'total:', total, 'results:', results)
  await fetch("https://gestura-backend-femr.onrender.com/gestura/quizHistory", {
      method: 'POST', 
      headers: {'Content-Type' : 'application/json'},
      body: JSON.stringify({
        userId: userStore.user._id,
        score : score,
        numberOfQuestions: total,
        time: time,
        accuracy: accuracy,
        results: results,
        dateTaken: new Date ()
      })
  })
})

console.log(userStore.user)
</script>

<style scoped>

.result {
  background: #f7f4e8;
  min-height: 100vh;
  padding: 16px 16px 100px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  font-size: 18px;
  font-weight: 700;
}

.trophy {
  width: 110px;
  height: 110px;
  border-radius: 50%;
  border: 3px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  color: #e99627;
  align-self: center;
}

.score {
  font-size: 42px;
  font-weight: 700;
  color: #1a1a1a;
  text-align: center;
  margin: 0;
}

.stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.statCard {
  background: white;
  border-radius: 14px;
  padding: 16px;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0,0,0,0.06);
}

.statLabel {
  font-size: 13px;
  color: #888;
  margin: 0 0 4px;
}

.statValue {
  font-size: 18px;
  font-weight: 700;
  color: #e99627;
  margin: 0;
}

.reviewTitle {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

.reviewList {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.reviewItem {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
}

.reviewItem.correct {
  background: #e8f5e9;
  border: 1.5px solid #a5d6a7;
  color: #2e7d32;
}

.reviewItem.correct i {
  color: #2e7d32;
  font-size: 20px;
}

.reviewItem.wrong {
  background: #fdecea;
  border: 1.5px solid #ef9a9a;
  color: #c62828;
}

.reviewItem.wrong i {
  color: #c62828;
  font-size: 20px;
}

.letterName {
  margin: 0;
}

.signed {
  font-size: 12px;
  font-weight: 400;
  margin: 2px 0 0;
  color: #c62828;
}

.doneBtn {
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

</style>