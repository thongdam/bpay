<template>
  <div>
    <v-app-bar app color="danger" dense dark>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>B-pay</v-toolbar-title>
      <v-spacer></v-spacer>
      <span>Username </span>
      <v-btn icon>
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

  mounted() {},

  methods: {},
};
</script>

<style lang="scss" scoped></style>
