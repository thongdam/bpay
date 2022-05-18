<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="cheking_bill.provider_code"
              :items="providers"
              item-text="provider_long"
              item-value="provider_auto"
              label="ເລືອກບໍລິສັດ"
              single-line
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="4">
            <v-select
              v-model="cheking_bill.status_auto"
              :items="chekc_status"
              item-text="keys"
              item-value="values"
              label="ເລືອກສະຖານະ"
              single-line
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              v-model="cheking_bill.agreement_no"
              label="ເລກສັນຍາ"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="1">
            <v-btn @click="search_bill()" class="mx-1" fab dark small color="success">
              <v-icon dark size="25"> mdi-search-web </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-data-table :search="search" :headers="headers" :items="bill">
        <!-- table top section -->
        <template v-slot:top>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-toolbar flat color="white">
                <v-toolbar-title>ກວດສອບລາຍການ(Bill)</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="ຄົ້ນຫາ"
                  single-line
                  hide-details
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
            <td>{{ item.provider_ccy }}</td>
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
              >
                {{
                  item.register_status == "C"
                    ? "ເລກສັນຍາຖືກປິດ"
                    : item.register_status == "A"
                    ? "ລົງທະບຽນສຳເລັດ"
                    : "ລໍຖ້າລົງທະບຽນ"
                }}
              </v-chip>
            </td>
            <td>{{ item.provider_code }}</td>
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
      bill: [],
      providers: [],
      cheking_bill: {
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
        this.cheking_bill;
      formData.append("provider_code", provider_code);
      formData.append("status_auto", status_auto);
      formData.append("agreement_no", agreement_no);
      formData.append("from_date", from_date);
      formData.append("to_date", to_date);
      let result = await api.getBill(formData);
      this.bill = result.data.body;
    },
  },
};
</script>
<style lang="scss" scoped></style>
