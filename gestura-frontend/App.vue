<template>
    <splashScreen v-if="screen === 'splash'" @done="onSplashDone"/>
    <RouterView v-else />
    <GuestOverlay />
    
</template>

<script setup>
import {provide, ref, onMounted} from 'vue'
import { useRouter } from 'vue-router';
import splashScreen from './src/components/splashScreen.vue'
import GuestOverlay from './src/components/guestOverlay.vue';

const screen = ref('splash')
const router = useRouter()

function onSplashDone() {
    screen.value = 'done'
    router.push('/onboarding')
}

onMounted (() => {
    const savedTheme = localStorage.getItem('darkMode')
    if (savedTheme === 'true') {

        document.documentElement.classList.add('dark')
    } 
    const changedFont = localStorage.getItem('largeText')

    if(changedFont === 'true') {
       
        document.documentElement.classList.add('largeText')
    } 
})
</script>

<style>
:root {
    --bg-primary:  #F7F4E8;
    --bg-secondary: #f1f1f1;
    --bg-card: #ffff;
    --text-primary: #5e5e5e;
    --text-secondary: #7a7a7a;
    --text-muted: #666;
    --accent: #e99627;
    --accent-shadow: 0 4px 14px rgba(233,150,39,0.25);
    --shadow-card:  0px 4px 12px rgba(0,0,0,0,0.1);
    --shadow-small: 0 4px 10px rgba(0,0,0,0.05);
    --radius-card: 22px;
    --radius-button: 14px;
    --radius-icon: 14px;
    --text-dark: #333;

}

.dark {
    --bg-primary: #1c1917;
    --bg-card: #292524;
    --text-primary: #e8e3d9;
    --text-secondary: #b8b0a4;
    --text-muted: #9c9389;
    --accent: #e99627;
    --accent-shadow: 0 4px 18px rgba(245,158,11,0.3);
    --shadow-card: 0px 6px 20px rgba(0,0,0,0,0.3) ;
    --shadow-small: 0 4px 12px rgba(0,0,0,0.2);
    --text-dark: #e8e2d9;
}


html,body {
    margin: 0;
    padding: 0;
    scroll-behavior: smooth;
}

* {
    box-sizing: border-box;
}
</style>