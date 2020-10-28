<template>
  <div>
    <div class="flex"> 
    <a href="Soups"> 
    <img src="../assets/chevron-left.svg" class="logos"/></a>
    <a href="Help"><img src="../assets/question.svg" class="logos"/></a>
      </div> 
   <h1> {{ title }} </h1> 
   
  <ul>
   <li v-for="(item, index) in test" :key="item.index">
     <div class="flex column">
       <div class="flex row space">
    <h3>{{ item.soup }}</h3>  <h3>{{ item.price }} kr<br> </h3>
    </div>
           <div class="flex row space">
    <h3>{{ item.bread }}</h3> <!-- <h3>{{ item.dp }} kr<br> </h3>-->
    </div>
           <div class="flex row space">
     <h3>{{ item.drinks }}</h3> <!-- <h3>{{ item.bp }} kr<br> </h3> -->
    </div>
 </div>
    <div class="flex column">
      <div class="flex row space">
      <p class="left-text"> Mat </p> <p> {{item.price}}</p> 
       </div>
       <div class="flex row space">
      <p class="left-text"> Extra tillägg </p> <p> Ingår</p> 
      </div>
       <div class="flex row space">
      <p class="left-text"> Leverans </p> <p> 39kr</p> 
      </div>
      <hr>
      <div class="flex row space">
      <h4 class="left-text"> Totalt</h4> <h4> {{item.price + 39}} </h4> 
    </div>

<button class="delete-Btn" v-on:click="deleteItem(index)"> <img src="../assets/trash.svg" class="logos"/> </button>
    </div>

    </li> 

  </ul>
<a href="Checkout" v-if="test"><button class="green-btn"> Fortsätt till leveransanvisningar</button></a> <br>


  </div>
</template>

<script>
import { auth } from '../firebase';
import { db } from '../firebase'
export default {

  
    created() {
      //Kollar om kundkorgen är tom
      auth.onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {    
       this.loadOrders();
    } else {
      this.title = "Din kundkorg är tom, skapa ett konto eller logga in först"
    }

    });
},
data() {
    return {
    title: "Kundkorg",
    test: {},
    }
},
methods: { 
  //Laddar vald soppa
loadOrders: function() {
  	db.ref('/users/'+auth.currentUser.uid + '/orders/').once('value',(snap)=>{
    this.test = snap.val();

  });
}, 
//Radera soppa
   deleteItem: function(index) {
  db.ref('/users/'+auth.currentUser.uid + '/orders/' + index).remove();
  this.loadOrders();
}
} 

}
</script>
<style scoped lang="scss"> 
//flexbox
.flex {
display: flex;
}
.row {
flex-direction: row;
}
.column {
flex-direction: column;
}
.space {
justify-content: space-between;
}
nav {
  width: 1000px;
}
h3 {
 margin: 3px;
}

@media only screen and (min-width: 992px) {
ul {
  padding-left: 25%;
  padding-right: 25%;
  padding-bottom: 10%;
}
}



</style>