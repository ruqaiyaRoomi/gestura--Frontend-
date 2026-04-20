<template>
    <splashScreen v-if="screen === 'splash'" @done="onSplashDone"/>
    <RouterView v-else />
    <GuestOverlay />
    
</template>

<script setup>
import {provide, ref} from 'vue'
import { useRouter } from 'vue-router';
import splashScreen from './src/components/splashScreen.vue'
import GuestOverlay from './src/components/guestOverlay.vue';

const screen = ref('splash')
const router = useRouter()

function onSplashDone() {
    screen.value = 'done'
    router.push('/onboarding')
}
</script>

<style>
:root {
    --bg-primary:  #F7F4E8;
    --bg-card: #f3f3f3;
    --text-primary: #5e5e5e;
    --text-secondary: #7a7a7a;
    --text-muted: #666;
    --accent: #e99627;
    --accent-shadow: rgba(233,150,39,0.25);
    --shadow-card: rgba(0,0,0,0,0.1) 0px 4px 12px;
    --shadow-small: 0 4px 10px rgba(0,0,0,0.05);
    --radius-card: 22px;
    --radius-button: 14px;
    --radius-icon: 14px;

}

.dark {
    --bg-primary: #1a1a1a;
    --bg-card: #2a2a2a;
    --text-primary: #e0e0e0;
    --text-secondary: #aaaaaa;
    --text-muted: #999;
    --accent: #cccc;
    --accent-shadow: rgba(233,150,39,0.2);
    --shadow-card: rgba(0,0,0,0,0.3) 0px 4px 12px;
    --shadow-small: 0 4px 10px rgba(0,0,0,0.2);
}
</style>