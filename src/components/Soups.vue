<template>
  <div class="padding"> 
      <div class="flex"> 
    <a href="/"> 
    <img src="../assets/chevron-left.svg" class="logos goBack"/></a>
    <p><img src="../assets/map-marker-alt.svg" class="logos"/> Plats: {{location}}</p>
    <a href="Help">
      <img src="../assets/question.svg" class="logos"/>
       </a>
      </div> 
    <aside>
      <h3> Få var sjätte soppa gratis </h3>
    </aside>
  <div>
  
<button class="filter-btn" v-on:click="drawList('Vegan')">Veganskt</button>
<button class="filter-btn" v-on:click="drawList('Lowcal')">Låg kalori</button>
<button class="filter-btn" v-on:click="drawList('Gluten')">Glutenfri</button>
<br>
</div>
    <ul>
   <li v-for="(item, index) in show" :key="item.index" class="center grow">
     <article :class="index==active ? 'popup' : ''" >
      <img :src="require('../assets/soppor/'+item.img)" v-on:click="clickedSoup(index)"/>
     <div class ="flex column">
      <div class ="flex row space">
      <p>{{ index }} </p>
     
      <p>{{ item.diet[0] }}</p>
      </div>
      <div class="flex row space">
      <p> <img src="../assets/clock.svg" class="logos"/> {{ item.prepTime }} min </p>
      <p>{{ item.cal}} kcal</p>
      
      </div>
      </div>
        <div v-if="active" class="flex center column"> 
          <span class="bold">Beskrivning:</span> <br>{{ item.soupDescription}}<br>
          <h4> {{ item.price}}kr</h4>
        <select v-model="selectedBread">
        <option disabled value="">Dryck</option>
        <option>Pepsi</option>
        <option>Loka</option>
        <option>Juice</option>
      </select><br>
        <select v-model="selectedDrink">
        <option disabled value="">Bröd</option>
        <option>Vallmo</option>
        <option>Fralla</option>
        <option>Surdeg</option>
      </select><br>
      <button v-on:click="chosenSoup(index)" class="green-btn"> LÄGG TILL I KUNDVAGN </button>
      </div>
      </article>
      </li> 
      </ul>
    </div>
</template>

<script>
import { auth } from '../firebase'
import { db } from '../firebase'
import firebase from '../firebase';

export default {
  created() {
  //Visar ifylld adress högst upp
  if (localStorage.getItem('chosenLocation')) {
    this.location = JSON.parse(localStorage.getItem('chosenLocation'));
    console.log(this.location)
  }
  //Filtrera sopporna
	db.ref('/Soups/').once('value',(snap)=>{
    this.test = snap.val();
    this.drawList('all');
  });

},
data() {
    return {
    test: {},
    show: {},
    title: "Tom kundvagn",
    selectedBread: "",
    breadPrice: 25,
    drinkPrice: 25,
    selectedDrink: "",
    active: '',
    filterDiet: 'all',
    location: ''
    }
},
computed: {
 
  },
methods: {
drawList: function (inData, filterType) {

  //Filtrerar sopporna
        if (this.filterDiet == inData) {
          this.filterDiet = 'all'
        } else {
          this.filterDiet = inData;
        }
          if(this.filterDiet=='all') {
                this.show = this.test;
              } else { this.show= {} //empty
                      for (var soup in this.test) {
                          if (this.test.hasOwnProperty(soup)) {
                              if(this.test[soup].diet[0] == this.filterDiet) {this.show[soup]=this.test[soup]}
                          }
                        }
                     }
},
  //Gör sopporna klickbara
clickedSoup: function(index) {
  if (this.active==index) {
  this.active = "";
  } else {
  this.active = index;
  }
  },
  // Tar vald soppa och skickar användare till kundvagnen
chosenSoup: function(index) {
    window.location = 'Cart'; 
  let order = {soup: index, bread:this.selectedBread, drinks:this.selectedDrink, price: this.test[index].price, bp:this.breadPrice, dp:this.drinkPrice , state: 'proccessing'}
  if(auth.currentUser) { 
    let newPostKey = db.ref('users/' + auth.currentUser.uid + '/').child('orders/').push().key;
    db.ref('users/' + auth.currentUser.uid + '/orders/'+ newPostKey).set(order).catch(error => {
  });
} else {
  // Spar vald soppa i localstorage om användaren inte är inloggad
  localStorage.setItem("localOrder", JSON.stringify(order));
  window.location = 'Profiles'; 
      console.log("funfunkar ej")
}
},
}
}

</script>
<style scoped lang="scss"> 
// flexbox
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
// knappar 

.filter-btn {
  border-radius: 150px;
  background-color: white;
  width: 30%;
  padding: 2%;
  border: solid grey 1px;
  box-shadow: 2px 3px grey;
  font-size: 30px;
}
.filter-btn:active {
  background-color: green;  
  }
article {
  border: solid grey 1px;
}
// text
p {
  margin: 15px;
  padding-left: 15%;
  padding-right: 15%; // funkar ej i desktop mode 
}
.popup {
  display: hidden;
  position: fixed;
  top: 5px;
  width: 82%;
  height: 100%;
  background-color: white;
  border: solid black 2px;
  padding-left: 7%;
  padding-right: 7%;
  p {
  border: solid black 1px;
  border-radius: 50px;
  border: none;
  background-color: rgb(192, 213, 231);
  padding-left: 0%;
  padding-right: 0%;
  padding: 20px;
  width: 175px;
  height: 50px;
  }

}
.details-soup {
  border: solid black 1px;
}
select {
padding: 30px;
font-size: 30px;
}
option {
font-size: 10px;
}
aside {
  background-color: rgb(228, 222, 222);
  height: 200px;
  padding-top: 5%;
  margin-bottom: 5%;
}

@media only screen and (min-width: 992px) {
 .logos {
    width: 20px;
  }
.filter-btn {
  width: 150px;
  font-size: 20px;
  padding: 5px;
}
article {
  font-size: 25px;
  p {
    margin: auto;
  }
  img {
    width: 55%;
  }
   .logos {
    width: 15px;
  }
}
.popup {
  padding: 15px;
  width: 99%;
  font-size: 15px;
  p {
    padding: 15px;
    height: 0px;
    background-color: white;
    margin-bottom: 14px;
  }
  img {
    width: 30%;
  }
    .logos {
    width: 15px;
  }
  select {
    padding: 0px;
    width: 50%;
    margin: auto;
    font-size: 15px;
  }
  option {
font-size: 15px;
}
}
}
</style>