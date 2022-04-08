<template>
  <v-navigation-drawer app permanent dark src="@/assets/background_menu.jpg">
    <router-link to="/about">
      <v-img src="@/assets/vue_displays.jpg" alt="" width="100%"></v-img>
    </router-link>
    <v-list>
      <v-subheader>MENUS</v-subheader>
      <v-list-item-group v-model="selectedMenu" mandatory color="primary">
        <v-list-item
          class="tile white--text"
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
  </v-navigation-drawer>
</template>

<script lang="js">

  export default  {
    name: 'Menu',
    props: [],
    mounted () {
      this.selectedMenu = this.menus.findIndex(menu=> menu[2] == this.$route.path)
    },
    data () {
      return {
        selectedMenu:0,
        menus: [
          ['mdi-view-dashboard', 'ພາບລວມລະບົບ', '/dashboard'],
        ['mdi-account', 'ຈັດການຂໍ້ມູນຜູ້ໃຊ້', '/ManageUser'],
        ['mdi-domain', 'ຈັດການຂໍ້ມູນບໍລິສັດ', '/ManageProvider'],
        ['mdi-account-plus', 'ຈັດການລົງທະບຽນ', '/about'],
        ['mdi-key','ຈັດການບົດບາດນຳໃຊ້ລະບົບ','/about'],
        ['mdi-cash-multiple','ຈັດການຂັ້ນບັນໃດຄ່າທຳນຽມ','/about'],
        ['mdi-alert-circle','ຈັດການປິດລະບົບສະຫຼຸບປີ','/about'],
      ],
      }
    },
    methods: {
      onClickMenu(link){
        this.$router.push(link).catch(err => {})
      }
    },
    watch:{
     $route(to, from) {
       this.selectedMenu = this.menus.findIndex(menu=> menu[2] == to.path)
      }
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped></style>
