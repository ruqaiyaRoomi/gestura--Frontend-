<template>
    <div class="header">
       <div class="image"> <img  src="/images/gestura.png"/> </div>
        <span><i class="fa-solid fa-gear"></i></span>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const emit = defineEmits(['done'])


onMounted(() => {
    setTimeout(() => {
        setTimeout(() => emit('done'), 600)
    }, 3000);
})

</script>

<style scoped>
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 16px 20px;
        background-color: #F7F4E8;
      
    }

   .image img{
    height: 50px;
    width: 50px;
   }

    .fa-solid fa-gear {
        height: 50px;
        width: 50px;
    }

</style>