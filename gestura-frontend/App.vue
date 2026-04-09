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