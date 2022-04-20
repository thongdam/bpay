<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-data-table :search="search" :headers="headers" :items="FeeArray">
        <!-- table top section -->
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>ຈັດການຂັ້ນບັນໃດຄ່າທຳນຽມ</v-toolbar-title>
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
            <td>{{ item.from_amt }}</td>
            <td>{{ item.to_amt }}</td>
            <td>{{ item.total_amt }}</td>
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
      FeeArray: [],
      headers: [
        {
          text: "ຊ່ອງທາງ",
          align: "left",
          sortable: true,
          value: "id",
        },
        { text: "ຈາກ", value: "from_amt" },
        { text: "ຫາ", value: "to_amt" },
        { text: "ເປັນເງິນ", value: "total_amt" },
        { text: "ຕົວເລືອກ", value: "option" },
      ]
    };
  },
  async mounted() {
    this.loadFee();
  },
  methods: {
    async loadFee() {
      let result = await api.getfee();
      console.log(result.data.body)
      this.FeeArray = result.data.body;
    },
  },
};
</script>
<style lang="scss" scoped></style>