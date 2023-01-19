<template>
  <div class="d-flex-flex-column dash-container">
    <div class="product-cont">
      <v-alert shaped dense dark type="success" v-if="getSnack">
        Se agregó con éxito
      </v-alert>
      <div class="a-z d-flex align-center">
        <div class="d-flex align-center justify-start search-cont">
          <div class="d-flex">
            <v-btn
              large
              icon
              v-on:click="ascending = !ascending"
              class="sort-button"
            >
              <v-icon large color="#C00000" small v-if="ascending"
                >mdi-sort-alphabetical-ascending-variant</v-icon
              >
              <v-icon large color="#C00000" small v-else
                >mdi-sort-alphabetical-descending-variant</v-icon
              >
            </v-btn>
          </div>
          <v-divider vertical class="mx-1"></v-divider>
          <div class="d-flex mr-2">
            <v-btn icon @click.stop="tools = !tools"
              ><v-icon>mdi-magnify</v-icon></v-btn
            >
          </div>
          <v-fade-transition leave-absolute>
            <v-card
              v-if="tools"
              class="tools-cont d-flex justify-space-between align-center"
              v-model="tools"
              width="100%"
              color="transparent"
              elevation="0"
            >
              <div class="search d-flex align-center mb-1">
                <v-text-field
                  full-width
                  dense
                  filled
                  label="Buscar..."
                  hide-details="auto"
                  v-model="searchValue"
                ></v-text-field>
              </div>
              <v-divider vertical></v-divider>
              <div class="slect-cont">
                <v-select
                  full-width
                  filled
                  v-model="sortBy"
                  :items="items"
                  attach
                  dense
                  chips
                  label="Filtrar por..."
                  multiple
                ></v-select>
              </div>
            </v-card>
          </v-fade-transition>
        </div>
      </div>
      <v-divider class="mt-3 mb-5"></v-divider>
      <v-row no-gutters>
        <v-col
          class="col"
          cols="12"
          sm="3"
          v-for="product in getProducts"
          :key="product.id"
        >
          <v-card
            class="ma-3 card-product d-flex flex-column justify-center"
            elevation="0"
          >
            <v-chip
              small
              class="mb-5"
              label
              :text-color="getTextColor(product.category)"
              :color="getColor(product.category)"
              width="2vw"
            >
              <v-icon left small :color="getTextColor(product.category)">
                mdi-label
              </v-icon>
              <p class="caption ma-0 pa-0 font-weight-bold">
                {{ product.category }}
              </p>
            </v-chip>
            <button @click="handleClick(product), (dialog = true)">
              <div
                class="cont-imgs"
                :style="`background-image: url(${product.image})`"
              ></div>
            </button>
            <v-dialog v-model="dialog" width="1000">
              <v-card
                tile
                class="d-flex flex-column pa-3"
                v-for="product in cartItem"
                :key="product.id"
              >
                <v-card-title class="d-flex justify-space-between">
                  <v-chip
                    small
                    class="mb-5"
                    label
                    :text-color="getTextColor(product.category)"
                    :color="getColor(product.category)"
                    width="2vw"
                  >
                    <v-icon left small :color="getTextColor(product.category)">
                      mdi-label
                    </v-icon>
                    <p class="caption ma-0 pa-0 font-weight-bold">
                      {{ product.category }}
                    </p>
                  </v-chip>
                  <v-btn icon @click="dialog = false"
                    ><v-icon>mdi-close</v-icon></v-btn
                  >
                </v-card-title>
                <div class="card-cont d-flex">
                  <div
                    class="cont-imgs-dialog"
                    :style="`background-image: url(${product.image})`"
                  ></div>
                  <div class="description d-flex flex-column">
                    <v-card-text>
                      <p class="name-card-dialog">{{ product.title }}</p>
                      <p class="price font-weight-bold">
                        ${{ product.price }} USD
                      </p>
                      <p class="name-card">{{ product.description }}</p>
                    </v-card-text>
                    <v-card-actions>
                      <v-btn
                        small
                        tile
                        elevation="0"
                        color="#9A0000"
                        outlined
                        class="submit add-cart-dialog"
                        @click="dialog = false"
                        >Añadir<v-icon x-small style="margin-left: 3px"
                          >mdi-cart</v-icon
                        ></v-btn
                      >
                    </v-card-actions>
                  </div>
                </div>
              </v-card>
            </v-dialog>

            <br />
            <p class="name-card pa-0 ma-0">{{ product.title }}</p>
            <p class="price font-weight-bold pa-0 ma-0">
              ${{ product.price }} USD
            </p>
            <v-btn
              small
              rounded
              elevation="0"
              color="#B20000"
              outlined
              class="submit add-cart mt-4"
              @click="handleClick(product)"
              >Añadir<v-icon x-small style="margin-left: 3px"
                >mdi-cart</v-icon
              ></v-btn
            >
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import DrawerCart from "../components/DrawerCart.vue";
export default {
  // components: { DrawerCart },
  data: () => ({
    searchValue: "",
    dialog: false,
    tools: false,
    ascending: true,
    items: ["categoría", "precio"],
    sortBy: ["category", "price"],
  }),
  created() {
    this.$store.dispatch("fetchProducts");
  },
  computed: {
    ...mapGetters(["getProducts", "getCategories"]),
    cartItem() {
      return this.$store.state.productsToCart[0];
    },
    getProducts() {
      let products = this.$store.getters.getProducts;

      // Process search input
      if (this.searchValue != "" && this.searchValue) {
        products = products.filter((item) => {
          return item.title
            .toUpperCase()
            .includes(this.searchValue.toUpperCase());
        });
      }

      // Sort by alphabetical order
      products = products.sort((a, b) => {
        if (this.sortBy == "alphabetically") {
          let fa = a.title.toLowerCase(),
            fb = b.title.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        } else if (this.sortBy === "price") {
          return a.price - b.price;
        } else if (this.sortBy === "category") {
          return a.price - b.price;
        }
      });

      // Show sorted array in descending or ascending order
      if (!this.ascending) {
        products.reverse();
      }

      return products;
    },
    getSnack() {
      return this.$store.state.snackBar;
    },
    itemDetail() {
      return this.$store.state.getItem;
    },
  },
  methods: {
    getColor(category) {
      switch (category) {
        case "women's clothing":
          return "#DAB7F7";
        case "electronics":
          return "#43B1A2";
        case "jewelery":
          return "#F29D80";
        case "men's clothing":
          return "#AF0208";
      }
    },
    getTextColor(category) {
      if (category == "men's clothing" || category == "electronics")
        return "#FFFFFF";
      else return "#000000";
    },
    handleClick(product) {
      const payload = {
        products: [
          {
            productId: product.id,
            quantity: 1,
            title: product.title,
            price: product.price,
            image: product.image,
            id: product.id,
            description: product.description,
            category: product.category,
          },
        ],
      };
      this.$store.dispatch("addToCart", payload);
      localStorage.setItem(
        "items",
        JSON.stringify(this.$store.state.productsToCart)
      );
    },
  },
  watch: {
    getSnack() {
      setTimeout(() => this.$store.commit("SNACK_BAR", false), 3000);
    },
  },
};
</script>

<style>
.dash-container {
  width: 100vw;
  padding-bottom: 10%;
}

.cont-product {
  overflow-y: auto !important;
}
.search-cont {
  width: 45%;
  margin-right: 2rem;
  /* background-color: gold; */
}
.v-select .v-select__details {
  display: none !important;
}
.v-text-field__details {
  display: none !important;
  flex: 1 0 auto;
  max-width: 100%;
  min-height: 14px;
  overflow: hidden;
}
.tools-cont {
  width: 90vw;
}
.product-cont {
  z-index: 90;
  padding: 1rem;
}
.card-product {
  padding: 1rem;
  border: 1px solid rgb(174, 174, 174) !important;
}
.name-card {
  text-align: center;
}
.cont-imgs {
  width: 100%;
  height: 50vh;
  background-size: contain;
  background-position: center;
}
.cont-imgs-dialog {
  width: 100%;
  height: 80vh;
  background-size: contain;
  background-position: center;
}
.description {
  margin-left: 1rem;
}
.name-card {
  text-align: left;
  font-size: 14px;
  height: 10vh;
}
.price {
  font-size: 18px;
}
.add-cart-dialog {
  width: 20vw;
}
.name-card-dialog {
  font-size: 1rem;
  font-weight: bold;
}
.v-label {
  font-size: 12px !important;
}
.v-text-field--filled.v-input--dense.v-text-field--single-line .v-label,
.v-text-field--full-width.v-input--dense.v-text-field--single-line .v-label {
  top: 20px !important;
  left: 5px !important;
}
</style>
