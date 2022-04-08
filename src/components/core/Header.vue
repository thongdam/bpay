<template>
  <div>
    <v-app-bar app color="green" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>ADMIN FOR AUTO DEBIT</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>{{ $store.getters["username"] | uppercase }}</span>
      <v-btn icon @click="onClickLogOff">
        <v-icon>mdi-export</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: "BpayHeader",

  data() {
    return {};
  },
  methods: {
    onClickLogOff() {
      this.$router.push("/");
      this.$store.dispatch("doLogout");
    },
  },
};
</script>

<style lang="scss" scoped></style>
