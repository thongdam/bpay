<template>
  <v-app>
    <Menu v-if="$store.state.isLogged" />
    <Content />
  </v-app>
</template>

<script>
import Menu from "@/components/core/Menu";
import Content from "@/components/core/Content";
export default {
  name: "App",
  components: {
    //Header,
    Menu,
    Content,
  },
  data() {
    return {
      drawer: false,
    };
  },

  mounted() {
    this.$store.dispatch({ type: "restoreLogin" });
  },

  methods: {},
};
</script>
<style lang="scss" scoped></style>
