<template>
  <v-container>
    <v-row dense>
      <v-col lg="3" md="6" sm="12" cols="12">
        <Dashboard
          title="ບໍລິສັດນຳໃຊ້ Auto debit"
          subtitle="1,800"
          avatar_bg="#F77E21"
          avatar_ic="mdi-domain"
        />
      </v-col>
      <v-col lg="3" md="6" sm="12" cols="12">
        <Dashboard
          title="ບໍລິສັດນຳໃຊ້ Bill payment"
          subtitle="1,800"
          avatar_bg="#00a65a"
          avatar_ic="mdi-domain"
        />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <Dashboard
          title="ຜູ້ໃຊ້ງານທັງໝົດ"
          avatar_ic="mdi-account-group"
          avatar_bg="#2980b9"
          subtitle="12"
        />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <Dashboard
          title="ລໍຖ້າຕັດເງິນໃນມື້"
          avatar_ic="mdi-refresh-auto"
          avatar_bg="#dd4b39"
          subtitle="2"
        />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <Dashboard
          title="ຕັດເງິນສຳເລັດໃນມື້"
          avatar_ic="mdi-check-underline-circle-outline"
          avatar_bg="#00c0ef"
          subtitle="101"
        />
      </v-col>

      <v-col lg="3" md="6" sm="12" cols="12">
        <Dashboard
          title="ລາຍການຄ້າງໃນມື້"
          avatar_ic="mdi-alert-circle"
          avatar_bg="#e67e22"
          subtitle="101"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Dashboard from "@/components/cards/Dashboard";
import api from "@/services/api";
export default {
  name: "dashboard",
  data() {
    return {
      search: "",
      selectedProductId: "",
      confirmDeleteDlg: false,
      mDataArray: [],
      headers: [
        {
          text: "Id",
          align: "left",
          sortable: false,
          value: "id",
        },
        { text: "Image", value: "image" },
        { text: "Name", value: "name" },
        { text: "Price", value: "price" },
        { text: "Stock", value: "stock" },
        { text: "Action", value: "action" },
      ],
    };
  },
  components: {
    Dashboard,
  },
  async mounted() {
    //this.loadProducts();
  },
  methods: {
    editItem(item) {
      this.$router.push(`/stock-edit/${item.id}`);
    },
    deleteItem(item) {
      this.selectedProductId = item.id;
      this.confirmDeleteDlg = true;
    },
    async confirmDelete() {
      await api.deleteProduct(this.selectedProductId);
      this.confirmDeleteDlg = false;
      this.loadProducts();
    },
    // async loadProducts() {
    //   let result = await api.getProducts();
    //   this.mDataArray = result.data;
    // }
  },
};
</script>

<style lang="scss" scoped></style>
