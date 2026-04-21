<template>
<div class="onboarding">
    <div class="slideShowContainer">
       <div class="slideShow">
        <div class="SlideShowBody">
            <div class="img"><img v-bind:src="slideshowInfo[currentIndex].image"/></div>
            <div class="text">
                <p class="heading">{{slideshowInfo[currentIndex].heading}}</p>
            <p class="subheading">{{slideshowInfo[currentIndex].subheading}}</p>
            </div>
        </div>

        <div class="dots">
            <span v-for="(slide, index) in slideshowInfo" :key='index' :class="['dot', {active: index === currentIndex}]"></span>

        </div>

        <button v-on:click="next" class="button">
            {{currentIndex === slideshowInfo.length - 1 ? 'Get Started' : 'Next'}}
        </button>

       </div>
    </div>
</div>
</template>

<script setup>
    import {ref, onMounted} from 'vue'
    import { useRouter } from 'vue-router'
    
    const router = useRouter()
    const currentIndex = ref(0)

    const slideshowInfo = [{
        image : "/images/Slide1.png",
        heading: "Communication shouldn't feel impossible.",
        subheading: "Gestura helps bridge the gap between signers and non-signers"
    },

    {image : "/images/slide2.png",
        heading: "Translate fingerspelling in real time.",
        subheading: "Use your cameras to recognize ASL fingerspelling and convert it to text instantly."
    },

    {image : "/images/slide3.png",
        heading: "Practice. Improve. Repeat",
        subheading: "Use guided practice mode to learn and refine your ASL fingerspelling skills"
    }
]

    onMounted(() =>{
        const hasSeenOnboarding = localStorage.getItem('onboardingSeen')

        if (hasSeenOnboarding === 'true') {
            router.push('/LoginSignUp')
        }
    })
    
    function next() {
    if(currentIndex.value < slideshowInfo.length - 1) {
        currentIndex.value++
    } else {
        localStorage.setItem('onboardingSeen', 'true')
        router.push('/LoginSignUp')
    }
}
</script>

<style scoped>
    .onboarding {
        min-height: 100vh;
        width: 100%;
        background-color: var(--bg-primary);
        display: flex;
        flex-direction: column ;
        overflow: hidden;

    }

    .slideShowContainer{
        position: fixed;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        padding: 0 24px;
        box-sizing: border-box;
    }

    .slideShow {
        width: 100%;
        max-width: 420px;
    }

    .SlideShowBody {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .img{
        margin-bottom: 25px;
    }

    img {
        height: 380px;
        border-radius: 40%;
        max-width: 100%;
        object-fit: contain;
    
    }

    button {
        width: 100%;
        height: 56px;
        background-color: var(--accent);
        color: var(--bg-card);
        border: none;
        border-radius: 14px;
        font-size: 16px;
        font-weight: 600;
        box-shadow: 0 8px 18px var(--accent-shadow);
        transition: 0.2s ease;
    }
    button:hover {
        box-shadow: rgba(99, 99, 99, 1) 0px 2px 9px 0px;
    }


    .text {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin-bottom: 25px;
    }

    .heading {
        font-size: 20px;
        margin-bottom: 0px;
        color: var(--text-primary);
        font-weight: 600;
    }

    .subheading{
        font-size: 15px;
        max-width: 350px;
        margin-bottom: 0px;
        color: var(--text-muted);
       
    }

    .dots{
        display: flex;
        justify-content: center;
        gap: 10px;
        margin-bottom: 30px;
    }

    .dot {
        width: 5px;
        height: 5px;
        border-radius: 50%;
        background-color: #ccc;
        transition: all 0.3s ease;
    }

    .dot.active {
        background-color: var(--accent);
        transform: scale(1.2);    
    }

    @media (min-width:768px) {
        img {
            height: 360px;
        }

        .heading {
            font-size: 22px;
        }

        .subheading {
            font-size: 16px;
        }
    }

</style>