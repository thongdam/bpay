<template>
  <v-app class="application">
    <Menu v-if="$store.state.isLogged" />
    <Content  />
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
      events: ["click", "mousemove", "mousedown", "scroll", "keypress", "load"],
      warningTimer: null,
      logoutTimer: null,
      warningZone: false,
    };
  },
  mounted() {
    this.events.forEach(function (event) {
      window.addEventListener(event, this.resetTimer);
    }, this);
    this.setTimers();
    this.$store.dispatch({ type: "restoreLogin" });
  },
  destroyed() {
    this.events.forEach(function (event) {
      window.removeEventListener(event, this.resetTimer);
    }, this);
    this.resetTimer();
  },

  methods: {
    setTimers: function () {
      this.warningTimer = setTimeout(this.warningMessage, 20 * 20000); // 14 minutes - 14 * 60 * 1000
      this.warningZone = false;
    },
    warningMessage: function () {
      this.$store.dispatch("doLogout");
      this.warningZone = true;
    },
    resetTimer: function () {
      clearTimeout(this.warningTimer);
      clearTimeout(this.logoutTimer);
      this.setTimers();
    },
  },
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Noto+Sans+Lao:wght@200;300;400;500&display=swap");
.v-application {
  font-family: "Noto Sans Lao", sans-serif !important;
}
</style>
