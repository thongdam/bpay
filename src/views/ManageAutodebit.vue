<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="3">
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
          <v-col cols="12" sm="6" md="2">
            <v-select
              v-model="checking_auto.status_auto"
              :items="chekc_status"
              item-text="keys"
              item-value="values"
              label="ເລືອກສະຖານະ"
              single-line
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              v-model="checking_auto.agreement_no"
              label="ເລກສັນຍາ"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="2" md="2" xs="12">
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
          <v-col cols="12" sm="2" md="2" xs="12">
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
          <v-col cols="12" sm="6" md="1">
            <v-btn
              @click="search_autodebit()"
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
      <v-data-table :search="search" :headers="headers" :items="AutoDebits">
        <!-- table top section -->
        <template v-slot:top>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-toolbar flat color="white">
                <v-toolbar-title>ກວດສອບລາຍການ(Auto)</v-toolbar-title>
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
            <td>{{ formatNumber(item.amount) }}</td>
            <td>{{ item.deduct_date }}</td>
            <td>{{ item.date_process }}</td>
            <td>{{ item.provider_acc }}</td>
            <td>{{ item.provider_acc_name }}</td>
            <td>{{ item.provider_ccy }}</td>
            <td>
              <v-chip small color="info" outlined pill>
                {{ item.auto_condition_type }} ຄັ້ງ
              </v-chip>
              <v-btn
                class="ml-3"
                color="warning"
                fab
                x-small
                @click="UpdateStatus(item)"
              >
                <v-icon dark> mdi-refresh-auto</v-icon>
              </v-btn>
            </td>
            <td>{{ item.provider_code }}</td>
            <td>
              <v-chip
                small
                :color="
                  item.provider_auto_status == '89'
                    ? 'danger'
                    : item.provider_auto_status == '00'
                    ? 'success'
                    : 'warning'
                "
                outlined
                pill
              >
                {{
                  item.provider_auto_status == "89"
                    ? "ຍອດເງິນໃນບັນຊີບໍ່ພຽງພໍ"
                    : item.provider_auto_status == "00"
                    ? "ຕັດເງິນສຳເລັດ"
                    : "ລໍຖ້າຕັດເງິນ"
                }}
              </v-chip>
            </td>
            <td>
              <v-chip
                small
                :color="
                  item.register_status == 'C'
                    ? 'danger'
                    : item.register_status == 'A'
                    ? 'success'
                    : item.register_status == 'R'
                    ? 'info'
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
                    : item.register_status == "R"
                    ? "ສົ່ງເງິນຄືນລູກຄ້າ"
                    : "ລໍຖ້າລົງທະບຽນ"
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
      AutoDebits: [],
      providers: [],
      checking_auto: {
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
        { text: "ຈຳນວນເງິນ", value: "amount" },
        { text: "ວັນທີກຳໜົດຕັດເງິນ", value: "deduct_date" },
        { text: "ວັນທີຕັດເງິນ", value: "date_process" },
        { text: "ເລກບັນຊີ", value: "account_number" },
        { text: "ຊື່ບັນຊີ", value: "account_name" },
        { text: "ສະກຸນເງິນ", value: "currency" },
        { text: "ຈຳນວນຄັ້ງເຂົ້າຕັດເງິນ", value: "count_amt" },
        { text: "ບໍລິສັດ", value: "provider_code" },
        { text: "ສະຖານະ", value: "status" },
        { text: "ສະຖານະລົງທະບຽນ", value: "register_status" },
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
    async UpdateStatus(item) {
      let formData = new FormData();
      const { id, provider_code } = item;
      formData.append("id", id);
      formData.append("provider_code", provider_code);
      formData.append("username", this.$store.getters["username"]);
      let result = await api.UpdateStatus(formData);
      if ((result.data.body.responseMsg = true)) {
        window.location.reload();
      } else {
        console.log(result.status);
      }
    },
    async loadProvider() {
      let result = await api.getProviders();
      this.providers = result.data.body;
    },
    async search_autodebit() {
      let formData = new FormData();
      const { provider_code, status_auto, agreement_no, from_date, to_date } =
        this.checking_auto;
      formData.append("provider_code", provider_code);
      formData.append("status_auto", status_auto);
      formData.append("agreement_no", agreement_no);
      formData.append("from_date", from_date);
      formData.append("to_date", to_date);
      formData.append("username", this.$store.getters["username"]);
      let result = await api.getAuto(formData);
      this.AutoDebits = result.data.body;
    },
  },
};
</script>
<style lang="scss" scoped></style>
