<template lang="html">
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12">
        <v-card class="mx-auto pa-5" outlined>
          <v-toolbar-title class="mb-5 text-center">
            <v-icon color="success">mdi-database-plus</v-icon
            >ຕັ້ງຄ່າໃຫ້ກັບບໍລິສັດເພື່ອເປິດນຳໃຊ້ບໍລິການ B-Pay
          </v-toolbar-title>
          <v-form @submit.prevent="submit" ref="form">
            <v-toolbar-title class="mb-2">
              <v-icon color="success">mdi-domain</v-icon>ຂໍ້ມູນບໍລິສັດ:
            </v-toolbar-title>
            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model="create_privider.full_name"
                  label="ຊື່ ແລະ ນາມສະກຸນ"
                  required
                  filled
                  dense
                  :rules="full_name_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="create_privider.phone_no"
                  label="ໂທລະສັບມືຖື"
                  required
                  filled
                  dense
                  :rules="phone_no_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="create_privider.line_phone"
                  label="ໂທລະສັບຕັ້ງໂຕະ"
                  required
                  filled
                  dense
                  :rules="line_phone_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="create_privider.provider_name"
                  label="ຊື່ ບໍລິສັດ"
                  required
                  filled
                  dense
                  :rules="provider_name_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="create_privider.provider_code"
                  label="ຊື່ຫຍໍ້"
                  required
                  filled
                  dense
                  :rules="provider_code_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-menu
                  ref="menu"
                  v-model="menu"
                  :close-on-content-click="false"
                  :return-value.sync="create_privider.contract_startdate"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="create_privider.contract_startdate"
                      label="ເລືອກວັນທີເລິ່ມຕົ້ນສັນຍາ"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      filled
                      dense
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="create_privider.contract_startdate"
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
                      @click="$refs.menu.save(create_privider.contract_startdate)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="3">
                <v-menu
                  ref="menu2"
                  v-model="menu2"
                  :close-on-content-click="false"
                  :return-value.sync="create_privider.contract_stopdate"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="create_privider.contract_stopdate"
                      label="ເລືອກວັນທີສິນສຸດສັນຍາ"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                      filled
                      dense
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="create_privider.contract_stopdate"
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
                      @click="$refs.menu2.save(create_privider.contract_stopdate)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="create_privider.product_type"
                  label="ປະເພດທຸລະກິດ"
                  required
                  filled
                  dense
                  :rules="product_type_Rul"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mb-0">
              <v-col cols="12">
                <v-toolbar-title class="mb-2">
                  <v-icon color="success">mdi-bank</v-icon
                  >ຂໍ້ມູນບັນຊີທີ່ໃຊ້ຊຳລະສະສາງ ແລະ ຕັດຄ່າທຳນຽມ:
                </v-toolbar-title>
              </v-col>
            </v-row>
            <v-btn @click="addRow" small text color="success" class="ml-2">
              <v-icon>mdi-briefcase-plus</v-icon>
              <span>ເພິ່ມບັນຊີ</span>
            </v-btn>
            <v-row
              class="rounded mb-2 mx-0"
              v-for="(acc, index) in create_privider.account"
              :key="index"
              style="border: 1px solid lightgrey"
            >
              <v-col cols="4">
                <v-text-field
                  v-model="acc.account_cr"
                  label="ເລກ ບັນຊີຮອງຮັບ"
                  required
                  filled
                  dense
                  counter
                  type="number"
                  :rules="account_cr_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="acc.account_name_cr"
                  label="ຊື່ ບັນຊີຮອງຮັບ"
                  required
                  filled
                  dense
                  persistent-hint
                  :rules="account_name_cr_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="acc.provider_currency"
                  :items="items03"
                  item-text="abbr"
                  :rules="provider_currency_Rul"
                  label="ເລືອກສະກຸນເງິນທີ່ຮັບຊຳລະ"
                  single-line
                  persistent-hint
                  filled
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                md="1"
                class="d-flex justify-center align-center mx-0 px-0"
              >
                <v-btn
                  icon
                  small
                  color="red"
                  :disabled="Object.keys(create_privider.account).length === 1"
                  @click="deleteRow(index)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model="create_privider.account_year_fee"
                  label="ເລກ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ"
                  required
                  filled
                  dense
                  type="number"
                  :rules="account_year_fee_Rul"
                  counter
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="create_privider.account_name_year_fee"
                  label="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ"
                  required
                  filled
                  dense
                  :rules="account_name_year_fee_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="create_privider.account_drfee"
                  label="ເລກ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                  required
                  filled
                  dense
                  type="number"
                  counter
                  :rules="account_drfee_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="create_privider.account_name_drfee"
                  label="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                  required
                  filled
                  dense
                  :rules="account_name_drfee_Rul"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-toolbar-title class="mb-2">
                  <v-icon color="success">mdi-credit-card-marker</v-icon
                  >ເລືອກຮູບແບບການຊຳລະ: {{create_privider.provider_chanel}}
                </v-toolbar-title>
                <v-select
                  v-model="create_privider.provider_chanel"
                  :items="items01"
                  item-text="state"
                  :rules="provider_chanel_Rul"
                  item-value="abbr"
                  label="ເລືອກຊ່ອງທາງການຊຳລະ"
                  persistent-hint
                  multiple
                  filled
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-toolbar-title class="mb-2">
                  <v-icon color="success">mdi-send</v-icon
                  >ຮູບແບບການຮັບສົ່ງຂໍ້ມູນໃຫ້ທະນາຄານ:
                </v-toolbar-title>
                <v-select
                  v-model="create_privider.provider_send_data"
                  :items="items02"
                  item-text="state"
                  :rules="provider_send_data_Rul"
                  item-value="abbr"
                  label="ເລືອກຮູບແບບການຮັບສົ່ງຂໍ້ມູນໃຫ້ທະນາຄານ"
                  persistent-hint
                  single-line
                  filled
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-toolbar-title class="mb-2">
                  <v-icon color="success">mdi-cash-multiple</v-icon
                  >ຄ່າທຳນຽມໃນການດຳເນິດທຸລະກຳສຳຫຼັບ(Leasing):
                </v-toolbar-title>
                <v-select
                  v-model="create_privider.bill_charge_fee"
                  :items="items04"
                  item-text="state"
                  :rules="bill_charge_fee_Rul"
                  item-value="abbr"
                  label="ເລືອກຮູບແບບການຮັບສົ່ງຂໍ້ມູນໃຫ້ທະນາຄານ"
                  persistent-hint
                  single-line
                  :disabled="(create_privider.provider_chanel =='auto')"
                  filled
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-toolbar-title class="mb-2">
                  <v-icon color="success">mdi-archive-refresh</v-icon
                  >ຮູບແບບໃນການຕັດຄ່າທຳນຽມ(Leasing):
                </v-toolbar-title>
                <v-select
                  v-model="create_privider.bill_charge_type"
                  :items="items05"
                  item-text="state"
                  :rules="bill_charge_type_Rul"
                  item-value="abbr"
                  label="ເລືອກຮູບແບບໃນການຕັດຄ່າທຳນຽມ(Leasing)"
                  persistent-hint
                  single-line
                  :disabled="(create_privider.provider_chanel =='auto')"
                  filled
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-toolbar-title class="mb-2">
                  <v-icon color="success">mdi-cash-multiple</v-icon
                  >ຄ່າທຳນຽມໃນການດຳເນິດທຸລະກຳສຳຫຼັບ(Auto Debit):
                </v-toolbar-title>
                <v-select
                  v-model="create_privider.auto_charge_fee"
                  :items="items06"
                  item-text="state"
                  :rules="auto_charge_fee_Rul"
                  item-value="abbr"
                  label="ເລືອກຄ່າທຳນຽມໃນການດຳເນິດທຸລະກຳສຳຫຼັບ(Auto Debit)"
                  persistent-hint
                  single-line
                  :disabled="(create_privider.provider_chanel =='bill')"
                  filled
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-toolbar-title class="mb-2">
                  <v-icon color="success">mdi-archive-refresh</v-icon
                  >ຮູບແບບໃນການຕັດຄ່າທຳນຽມ(Auto Debit):
                </v-toolbar-title>
                <v-select
                  v-model="create_privider.auto_charge_type"
                  :items="items07"
                  item-text="state"
                  :rules="auto_charge_type_Rul"
                  item-value="abbr"
                  label="ເລືອກຮູບແບບໃນການຕັດຄ່າທຳນຽມ(Auto Debit)"
                  persistent-hint
                  single-line
                  :disabled="(create_privider.provider_chanel =='bill')"
                  filled
                ></v-select>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-toolbar-title class="mb-3">
                  <v-icon color="success">mdi-calendar-plus</v-icon
                  >ຈຳນວນເງິນທີ່ຕັດແຕ່ລະຄັ້ງແລະຮູບແບບໃນການຕັດ (Auto Debit):
                </v-toolbar-title>
                <v-row>
                  <v-col cols="6">
                    <v-select
                      v-model="create_privider.auto_condition_type"
                      :items="items08"
                      item-text="state"
                      :rules="auto_condition_type_Rul"
                      item-value="abbr"
                      label="ເລືອກການປ່ຽນແປງຍອດເງິນ"
                      persistent-hint
                      :disabled="(create_privider.provider_chanel =='bill')"
                      single-line
                      filled
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-model="create_privider.auto_cut_type"
                      :items="items09"
                      item-text="state"
                      :rules="auto_cut_typetype_Rul"
                      item-value="abbr"
                      label="ເລືອກຮູບແບບໃນການຕັດ"
                      persistent-hint
                      :disabled="(create_privider.provider_chanel =='bill')"
                      single-line
                      filled
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-toolbar-title class="mb-3">
                  <v-icon color="success">mdi-calendar-plus</v-icon
                  >ຮູບແບບການ(Loop):
                </v-toolbar-title>
                <v-row>
                  <v-col cols="6">
                    <v-select
                      v-model="create_privider.auto_data_cut_type"
                      :items="items08"
                      item-text="state"
                      :rules="auto_data_cut_type_Rul"
                      item-value="abbr"
                      label="ຮູບແບບສົ່ງຂໍ້ມູນເຂົ້າຕັດ"
                      :disabled="(create_privider.provider_chanel =='bill')"
                      persistent-hint
                      single-line
                      filled
                    ></v-select>
                  </v-col>
                  <v-col cols="6">
                    <v-select
                      v-model="create_privider.day_amount"
                      :rules="day_amount_Rul"
                      :items="items"
                      filled
                      :disabled="(create_privider.provider_chanel =='bill')"
                      label="ເລືອກຈຳນວນວັນວົນລູບ"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <v-layout row>
              <v-spacer></v-spacer>
              <v-btn color="danger" class="mr-4 white--text" @click="cancel">
                <v-icon>mdi-refresh</v-icon>[ຍົກເລິກ]
              </v-btn>
              <v-btn color="success" type="submit">
                <v-icon>mdi-content-save</v-icon>[ບັນທຶກ]
              </v-btn>
            </v-layout>
          </v-form>
        </v-card>
      </v-col>
      <div class="caption mt-10">{{ create_privider }}</div>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  name: "ManageUserCreate",
  data() {
    return {
      menu: false,
      modal: false,
      menu2: false,
      items: ["5", "10", "15", "20", "30", "31"],
      items01: [
        {
          state: "ຊຳລະເອງ(B-Pay)ຜ່ານຊ່ອງທາງ Bcel One,Bcel i-Bank,Counter",
          abbr: "bill",
        },
        { state: "ຕັດບັນຊີແບບໂອໂຕ(Auto Debit)", abbr: "auto" },
      ],
      items02: [
        {
          state: "ຮັບສົ່ງຂໍ້ມູນຜ່ານລະບົບຂອງທະນາຄານສະໜອງໃຫ້(Offline)",
          abbr: "offline",
        },
        { state: "ຮັບສົ່ງຂໍ້ມູນຜ່ານລະບົບຂອງບໍລິສັດ(API)", abbr: "online" },
      ],
      items03: [
        { state: "ສະກຸນເງິນກີບ", abbr: "LAK" },
        { state: "ສະກຸນເງິນໂດລາ", abbr: "USD" },
        { state: "ສະກຸນເງິນບາດ", abbr: "BATH" },
      ],
      items04: [
        {
          state: "ຄ່າທຳນຽມການດຳເນິນທຸລະກຳຕັດຈາກບັນຊີບໍລິສັດ",
          abbr: "biil_charge_provider",
        },
        {
          state: "ຄ່າທຳນຽມການດຳເນິດທູລະກຳຕັດຈາກບັນຊີລູກຄ້າ",
          abbr: "bill_charge_customer",
        },
      ],
      items05: [
        { state: "ຕັດເທື່ອລະລາຍການ", abbr: "charge_day" },
        { state: "ລວມຍອດທ້າຍທິດ", abbr: "charge_week" },
        { state: "ລວມຍອດທ້າຍເດືອນ", abbr: "charge_month" },
      ],
      items06: [
        {
          state: "ຄ່າທຳນຽມການດຳເນິນທຸລະກຳຕັດຈາກບັນຊີບໍລິສັດ",
          abbr: "auto_charge_provider",
        },
        {
          state: "ຄ່າທຳນຽມການດຳເນິດທູລະກຳຕັດຈາກບັນຊີລູກຄ້າ",
          abbr: "auto_charge_customer",
        },
      ],
      items07: [
        { state: "ຕັດເທື່ອລະລາຍການ", abbr: "charge_day" },
        { state: "ລວມຍອດທ້າຍທິດ", abbr: "charge_week" },
        { state: "ລວມຍອດທ້າຍເດືອນ", abbr: "charge_month" },
      ],
      items08: [
        { state: "ຈຳນວນເງິນເດິມ", abbr: "constant_amount" },
        { state: "ປ່ຽນແປງຈຳນວນເງິນ", abbr: "change_amount" },
      ],
      items09: [
        { state: "ໃນມື້", abbr: "onday" },
        { state: "ໃນເດືອນ", abbr: "onmonth" },
        { state: "3 ເດືອນ ຕໍ່ ຄັ້ງ", abbr: "threemonth" },
        { state: "6 ເດືອນ ຕໍ່ ຄັ້ງ", abbr: "sixmonth" },
      ],
      create_privider: {
        account: [{}],
        full_name: "",
        phone_no: "",
        line_phone: "",
        provider_name: "",
        provider_code: "",
        product_type: "",
        account_year_fee: "",
        account_name_year_fee: "",
        account_name_drfee: "",
        account_cr: "",
        account_name_cr: "",
        provider_chanel: "",
        provider_send_data: "",
        provider_currency: "",
        bill_charge_fee: "",
        bill_charge_type: "",
        auto_charge_fee: "",
        auto_charge_type: "",
        auto_condition_type: "",
        auto_cut_type: "",
        auto_data_cut_type: "",
        day_amount: "",
        contract_startdate: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        contract_stopdate: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
      },
      full_name: "",
      full_name_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ຊື່ ແລະ ນາມສະກຸນ"],
      phone_no: "",
      phone_no_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ເບີໂທລະສັບມືຖື",(v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນໂຕເລກເທົ່ານັ້ນ!"],
      line_phone: "",
      line_phone_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ເບີໂທລະສັບຕັ້ງໂຕະ",(v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນໂຕເລກເທົ່ານັ້ນ!"],
      provider_name: "",
      provider_name_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ຊື່ ບໍລິສັດ"],
      provider_code: "",
      provider_code_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ຊື້ ຫຍໍ້ບໍລິສັດ"],
      product_type: "",
      product_type_Rul: [(v) => !!v || "ກະລຸນາ ເລືອກປະເພດທຸລະກິດ"],
      account_year_fee: "",
      account_year_fee_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນ ເລກ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ",(v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນໂຕເລກເທົ່ານັ້ນ!"
      ],
      account_name_year_fee: "",
      account_name_year_fee_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນ ຊື່ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ",
      ],
      account_drfee: "",
      account_drfee_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນ ເລກ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ",(v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນໂຕເລກເທົ່ານັ້ນ!"
      ],
      account_name_drfee: "",
      account_name_drfee_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນ ຊື່ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ",
      ],
      account_cr: "",
      account_cr_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ເລກ ບັນຊີຮອງຮັບ",(v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນໂຕເລກເທົ່ານັ້ນ!"],
      account_name_cr: "",
      account_name_cr_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ຊື່ ບັນຊີຮອງຮັບ"],
      provider_chanel: "",
      provider_chanel_Rul: [(v) => !!v || "ກະລຸນາ ເລືອກ ຮູບແບບການຊຳລະ"],
      provider_send_data: "",
      provider_send_data_Rul: [
        (v) => !!v || "ກະລຸນາ ເລືອກ ຮູບແບບການຮັບສົ່ງຂໍ້ມູນໃຫ້ທະນາຄານ",
      ],
      provider_currency: "",
      provider_currency_Rul: [(v) => !!v || "ກະລຸນາ ເລືອກ ສະກຸນເງິນທີ່ຮັບຊຳລະ"],
      bill_charge_fee: "",
      bill_charge_fee_Rul: [
        (v) => !!v || "ກະລຸນາ ເລືອກ ຄ່າທຳນຽມໃນການດຳເນິດທຸລະກຳສຳຫຼັບ(Leasing)",
      ],
      bill_charge_type: "",
      bill_charge_type_Rul: [
        (v) => !!v || "ກະລຸນາ ເລືອກ ຮູບແບບໃນການຕັດຄ່າທຳນຽມ(Leasing)",
      ],
      auto_charge_fee: "",
      auto_charge_fee_Rul: [
        (v) =>
          !!v || "ກະລຸນາ ເລືອກ ຄ່າທຳນຽມໃນການດຳເນິດທຸລະກຳສຳຫຼັບ(Auto Debit)",
      ],
      auto_charge_type: "",
      auto_charge_type_Rul: [
        (v) => !!v || "ກະລຸນາ ເລືອກ ຮູບແບບໃນການຕັດຄ່າທຳນຽມ(Auto Debit)",
      ],
      auto_condition_type: "",
      auto_condition_type_Rul: [(v) => !!v || "ກະລຸນາ ເລືອກ ການປ່ຽນແປງຍອດເງິນ"],
      auto_cut_typetype: "",
      auto_cut_typetype_Rul: [(v) => !!v || "ກະລຸນາ ເລືອກ ຮູບແບບໃນການຕັດ"],
      auto_data_cut_type: "",
      auto_data_cut_type_Rul: [
        (v) => !!v || "ກະລຸນາ ເລືອກ ຮູບແບບການສົ່ງຂໍ້ມູນເຂົ້າຕັດ",
      ],
      day_amount: "",
      day_amount_Rul: [(v) => !!v || "ກະລຸນາ ເລືອກ ເລືອກຈຳນວນວັນວົນລູບ"],
      contract_startdate: "",
      contract_startdate_Rul: [
        (v) => !!v || "ກະລຸນາ ເລືອກ ວັນທີເລີ່ມຕົ້ນສັນຍາ",
      ],
      contract_stopdate: "",
      contract_stopdate_Rul: [(v) => !!v || "ກະລຸນາ ເລືອກ ວັນທີສິ້ນສຸດສັນຍາ"],
    };
  },
  methods: {
    deleteRow(index) {
      this.create_privider.account.splice([index], 1);
    },
    addRow() {
      this.create_privider.account.push({});
    },
    async submit() {
      console.log(this.create_privider);
      // if (this.$refs.form.validate()) {
        let formData = new FormData();
        const {
          full_name,
          phone_no,
          line_phone,
          provider_name,
          provider_code,
          product_type,
          account_year_fee,
          account_name_year_fee,
          account_name_drfee,
          account_cr,
          account_name_cr,
          provider_chanel,
          provider_send_data,
          provider_currency,
          bill_charge_fee,
          bill_charge_type,
          auto_charge_fee,
          auto_charge_type,
          auto_condition_type,
          auto_cut_type,
          auto_data_cut_type,
          day_amount,
          account,
        } = this.create_privider;
        formData.append("full_name", full_name);
        formData.append("phone_no", phone_no);
        formData.append("line_phone", line_phone);
        formData.append("product_type", product_type);
        formData.append("provider_code", provider_code);
        formData.append("account_year_fee", account_year_fee);
        formData.append("account_name_year_fee", account_name_year_fee);
        formData.append("account_name_drfee", account_name_drfee);
        formData.append("account_cr", account_cr);
        formData.append("account_name_cr", account_name_cr);
        formData.append("provider_currency", provider_currency);
        formData.append("provider_chanel", provider_chanel);
        formData.append("provider_send_data", provider_send_data);
        formData.append("bill_charge_fee", bill_charge_fee);
        formData.append("bill_charge_type", bill_charge_type);
        formData.append("auto_charge_fee", auto_charge_fee);
        formData.append("auto_charge_type", auto_charge_type);
        formData.append("auto_condition_type", auto_condition_type);
        formData.append("auto_cut_type", auto_cut_type);
        formData.append("auto_data_cut_type", auto_data_cut_type);
        formData.append("day_amount", day_amount);
        formData.append("provider_name", provider_name);
        formData.append("account",JSON.stringify(account));
        let result = await api.addProvider(formData);
        if (result.status == 200) {
          this.$router.back();
        }
      // }
    },
    clear() {
      this.$refs.form.reset();
    },
    cancel() {
      this.$router.back();
    },
  },
};
</script>
