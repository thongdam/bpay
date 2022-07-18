<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-autocomplete
              v-model="checking_bill.provider_code"
              :items="providers"
              item-text="provider_long"
              item-value="provider_auto"
              outlined
              chips
              small-chips
              label="ເລືອກບໍລິສັດ"
            ></v-autocomplete>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="checking_bill.status_auto"
              :items="chekc_status"
              item-text="keys"
              item-value="values"
              label="ເລືອກສະຖານະ"
              single-line
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="checking_bill.agreement_no"
              label="ເລກສັນຍາ"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="1">
            <v-btn
              @click="search_bill()"
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
      <v-data-table :search="search" :headers="headers" :items="bill">
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
            <td>{{ item.id }}</td>
            <td>{{ item.agreement_no }}</td>
            <td>{{ item.customer_name }}</td>
            <td>{{ item.phone_number }}</td>
            <td>{{ item.total_amt }}</td>
            <td>
              <v-chip small :color="item.provider_ccy =='LAK' ? 'success' :(item.provider_ccy =='USD' ? 'error' : item.provider_ccy =='THB'? 'info':'')" outlined>{{ item.provider_ccy }}</v-chip>
            </td>
            <td>
              <v-chip
                :color="
                  item.register_status == 'C'
                    ? 'danger'
                    : item.register_status == 'A'
                    ? 'success'
                    : 'warning'
                "
                outlined
                pill
                small
              >
                {{
                  item.register_status == "C"
                    ? "ເລກສັນຍາຖືກປິດ"
                    : item.register_status == "A"
                    ? "ເປິດໃນຊຳລະ"
                    : "ລໍຖ້າລົງທະບຽນ"
                }}
              </v-chip>
            </td>
            <td>{{ item.provider_code }}</td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-snackbar v-model="error" :timeout="timeout_error" color="error">
      {{ text_error }}
    </v-snackbar>
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
      text_error:"ບໍ່ມີຂໍ້ມູນ",
      timeout_error: 5000,
      error: false,
      selectedProductId: "",
      confirmDeleteDlg: false,
      bill: [],
      providers: [],
      checking_bill: {
        provider_code: "",
        status_auto: "",
        agreement_no: "",
        from_date: "",
        to_date: "",
      },
      chekc_status: [
        { keys: "Active", values: "A" },
        { keys: "Pending", values: "P" },
        { keys: "Close", values: "C" },
      ],
      headers: [
        {
          text: "ລຳດັບ",
          align: "left",
          sortable: true,
          value: "id",
        },
        { text: "ເລກທີສັນຍາ", value: "agreement_no" },
        { text: "ຊື່ແລະນາມສະກຸນ", value: "full_name" },
        { text: "ເບີໂທ", value: "phone_number" },
        { text: "ຈຳນວນເງິນ", value: "amount" },
        { text: "ສະກຸນເງິນ", value: "currency" },
        { text: "ສະຖານະ", value: "status" },
        { text: "ບໍລິສັດ", value: "provider_code" },
      ],
    };
  },
  async mounted() {
    this.loadProvider();
  },
  methods: {
    async loadProvider() {
      let result = await api.getProviders();
      this.providers = result.data.body;
    },
    async search_bill() {
      let formData = new FormData();
      const { provider_code, status_auto, agreement_no, from_date, to_date } =
        this.checking_bill;
      formData.append("provider_code", provider_code);
      formData.append("status_auto", status_auto);
      formData.append("agreement_no", agreement_no);
      formData.append("from_date", from_date);
      formData.append("to_date", to_date);
      formData.append("username", this.$store.getters["username"]);
      let result = await api.getBill(formData);
        if (result.data.body.length > 0) {
          this.bill = result.data.body;
        } else {
          this.error = true;
        }
    },
  },
};
</script>
<style lang="scss" scoped></style>
