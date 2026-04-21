<template>
  <div class="signUpScreen">
    <div class="content">
    <div class="top">
        <!-- Gestura logo and page title -->
    <img class="logo" src="/images/gestura.png">
    <h1>Create an Account</h1>
  </div>


  <div class="form">
    <!-- First and last name fields displayed side by side-->
    <div class="row">
        <div class="input">
                <label for="">First Name</label>
                <input type="text" placeholder="Enter First name" v-model="userInfo.firstName">
                <!-- Error message shown if name validation fails-->
                <span class="messages" v-if="showNameError">Please enter valid name</span> 
        </div>

        <div class="input">
                <label for="">Last Name</label>
                <input type="text" placeholder="Enter First name" v-model="userInfo.lastName">
                <span class="messages" v-if="showNameError">Please enter valid name</span> 
        </div>
    </div>
    
    <div class="input">
        <!--Email input field with validaation error message-->
        <label for="">Email</label>
        <input type="email" placeholder="Enter Email" v-model="userInfo.email">
         <span class="messages" v-if="showEmailError">Please enter a valid email</span> 
    </div>

    <div class="input">
        <!--Password input with strength validation error message-->
        <label for="">Password</label>
        <div class="password">
            <input :type="showPassword ? 'text' : 'password'" placeholder="Enter Password" v-model="userInfo.password"> 
        <span class="eye" @click="togglePassword"><i :class="showPassword? 'fa-regular fa-eye' : 'fa-solid fa-eye-slash'"></i></span>
        </div>
        <!-- show if password does not meet strength requirements-->
        <span class="messages" v-if="showPassError">Password must be 8-16 chars with uppercase, lowercase, number and special character</span>
    </div>

    <!--Confirms password field to ensure password match-->
    <div class="input" >
        <label for=""> Confirm Password</label>
        <div class="password">
            <input type="password" placeholder=" Enter Password" v-model="confirmPass"> 
        </div>
        <!-- Shown if confirm password does not matchh original password-->
         <span class="messages" v-if="showConfirmPassError">Passwords do not match</span>
    </div>
  </div>
<!-- Sign Up button disabled until all form validation pass-->
  <button v-on:click="signUp()" :disabled="!isFormFilled" >Sign Up</button>
  <p class="bottomText">Already have an Account? <a  v-on:click="router.push('/login')" class="link">Login!</a></p>
    </div>
  <img class="wave" src="/images/wav2.png">
  </div>

  

</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user';
const router = useRouter()
const showPassword = ref(false)

// reactive object holding all sign up form fields
const userInfo = ref({
    firstName: "",
    lastName : "",
    email : "",
    password : "",   
})

function togglePassword() {
    showPassword.value = !showPassword.value
}

// Seperate ref for confirm password field
const confirmPass = ref("")
const userStore = useUserStore()


// Validates email format using regex
const validateEmail = computed(()=> {
    let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let email = userInfo.value.email.trim();

      return (regex.test(email));
})

// Validates first and last name format using regex
const validateName = computed (() =>{
      let regex = /^[A-Za-z\s]+$/;
      let firstName = userInfo.value.firstName.trim();
      let lastName = userInfo.value.lastName.trim();
      return (regex.test(firstName) && regex.test(lastName) && firstName && lastName);
    })

// Validates password strength
const validatePass = computed (() => {
    let regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-])(?!.*\s).{8,16}$/;
    let password = userInfo.value.password.trim()

    return (regex.test(password))
})


// check that confirm password match the original password
const  validateConfirmPass =  computed (() =>{
    return confirmPass.value === userInfo.value.password && confirmPass.value.length > 0
})

// sign up button is only enabled when all validations pass
const isFormFilled = computed(() => {
    return validateEmail.value && validateName.value && validatePass.value && validateConfirmPass.value;
})

// error message visibility
const showPassError =  computed(() => {
      return (
        userInfo.value.password.length > 0 && !validatePass.value
      );
    })

const showConfirmPassError =  computed(() => {
    return confirmPass.value.length > 0 && !validateConfirmPass.value
})

const showNameError = computed (()  =>{
      return (userInfo.value.lastName.length > 0|| userInfo.value.firstName.length > 0) && !validateName.value;
})

const showEmailError =  computed (() => {
      return userInfo.value.email.length > 0 && !validateEmail.value;
})

async function signUp() {
    try{
        // send user details to the backend registration endpoint
        const response = await fetch("https://gestura-backend-production.up.railway.app/gestura/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
                firstName: userInfo.value.firstName ,
                lastName : userInfo.value.lastName ,
                email : userInfo.value.email,
                password: userInfo.value.password
        
        }),
      })
      const data = await response.json()
    console.log('data', data)
    
    if(data.registration) {
        // Store new user in Pinia and redirect to home screen
        userStore.setUser(data)
    
        router.push('/index')
    }else {
        // Log error message if registration faills
        console.log( data.message)
    }
    } 
    catch(error) {
        console.error("sign up error", error)
    }
}





</script>


<style scoped>
.signUpScreen {
    min-height: 100vh;
    background-color: var(--bg-primary);
    display: flex;
    flex-direction:column ;
    overflow: hidden;
}

.content {
    width: 100%;
    max-width: 520px;
    margin: 0 auto;
    padding: 24px;
    flex: 1;
    box-sizing: border-box;
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
    color: var(--text-primary);
}

.form {
    display: flex;
    flex-direction: column ;
    gap: 20px;
    margin-bottom:40px ;
}

.row {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;

}

.row .input {
    flex: 1;
    min-width: 0;
    width: 0;

}

.input {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 8px;
    
}

.input:focus {
    outline: 2px solid var(--accent);

 
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
    color: var(--text-muted);
    
}

input {
    height: 52px;
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 0 14px;
    font-size: 15px ;
    background-color: var(--bg-card);
    color: var(--text-primary);
    box-sizing: border-box;
    width: 100%;
    min-width: 0;
    
}

input:focus {
    outline: none;
    border-color: var(--accent);
    background-color: var(--bg-card);
}

label {
    font-size: 16px;
    color: var(--text-muted);
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
    transform: translateY(-1px);
    opacity: 0.9;
   }

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.bottomText {
    text-align: center;
    font-size: 14px;
    color: var(--text-muted);
}

.link {
    font-weight: 600;
    text-decoration: underline;
    color: var(--text-primary);
}

.wave {

    width: 100%;
    display: block;
    margin-top: auto;
}

.messages {
  font-size: 14px;
  color: #e53935;
  display: flex;
  align-items: center;
  gap: 4px;
}

.messages::before {
  content: '⚠️';
  font-size: 15px;
}

@media (min-width: 768px) {
    .signUpScreen {
        max-width: 480px;
        margin: 0 auto;
    }

    .top {
        margin-bottom: 100px;
    }
    
}
    
</style>