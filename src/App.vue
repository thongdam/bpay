<template>
  <v-app class="application">
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
<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@200;300;400;500&display=swap');
.v-application {
  font-family: 'Noto Sans Lao', sans-serif !important;
};
</style>