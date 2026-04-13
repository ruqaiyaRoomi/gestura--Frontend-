<template>
  <div class="loginScreen">
    <div class="top">
    <!-- Gestura logo and title page-->
    <img class="logo" src="/images/gestura.png">
    <h1>Login</h1>
  </div>

  <div class="form">
    <!--Email input field bound to reactive email ref-->
    <div class="input">
        <label for="">Email</label>
        <input type="email" placeholder="Enter Email" v-model="email">
    </div>

    <div class="input">
        <!--Password input with toggle visibility functionality-->
        <label for="">Password</label>
        <div class="password">
            <!-- Dynamically switches between text and password type based on showPassword-->
            <input :type="showPassword ? 'text' : 'password'" placeholder=" Enter Password" v-model="password"> 
            <!-- Eye icon toggles password visibility on click-->
        <span class="eye" @click="togglePassword"><i :class="showPassword? 'fa-regular fa-eye' : 'fa-solid fa-eye-slash'"></i>
        </span>
        </div>
    </div>
  </div>
<!-- Triggers login function on click -->
  <button v-on:click="login()">Login</button>
  <!-- Navigation link to sign up page for new users-->
  <p class="bottomText">Don't have an Account? <a v-on:click="router.push('./signup')" class="link">Sign Up!</a></p>
  <img class="wave" src="/images/wav2.png">
  </div>

</template>

<script setup>
import { ref} from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user';
const router = useRouter()

// reactive ref for form inputs
const email = ref("")
const password = ref("")

// Acess the Pinia user store to persist autheticated user data
const userStore = useUserStore() 

// Controls whether password is visible or not
const showPassword = ref(false)

// Toggles the password visibilty state
function togglePassword() {
    showPassword.value = !showPassword.value
}

async function login() {
    // send POST request to backend login endpoint with user credentials
    try{
       const response = await fetch("gestura-backend-production.up.railway.app/gestura/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
                email : email.value,
                password: password.value
        
        }),
      })
      const data = await response.json()

      if(data.login) {
        // Store user data in Pinia store and redirect to home screen 
        userStore.setUser(data)
        router.push('/index')
      } else {
        //Notify user if credentials are incorrect
        alert("Incorrect email or password")
      }
    } catch (err) {
        // Handle network or server errors
        console.error("Login error:", err)
        alert("Somethign went wrong. Please try again")
    }

}

</script>


<style scoped>
.loginScreen {
    min-height: 100vh;
    background-color: #f7f4e8;
    display: flex;
    flex-direction:column ;
    padding: 40px 24px 0;
    position: relative;
}

.top {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-bottom: 40px;
    margin-top: 70px;
}

.logo{
    height: 50px;
    width: 50px;
}

.top h1 {
    font-size: 28px;
    font-weight: 700;
    margin: 0;
}

.form {
    display: flex;
    flex-direction: column ;
    gap: 20px;
    margin-bottom:40px ;
}

.input {
    display: flex;
    flex-direction:column ;
    gap: 10px;
}

.input:focus {
    outline: 2px solid #e99627;
}

.password {
    position: relative;
    display: flex;
    align-items: center;
}


.password input {
    width: 100%;
    padding-right: 40px;
}

.eye {
    position: absolute;
    right: 14px;
    color: #666;
    
}

input {
    height: 52px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 0 14px;
    font-size: 15px ;
    background-color: #f0f0f0;
    
}

input:focus {
    outline: none;
    border-color: #e99627;
    background-color: #fff;
}

label {
    font-size: 16px;
    color: #555;
}

button {
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
   
button:hover {
    transform: translateY(-1px);
    opacity: 0.9;
   }


.bottomText {
    text-align: center;
    font-size: 14px;
    color: #555;
}

.link {
    font-weight: 600;
    text-decoration: underline;
    color: #2c2c2c;
}

.wave {
    position: absolute;
    bottom: 0;
    width: 100%;
    
    left: 0;
    width: 100%;
}
    
</style>