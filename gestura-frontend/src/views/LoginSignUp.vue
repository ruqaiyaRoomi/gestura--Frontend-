<template>
    <div class="screen">
        <div class="header">
            <div class="logo">
                <img class="gestura" src="/src/images/gestura.png"> 
                <span>Gestura</span>
            </div>
        </div>
        
        <div class="top">
            <img class="illustration" src="/src/images/loginSignUp.png">
            <img class="wave" src="/src/images/wave1.png">
        </div>

        <div class="body">
            <div class="title">Welcome to Gestura</div>
            <div class="buttons">
                <button class="createAccount" v-on:click="router.push('/signup')">Create an Account</button>
                <div class="or">
                    <span class="line"></span>
                    <p>or</p>
                    <span class="line"></span>
                </div>
                <button class="login" v-on:click="router.push('/login')">Login</button>
                <p class="guest" @click="continueAsGuest">Continue as Guest</p>

            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const router = useRouter()
const showGuestMessage = ref(false)

function continueAsGuest(){
    localStorage.setItem('isGuest', 'true')
    
    showGuestMessage.value = true

    setTimeout(() => {
        router.push('/index')
    })
}




</script>

<style scoped>
   .screen {
    min-height: 100vh;
    width: 100%;
    background-color: #f7f4e8;
    display: flex;
    flex-direction: column ;
    overflow: hidden;
   }

   .header {
    padding: 16px 20px;
   }

   .logo{
    display: flex;
    align-items: center;
    gap: 10px;
   }

   .gestura{
    height: 32px;
    width: 32px;
   }

   .logo span {
    font-size: 20px;
    font-weight: 600;
    color: #333;
   }


   .top{
    position: relative;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
   
   }

   .illustration{
    width: 95%;
    max-width: 420px;
    object-fit: contain;
    margin-top: 10px;
   }

   .wave{
    position: absolute;
    bottom: -3px;
    width: 100%;
   }

   .body{
    background-color: #f7f4e8;
    padding: 30px 24px 40px ;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
   }

   .title{
    font-size: 26px;
    font-weight: 700;
    color: #333;
    text-align: center;
   }

   .buttons {
    width: 100%;
    display: flex;
    flex-direction: column ;
    gap: 16px;
   }

   .createAccount {
    width: 100%;
    height: 56px;
    background-color: #e99627;
    color: white;
    border: none;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 600;
    box-shadow: 0 8px 18px rgba(233, 150, 39, 0.25);
    transition: 0.2s ease;
   }

   .createAccount:hover {
    transform: translateY(-1px);
    opacity: 0.9;
   }

   .or {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
   }

   .line{
    flex: 1;
    height: 1px;
    background-color: #ddd;
   }

   .login {
    width: 100%;
    height: 56px;
    background-color: transparent;
    color: #e99627;
    border: 2px solid #e99627;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 600;
    transition: 0.2s ease;
   }

   .login:hover {
    background-color: #e9962710;
   }

   .guest {
    margin: 0;
    text-align: center;
    color: #888;
    font-size: 14px;
   }

   .guest:hover {
    color: #555;
   }
    
</style>