<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-data-table :search="search" :headers="headers" :items="BDataArray">
        <!-- table top section -->
        <template v-slot:top>
          <v-col cols="12" sm="6" md="12" xs="12">
            <v-toolbar flat color="white">
              <v-toolbar-title>ຈັດການຂໍ້ມູນຜູ້ໃຊ້ງານ</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="ຄົ້ນຫາ"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn disabled
                @click="$router.push('/manageuserCreate')"
                class="mx-1"
                fab
                dark
                color="success"
              >
                <v-icon size="30">mdi-plus-circle</v-icon>
              </v-btn>
            </v-toolbar>
          </v-col>
        </template>

        <!-- table tr section -->
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.username }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.provider_code }}</td>
            <td>{{ item.create_date }}</td>
            <td>{{ item.active_date }}</td>
            <td>{{ item.login_attem }}</td>
            <td>{{ item.login_time }}</td>
            <td>
              <v-btn
                class="mr-2"
                color="warning"
                fab
                small
                dark
              >
                <v-icon dark> mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                class="mr-2"
                color="error"
                fab
                small
                dark
              >
                <v-icon dark> mdi-delete-circle</v-icon>
              </v-btn>
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
        { text: "ຊື່ເຂົ້າໃຊ້ງານ", value: "username" },
        { text: "ສະຖານະ", value: "status" },
        { text: "ບໍລິສັດ", value: "provider_code" },
        { text: "ວັນທີສ້າງ", value: "create_date" },
        { text: "ມື້ເປິດນຳໃຊ້", value: "active_date" },
        { text: "ເຂົ້າລະບົບຜິດ", value: "login_attem" },
        { text: "ເຂົ້າໃຊ້ງານລະບົບລ່າສຸດ", value: "login_time" },
        { text: "ຕົວເລືອກ", value: "action" },
      ],
    };
  },
  async mounted() {
    this.loadUsers();
  },
  methods: {
    async loadUsers() {
      let result = await api.getUsers();
      this.BDataArray = result.data.body;
    },
  },
};
</script>
<style lang="scss" scoped></style>
