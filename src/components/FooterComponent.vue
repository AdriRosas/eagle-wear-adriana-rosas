<template>
  <v-footer class="footer" padless="false" color="#000">
    <div class="cont-footer">
      <div class="logo-sps">
        <v-img src="../assets/SPS_blanco.png" alt="sps-logo" />
      </div>
      <div class="date">
        {{ new Date().getFullYear() }} — <strong>Adriana Rosas</strong>
      </div>
    </div>
  </v-footer>
</template>
<style>
.footer {
  padding: 1.5rem;
  display: flex;
  justify-content: center;
}
.cont-footer {
  width: 80%;
  border: 2px solid rgb(0, 0, 0);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo-sps {
  width: 80px;
}
.date {
  color: #fff;
}
</style>
