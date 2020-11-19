<template>
  <div class="table">
    <vueheader />
    <body>
      <div>
        <vueinput placeholder="Şehriniz" inputref="input" />
        <vuebutton @click="getCityWeather()" titleButton="Ara" />

        <input type="text" ref="input" value="istanbul" />
        <button @click="getCityWeather()">Button</button>
      </div>

      <ul class="citiesList">
        <li
          class="citiesItems"
          v-for="city in cityList"
          :key="city.id"
          @click="getCityWeatherForecast(city.id)"
        >
          <h3 class="cityNameTitle">
            Weather in {{ city.name }}, {{ city.sys.country }}
            <!-- <img
              :src="
                `http://openweathermap.org/images/flags/${city.sys.toLowerCase(
                  country
                )}.png`
              "
            /> -->
            <!--TR olarak geldiğinden hata veriyor. tr gelmesi lazım -->
          </h3>
          <h3 class="cityTempTitle">
            <img
              src="https://openweathermap.org/img/wn/01n@2x.png"
              alt="01n@2x.png"
              class="circleImg"
              width="50"
              height="50"
            />
            {{ city.main.temp }} °C
          </h3>

          <div class="rTable">
            <div class="rTableRow">
              <p class="rTableCell">Hava Durumu</p>
              <p class="rTableCell">{{ city.weather[0].description }}</p>
            </div>
            <div class="rTableRow">
              <p class="rTableCell">Temperature</p>
              <p class="rTableCell">{{ city.main.temp }} °C</p>
            </div>
            <div class="rTableRow">
              <p class="rTableCell">Min-Temp</p>
              <p class="rTableCell">{{ city.main.temp_min }} °C</p>
            </div>
            <div class="rTableRow">
              <p class="rTableCell">Max-Temp</p>
              <p class="rTableCell">{{ city.main.temp_max }} °C</p>
            </div>
            <div class="rTableRow">
              <p class="rTableCell">Feels Like</p>
              <p class="rTableCell">{{ city.main.feels_like }} °C</p>
            </div>
            <div class="rTableRow">
              <p class="rTableCell">Pressure</p>
              <p class="rTableCell">{{ city.main.pressure }} hpa</p>
            </div>
            <div class="rTableRow">
              <p class="rTableCell">Humidity</p>
              <p class="rTableCell">{{ city.main.humidity }}%</p>
            </div>
            <div class="rTableRow">
              <p class="rTableCell">Wind</p>
              <p class="rTableCell">
                Speed: {{ city.wind.speed }}, Degrees:{{ city.wind.deg }}
              </p>
            </div>
            <div class="rTableRow">
              <p class="rTableCell">Geo Coords</p>
              <p class="rTableCell">
                Longitude: {{ city.coord.lon }}, Latitude: {{ city.coord.lat }}
              </p>
            </div>
            <div class="rTableRow">
              <p class="rTableCell">Sunrise</p>
              <p class="rTableCell">{{ new Date(city.sys.sunrise * 1000) }}</p>
            </div>
            <div class="rTableRow">
              <p class="rTableCell">Sunset</p>
              <p class="rTableCell">{{ new Date(city.sys.sunset * 1000) }}</p>
            </div>
          </div>
        </li>
      </ul>

      <div v-if="cityForecast">
        <h3 class="cityNameTitle">
          Hourly weather and forecasts in {{ cityWeatherForecast.city.name }}
          {{ cityWeatherForecast.city.country }}
        </h3>
        <ul class="cityList">
          <li
            class="cityItems"
            v-for="weather in cityWeatherForecast.list"
            :key="weather.dt"
          >
            <div class="sTable">
              <div class="sTableRow">
                <p class="sTableCell">{{ weather.dt_txt }}</p>
                <div class="sTableCell">
                  <span class="temp">{{ weather.main.temp }} °F</span>
                  <span class="weatherDesc">
                    {{ weather.weather[0].description }}</span
                  >
                  <br />
                  <span>{{ weather.wind.speed }}, m/s </span>
                  <span>clouds: {{ weather.clouds.all }}%, </span>
                  <span>{{ weather.main.pressure }} hpa</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </body>
    <vuefooter />
  </div>
</template>

<script>
import axios from "axios";
import VueButton from "@/components/VueButton.vue";
import VueInput from "@/components/VueInput.vue";
import VueHeader from "@/components/VueHeader.vue";
import VueFooter from "@/components/VueFooter.vue";

export default {
  components: {
    vuebutton: VueButton,
    vueinput: VueInput,
    vueheader: VueHeader,
    vuefooter: VueFooter
  },
  data() {
    return {
      cityForecast: false,
      cityList: [],
      cityWeatherForecast: [],
      cityName: "London",
      selectedCity: "City"
    };
  },
  methods: {
    getCityList() {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/group?id=745044,323786,740481,296562,2643743&units=metric&appid=${process.env.VUE_APP_API_KEY}`
        )
        .then(response => {
          // handle success
          console.log("getCityList()", response);

          this.cityList = response.data.list;
        })
        .catch(error => {
          // handle error
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    },
    getCityWeatherForecast(cityId) {
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/forecast?id=${cityId}&appid=${process.env.VUE_APP_API_KEY}`
        )
        .then(resp => {
          // handle success
          console.log("getCityWeatherForecast()", resp);

          this.cityWeatherForecast = resp.data;
        })
        .catch(error => {
          // handle error
          console.log(error);
        })
        .then(() => {
          // always executed
          this.cityForecast = !this.cityForecast;
        });
    },
    getCityWeather() {
      this.cityName = this.$refs.input.value;
      console.log(this.cityName);
      axios
        .get(
          `http://api.openweathermap.org/data/2.5/weather?q=${this.cityName}&appid=${process.env.VUE_APP_API_KEY}`
        )
        .then(resp => {
          // handle success
          console.log(resp);

          this.wantedCityWeather = resp.data;
        })
        .catch(error => {
          // handle error
          console.log(error);
        })
        .then(() => {
          // always executed
        });
    }
  },
  beforeMount() {
    this.getCityList();
  }
};
</script>

<style lang="scss">
.table {
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.citiesList {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  padding: 0;
}

.citiesItems {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: left;
  margin: 5px;
}

.cityNameTitle {
  font-family: Oswald, sans-serif;
  font-size: 24px;
  color: #505050;
}

.cityTempTitle {
  font-family: Oswald, sans-serif;
  font-size: 30px;
  color: #505050;
}

.circleImg {
  vertical-align: middle;
}

.rTable {
  display: table;
  width: 100%;
}

.rTableRow {
  display: table-row;
}

.rTableRow:nth-child(2n) {
  background-color: #ddd;
}

.rTableCell {
  display: table-cell;
  padding: 3px 10px;
  border: 1px solid #b4b4b4;
}

.cityList {
  list-style-type: none;
  padding: 0;
}

.cityItems {
  text-align: left;
  justify-content: center;
  align-items: center;
}

.sTable {
  // display: table;
  font: 400 14px/1.3 Roboto, Arial, sans-serif;
}

.sTableRow {
  display: table-row;
}

.sTableCell {
  width: 250px;
  display: table-cell;
  padding: 5px 10px;
  border-bottom: 1px solid #b4b4b4;
}

.temp {
  background-color: #4e4d4a;
  color: #fff;
  border-radius: 10px;
  font-size: 75%;
  vertical-align: top;
  padding: 3px 5px;
  text-align: center;
  font-weight: 700;
}

.weatherDesc {
  font-style: italic;
}
</style>
