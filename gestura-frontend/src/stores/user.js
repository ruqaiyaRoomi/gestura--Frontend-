// Importing Pinia's defineStore to create a global state store
import { defineStore } from "pinia";
// Importing ref from Vue for reactive state variables
import { ref } from "vue";

export const useUserStore = defineStore('user',  () => {
    // Stores the currently authenticated user object (null if not logged in)
    const user = ref(null)
    // Stores full user activity history
    const history = ref([])
    // Stores recently signed ASL letters for quick access display
    const recentlySigned = ref([])
    
    // Stores common words 
    const commonWords = ref([])
    
    // sets data after successful login or signup
    function setUser(userData) {
        user.value = userData
    }
    // Resets the authentication state across the application
    function logout() {
        user.value = null
    }
    // Returing state varibles and functions to components that use this store
    return {user, setUser, logout, history, recentlySigned}
})

