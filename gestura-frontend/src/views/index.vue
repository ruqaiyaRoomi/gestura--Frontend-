<template>
     <Header />

   <div class="indexScreen">
     <div class="welcome">
        <h1>Welcome back!</h1>
        <p class="subheading">Ready to communicate?</p>
     </div>

     <div class="bodyContainer">

        <div class="cardContainer">
            <div class="cardHeader">
                <div class="iconContainer"><span class="icon"><i class="fa-solid fa-video"></i></span></div>
                <span class="arrow" v-on:click="router.push('/translate')"><i class="fa-solid fa-arrow-right-long"></i></span>
            </div>

            <div class="cardBody">
                <p class="signHeading">Sign <span class="arrow"><i class="fa-solid fa-arrow-right-long"></i></span> Text</p>
                <p class="description">Use your camera to translate signs into text.</p>
            </div>

            <button v-on:click="router.push('/translate')">Open Camera <span><i class="fa-solid fa-camera"></i></span> </button>
        </div>

        <div class="cardContainer">
            <div class="cardHeader">
                <div class="iconContainer"><span class="icon"><i class="fa-solid fa-hands-asl-interpreting"></i></span> </div>
                <span class="arrow"><i class="fa-solid fa-arrow-right-long"></i></span>
            </div>

            <div class="cardBody">
                <p class="signHeading">Learn Sign</p>
                <p class="description">Learn the ASL alphabet</p>
            </div>

            <button  v-on:click="router.push('/learn')">Start Learning <span><i class="fa-solid fa-pen"></i></span> </button>
        </div>

        <div class="bottomContainer">
            <div class="bottomHeader">
                <h1>Recently Translated</h1>
                <span @click="handleViewAll">view all</span>
            </div>
            <div class="historyCard">
                <div class="card" v-for="(item, index) in translationHistory.slice(0,5)" :key="index" @click="handleViewAll">
                    <span><i class="fa-solid fa-clock-rotate-left"></i></span> 
                    {{ item.letter }}
                    <p>{{ item.moduleName }}</p>
                    <span class="arrow"><i class="fa-solid fa-arrow-right-long"></i></span>

                </div>
            </div>
        </div>


        
     </div>
      <NavBar :currentPage="screen"
            @index="currentPage='index'"
            @learn="currentPage='learn'"
            @profile="currentPage= 'profile'"
            @translate="currentPage= 'translate'"/>
   </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import NavBar from '../components/navBar.vue';
import Header from '/src/components/header.vue';
import { triggerGuestOverlay } from '../stores/guest';
import { useUserStore } from '../stores/user.js';
import { onMounted, ref } from 'vue';
const userStore = useUserStore()

const translationHistory = ref([])

async function getTranslationHistory() {
    if(!userStore.user?._id) return

    try{
    const response = await fetch(`https://gestura-backend-production.up.railway.app/gestura/userStats/${userStore.user._id}`)
    const data = await response.json()

    if (data.modules?.['ASL Alphabet']) {
        translationHistory.value = [...data.modules['ASL Alphabet']].slice(-5).reverse().map(letter =>({
            letter,
            moduleName: 'ASL Alphabet'
        }))
    }
} catch (err) {
    console.error('Error fetching translation history', err)
}
    
} 


function handleViewAll(){ 
    if (!userStore.user?._id) {
        triggerGuestOverlay()
        return
    }
    router.push('/index')
}


onMounted(() => {
    getTranslationHistory()
})


</script>


<style scoped>
.indexScreen{
    min-height: 100vh;
    background-color: var(--bg-primary);
    display: flex;
    flex-direction:column ;
    padding: 0px 20px 120px;
}

.welcome {
    margin: 20px 0 30px;
}

.welcome h1{
    font-size: 30px;
    font-weight: 700;
    margin: 0;
    color: var(--text-primary);
}

.subheading {
    margin-top: 6px;
    font-size: 16px;
    color: var(--text-secondary);
}

.bodyContainer{
    display: flex;
    flex-direction: column;
    gap: 28px;  
}


.cardContainer {
    background-color: var(--bg-card);
    padding: 24px;
    border-radius: 22px;
    display: flex;
    flex-direction: column;
    box-shadow: var(--shadow-card);

}

.cardHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.icon {
    color: white;
    font-size: 22px;
}

.arrow {
    color: var(--text-dark);
    font-size: 18px;
}

.iconContainer{
    background-color: var(--accent);
    width: 50px;
    height: 50px;
    border-radius: 14px;
    display: flex;
    justify-content: center;
    align-items: center;
}


button {
    width: 100%;
    height: 56px;
    background-color: var(--accent);
    color: white;
    border: none;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 600;
    box-shadow: var(--accent-shadow);
    transition: 0.2s ease;
    margin-top: 20px;
    justify-content: center;
   }
   
button:hover {
    transform: translateY(-1px);
    opacity: 0.9;
   }

.cardBody {
    margin-top:18px ;

}

.signHeading{
    font-size: 18px;
    font-weight: 600;
    margin: 0 0 6px;
    color: var(--text-primary);
}

.description {
    font-size: 15px;
    color: var(--text-muted);
    margin: 0 0 20px;
}

.bottomContainer {
    margin-top: 10px;
}

.bottomHeader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 14px;
}

.bottomHeader h1 {
    font-size: 18px;
    margin: 0;
    color: var(--text-primary);
}

.bottomHeader span {
    font-size: 14px;
    color: var(--text-muted);
}

.historyCard{
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-height: 320px;
    overflow-y: auto;
    padding-right: 4px;
}

.card {
    background: var(--bg-card);
    padding: 16px 20px;
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: var(--shadow-card);
    transition: transform 0.15s ease;
}

.card i {
    color: var(--accent);
    font-size: 20px;
}

.card p {
    margin: 0;
    font-size: 14px;
    color: var(--text-muted);
}

.card span:first-child {
    color: var(--accent);
    font-size: 20px;
    margin-right: 12px;
    
}

@media (min-width: 768px) {
    
    .indexScreen {
        max-width: 480px;
        margin: 0 auto;
    }

    .welcome h1 {
        font-size: 34px;
    }
}

</style>