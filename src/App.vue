<template>
  <div id="app">
    <header>
    <h1>{{ msg }}</h1>
    </header>
    <router-view> </router-view>
    <app-navbar></app-navbar>
  </div>
</template>

<script>
import Profiles from "./components/Profiles";
import Cart from "./components/Cart";
import Soups from "./components/Soups";
import Navbar from "./components/Navbar";

export default {
  components: {
    "app-profile": Profiles,
    "app-cart": Cart,
    "app-soups": Soups,
    "app-navbar": Navbar,
    },
  name: 'app',
  data () {
    return {
      msg: 'Souperb',
    }
  }
}
</script>

<style lang="scss">

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 40px;
  text-align: center;
}
h1 {
  color: rgb(116, 179, 137); 
}
ul {
  list-style-type: none;
  padding: 0;
}
a {
  text-decoration: none;
  color: black;
}
input {
  width: 90%;
  height: 85px;
  font-size: 40px;
  border-radius: 25px;
}
.flex {
  display: flex;
  justify-content: space-between;
}
.logos {
  width: 40px;
}
.bold {
  font-weight: bold;
}
p {
  padding: 0;
  margin: 0;
}
//knappar 
.green-btn {
  border-radius: 15px;
  background-color: green;
  width: 60%;
  padding: 3%;
  font-size: 30px;
  color: white;
  margin-bottom: 20px;
}
.changeBtn {
  background: none;
  border: none;
  color: green;
  font-size: 30px;
  padding-left: 80%;
  font-weight: bold;
}
.delete-Btn {
  margin: auto;
  width: 55px;
  background-color: none; 
  border: none;
  img {
    width: 50px;
  }
}
.signout-btn {
  margin-top: 20%;
  margin-bottom: 20%;
  border-radius: 15px;
  background-color: red;
  width: 30%;
  padding: 3%;
  font-size: 30px;
  color: white;
}
  .padding {
    padding-bottom: 30%;
}
@media only screen and (min-width: 992px) {
  #app {
    font-size: 25px;
  }
  nav {
    padding: 0;
    margin: 0;
}
  .green-btn {
    width: 50%;
    font-size: 20px;
    padding: 5px;
    margin: auto;
  }
  .padding {
    padding-bottom: 10%;
}
  .signout-btn {
    padding: 0%;
}
  h1 {
    font-size: 20px;
}
 .logos {
    width: 20px;
  }
}
</style>
