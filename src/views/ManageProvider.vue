<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-data-table :search="search" :headers="headers" :items="BDataArray">
        <!-- table top section -->
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>ຈັດການຂໍ້ມູນບໍລິສັດ</v-toolbar-title>
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
              @click="$router.push('/ManageProviderCrate')"
              color="success"
              dark
              class="mb-2"
            >
              <v-icon left>mdi-plus-circle</v-icon>
              <span>ເປິດ ບໍລິສັດ ໃຫມ່</span>
            </v-btn>
          </v-toolbar>
        </template>

        <!-- table tr section -->
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.provider_auto }}</td>
            <td>{{ item.provider_long }}</td>
            <td>{{ item.provider_auto_status}}</td>
            <td>{{ item.provider_bill_status}}</td>
            <td>{{ item.create_date}}</td>
            <td>
              <v-icon class="mr-2" @click="editItem(item)" color="warning"> mdi-pencil </v-icon>
              <span class="ma-1"></span>
              <v-icon @click="deleteItem(item)" color="danger"> mdi-delete-empty </v-icon>
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
        { text: "ຊື່ຫຍໍ້", value: "provider_code" },
        { text: "ຊື່ເຕັມ", value: "status" },
        { text: "ນຳໃຊ້ໂອໂຕເດບິດ", value: "provider_auto" },
        { text: "ນຳໃຊ້ບິວເພເມັນ", value: "provider_bill" },
        { text: "ເປິດນຳໃຊ້", value: "create_date" },
        { text: "ຕົວເລືອກ", value: "action" },
      ],
    };
  },
    async mounted() {
    this.loadProduct();
  },
  methods: {
    async loadProduct() {
      let result = await api.getProviders();
      this.BDataArray = result.data.body;
    },
  },
};
</script>
