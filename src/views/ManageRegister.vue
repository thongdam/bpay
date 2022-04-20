<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-data-table :search="search" :headers="headers" :items="BDataArray">
        <!-- table top section -->
        <template v-slot:top>
          <v-col cols="12" sm="6" md="12" xs="12">
            <v-toolbar flat color="white">
              <v-toolbar-title>ຈັດການລົງທະບຽນບັນຊີລູກຄ້າ</v-toolbar-title>
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
            <td>{{ item.agreement_no }}</td>
            <td>{{ item.provider_acc }}</td>
            <td>{{ item.provider_acc_name }}</td>
            <td>{{ item.create_date }}</td>
            <td>
              <v-chip
                :color="
                  item.provider_auto_status == 'A'
                    ? 'success'
                    : item.provider_auto_status == 'C'
                    ? 'danger'
                    : 'warning'
                "
                outlined
                pill
              >
                {{ item.provider_auto_status }}
              </v-chip>
            </td>
            <td>{{ item.provider_code }}</td>
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
        { text: "ເລກທີສັນຍາ", value: "agreement_no" },
        { text: "ເລກບັນຊີ", value: "account_number" },
        { text: "ຊື່ບັນຊີ", value: "account_name" },
        { text: "ມື້ລົງທະບຽນ", value: "register_date" },
        { text: "ສະຖານະ", value: "account_status" },
        { text: "ບໍລິສັດ", value: "provider_code" },
        { text: "ຕົວເລືອກ", value: "register_by" },
      ],
    };
  },
  async mounted() {
    this.loadAcc();
  },
  methods: {
    async loadAcc() {
      let result = await api.getacc();
      this.BDataArray = result.data.body;
    },
  },
};
</script>
<style lang="scss" scoped></style>
