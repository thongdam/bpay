<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" sm="2" md="2">
            <v-select
              v-model="checking_auto.provider_code"
              :items="providers"
              item-text="provider_long"
              item-value="provider_auto"
              label="ເລືອກບໍລິສັດ"
              single-line
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-text-field
              v-model="checking_auto.agreement_no"
              label="ເລກສັນຍາ"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="3" md="3" xs="12">
              <v-menu
                ref="menu"
                v-model="menu"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="checking_auto.from_date"
                    label="ຈາກວັນທີ"
                    placeholder="ຈາກວັນທີ"
                    persistent-hint
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    prepend-inner-icon="mdi-calendar-plus"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="checking_auto.from_date"
                  no-title
                  @input="menu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-menu
                ref="menu2"
                v-model="menu2"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                max-width="290px"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="checking_auto.to_date"
                    label="ຫາວັນທີ"
                    placeholder="ຫາວັນທີ"
                    persistent-hint
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    prepend-inner-icon="mdi-calendar-plus"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="checking_auto.to_date"
                  no-title
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          <v-col cols="12" sm="1" md="1" xs="12">
            <v-btn
              @click="Search_AutoDebits()"
              class="mx-1"
              fab
              dark
              small
              color="success"
            >
              <v-icon dark size="25"> mdi-search-web </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-data-table :search="search" :headers="headers" :items="results_check">
        <!-- table top section -->
        <template v-slot:top>
          <v-row>
            <v-col cols="12" sm="8" md="8" xs="12">
              <v-toolbar flat color="white">
                <v-toolbar-title>ກວດສອບລາຍການອັບໂຫຼດຂອງລູກຄ້າ</v-toolbar-title>
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
            <td>{{ item.agreement_no }}</td>
            <td>{{ item.customer_name }}</td>
            <td>{{ item.phone_number }}</td>
            <td>{{ formatNumber(item.amount) }}</td>
            <td>{{ item.deduct_date }}</td>
            <td>{{ item.provider_acc }}</td>
            <td>{{ item.provider_acc_name }}</td>
            <td>{{ item.provider_ccy }}</td>
            <td>{{ item.provider_code }}</td>
            <td>
              <v-chip
                :color="
                  item.service_status == 'NEW' || item.service_status == null
                    ? 'success'
                    : 'error'
                "
                outlined
                pill
              >
                {{
                  item.service_status == "NEW" || item.service_status == null
                    ? "NEW"
                    : item.service_status
                }}
              </v-chip>
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
      menu: false,
      modal: false,
      menu2: false,
      search: "",
      selectedProductId: "",
      confirmDeleteDlg: false,
      results_check: [],
      providers: [],
      checking_auto: {
        provider_code: "",
        status_auto: "",
        agreement_no: "",
        from_date: "",
        to_date: "",
      },
      headers: [
        { text: "ເລກທີສັນຍາ", value: "agreement_no" },
        { text: "ຊື່ ແລະ ນາມສະກຸນ", value: "full_name" },
        { text: "ເບີໂທ", value: "phone_no" },
        { text: "ຈຳນວນເງິນ", value: "due_amount" },
        { text: "ມື້ກຳໜົດຕັດ", value: "deduct_date" },
        { text: "ເລກບັນຊີ", value: "account_number" },
        { text: "ຊື່ບັນຊີ", value: "account_name" },
        { text: "ສະກຸນເງິນ", value: "currency" },
        { text: "ບໍລິສັດ", value: "provider_code" },
        { text: "ສະຖານະ", value: "register_status" },
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
      let result = await api.getProviders();
      this.providers = result.data.body;
    },
    async Search_AutoDebits() {
      let formData = new FormData();
      const { provider_code, status_auto, agreement_no, from_date, to_date } =
        this.checking_auto;
      formData.append("provider_code", provider_code);
      formData.append("status_auto", status_auto);
      formData.append("agreement_no", agreement_no);
      formData.append("from_date", from_date);
      formData.append("to_date", to_date);
      formData.append("username", this.$store.getters["username"]);
      let result = await api.Search_AutoDebits(formData);
      this.results_check = result.data.body;
    },
  },
};
</script>
<style lang="scss" scoped></style>
