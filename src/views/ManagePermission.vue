<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-data-table :search="search" :headers="headers" :items="BDataArray">
        <!-- table top section -->
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>ຈັດການສິດຜູ້ໃຊ້ງານ</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="ຄົ້ນຫາ"
              single-line
              hide-details
            ></v-text-field>
            <v-spacer></v-spacer>
            <v-btn 
              disabled
              @click="$router.push('/ManageFeeCreate')"
              color="success"
              dark
              class="mb-2"
            >
              <v-icon size="30">mdi-plus-circle</v-icon>
            </v-btn>
          </v-toolbar>
        </template>

        <!-- table tr section -->
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.status }}</td>
            <td>
              <v-icon class="mr-2"> mdi-pencil </v-icon>
              <span class="ma-1"></span>
              <v-icon> mdi-delete-empty </v-icon>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
import api from "@/services/api";
export default {
  name: "ManageUser",
  data() {
    return {
      search: "",
      selectedProductId: "",
      confirmDeleteDlg: false,
      BDataArray: [],
      headers: [
        {
          text: "ລຳດັບ",
          align: "left",
          sortable: true,
          value: "id",
        },
        { text: "ຈາກ", value: "fee_amount_f" },
        { text: "ຫາ", value: "fee_amount_to" },
        { text: "ເປັນເງິນ", value: "fee_total_amount" },
      ]
    };
  },
  async mounted() {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      let result = await api.Users();
      this.BDataArray = result.data.body;
    },
  },
};
</script>
<style lang="scss" scoped></style>