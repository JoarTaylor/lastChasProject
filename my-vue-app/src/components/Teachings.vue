<template>
  <div class="vue-advanced-examples">
    <h1>{{ title }}</h1>
    <img v-bind:src="imageUrl" alt="Vue Logo" width="150" />

    <section>
      <h2>Sätt child värde</h2>
      <input style="width: 200px" type="text" @input="handleInput" />
      <h2>Dynamiska props</h2>
      <Child v-bind="childProps" />
    </section>

    <section>
      <h2>Event</h2>
      <button @click="incrementCount">Öka</button>
      <p>Nuvarande värde: {{ count }}</p>
      <Grandchild :onCount="count" @reset="resetCount" />
    </section>

    <section>
      <h2>Trigga watcher</h2>
      <input style="width: 200px" type="text" @input="changeMessage" />
    </section>

    <section>
      <h2>Computed value</h2>
      <p>Originalet: {{ message }}</p>
      <p>Caps: {{ uppercaseMessage }}</p>
      <p>Watcher: {{ watchLog }}</p>
    </section>

    <section>
      <h2>Reactivitet</h2>
      <p>Tid: {{ currentTime }}</p>
      <button @click="updateTime">Uppdatera</button>
      <p>Uppdaterad onMount: {{ fetchedData }}</p>
    </section>

    <section>
      <h2>API</h2>
      <p>Hämtad data: {{ apiData }}</p>
      <button @click="fetchApiData">Uppdatera</button>
    </section>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import Child from "./Child.vue";
import Grandchild from "./Grandchild.vue";

export default defineComponent({
  name: "stylings",
  components: {
    Child,
    Grandchild,
  },
  data() {
    return {
      title: "Lärandemål - Vue",
      imageUrl: "https://vuejs.org/images/logo.png",
      message: "placeholder",
      count: 0,
      currentTime: new Date().toLocaleTimeString(),
      fetchedData: "",
      apiData: null,
      watchLog: [],
    };
  },
  computed: {
    uppercaseMessage() {
      return this.message.toUpperCase();
    },
  },

  watch: {
    message(newValue, oldValue) {
      this.watchLog.push(`Changed from '${oldValue}' to '${newValue}'`);
    },
  },
  methods: {
    incrementCount() {
      this.count++;
    },
    resetCount() {
      this.count = 0;
    },
    changeMessage(e) {
      this.message = e.target.value;
    },

    updateTime() {
      this.currentTime = new Date().toLocaleTimeString();
    },
    handleInput(e) {
      this.childProps.message = e.target.value;
    },
    async fetchApiData() {
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon?limit=${
            Math.floor(Math.random() * 10) + 1
          }&offset=0`
        );
        const data = await response.json();
        this.apiData = data.results.slice(0, 5);
      } catch (error) {
        this.apiData = "Något gick fel";
      }
    },
  },
  async mounted() {
    await this.fetchApiData();
    this.fetchedData = "Data hämtat onMount!";
  },
  setup() {
    const childProps = reactive({
      message: "Dynamiskt props meddelande!",
    });
    return { childProps };
  },
});
</script>

<style scoped>
.vue-advanced-examples {
  font-family: Arial, sans-serif;
  padding: 20px;
}

section {
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

button {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #2a9a6f;
}
</style>
