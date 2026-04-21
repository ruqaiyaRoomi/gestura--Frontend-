
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
    inset: 0;
    background: rgba(0, 0, 0, 0.5);

    display: flex;
    align-items: center;
    justify-content: center;

    z-index: 1000;

}

.modal {
    background: var(--bg-card);
    padding: 28px 22px;
    border-radius: var(--radius-card);
    width: 90%;
    max-width: 360px;
    text-align: center;
    box-shadow: var(--shadow-card);
}

.modal .heading {
    font-size: 20px;
    font-weight: 700;
    color: var(--text-primary);
    margin-bottom: 10px ;
}

.modal .description {
    font-size:15px ;
    color: var(--text-muted);
    margin-bottom: 22px;
}


.modal button {
    width: 100%;
    height: 50px;
    background-color: var(--accent);
    color: white;
    border: none;
    border-radius: var(--radius-card);
    font-size: 16px;
    font-weight: 600;
    margin-bottom:12px ;
    box-shadow: var(--accent-shadow);
    transition: 0.2s ease;
}

.modal button:hover {
    transform: translateY(-1px);
    opacity: 0.9;
}

.modal .closeBtn {
    background-color: var(--bg-secondary);
    color: var(--text-primary);
    box-shadow: none;
}

</style>