<template lang="html">
  <v-row class="justify-center">
    <v-container>
      <v-toolbar-title class="mb-5 text-center mt-5">
        <v-icon color="success">mdi-bank</v-icon
        >ຕັ້ງຄ່າໃຫ້ກັບບໍລິສັດເພື່ອເປິດນຳໃຊ້ບໍລິການ Auto debit
      </v-toolbar-title>
      <v-stepper v-model="curr" color="green">
        <v-stepper-header class="overflow-x-auto">
          <v-stepper-step
            v-for="(step, n) in steps"
            :key="n"
            :complete="stepComplete(n + 1)"
            :step="n + 1"
            :rules="[(value) => !!step.valid]"
            :color="stepStatus(n + 1)"
          >
            {{ step.name }}
          </v-stepper-step>
        </v-stepper-header>
        <v-stepper-content v-for="(step, n) in steps" :step="n + 1" :key="n">
          {{ step.name }}
          <v-form :ref="'stepForm'" v-model="step.valid" lazy-validation>
            <v-row v-if="n == 0">
              <v-col cols="3">
                <v-text-field
                  v-model="create_privider.full_name"
                  label="ຊື່ ແລະ ນາມສະກຸນ"
                  required
                  solo
                  :rules="full_name_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="create_privider.phone_no"
                  label="ໂທລະສັບມືຖື"
                  required
                  solo
                  :rules="phone_no_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="create_privider.line_phone"
                  label="ໂທລະສັບຕັ້ງໂຕະ"
                  required
                  solo
                  :rules="line_phone_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="create_privider.provider_name"
                  label="ຊື່ ບໍລິສັດ"
                  required
                  solo
                  :rules="provider_name_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="create_privider.provider_code"
                  label="ຊື່ຫຍໍ້"
                  required
                  solo
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
                      solo
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
                      @click="
                        $refs.menu.save(create_privider.contract_startdate)
                      "
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
                      solo
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
                      @click="
                        $refs.menu2.save(create_privider.contract_stopdate)
                      "
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="create_privider.product_type"
                  :items="product_type"
                  item-text="provider_group"
                  :rules="product_type_Rul"
                  label="ຮູບແບບການຊຳລະ"
                  single-line
                  persistent-hint
                  solo
                ></v-select>
              </v-col>
            </v-row>
            <div v-if="n == 1">
              <v-btn @click="addRow" small text color="danger" class="ml-2">
                <v-icon>mdi-briefcase-plus</v-icon>
                <span>ເພິ່ມບັນຊີ</span>
              </v-btn>
              <v-row
                class="rounded"
                v-for="(acc, index) in create_privider.account"
                :key="index"
                style="border: 1px solid lightgrey"
              >
                <v-col cols="4">
                  <v-text-field
                    v-model="acc.account_cr"
                    label="ເລກ ບັນຊີຮອງຮັບ"
                    required
                    solo
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
                    solo
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
                    solo
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
                    color="danger"
                    :disabled="
                      Object.keys(create_privider.account).length === 1
                    "
                    @click="deleteRow(index)"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </div>
            <v-row v-if="n == 2">
              <v-col cols="6">
                <v-text-field
                  v-model="create_privider.account_year_fee"
                  label="ເລກ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ"
                  required
                  solo
                  type="number"
                  :rules="account_year_fee_Rul"
                  counter
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="create_privider.account_name_year_fee"
                  label="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ"
                  required
                  solo
                  :rules="account_name_year_fee_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="create_privider.provider_fixacc"
                  :items="fixaccount"
                  item-text="state"
                  :rules="provider_fixacc_Rul"
                  item-value="abbr"
                  label="ບັນຊີທີ່ຕ້ອງການໃຫ້ລະບົບຕັດຄ່າທຳນຽມ"
                  persistent-hint
                  solo
                ></v-select>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="create_privider.account_drfee"
                  label="ເລກ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                  required
                  solo
                  type="number"
                  counter
                  :rules="
                    create_privider.provider_fixacc == 'account_billpayment'
                      ? []
                      : [account_drfee_Rul]
                  "
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="create_privider.account_name_drfee"
                  label="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                  required
                  solo
                  :rules="
                    create_privider.provider_fixacc == 'account_billpayment'
                      ? []
                      : [account_name_drfee_Rul]
                  "
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row v-if="n == 3">
              <v-col cols="3">
                <v-select
                  v-model="create_privider.provider_chanel"
                  :items="items01"
                  item-text="state"
                  :rules="provider_chanel_Rul"
                  item-value="abbr"
                  label="ຮູບແບບການຊຳລະ"
                  persistent-hint
                  solo
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="create_privider.provider_fee_type"
                  :items="provider_fee_type"
                  item-text="fee_company"
                  :rules="provider_fee_type_Rul"
                  label="ປະເພດຄ່າທຳນຽມ"
                  persistent-hint
                  solo
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="create_privider.auto_charge_fee"
                  :items="items06"
                  item-text="state"
                  :rules="
                    create_privider.provider_chanel == 'bill'
                      ? []
                      : [auto_charge_fee_Rul]
                  "
                  item-value="abbr"
                  label="ຄ່າທຳນຽມໃນການດຳເນິດທຸລະກຳສຳຫຼັບ(Auto Debit)"
                  persistent-hint
                  single-line
                  :disabled="create_privider.provider_chanel == 'bill'"
                  solo
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="create_privider.auto_charge_type"
                  :items="items07"
                  item-text="state"
                  :rules="
                    create_privider.provider_chanel == 'bill'
                      ? []
                      : [auto_charge_type_Rul]
                  "
                  item-value="abbr"
                  label="ຮູບແບບໃນການຕັດຄ່າທຳນຽມ(Auto Debit)"
                  persistent-hint
                  single-line
                  :disabled="create_privider.provider_chanel == 'bill'"
                  solo
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="create_privider.auto_condition_type"
                  :items="items08"
                  item-text="state"
                  :rules="
                    create_privider.provider_chanel == 'bill'
                      ? []
                      : [auto_condition_type_Rul]
                  "
                  item-value="abbr"
                  label="ປ່ຽນແປງຍອດເງິນ"
                  persistent-hint
                  :disabled="create_privider.provider_chanel == 'bill'"
                  single-line
                  solo
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="create_privider.auto_cut_type"
                  :items="items09"
                  item-text="state"
                  :rules="
                    create_privider.provider_chanel == 'bill'
                      ? []
                      : [auto_cut_type_Rul]
                  "
                  item-value="abbr"
                  label="ເລືອກຮູບແບບໃນການຕັດ"
                  persistent-hint
                  :disabled="create_privider.provider_chanel == 'bill'"
                  single-line
                  solo
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="create_privider.auto_data_cut_type"
                  :items="items11"
                  item-text="state"
                  :rules="
                    create_privider.provider_chanel == 'bill'
                      ? []
                      : [auto_data_cut_type_Rul]
                  "
                  item-value="abbr"
                  label="ຮູບແບບສົ່ງຂໍ້ມູນເຂົ້າຕັດ"
                  :disabled="create_privider.provider_chanel == 'bill'"
                  persistent-hint
                  single-line
                  solo
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="create_privider.day_amount"
                  :rules="
                    create_privider.provider_chanel == 'bill' ||
                    create_privider.auto_data_cut_type == 'notcutback' ||
                    create_privider.auto_data_cut_type == 'endofmonth'
                      ? []
                      : [day_amount_Rul]
                  "
                  solo
                  :disabled="
                    create_privider.provider_chanel == 'bill' ||
                    create_privider.auto_data_cut_type == 'notcutback' ||
                    create_privider.auto_data_cut_type == 'endofmonth'
                  "
                  label="ເລືອກຈຳນວນວັນວົນລູບ"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
          <v-btn
            class="mx-2"
            fab
            dark
            color="primary"
            v-if="n + 1 < lastStep"
            @click="validate(n)"
            :disabled="!step.valid"
          >
            <v-icon dark> mdi-menu-right </v-icon>
          </v-btn>
          <v-btn
            v-else
            class="mx-2"
            fab
            dark
            color="success"
            @click="done(n)"
            :disabled="!step.valid"
          >
            <v-icon dark> mdi-content-save </v-icon>
          </v-btn>
          <v-btn class="mx-2" fab dark color="red" @click="curr = 1">
            <v-icon dark> mdi-menu-left </v-icon>
          </v-btn>
        </v-stepper-content>
      </v-stepper>
    </v-container>
  </v-row>
</template>

<script>
import api from "@/services/api";
export default {
  name: "ManageProviderCreate",
  data() {
    return {
      menu: false,
      modal: false,
      menu2: false,
      curr: 1,
      lastStep: 4,
      steps: [
        {
          name: "ຂໍ້ມູນບໍລິສັດ",
          rules: [(v) => !!v || "Required."],
          valid: true,
        },
        {
          name: "ບັນຊີຮອງຮັບການເຮັດທຸລະກຳ",
          rules: [(v) => !!v || "Required."],
          valid: true,
        },
        {
          name: "ບັນຊີສຳຫຼັບຕັດຄ່າທຳນຽມ",
          rules: [
            (v) => (v && v.length >= 4) || "Enter at least 4 characters.",
          ],
          valid: true,
        },
        {
          name: "ເງື່ອນໄຂການນຳໃຊ້ລະບົບ",
          rules: [(v) => !!v || "Required."],
          valid: true,
        },
      ],
      valid: false,
      stepForm: [],
      product_type: [],
      provider_fee_type: [],
      items: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31",
      ],
      items01: [
        { state: "ຕັດບັນຊີແບບໂອໂຕ(Auto Debit)", abbr: "A" },
      ],
      fixaccount: [
        {
          state: "ຕັດຄ່າທຳນຽມຈາກບັນຊີທົ່ວໄປ",
          abbr: "account_cr",
        },
        { state: "ຕັດຈາກບັນຊີຮອງຮັບບິວເພເມັນ", abbr: "account_billpayment" },
      ],
      itemmin_amount: [
        {
          state: "ຊຳລະເອງ(B-Pay)ຜ່ານຊ່ອງທາງ Bcel One,Bcel i-Bank,Counter",
          abbr: "bill",
        },
      ],
      itemmax_amount: [
        {
          state: "ຊຳລະເອງ(B-Pay)ຜ່ານຊ່ອງທາງ Bcel One,Bcel i-Bank,Counter",
          abbr: "bill",
        },
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
      items11: [
        { state: "ບໍ່ຕັດຄືນ", abbr: "notcutback" },
        { state: "ຕັດຄືນ", abbr: "cutback" },
        { state: "ສິ້ນສຸດເດືອນ", abbr: "endofmonth" },
      ],
      items09: [
        { state: "ວັນ", abbr: "onday" },
        { state: "ເດືອນ", abbr: "onmonth" },
        { state: "3 ເດືອນ", abbr: "threemonth" },
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
        provider_fixacc: "",
        account_drfee: "",
        provider_fee_type: "",
      },
      full_name: "",
      full_name_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ຊື່ ແລະ ນາມສະກຸນ"],
      phone_no: "",
      phone_no_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນ ເບີໂທລະສັບມືຖື",
        (v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນໂຕເລກເທົ່ານັ້ນ!",
      ],
      line_phone: "",
      line_phone_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນ ເບີໂທລະສັບຕັ້ງໂຕະ",
        (v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນໂຕເລກເທົ່ານັ້ນ!",
      ],
      provider_name_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ຊື່ ບໍລິສັດ"],
      provider_code_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ຊື້ ຫຍໍ້ບໍລິສັດ"],
      product_type_Rul: [(v) => !!v || "ກະລຸນາ ເລືອກປະເພດທຸລະກິດ"],
      account_year_fee_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນ ເລກ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ",
        (v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນໂຕເລກເທົ່ານັ້ນ!",
      ],
      account_name_year_fee_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນ ຊື່ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ",
      ],
      account_drfee_Rul: (v) =>
        !!v || "ກະລຸນາປ້ອນ ເລກ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ",
      account_name_drfee_Rul: (v) =>
        !!v || "ກະລຸນາປ້ອນ ຊື່ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ",
      account_cr_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນ ເລກ ບັນຊີຮອງຮັບ",
        (v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນໂຕເລກເທົ່ານັ້ນ!",
      ],
      account_name_cr_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ຊື່ ບັນຊີຮອງຮັບ"],
      provider_chanel_Rul: [(v) => !!v || "ກະລຸນາ ເລືອກ ຮູບແບບການຊຳລະ"],
      provider_send_data_Rul: [
        (v) => !!v || "ກະລຸນາ ເລືອກ ຮູບແບບການຮັບສົ່ງຂໍ້ມູນໃຫ້ທະນາຄານ",
      ],
      provider_currency_Rul: [(v) => !!v || "ກະລຸນາ ເລືອກ ສະກຸນເງິນທີ່ຮັບຊຳລະ"],
      bill_charge_fee_Rul: (v) =>
        !!v || "ກະລຸນາ ເລືອກ ຄ່າທຳນຽມໃນການດຳເນິດທຸລະກຳສຳຫຼັບ(Leasing)",
      bill_charge_type_Rul: (v) =>
        !!v || "ກະລຸນາ ເລືອກ ຮູບແບບໃນການຕັດຄ່າທຳນຽມ(Leasing)",
      auto_charge_fee_Rul: (v) =>
        !!v || "ກະລຸນາ ເລືອກ ຄ່າທຳນຽມໃນການດຳເນິດທຸລະກຳສຳຫຼັບ(Auto Debit)",
      auto_charge_type_Rul: (v) =>
        !!v || "ກະລຸນາ ເລືອກ ຮູບແບບໃນການຕັດຄ່າທຳນຽມ(Auto Debit)",
      auto_condition_type_Rul: (v) => !!v || "ກະລຸນາ ເລືອກ ການປ່ຽນແປງຍອດເງິນ",
      auto_cut_type_Rul: (v) => !!v || "ກະລຸນາ ເລືອກ ຮູບແບບໃນການຕັດ",
      auto_data_cut_type_Rul: (v) =>
        !!v || "ກະລຸນາ ເລືອກ ຮູບແບບການສົ່ງຂໍ້ມູນເຂົ້າຕັດ",
      day_amount_Rul: (v) => !!v || "ກະລຸນາ ເລືອກ ເລືອກຈຳນວນວັນວົນລູບ",
      contract_startdate_Rul: [
        (v) => !!v || "ກະລຸນາ ເລືອກ ວັນທີເລີ່ມຕົ້ນສັນຍາ",
      ],
      contract_stopdate_Rul: [(v) => !!v || "ກະລຸນາ ເລືອກ ວັນທີສິ້ນສຸດສັນຍາ"],
      min_amount_Rul: [(v) => !!v || "ກະລຸນາ ປ້ອນຈຳນວນເງິນຕ່ຳສຸດ"],
      max_amount_Rul: [(v) => !!v || "ກະລຸນາ ປ້ອນຈຳນວນເງິນສູງສຸດ"],
      provider_fixacc_Rul: [
        (v) => !!v || "ກະລຸນາ ເລືອກບັນຊີຄ່າທຳນຽມທີ່ຕ້ອງການຕັດ",
      ],
      provider_fee_type_Rul: [(v) => !!v || "ກະລຸນາ ເລືອກປະເພດຄ່າທຳນຽມ"],
    };
  },
  async mounted() {
    this.loadProductType();
    this.loadFeeType();
  },
  methods: {
    async loadProductType() {
      let result = await api.getProductType();
      this.product_type = result.data.body;
    },
    async loadFeeType() {
      let result = await api.getFeeType();
      this.provider_fee_type = result.data.body;
    },
    darkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    },
    deleteRow(index) {
      this.create_privider.account.splice([index], 1);
    },
    addRow() {
      this.create_privider.account.push({});
    },
    clear() {
      this.$refs.form.reset();
    },
    cancel() {
      this.$router.back();
    },
    stepComplete(step) {
      return this.curr > step;
    },
    stepStatus(step) {
      return this.curr > step ? "green" : "blue";
    },
    validate(n) {
      this.steps[n].valid = false;
      let v = this.$refs.stepForm[n].validate();
      if (v) {
        this.steps[n].valid = true;
        this.curr = n + 2;
      }
    },
    async done(n) {
      this.steps[n].valid = false;
      let v = this.$refs.stepForm[n].validate();
      if (v == true) {
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
          contract_startdate,
          contract_stopdate,
          provider_fixacc,
          account_drfee,
          provider_fee_type,
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
        formData.append("contract_startdate", contract_startdate);
        formData.append("contract_stopdate", contract_stopdate);
        formData.append("provider_fixacc", provider_fixacc);
        formData.append("account_drfee", account_drfee);
        formData.append("account", JSON.stringify(account));
        formData.append("provider_fee_type", provider_fee_type);
        let result = await api.addProvider(formData);
        if (result.status == 200) {
          this.$router.back();
        }
      } else {
        this.steps[n].valid = true;
        this.curr = n + 2;
      }
      this.curr = 4;
    },
  },
};
</script>
<style lang="scss" scoped></style>
