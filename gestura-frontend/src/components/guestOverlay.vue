
<template>
    <div v-if="showGuestOverlay" class="overlay">
        <div class="modal">
            <h2 class="heading">You're in Guest Mode</h2>
            <p class="description">Create an Account to save progress and unlock all features</p>

            <button @click="goToLogin">Login / Sign Up</button>
            <button @click="close" class="closeBtn">Maybe Later</button>
        </div>
    </div>
</template>

<script setup>

import { useRouter } from 'vue-router';
import { showGuestOverlay, closeGuestOverlay } from '../stores/guest';

const router = useRouter()

function close () {
    closeGuestOverlay()
}

function goToLogin() {
    closeGuestOverlay()
    router.push('/login')
}

</script>

<style scoped>
.overlay{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);

    display: flex;
    align-items: center;
    justify-content: center;

}

.modal {
    background: #f3f3f3;
    padding: 30px 24px;
    border-radius: 22px;
    width: 90%;
    max-width: 360px;
    text-align: center;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.modal .heading {
    font-size: 20px;
    font-weight: 700;
    color: #5E5E5E;
    margin-bottom: 12px ;
}

.modal .description {
    font-size:15px ;
    color: #666;
    margin-bottom: 24px;
}


.modal button {
    width: 100%;
    height: 50px;
    background-color: #e99627;
    color: white;
    border: none;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 600;
    margin-bottom:12px ;
    box-shadow: 0 8px 18px rgba(233, 150, 39, 0.25);
    transition: 0.2s;
}

.modal button:hover {
    transform: translate(-1px);
    opacity: 0.9;
}

.modal .closeBtn {
    background-color: #ccc;
    color: #333;
}

</style>