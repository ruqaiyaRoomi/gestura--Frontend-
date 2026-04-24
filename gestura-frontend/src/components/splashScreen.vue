<template>
    <!-- splash screen, fade out via 'hide' class when hiding is true-->
    <div class="splash" :class="{ hide: hiding}">
     <div class="circle"></div>
        <div  class="content">
            <img class="logo" src="/images/gestura.png">
             <span class="name">Gestura</span>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const hiding = ref(false)
const emit = defineEmits(['done'])

// show splash for 3s, trigger fade out, them emit 'done' after the 600ms transitions finishes
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

        background: var(--bg-card);
        z-index: 9990;
        transition: opacity 0.5s ease
    }

    .splash.hide {
        opacity: 0;
        pointer-events: none;
    }

    .circle{
        position: absolute;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background: var(--bg-primary);

        animation: zoomFill 1.4s ease forwards;
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
        animation: fadeIn 1s ease 1.6s forwards;
    }

    .logo {
        width: 80px;
        height: 80px;
        
        animation: logoIn 1s ease 1.7s forwards;
    }

    @keyframes logoIn {
        0% {
            transform: translateY(10px); 
            opacity: 0;
        }
        100% {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .name{
        font-size: 26px;
        font-weight: 600;
        color: var(--text-primary);
        


        opacity: 0;
        animation: textIn 1s ease 1.8s forwards;
        }

    @keyframes textIn {
        0% {transform: translateY(10px); opacity: 0}
        100% {transform: translateY(0); opacity: 1}
    }

    @keyframes fadeIn {
        to {opacity: 1;}
    }


    @media (min-width: 768px) {
        .circle {
            width: 120px;
            height: 120px;
        }

        .logo {
            width: 100px;
            height: 100px;
        }

        .name {
            font-size: 32px;
        }

        .content {
            gap: 14px;
        }
    }
</style>