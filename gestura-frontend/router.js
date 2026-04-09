import { createRouter, createWebHistory } from "vue-router";

import index from "./src/views/index.vue";
import login from "./src/views/login.vue";
import signUp from "./src/views/signUp.vue";
import LoginSignUp from "./src/views/LoginSignUp.vue";
import onboarding from "./src/views/onboarding.vue";
import profile from "./src/views/profile.vue";
import learn from "./src/views/learn.vue";
import translate from "./src/views/translate.vue";
import AslAlphabet from "./src/views/aslAlphabet.vue";
import LetterDetails from "./src/views/letterDetails.vue";
import PracticeLetter from "./src/views/practiceLetter.vue";
import CommonWords from "./src/views/commonWords.vue";
import WordDetails from "./src/views/wordDetails.vue";
import WordDetailsPractice from "./src/views/wordDetailsPractice.vue";
import Quiz from "./src/views/quiz.vue";
import QuizQuestion from "./src/views/quizQuestion.vue";
import QuizResult from "./src/views/quizResult.vue";


const routes = [
    {path: '/LoginSignUp', component: LoginSignUp},
    {path: '/onboarding', component: onboarding},
    {path: '/login', component: login},
    {path: '/signup', component: signUp},
    {path: '/index', component: index},
    {path: '/profile', component: profile},
    {path: '/learn', component: learn},
    {path: '/translate', component: translate},
    {path: '/aslAlphabet', component: AslAlphabet},
    {path: '/aslAlphabet/:letter', component: LetterDetails},
    {path: '/practice/:letter', component: PracticeLetter},
    {path: '/commonWords', component: CommonWords},
    {path: '/commonWords/:word', component: WordDetails},
    {path: '/wordDetailsPractice/:word/:index', component: WordDetailsPractice},
    {path: '/quiz', component: Quiz},
    {path: '/quizQuestion/:total', component: QuizQuestion},
    {path: '/quizResult', component: QuizResult}

    
]

export default createRouter({
    history: createWebHistory(),
    routes
})
