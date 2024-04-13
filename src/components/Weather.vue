<template>
  <div id="wrapper" :class="{ weathers: !isWarm(), warm: isWarm() }">
    <h1>Weather Forecast</h1>
    <main>
      <div class="search_box">
        <input
          type="text"
          class="search_query"
          placeholder="Search for Weather ....."
          v-model="search"
        />
        <button v-on:click="getSearchWeather" class="btn">SEARCH</button>
      </div>
      <div class="wrap">
        <div v-if="searchWeather" class="weather_location">
          <div class="location">
            {{ searchWeather.name }}, {{ searchWeather.sys.country }}
          </div>
          <div class="date">{{ new Date() }}</div>
          <div id="temp">{{ Math.round(searchWeather.main.temp) }} °C</div>
          <div class="weather">{{ searchWeather.weather[0].main }}</div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from "axios";
import { db } from "../firebase/firebaseinit";


export default {
  name: "Weather",
  data() {
    return {
      api_key: "76f54e69ba9526a937179c205605f40d",
      search: "riyadh",
      cities: [],
      searchWeather: null,
    };
  },

  // created() {
  //  this.getCityWeather();

  // },
  mounted() {
    this.getSearchWeather();
    
  },

  methods: {
     getCityWeather () {
      let firebaseDB = db.collection('cities');
      firebaseDB.onSnapshot((snap) => {
        snap.docChanges().forEach( async doc => {
          console.log(doc.doc.data());
        });
      });
    },

                    
    async getSearchWeather() {
      if (this.search.trim() !== "") {
        try {
          let res = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.search}&appid=${this.api_key}`
          );
          
          this.searchWeather = res.data;
          console.log(this.searchWeather);
        } catch (error) {
          console.log("Error fetching data:", error);
        }
      }
    },
    isWarm() {
      return (
        this.searchWeather && Math.round(this.searchWeather.main.temp) > 280
      );
    },
  },
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#wrapper {
  background-size: cover;
  max-width: 500px;
  margin: auto;
  background-position: bottom;
  transition: 0.5s;
}
.weathers {
  background-image: url("../assets/weather.jpg");

}

.btn {
  margin-top: 20px;
  padding: 10px 10px;
}

.warm {
  background-image: url("../assets/warm.jpg");
  background-repeat: no-repeat;
}

/* #wrapper .warm {
  background-image: url('../assets/warm.jpg');
} */

.wrapper h1 {
  color: burlywood;
  padding-top: 10px;
}
main {
  min-height: 70vh;
  padding: 25px;
  background-image: linear-gradient(
    to bottom,
    rgba (0, 0, 0, 0.25),
    rgba (0, 0, 0, 0.75)
  );
}
.search_box {
  width: 100%;
  margin-bottom: 30px;
}
.search_box .search_query {
  display: block;
  width: 100%;
  padding: 15px;
  color: #313131;
  border: none;
  outline: none;
  appearance: none;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px 0px 10px 0px;
  /* background:skyblue; */
}
.search_box .search_query:focus {
  background-color: rgba(255, 255, 255, 0.75);
}
.weather_location .location {
  color: white;
  font-size: 32px;
  font-weight: 500;
}
.weather_location .date {
  color: white;
  font-size: 20px;
  font-weight: 500;
  font-style: italic;
}
.weather_location #temp {
  background-color: rgba(255, 255, 255, 0.25);
  display: inline-block;
  padding: 20px 35px;
  color: white;
  border-radius: 10px 0px 10px 0;
  margin: 5px;
  box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  /* border: 1px solid black; */
}

.weather_location .weather {
  color: white;
  font-size: 24px;
  font-weight: 500;
  font-style: italic;
}
</style>
