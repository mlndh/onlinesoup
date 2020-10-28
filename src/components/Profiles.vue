<template>
<div class="padding">
    <div class="flex"> 
    <a href="Soups"> 
    <img src="../assets/chevron-left.svg" class="logos"/></a>

    <a href="Help"><img src="../assets/question.svg" class="logos"/></a>
      </div> 


<h1> {{ title }} </h1> 
  
<section :class="{ toggle: loggedIn }">
<p> Inloggad som {{ user }}</p>
<div :class="{toggle: changeField}"> 
<span @click="changeField = !changeField" :aria-pressed="changeField ? 'true' : 'false'">&times;</span><br>

  <input type="text" v-model="adress" placeholder="Adress" id="adress"> <br>
  <input type="text"  v-model="payment" placeholder="Betalmedel" id="payment"> <br>
  <!-- <input type="submit" value="Uppdatera uppgifter" id="changeBtn"> -->
</div>
<p class="bold">Adress<br> <img src="../assets/home.svg" class="img"/>{{ userInfo.adress }} <br><button class="changeBtn" @click="changeField = !changeField" :aria-pressed="changeField ? 'true' : 'false'" v-on:click="writeAdress">ÄNDRA</button><br>
</p>
<p class="bold">Betalmetod<br><img src="../assets/credit-card.svg" class="img"/> {{ userInfo.payment }} <br> <button class="changeBtn" @click="changeField = !changeField" :aria-pressed="changeField ? 'true' : 'false'" v-on:click="writeAdress">ÄNDRA</button><br>
</p>
</section>

  <div :class="{ toggle: loggedOut }"> 
  <input type="text" v-model="email" placeholder="Användarnamn" id="signInName"> <br>
  <input type="password"  v-model="password" placeholder="Lösenord" id="signInPassw"> <br>
  <input type="submit" class="green-btn" value="Logga in" id="signInBtn" v-on:click="signIn">
  <input type="submit"  class="green-btn"  value="Skapa konto" id="registerInBtn" v-on:click="signUp">

  </div>
  <div :class="{ toggle: loggedIn }"> 
    
  <br><div style=" background-image: url(../assets/check.svg); border: solid green 1px; width: 100px; margin: auto; padding: 15px; background-color: green; color: white; border-radius: 50px;" v-if="this.feedback">{{feedback}}
    
   </div><br>
  <button class="green-btn" @click="invite = !invite" :aria-pressed="invite ? 'true' : 'false'" ><p>TIPSA EN VÄN</p></button><br>
</div> 
<div :class="{toggle: invite}" id="invite">
  Fyll i din väns mejladress
  <span @click="invite = !invite" :aria-pressed="invite ? 'true' : 'false'">&times;</span><br>
 
  <input type="text">
  <button @click="giveFeedback" class="green-btn"> BJUD IN </button>

</div>
{{error}}
  <input class="signout-btn" :class="{ toggle: loggedIn }" type="submit" value="Logga ut" id="registerInBtn" v-on:click="signOut">
<br><br>
  </div>
</template>

<script>
import { auth } from '../firebase'
import { db } from '../firebase'

export default {
  created() {
     auth.onAuthStateChanged(firebaseUser => {
          if(firebaseUser) {
            this.loggedIn = false;
            this.loggedOut = true;
            this.user = firebaseUser.email;

            db.ref('/users/' + auth.currentUser.uid + '/informationen/').once('value',(snap)=>{
            this.userInfo = snap.val();
           
if (localStorage.getItem('localOrder')) {
let order = JSON.parse(localStorage.getItem('localOrder'));

let newPostKey = db.ref('users/' + auth.currentUser.uid + '/').child('orders/').push().key;
db.ref('users/' + auth.currentUser.uid + '/orders/'+ newPostKey).set(order).catch(error => {
console.log(error.message)
});
localStorage.removeItem('localOrder');
window.location = 'Cart';
}

});
if (this.loginAction) {
  window.location = 'Soups';
  }
} else {
this.loggedIn = true;
this.loggedOut = false;
}
});
  },

data() {
    return {
    userInfo:{
        adress: "Loading",
        payment: "Loading",
    },
    email: "",
    password: "",
    title: "Profil",
    loggedIn: true,
    loggedOut: false,
    user: " ",
    adress: " ",
    payment: " ",
    changeField: true,
    invite: true,
    loginAction: false,
    feedback: "",
    error: "",
    }
  },

methods: {
  //Logga in
   signIn: function() {
    auth.signInWithEmailAndPassword(this.email, this.password).catch((error) =>  {
        this.loginAction = true;
        this.error = error.message;
    })},
    //Logga ut
  signOut: function() {
      this.loggedIn = true;
      auth.signOut();
      console.log("utloggad");
   
    },
    //Registrera ny användare
    signUp: function() {
    auth.createUserWithEmailAndPassword(this.email, this.password).catch((error) =>  {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error.message)
         this.error = error.message;
        
      });
      this.loginAction = true
     
    
    },
    //Bjud in vän
      giveFeedback: function() {
      this.feedback = "Vän inbjuden" 
      this.invite = true;
    }

    },
    computed: {
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

<style scoped lang="scss"> // scoped för att endast styla berörd fil
.toggle {
  display: none;
}
.flex {
  display: flex;
}
.row {
  flex-direction: row;
}
.column {
  flex-direction: column;
}

section {
  text-align: left;
}
.img {
  width: 50px;
}

#invite {
  color: red;
  position: fixed;
  top: 50%;
  left:15%;
  background-color: rgb(180, 172, 161);
  padding: 40px;
  width: 60%;
}
.check {

  padding: 100px;

}
@media only screen and (min-width: 992px) {
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
.logos  {
  width: 20px;
}
}
</style>