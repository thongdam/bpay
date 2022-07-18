<template>
  <v-container>
    <v-card>
      <v-card-title class="text-center justify-center py-3">
        <h1 class="font-weight-bold text-h5">
          ຈັດການລົງທະບຽນບັນຊີລູກຄ້າຂອງບໍລິສັດ
        </h1>
      </v-card-title>

      <v-tabs background-color="success accent-4" centered dark icons-and-text>
        <v-tab>
          ກວດສອບຂໍ້ມູນ
          <v-icon>mdi-magnify</v-icon>
        </v-tab>
        <v-tab>
          ລົງທະບຽນ ຫຼື ກວດລາຍເຊັນ
          <v-icon>mdi-account-cash</v-icon>
        </v-tab>
        <v-tab-item v-for="n in 2" :key="n">
          <v-container fluid v-if="n == 1">
            <v-row>
              <v-col cols="12" sm="6" md="3">
                <v-autocomplete
                  v-model="register.provider_code"
                  :items="providers"
                  item-text="provider_long"
                  item-value="provider_auto"
                  outlined
                  chips
                  small-chips
                  label="ເລືອກບໍລິສັດ"
                ></v-autocomplete>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-select
                  v-model="register.status_auto"
                  :items="check_status"
                  item-text="keys"
                  item-value="values"
                  label="ເລືອກສະຖານະ"
                  single-line
                  outlined
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="2">
                <v-text-field
                  v-model="register.agreement_no"
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
                      v-model="register.from_date"
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
                    v-model="register.from_date"
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
                      v-model="register.to_date"
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
                    v-model="register.to_date"
                    no-title
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="1">
                <v-btn
                  @click="search_acc()"
                  class="mx-1"
                  small
                  fab
                  dark
                  color="success"
                >
                  <v-icon dark size="25"> mdi-magnify</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-data-table
              :search="search"
              :headers="headers"
              :items="register_acc"
            >
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
                  <td>{{ item.provider_acc }}</td>
                  <td>{{ item.provider_acc_name }}</td>
                  <td>{{ item.create_date }}</td>
                  <td>
                    <v-chip
                      :color="
                        item.provider_auto_status == 'A'
                          ? 'success'
                          : item.provider_auto_status == 'C'
                          ? 'error'
                          : 'warning'
                      "
                      outlined
                      pill
                    >
                      {{
                        item.provider_auto_status == "A"
                          ? "ລົງທະບຽນ"
                          : item.provider_auto_status == "C"
                          ? "ປິດສັນຍາ"
                          : "ລໍຖ້າລົງທະບຽນ"
                      }}
                    </v-chip>
                  </td>
                  <td>{{ item.provider_code }}</td>
                  <td>{{ item.provider_code }}</td>
                  <td>
                    <v-btn
                      @click="BtnEditRegisters()"
                      class="mr-2"
                      color="warning"
                      fab
                      x-small
                      dark
                    >
                      <v-icon dark> mdi-pencil</v-icon>
                    </v-btn>
                    <v-btn class="mr-2" color="error" fab x-small dark>
                      <v-icon dark> mdi-delete</v-icon>
                    </v-btn>
                  </td>
                </tr>
              </template>
            </v-data-table>
          </v-container>
          <v-container fluid v-if="n == 2">
            <v-row>
              <v-col cols="12" md="6" sm="12" xs="12">
                <v-card>
                  <v-card-title class="py-3">
                    <v-icon> mdi-draw</v-icon> ກວດລາຍເຊັນ</v-card-title
                  >
                  <v-col cols="12" sm="12" md="12">
                    <v-text-field label="ເລກບັນຊີ" outlined></v-text-field>
                  </v-col>
                </v-card>
              </v-col>
              <v-col cols="12" md="6" sm="12" xs="12">
                <v-card>
                  <v-card-title class="py-3">
                    <v-icon> mdi-account-cog-outline</v-icon> ລົງທະບຽນ
                  </v-card-title>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </v-tab-item>
      </v-tabs>
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
      EditRegister: false,
      menu: false,
      modal: false,
      menu2: false,
      search: "",
      text_error: "ບໍ່ມີຂໍ້ມູນ",
      timeout_error: 5000,
      error: false,
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
      check_status: [
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
        { text: "ເພິ່ມໂດຍ", value: "provider_code" },
        { text: "ບໍລິສັດ", value: "provider_code" },
        { text: "ຕົວເລືອກ", value: "register_by" },
      ],
    };
  },
  async mounted() {
    this.loadProvider();
  },
  methods: {
    BtnEditRegisters() {
      this.EditRegister = true;
    },
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
      formData.append("username", this.$store.getters["username"]);
      let result = await api.getAcc(formData);
      this.register_acc = result.data.body;
      if (result.data.body.length > 0) {
        this.register_acc = result.data.body;
      } else {
        this.error = true;
      }
    },
  },
};
</script>
<style lang="scss" scoped></style>
