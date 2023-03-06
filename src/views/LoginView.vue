<template>
  <div class="register-cont d-flex justify-center align-center">
    <v-card
      width="50%"
      color="transparent"
      class="d-flex flex-column align-center"
      elevation="0"
    >
      <v-card
        color="transparent"
        class="d-flex flex-column align-center"
        elevation="0"
      >
        <div class="logo-r">
          <v-img src="../assets/logo-eagle.png" />
        </div>
        <p class="mt-3">INICIA SESION</p>
      </v-card>
      <v-card color="transparent" class="form" width="50%" elevation="0">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            outlined
            dense
            v-model="name"
            :rules="nameRules"
            label="Nombre"
            required
            color="#000000"
          ></v-text-field>

          <v-text-field
            outlined
            dense
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            color="#000000"
          ></v-text-field>
          <v-text-field
            outlined
            dense
            label="Password"
            v-model="password"
            :rules="nameRules"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showPass ? 'text' : 'password'"
            @click:append="showPass = !showPass"
            required
            color="#000000"
          ></v-text-field>

          <v-btn
            width="100%"
            tile
            dark
            color="#000000"
            class="tex-white"
            :disabled="!valid"
            @click="validate"
          >
            Ingresar
          </v-btn>
        </v-form>
      </v-card>
    </v-card>
  </div>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    name: "",
    nameRules: [(v) => !!v || "*Este campo es requerido"],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "*Ingresa un correo válido",
    ],
    password: "",
    showPass: false,
  }),

  methods: {
    validate() {
      this.$refs.form.validate();
    },
  },
};
</script>

<style>
.register-cont {
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: rgb(234, 234, 236);
  background: radial-gradient(
    circle,
    rgba(234, 234, 236, 1) 0%,
    rgba(193, 201, 209, 1) 54%,
    rgba(173, 176, 180, 1) 100%
  );
}
.logo-r {
  width: 200px;
}
.v-text-field--outlined.v-input--dense .v-label {
  top: 10px;
}
.v-input .v-label {
  height: 20px;
  line-height: 20px;
  letter-spacing: normal;
  padding-left: 16px !important;
}
</style>
