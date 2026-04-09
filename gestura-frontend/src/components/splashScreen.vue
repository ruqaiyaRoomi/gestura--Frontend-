<template>
    <div class="splash" :class="{ hide: hiding}">
     <div class="circle"></div>
        <div  class="content">
            <img class="logo" src="/src/images/gestura.png">
             <span class="name">Gestura</span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const hiding = ref(false)
const emit = defineEmits(['done'])


onMounted(() => {
    setTimeout(() => {
        hiding.value = true
        setTimeout(() => emit('done'), 600)
    }, 3000);
})

</script>

<style scoped>
    .splash {
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content : center;
        background: #ffffff;
        z-index: 9990;
        transition: opacity 0.6s ease
    }

    .splash.hide {
        opacity :0;
        pointer-events: none;
    }

    .circle{
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: #F7F4E8;
        animation: zoomFill 1.8s ease forwards;
    }

    @keyframes zoomFill {
        0% {transform: scale(1);}
        100% {transform: scale(30);}
    }

    .content{
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;
        opacity: 0;
        animation: fadeIn 1.3s ease 1s forwards;
    }

    .logo {
        width: 80px;
        height: 80px;
        transform: translateY(20px);
        animation: slideLeft 1.5s ease 1s forwards;
    }

    @keyframes slideLeft {
        0% {transform: translateX(0); }
        100% {transform: translateY(-5px);}
    }

    .name{
        font-family: 'Inter', sans-serif;
        font-size: 26px;
        font-weight: semi bold;
        color: #333;
        overflow: hidden;
        transform: translateY(20px);
        opacity: 0;
        animation: slideInText 1.5s ease 1.1s forwards;
        }

    @keyframes slideInText {
        0% {transform: translateX(0); opacity: 0}
        100% {transform: translateY(-5px); opacity: 1}
    }

    @keyframes fadeIn {
        to {opacity: 1;}
    }
</style>