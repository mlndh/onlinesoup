<template>
    <nav class="flex center column">
        <div class="flex row center space">
            </div>
        <ul class="flex row center">
            <li><router-link to="/Soups"><img src="../assets/home.svg" class="logos"/><br> Soups</router-link></li>
            <li><router-link to="/Profiles"><img src="../assets/user.svg" class="logos"/><br> Profile</router-link></li>
            <li>
                <p style="position:absolute; padding-left: 60px; padding-top: 10px; color: red;" v-if="this.antal"> {{antal}} </p>
                <router-link to="/Cart"> 
                <img src="../assets/shopping-cart.svg" class="logos" :class="{ fullBasket: emptyBasket }"/>
                    <br>Cart
                </router-link>
            </li>
        </ul>
      
    </nav>
</template>



<script>
import { db } from '../firebase';
import { auth } from '../firebase';
export default {
    data() {
        return {
        emptyBasket: false,
        test: {},
        antal: 0
          }
    },
    methods: {
loadOrders: function() {
  	db.ref('/users/'+auth.currentUser.uid + '/orders/').on('value',(snap)=>{
    this.test = snap.val();
    if(this.test) {
            this.antal = Object.keys(this.test).length   
            //Sparar antalet "key's i objected (antal ordrar i detta fallet) för att visas i en p =D <3
            } else {
            this.antal = 0}
  });
}
    },
    created() {
     auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser) {
              this.loadOrders();
          } else {
            if (localStorage.getItem('localOrder')) {
                this.emptyBasket = true;
                console.log(localStorage.getItem('localOrder'));
                    } else {this.emptyBasket = false;}
          }
    });

    }
}
</script>
<style scoped>

.flex {
    display: flex;
}
.row {
    flex-direction: row;
}
.column {
    flex-direction: column;
}

.center {
    justify-content: center;
}
nav {  
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgb(116, 179, 137);     
}
ul {
    padding: 15px;
    margin: 0px;
}
li {
    padding-left: 100px;
}

</style>