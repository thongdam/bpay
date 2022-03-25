<template>
  <v-app>
    <Header v-if="$store.state.isLogged" />
    <Menu v-if="$store.state.isLogged" />
    <Content />
  </v-app>
</template>

<script>
import Header from "@/components/core/Header";
import Menu from "@/components/core/Menu";
import Content from "@/components/core/Content";
export default {
  name: "App",
  components: {
    Header,
    Menu,
    Content
  },
  data() {
    return {};
  },

  mounted() {
    this.$store.dispatch({ type: "restoreLogin" });
  },

  methods: {},
};
</script>
<style lang="scss" scoped></style>
