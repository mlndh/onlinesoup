<template>
<div class="padding">
        <div class="flex"> 
    <a href="Cart"> 
    <img src="../assets/chevron-left.svg" class="logos goBack"/></a>
    <p><img src="../assets/map-marker-alt.svg" class="logos"/> Plats: {{location}}</p>
    <a href="Help">
      <img src="../assets/question.svg" class="logos"/>
       </a>
      </div> 
<h1>{{ msg }}</h1>
 <div class="information">
<div :class="{changeInput: changeField}"> 
<span @click="changeField = !changeField" :aria-pressed="changeField ? 'true' : 'false'">&times;</span><br>

<input type="text" v-model="adress" placeholder="Adress" id="adress"> <br>
<input type="text"  v-model="payment" placeholder="Betalmedel" id="payment"> <br>
</div>     
<p class="bold">Adress<br> <img src="../assets/home.svg" class="img"/>{{ userInfo.adress }}  <br><button class="changeBtn" @click="changeField = !changeField" :aria-pressed="changeField ? 'true' : 'false'" v-on:click="writeAdress">ÄNDRA</button><br>
</p>
<p class="bold">Betalmetod<br><img src="../assets/credit-card.svg" class="img"/> {{ userInfo.payment }} <br> <button class="changeBtn" @click="changeField = !changeField" :aria-pressed="changeField ? 'true' : 'false'" v-on:click="writeAdress">ÄNDRA</button><br>
</p><br>
</div>
<a href="Finish"> <button class="green-btn"> Lägg beställning </button></a>
</div>

</template>

<script>
import { auth } from '../firebase'
import { db } from '../firebase'

export default {  
    created() {
//Hämta adress och betalsätt
     auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser) {
            db.ref('/users/' + auth.currentUser.uid + '/informationen/').once('value',(snap)=>{
            this.userInfo = snap.val();
            console.log(snap.val())
            });
          } else {
            console.log("else")
          }
          });
              if (localStorage.getItem('chosenLocation')) {
    this.location = JSON.parse(localStorage.getItem('chosenLocation'));
    this.userInfo.adress = this.location;
  }
  },
  data () {
    return {
        userInfo:{
        adress: "",
        payment: "",
    },
        msg: 'Checkout',
        changeField: true,
        adress: "",
        payment: "",
        location: "",
    }
  },
  methods: {
    //Ändra adress och betalsätt
    writeAdress: function () {
    let info = {adress: this.adress, payment: this.payment, state: 'proccessing'}
    if(auth.currentUser) { 
    db.ref('users/' + auth.currentUser.uid + '/informationen/').set(info).catch(error => {
      console.log(error.message)
    });
    this.userInfo = info;
    } else {
    console.log("no user?");
    }
    },

  }
}
</script>

<style scoped lang="scss">
.changeInput {

  display: none;

}
.information {
  text-align: left;
  margin: 5%;
  box-shadow: 2px 3px grey;
}
img {
  width: 50px;
}
@media only screen and (min-width: 992px) {
.information {
  width: 70%;
  margin: auto;
  margin-bottom: 5%;
}
input {
  margin: 5px;
  width: 50%;
  height: 45px;
  font-size: 20px;
}
section {
  width: 70%;
  margin: auto;
}
.logos {
  width: 20px;
  }
}
</style>
