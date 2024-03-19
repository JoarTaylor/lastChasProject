import { createApp, h, provide } from "vue";
import App from "./App.vue";
import "./style.css";

import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client/core";
import { ApolloClients } from "@vue/apollo-composable";
import { createPinia } from "pinia";

const link = createHttpLink({ uri: "http://localhost:3000/graphql" });

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

const app = createApp({
  setup() {
    provide(ApolloClients, {
      default: apolloClient,
    });
  },
  render: () => h(App),
});
const pinia = createPinia();
app.use(pinia);

app.mount("#app");
