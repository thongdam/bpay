<template>
  <v-app-bar app color="green" dense dark>
    <v-toolbar-title>AUTO DEBIT FOR ADMIN</v-toolbar-title>
    <v-spacer></v-spacer>
    <span>{{ $store.getters["username"] | uppercase }}</span>
    <v-btn icon @click="onClickLogOff">
      <v-icon>mdi-export</v-icon>
    </v-btn>
  </v-app-bar>
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
