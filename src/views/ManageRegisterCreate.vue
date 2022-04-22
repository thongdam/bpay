<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="3">
            <v-select
              v-model="register.provider_code"
              :items="providers"
              item-text="provider_long"
              item-value="provider_auto"
              label="ເລືອກບໍລິສັດ"
              single-line
              persistent-hint
              solo
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-select
              v-model="register.status_auto"
              :items="chekc_status"
              item-text="keys"
              item-value="values"
              label="ເລືອກສະຖານະ"
              single-line
              persistent-hint
              solo
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-text-field
              v-model="register.agreement_no"
              label="ເລກສັນຍາ"
              solo
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="2">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="register.from_date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="register.from_date"
                  label="ເລືອກວັນທີເລິ່ມຕົ້ນສັນຍາ"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  solo
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="register.from_date"
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
                  @click="$refs.menu.save(register.from_date)"
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
              :return-value.sync="register.to_date"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="register.to_date"
                  label="ເລືອກວັນທີສິນສຸດສັນຍາ"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  solo
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="register.to_date"
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
                  @click="$refs.menu2.save(register.to_date)"
                >
                  OK
                </v-btn>
              </v-date-picker>
            </v-menu>
          </v-col>
          <v-col cols="12" sm="6" md="1">
            <v-btn @click="search_acc()" class="mx-1" fab dark color="success">
              <v-icon dark size="40"> mdi-plus-circle </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
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
      register_acc: [],
      providers: [],
      register: {
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
        { text: "ມື້ລົງທະບຽນ", value: "register_date" },
        { text: "ສະຖານະ", value: "account_status" },
        { text: "ບໍລິສັດ", value: "provider_code" },
        { text: "ຕົວເລືອກ", value: "register_by" },
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
    async search_acc() {
      let formData = new FormData();
      const { provider_code, status_auto, agreement_no, from_date, to_date } =
        this.register;
      formData.append("provider_code", provider_code);
      formData.append("status_auto", status_auto);
      formData.append("agreement_no", agreement_no);
      formData.append("from_date", from_date);
      formData.append("to_date", to_date);
      let result = await api.getacc(formData);
      this.register_acc = result.data.body;
    },
  },
};
</script>
<style lang="scss" scoped></style>
