<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" sm="4" md="4" xs="12">
            <v-autocomplete
              v-model="checking_npp.provider_code"
              :items="providers"
              item-text="provider_code"
              item-value="provider_code"
              label="ເລືອກແຂວງ"
              placeholder="ເລືອກແຂວງ"
              single-line
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="4" md="4" xs="12">
            <v-text-field
              v-model="checking_npp.agreement_no"
              label="ເລກຜູ້ໃຊ້ນ້ຳ"
              placeholder="ເລກຜູ້ໃຊ້ນ້ຳ"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" xs="12">
            <v-btn
              @click="WaterCheckLists()"
              class="mx-1"
              fab
              dark
              small
              color="success"
            >
              <v-icon dark size="25"> mdi-magnify </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-data-table :search="search" :headers="headers" :items="result_list">
        <!-- table top section -->
        <template v-slot:top>
          <v-row justify="end" align="end">
          <v-col cols="12" sm="4" md="4" xs="12">
              <v-toolbar flat color="white">
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="ຄົ້ນຫາ"
                ></v-text-field>
              </v-toolbar>
            </v-col>
          </v-row>
        </template>
        <!-- table tr section -->
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.agreement_no }}</td>
            <td>{{ item.customer_name }}</td>
            <td>
              <v-chip small color="success" outlined>{{formatNumber(item.amount)}}</v-chip> 
            </td>
            <td>{{ item.deduct_date }}</td>
            <td>
              <v-chip small color="error" outlined>{{formatNumber(item.amount_allow)}}</v-chip> 
            </td>
            <td>{{ checking_npp.provider_code }}</td>
            <td>{{ item.date_process }}</td>
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
      menu: false,
      modal: false,
      menu2: false,
      search: "",
      selectedProductId: "",
      confirmDeleteDlg: false,
      result_list: [],
      providers: [],
      checking_npp: {
        provider_code: "",
        status_auto: "",
        agreement_no: "",
        from_date: "",
        to_date: "",
      },
      headers: [
        { text: "ເລກຜູ້ໃຊ້ນ້ຳ", value: "agreement_no" },
        { text: "ຊື່ນາມສະກຸນ", value: "full_name" },
        { text: "ຍອດໜີ້ປັດຈຸບັນ", value: "amount" },
        { text: "ວັນທີໃບບິນ", value: "full_name" },
        { text: "ຍອດໜີ້ເກົ່າ", value: "old_amount" },
        { text: "ແຂວງ", value: "province" },
        { text: "ວັນທີ່ສົ່ງຂໍ້ມູນ", value: "date_time" },
      ],
    };
  },
  async mounted() {
    this.loadProvider();
  },
  methods: {
    formatNumber(num) {
      return parseFloat(num).toFixed(2);
    },
    async loadProvider() {
      let result = await api.GetAllProviderNpp();
      this.providers = result.data.body;
    },
    async WaterCheckLists() {
      let formData = new FormData();
      const { provider_code, agreement_no, dblink } = this.checking_npp;
      formData.append("provider_code", provider_code);
      formData.append("agreement_no", agreement_no);
      formData.append("dblink", dblink);
      formData.append("username", this.$store.getters["username"]);
      let result = await api.WaterCheckList(formData);
      this.result_list = result.data.body;
    },
  },
};
</script>
<style lang="scss" scoped></style>
