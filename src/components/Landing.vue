<template>
  <div class="padding">
    <!-- <h3> Välkommen till souperb </h3> -->
    <h1> Välkommen till <br>Souperb</h1>
    <img src="../assets/utensil-spoon.svg" class="company-logo"/>
    <input v-model="location" type="text" placeholder="Adress" v-on:keyup.13="submit">
    <h3>{{ msg }}</h3>
    <a href="Profiles"> Har du redan ett konto? </a>
  </div>
</template>

<script>
export default {
 
  data () {
    return {
      msg: 'Fyll i din adress för att se om vi kan leverera till dig',
      location: " ",
    }
  },
  methods: {
    // Kollar om adressen är korrekt ifylld
    submit: function() {
    if(this.location != " ") { 
    window.location = 'Soups';
    localStorage.setItem("chosenLocation", JSON.stringify(this.location));   
    } else {
        this.msg = " Något verkar ha gått fel  "
    }
    }
  }
}
</script>

<style scoped lang="scss">
input {
  margin: 5%;
  width: 90%;
  height: 100px;
  border: solid grey 1px;
  font-size: 30px;
}
.company-logo {
  width: 90px;
  padding: 5%;
}
h1 {
  color: rgb(10, 88, 10);
}
a {
  text-decoration: underline;
}
@media only screen and (min-width: 992px) {
.company-logo {
  padding: 0;
}
  input {
  margin: 5%;
  width: 90%;
  height: 50px;
  border: solid grey 1px;
}

}
</style>
