<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="cheking_auto.provider_code"
              :items="providers"
              item-text="provider_long"
              item-value="provider_auto"
              label="ເລືອກບໍລິສັດ"
              single-line
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-select
              v-model="cheking_auto.status_auto"
              :items="chekc_status"
              item-text="keys"
              item-value="values"
              label="ເລືອກສະຖານະ"
              single-line
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              v-model="cheking_auto.agreement_no"
              label="ເລກສັນຍາ"
              outlined
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="cheking_auto.from_date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="cheking_auto.from_date"
                  label="ເລືອກວັນທີເລິ່ມຕົ້ນສັນຍາ"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="cheking_auto.from_date"
                no-title
                scrollable
                color="green lighten-1"
                header-color="primary"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(cheking_auto.from_date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :return-value.sync="cheking_auto.to_date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="cheking_auto.to_date"
                  label="ເລືອກວັນທີສິນສຸດສັນຍາ"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  outlined
                  dense
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="cheking_auto.to_date"
                no-title
                scrollable
                color="green lighten-1"
                header-color="primary"
              >
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="menu2 = false">
                  Cancel
                </v-btn>
                <v-btn
                  text
                  color="primary"
                  @click="$refs.menu2.save(cheking_auto.to_date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
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
      <v-data-table :search="search" :headers="headers" :items="autodebits">
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
            <td>{{ item.provider_acc }}</td>
            <td>{{ item.provider_acc_name }}</td>
            <td>{{ item.provider_ccy }}</td>
            <td>{{ item.customer_name }}</td>
            <td>
              <v-chip
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
            <td>{{ item.provider_code }}</td>
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
      autodebits: [],
      providers: [],
      cheking_auto: {
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
        { text: "ເລກບັນຊີ", value: "account_number" },
        { text: "ຊື່ບັນຊີ", value: "account_name" },
        { text: "ສະກຸນເງິນ", value: "currency" },
        { text: "ຊື່ແລະນາມສະກຸນ", value: "full_name" },
        { text: "ສະຖານະ", value: "status" },
        { text: "ບໍລິສັດ", value: "provider_code" },
        { text: "ສະຖານະລົງທະບຽນ", value: "register_status" },
      ],
    };
  },
  async mounted() {
    //this.loadAcc();
    this.loadProvider();
  },
  methods: {
    async loadAcc() {
      let result = await api.getacc();
      this.autodebits = result.data.body;
    },
    async loadProvider() {
      let result = await api.getProviders();
      this.providers = result.data.body;
    },
    async search_autodebit() {
      let formData = new FormData();
      const { provider_code, status_auto, agreement_no, from_date, to_date } =
        this.cheking_auto;
      formData.append("provider_code", provider_code);
      formData.append("status_auto", status_auto);
      formData.append("agreement_no", agreement_no);
      formData.append("from_date", from_date);
      formData.append("to_date", to_date);
      let result = await api.getAuto(formData);
      this.autodebits = result.data.body;
    },
  },
};
</script>
<style lang="scss" scoped></style>
