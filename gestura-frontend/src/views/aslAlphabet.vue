<template>
    <Header />
    <div class="aslAlphabet">
        <div class="search">
            <span><i class="fa-solid fa-magnifying-glass"></i></span>
             <input type="search" name="" id="" placeholder="Search">
        </div>
       
        <div class="grid">
            <div class="card" v-for="letter in alphabets" :key="letter.alphabet" v-on:click="router.push(`/aslAlphabet/${letter.alphabet}`)">
                <div class="imageContainer">
                    <img :src="letter.image">
                </div>
                <div class="cardBody">
                    <p class="name">{{ letter.alphabet }}</p>
                </div>
            </div>
        </div>

    </div>
    <NavBar />
 
    
</template>

<script setup>
import { useRouter } from 'vue-router';
import NavBar from '../components/navBar.vue';
import Header from '../components/header.vue';

const router = useRouter();


const alphabets = [{
    alphabet: 'A',
    image: "/images/A.png"
},

{
    alphabet: 'B',
    image: '/images/B.png'
},

{
    alphabet: 'C',
    image: '/images/C.png'
},
{
    alphabet: 'D',
    image: '/images/D.png'
},
{
    alphabet: 'E',
    image: '/images/E.png'
},
{
    alphabet: 'F',
    image: '/images/F.png'
},
{
    alphabet: 'G',
    image: '/images/G.png'
},
{
    alphabet: 'H',
    image: '/images/H.png'
},
{
    alphabet: 'I',
    image: '/images/I.png'
},
{
    alphabet: 'J',
    image: '/images/J.png'
},
{
    alphabet: 'K',
    image: '/images/K.png'
},
{
    alphabet: 'L',
    image: '/images/L.png'
},
{
    alphabet: 'M',
    image: '/images/M.png'
},
{
    alphabet: 'N',
    image: '/images/N.png'
},
{
    alphabet: 'O',
    image: '/images/O.png'
},
{
    alphabet: 'P',
    image: '/images/P.png'
},
{
    alphabet: 'Q',
    image: '/images/Q.png'
},
{
    alphabet: 'R',
    image: '/images/R.png'
},
{
    alphabet: 'S',
    image: '/images/S.png'
},
{
    alphabet: 'T',
    image: '/images/T.png'
},
{
    alphabet: 'U',
    image: '/images/U.png'
},
{
    alphabet: 'V',
    image: '/images/V.png'
},
{
    alphabet: 'W',
    image: '/images/W.png'
},
{
    alphabet: 'X',
    image: '/images/X.png'
},
{
    alphabet: 'Y',
    image: '/images/Y.png'
},
{
    alphabet: 'Z',
    image: '/images/Z.png'
},




]

</script>

<style scoped>
   
.aslAlphabet {
    background: #f7f4e8;
    min-height: 100vh;
    padding: 16px;
}

.search {
    display: flex;
    align-items: center;
    background: #ffffff;
    border-radius: 20px;
    padding: 10px 20px ;
    margin-bottom: 18px;
}

.search span {
    color: #999;
    margin-right: 8px;
}

.search input {
    border: none;
    outline: none;
    width: 100%;
    font-size: 14px;
    background: transparent;
}

.grid{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
}

.card {
    background: #FFFFFF;
    border-radius: 16px;
    overflow: hidden;
      box-shadow: 0 6px 10px rgba(0, 0, 0, 0.08);
}

.imageContainer {
    height: 110px;

    display: flex;
    justify-self: center;
    align-items: center;
    padding: 18px;
}

.imageContainer img {
    width: 100%;
    height: auto;
}

.cardBody {
    background: #f7f6f1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 0;
}

.name {
    font-size: 22px;
    font-weight: 600;
    color: #555;
}


</style>