import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
import auth from "../auth";
import router from "../router";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    categories: [],
    products: [],
    productsToCart: [],
    newUser: [],
    agreedToPrivacy: false,
    isAuth: false,
    snackBar: false,
    // getItem: [],
  },
  getters: {
    getproductsToCart: (state) => state.productsToCart,
    getProducts: (state) => state.products,
    getUser: (state) => state.user
  },
  mutations: {
    ADD_TO_CART(state, productsToCartAdd) {
      state.productsToCart = productsToCartAdd;
    },
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    REGISTER_USER(state, newUser) {
      let userRegister = state.newUser.concat(newUser);
      state.newUser = userRegister;
      window.localStorage.newUser = newUser = JSON.stringify(newUser);
    },
    INIT_STORE(state) {
      if (localStorage.getItem("agreedToPrivacy")) {
        state.agreedToPrivacy = true;
      }
    },
    IS_AUTH(state, status) {
      state.isAuth = status;
    },
    // GET_ITEM(state, getItemId) {
    //   state.getItem = getItemId;
    // },
    SNACK_BAR(state, snackOk) {
      state.snackBar = snackOk;
    },
  },
  actions: {
    async registerApp({ commit }, payload) {
      try {
        await auth.register(payload);
        commit("REGISTER_USER", payload);
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
    },
    async loginApp({ commit }, payload) {
      try {
        await auth.login(payload);
        const user = {
          email: this.email,
        };
        auth.setUserLogged(user);
        commit("LOGIN_USER", payload);
        router.push("/dashboard");
      } catch (error) {
        console.log(error);
      }
    },
    async logOut({ commit }) {
      try {
        await auth.deleteUserLogged();
        const user = {
          email: this.email,
        };
        auth.setUserLogged(user);
        commit("LOGIN_USER", user);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
    async addToCart({ commit }, id) {
      try {
        const { data } = await axios.post("https://fakestoreapi.com/carts", id);
        commit("ADD_TO_CART", [data.products, ...this.state.productsToCart]);
      } catch (error) {
        alert(error);
        console.log(error);
      }
    },
    async fetchProducts({ commit }) {
      try {
        const data = await axios.get("https://fakestoreapi.com/products");
        commit("SET_PRODUCTS", data.data);
      } catch (error) {
        alert(error);
        console.log(error, "error");
      }
    },
  },
  modules: {},
});
