<template>
  <v-app>
    <!-- <v-app-bar app class="app-bar" fixed style="z-index: 100" elevation="1">
      <div>
        <div class="d-flex align-center elements-cont">
          <div class="d-flex align-center">
            <v-img
              alt="Eagle-Logo"
              class="shrink mr-2"
              contain
              src="./assets/logo-eagle-2.png"
              transition="scale-transition"
              width="160"
            />
          </div>

          <v-spacer></v-spacer>
          <div>
            <p class="name pa-0 ma-0">Hola,</p>
          </div>
          <v-divider vertical class="ml-4 mr-4 mt-2 mb-2"></v-divider>
          <div class="d-flex align-center mr-4">
            <v-icon color="#B20000" small class="mr-4"
              >mdi-white-balance-sunny</v-icon
            >
            <v-switch
              v-model="$vuetify.theme.dark"
              color="#B20000"
              inset
              dense
              class="pa-0 ma-0"
            >
            </v-switch>
            <v-icon color="#B20000" small>mdi-weather-night</v-icon>
          </div>
          <v-divider vertical class="ma-2"></v-divider>
          <DrawerCart />
        </div>
      </div>
    </v-app-bar> -->

    <v-main>
      <router-view />
    </v-main>
    <!-- <FooterComponent /> -->
  </v-app>
</template>

<script>
// import DrawerCart from "./components/DrawerCart.vue";
// import FooterComponent from "./components/FooterComponent.vue"
import { mapGetters } from "vuex";
export default {
  name: "App",
  data: () => ({}),
  // components: { DrawerCart, FooterComponent },
  computed: {
    ...mapGetters(["getUser"]),
    showUser() {
      return this.getUser[0];
    },
  },
  methods: {
    switchMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
  },
};
</script>

<style>
.app-bar {
  /* background-color: #fff; */
  transition: background 0.3s ease-in-out;
}
.dark .app-bar {
  background: #15202b;
}
.elements-cont {
  width: 95vw;
}
.v-application--is-ltr .v-messages {
  display: none !important;
}
.v-input__slot {
  margin-bottom: 4px;
  margin-right: 0px !important;
  padding: 0px !important;
}
</style>
