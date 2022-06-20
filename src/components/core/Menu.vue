<template>
  <v-navigation-drawer
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    app
    src="@/assets/background_menu.jpg"
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="@/assets/vue_displays.jpg" alt=""></v-img>
      </v-list-item-avatar>
      <v-list-item-title>{{
        $store.getters["username"] | uppercase
      }}</v-list-item-title>
      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>
    <v-list dense>
      <v-list-item-group v-model="selectedMenu" mandatory color="primary">
        <v-list-item
          class="white--text"
          v-for="([icon, text, route], i) in menus"
          :key="i"
          link
          @click="onClickMenu(route)"
        >
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-item-group>
    </v-list>

    <v-btn fab x-small absolute right color="error" @click="onClickLogOff"
      ><v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: "Menu",
  props: [],
  mounted() {
    this.selectedMenu = this.menus.findIndex(
      (menu) => menu[2] == this.$route.path
    );
  },
  data() {
    return {
      selectedMenu: 0,
      drawer: true,
          careers: [
      ['Benefits', 'people_outline'],
      ['Get Started', 'settings'],
    ],
      menus: [
        ["mdi-view-dashboard", "ພາບລວມລະບົບ", "/dashboard"],
        ["mdi-account-group", "ຈັດການຂໍ້ມູນຜູ້ໃຊ້", "/ManageUser"],
        ["mdi-domain", "ຈັດການຂໍ້ມູນບໍລິສັດ(AUTO)", "/ManageProvider"],
        ["mdi-book-cross", "ຈັດການຂໍ້ມູນບໍລິສັດ(BILL)", "/ManageProviderBill"],
        ["mdi-card-account-details", "ຈັດການລົງທະບຽນ", "/ManageRegister"],
        ["mdi-check-underline-circle", "ກວດສອບລາຍການອັບໂຫຼດ", "/CheckUploadData"],
        ["mdi-water", "ກວດສອບຍອດໜີ້ນ້ຳປະປາ", "/WaterCheckList"],
        ["mdi-refresh-auto", "ກວດສອບລາຍການ(Auto)", "/ManageAutodebit"],
        [
          "mdi-order-bool-ascending-variant",
          "ກວດສອບລາຍການ(Bill)",
          "/ManageBill",
        ],
        ["mdi-key", "ຈັດການສິດດນຳໃຊ້ລະບົບ", "/ManagePermission"],
        ["mdi-cash-multiple", "ຈັດການຂັ້ນບັນໃດຄ່າທຳນຽມ", "/ManageFee"],
        ["mdi-currency-usd", "ຈັດການຄ່າທຳນຽມ", "/ManageFeeTransaction"],
        ["mdi-alert-circle", "ຈັດການປິດລະບົບສະຫຼຸບປີ", "/about"],
      ],
      mini: true,
    };
  },
  methods: {
    onClickMenu(link) {
      this.$router.push(link).catch((err) => {});
    },
    onClickLogOff() {
      this.$store.dispatch("doLogout");
    },
  },
  watch: {
    $route(to, from) {
      this.selectedMenu = this.menus.findIndex((menu) => menu[2] == to.path);
    },
  },
  computed: {},
};
</script>
