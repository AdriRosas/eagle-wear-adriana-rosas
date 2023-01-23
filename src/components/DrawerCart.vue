<template>
  <div class="d-flex flex-column cont-product">
    <v-btn
      style="overflow: hidden"
      color="#B20000"
      icon
      small
      @click.stop="drawerCart = !drawerCart"
    >
      <v-icon small>mdi-cart</v-icon>
    </v-btn>
    <v-navigation-drawer
      right
      v-model="drawerCart"
      class="draw-cart"
      absolute
      temporary
      width="50%"
      height="100vh"
      style="z-index: 100"
    >
      <div class="close-cart">
        <v-btn icon @click="drawerCart = false"
          ><v-icon color="#C00000">mdi-close</v-icon></v-btn
        >
      </div>
      <div class="cart-container">
        <v-card class="alert" v-model="alertDelete" v-if="alertDelete === true">
          <p>Seguro que deseas eliminar este artículo?</p>
          <div class="d-flex">
            <v-btn outlined text class="alert-no" @click="alertDelete = false"
              >cancelar</v-btn
            >
            <v-btn
              outlined
              text
              class="alert-ok"
              @click="(alertDelete = false), deleteElement(carts)"
              >Ok</v-btn
            >
          </div>
        </v-card>
        <div class="header-cart">
          <div class="logo-cart"></div>
          <div class="total-items d-flex justify-center">
            <p>{{ cart.length }} artículos</p>
          </div>
        </div>

        <v-list nav dense fixed class="list-cart">
          <v-list-item-group
            v-model="group"
            active-class="deep-purple--text text--accent-4"
            v-for="(carts, index) in cart"
            :key="index"
            class="list-cart-group"
          >
            <v-list-item class="item">
              <v-card
                class="d-flex align-center pa-2"
                width="100%"
                height="100%"
                elevation="0"
              >
                <div
                  class="img-item d-flex align-center justify-center"
                  :style="`background-image: url(${carts[0].image})`"
                ></div>
                <div class="d-flex flex-column justify-center">
                  <p class="title-item">{{ carts[0].title }}</p>
                  <div class="d-flex justify-end mt-3" style="width: 100%">
                    <p class="price-item">$ {{ carts[0].price }} USD</p>
                  </div>
                </div>
              </v-card>
            </v-list-item>
            <v-divider></v-divider>
          </v-list-item-group>
        </v-list>
        <div class="total">
          <h3>{{ cart.lenght === 0 ? "0" : "Total: $" + total }}</h3>
        </div>
        <div class="pay pa-3">
          <v-btn width="100%" tile dark color="#000000" class="tex-white"
            >PAGAR</v-btn
          >
        </div>
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  data: () => ({
    drawerCart: null,
    group: null,
    itemsCount: "",
    alertDelete: false,
  }),
  computed: {
    ...mapState({
      cart: (state) => state.productsToCart,
    }),
    ...mapGetters(["getUser"]),
    showUser() {
      return this.getUser[0];
    },
    // A computed property that is used to calculate the total price of the items in the cart.
    total() {
      let total = 0;
      for (let carts of this.cart) {
        total += carts[0].price;
      }
      return total;
    },
  },
  methods: {
    alertDeleteMessage() {
      this.alertDelete = true;
    },
    // Deleting the item from the cart.
    deleteElement(index) {
      this.$store.state.productsToCart.splice(index, 1);
      localStorage.setItem(
        "carts",
        JSON.stringify(this.$store.state.productsToCart)
      );
    },
  },

};
</script>

<style>
.cart-container {
  width: 100% !important;
  height: 100vh;
  display: flex !important;
  flex-direction: column !important;
}
.draw-cart {
  width: 50vw !important;
}
.alert {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  background-color: #000 !important;
}
.alert p {
  color: #fff;
}
.alert-no {
  border: 2px solid #fff !important;
  color: #fff !important;
  text-transform: capitalize;
  margin-right: 2rem;
  margin-top: 1rem;
}
.alert-ok {
  color: #c00000 !important;
  text-transform: capitalize;
  margin-top: 1rem;
}
.close-cart {
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-right: 2rem;
}
.header-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.logo-cart {
  width: 100%;
  height: 10vh;
  background-image: url("../assets/logo-eagle.png");
  background-size: 60px;
  background-position: center;
}
h5 {
  font-size: 1.8rem;
}
.list-cart {
  width: 100%;
  height: 60vh;
}
.total-items {
  width: 100%;
}

.card-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
.cont {
  margin-left: 1rem;
  width: 90%;
}
.title-item {
  font-size: 16px;
  font-weight: bold;
}
.price-item {
  font-size: 18px;
}

.img-item {
  width: 15vw;
  height: 15vh;
  background-size: contain;
  background-position: center;
}
.total {
  width: 100%;
  height: 3rem;
  padding: 2rem 2rem 5rem 0 !important;
  display: flex;
  justify-content: flex-end;
}
@media (max-width: 700px) {
  .img-nav {
    width: 100px;
  }
  .info-btns {
    width: 20vw;
  }
  .name {
    display: none;
  }
  .drawer {
    width: 100% !important;
  }
  .card-item {
    padding: 1rem;
  }
  .cont {
    margin-left: 1rem;
    width: 80% !important;
  }
  .img-item {
    width: 80px !important;
    height: 80px !important;
    margin-right: 1rem;
  }
  .title-item {
    inline-size: 100px !important;
    overflow-wrap: normal !important;
    width: 100% !important;
    font-size: 12px;
  }
  .price-item {
    font-size: 14px;
  }
  .draw-cart {
    width: 100vw;
  }
  .total {
    padding: 0rem 1rem 2rem 0 !important;
  }
}
</style>
