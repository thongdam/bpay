<template lang="html">
  <v-container>
    <v-toolbar-title class="mb-5 text-center mt-5">
      <v-icon color="success">mdi-bank</v-icon
      >ແກ້ໄຂການຕັ້ງຄ່າໃຫ້ກັບບໍລິສັດເພື່ອເປິດນຳໃຊ້ບໍລິການ Bill payment
    </v-toolbar-title>
    {{ create_privider }}
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
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                v-model="create_privider.full_name"
                label="ຊື່ ແລະ ນາມສະກຸນ"
                required
                solo
                :rules="full_name_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                v-model="create_privider.phone_number"
                label="ໂທລະສັບມືຖື"
                required
                solo
                :rules="phone_no_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                v-model="create_privider.line_phone"
                label="ໂທລະສັບຕັ້ງໂຕະ"
                required
                solo
                :rules="line_phone_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                v-model="create_privider.provider_long"
                label="ຊື່ ບໍລິສັດ"
                required
                solo
                :rules="provider_name_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                v-model="create_privider.provider_auto"
                label="ຊື່ຫຍໍ້"
                required
                solo
                :rules="provider_code_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="2">
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
                    @click="$refs.menu.save(create_privider.contract_startdate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="12" md="2">
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
                    @click="$refs.menu2.save(create_privider.contract_stopdate)"
                  >
                    OK
                  </v-btn>
                </v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-select
                v-model="create_privider.product_type"
                :items="product_type"
                item-text="provider_group"
                :rules="product_type_Rul"
                single-line
                persistent-hint
                solo
                :selected="
                  create_privider.provider_group == 'LEASING' ? true : false
                "
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="2" md="2" xs="12" class="pa-4">
              <v-switch
                v-model="create_privider.provider_bill_status"
                inset
                color="success"
                :label="`ສະຖານະ: ${
                  create_privider.provider_bill_status == true ? 'ເປິດ' : 'ປິດ'
                }`"
              ></v-switch>
            </v-col>
          </v-row>
          <v-row v-if="n == 1">
            <v-col cols="12" sm="12" md="12">
              <v-btn @click="addRow" small text color="danger">
                <v-icon>mdi-briefcase-plus</v-icon>
                <span>ເພິ່ມບັນຊີ</span>
              </v-btn>
            </v-col>
            <v-row
              class="pa-3 rounded"
              v-for="(item, index) in updateAccounts"
              :key="index"
            >
              <v-col cols="12" sm="3" md="3">
                <v-text-field
                  v-model="item.provider_acc"
                  label="ເລກ ບັນຊີຮອງຮັບ"
                  required
                  solo
                  counter
                  type="number"
                  :rules="account_cr_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="2">
                <v-text-field
                  v-model="item.provider_acc_name"
                  label="ຊື່ ບັນຊີຮອງຮັບ"
                  required
                  solo
                  persistent-hint
                  :rules="account_name_cr_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="2">
                <v-text-field
                  v-model="item.provider_ccy"
                  label="ເລືອກສະກຸນເງິນທີ່ຮັບຊຳລະ"
                  required
                  solo
                  persistent-hint
                  :rules="account_name_cr_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="2">
                <v-text-field
                  v-model="item.min_amount"
                  label="ຍອດທີ່ອະນຸຍາດໃຫ້ຊຳລະຕ່ຳສຸດ"
                  required
                  type="number"
                  solo
                  persistent-hint
                  :rules="min_amount_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="2">
                <v-text-field
                  type="number"
                  v-model="item.max_amount"
                  label="ຍອດທີ່ອະນຸຍາດໃຫ້ຊຳລະສູງສຸດ"
                  required
                  solo
                  persistent-hint
                  :rules="max_amount_Rul"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="2"
                md="1"
                class="d-flex justify-center align-center mx-0 px-0"
              >
                <v-btn
                  icon
                  small
                  color="danger"
                  :disabled="Object.keys(updateAccounts).length === 1"
                  @click="deleteRow(index)"
                >
                  <v-icon>mdi-close-circle</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-row>
          <v-row v-if="n == 2" class="pa-10">
            <v-col cols="12" sm="12" md="4">
              <v-text-field
                v-model="create_privider.account_drfee"
                label="ເລກ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                required
                solo
                type="number"
                counter
                :rules="[account_drfee_Rul]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-text-field
                v-model="create_privider.account_name_drfee"
                label="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                required
                solo
                :rules="[account_name_drfee_Rul]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-select
                v-model="create_privider.provider_fee_type"
                :items="provider_fee_type"
                item-text="fee_company"
                :rules="provider_fee_type_Rul"
                label="ປະເພດຄ່າທຳນຽມ"
                solo
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-sheet>
                <v-switch
                  v-model="create_privider.charge_company"
                  :rules="
                    create_privider.charge_company == null
                      ? []
                      : [charge_company_Rul]
                  "
                  inset
                  color="success"
                  label="ຄ່າທຳນຽມເກັບຈາກບໍລິສັດ"
                  :value="create_privider.charge_company == 'Y' ? false : true"
                  :disabled="
                    (create_privider.charge_txn == true ? true : false) ||
                    (create_privider.charge_customer == true ? true : false)
                  "
                ></v-switch>
                <v-switch
                  v-model="create_privider.charge_customer"
                  inset
                  :rules="
                    create_privider.charge_company == null
                      ? [charge_customer_Rul]
                      : []
                  "
                  label="ຄ່າທຳນຽມເກັບຈາກລູກຄ້າ"
                  :value="create_privider.charge_company == 'N' ? false : true"
                  color="success"
                  :disabled="
                    (create_privider.charge_company == true ? true : false) ||
                    (create_privider.charge_month == true ? true : false)
                  "
                ></v-switch>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-sheet>
                <v-switch
                  v-model="create_privider.charge_txn"
                  inset
                  label="ຕັດເທື່ອລະລາຍການ"
                  color="success"
                  :value="create_privider.charge_txn == 'Y' ? false : true"
                  :disabled="
                    (create_privider.charge_month == true ? true : false) ||
                    (create_privider.charge_company == true ? true : false)
                  "
                  :rules="
                    create_privider.charge_company == null
                      ? [charge_txn_Rul]
                      : []
                  "
                ></v-switch>
                <v-switch
                  v-model="create_privider.charge_month"
                  inset
                  label="ລວມຍອດທ້າຍເດືອນ"
                  :value="create_privider.charge_month == 'Y' ? false : true"
                  :disabled="
                    (create_privider.charge_txn == true ? true : false) ||
                    (create_privider.charge_customer == true ? true : false)
                  "
                  color="success"
                  :rules="
                    create_privider.charge_company == null
                      ? []
                      : [charge_month_Rul]
                  "
                ></v-switch>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="12" md="4">
              <v-sheet>
                <v-switch
                  v-model="create_privider.input_amt"
                  inset
                  :label="`ອະນຸຍາດໃຫ້ຕີຈຳນວນເງິນ: ${
                    create_privider.input_amt.toString() == 'true'
                      ? 'ເປິດ'
                      : 'ປິດ'
                  }`"
                  color="success"
                ></v-switch>
              </v-sheet>
            </v-col>
          </v-row>
          <v-row v-if="n == 3">
            <v-container fluid>
              <v-row justify="space-around" align="center">
                <v-col style="width: 350px">
                  <h2>ເວລາເລິ່ມຕົ້ນ:</h2>
                  <v-time-picker
                    v-model="create_privider.start_time"
                    :max="end"
                    format="24hr"
                    :rules="[start_Rul]"
                    flat
                    scrollable
                  ></v-time-picker>
                </v-col>
                <v-col style="width: 350px">
                  <h2>ເວລາສິ້ນສຸດ:</h2>
                  <v-time-picker
                    v-model="create_privider.end_time"
                    :min="start"
                    format="24hr"
                    :rules="[end_Rul]"
                    flat
                    scrollable
                  ></v-time-picker>
                </v-col>
                <v-col cols="12" sm="3" md="3" class="pa-5">
                  <v-sheet>
                    <v-switch
                      v-for="(item, index) in loadChannel"
                      :key="index"
                      v-model="item.provider_channel"
                      inset
                      color="success"
                      :label="`ຜ່ານຊ່ອງທາງ: ${
                        item.provider_channel == 'true'
                          ? item.channel
                          : item.channel
                      }`"
                    ></v-switch>
                    <v-switch
                      v-model="create_privider.connect_mode"
                      inset
                      color="success"
                      :label="`ສົ່ງຂໍ້ມູນ: ${
                        create_privider.connect_mode.toString() == 'true'
                          ? 'ONLINE'
                          : 'OFFLINE'
                      }`"
                    ></v-switch>
                    <v-switch
                      v-model="create_privider.onday"
                      :label="`ປະຈຳວັນ: ${
                        create_privider.onday.toString() == 'true'
                          ? 'ເປິດ'
                          : 'ປິດ'
                      }`"
                      color="success"
                      inset
                    ></v-switch>
                    <v-switch
                      v-model="create_privider.stop_week"
                      :label="`ປະຈຳທິດ: ${
                        create_privider.stop_week.toString() == 'true'
                          ? 'ເປິດ'
                          : 'ປິດ'
                      }`"
                      color="success"
                      inset
                    ></v-switch>
                    <v-switch
                      v-model="create_privider.stop_month"
                      color="success"
                      :label="`ປະຈຳເດືອນ: ${
                        create_privider.stop_month.toString() == 'true'
                          ? 'ເປິດ'
                          : 'ປິດ'
                      }`"
                      inset
                    ></v-switch>
                    <v-switch
                      v-model="create_privider.aditional"
                      :label="`ວັນສຸກທ້າຍເດືອນ: ${
                        create_privider.aditional.toString() == 'true'
                          ? 'ເປິດ'
                          : 'ປິດ'
                      }`"
                      color="success"
                      inset
                    ></v-switch>
                  </v-sheet>
                </v-col>
              </v-row>
            </v-container>
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
          <v-icon dark> mdi-content-save-check </v-icon>
        </v-btn>
        <v-btn class="mx-2" fab dark color="red" @click="curr = 1">
          <v-icon dark> mdi-menu-left </v-icon>
        </v-btn>
      </v-stepper-content>
    </v-stepper>
  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  name: "ManageProviderCreateBill",
  data() {
    return {
      channels: [],
      time: null,
      menu: false,
      menus: false,
      modal: false,
      menu2: false,
      menu3: false,
      modal2: false,
      start: null,
      end: null,
      curr: 1,
      lastStep: 4,
      steps: [
        {
          name: "ຂໍ້ມູນບໍລິສັດ",
          rules: [(v) => !!v || "Required."],
          valid: true,
        },
        {
          name: "ບັນຊີສຳຫຼັບຮອງຮັບທຸລະກຳ",
          rules: [(v) => !!v || "Required."],
          valid: true,
        },
        {
          name: "ບັນຊີສຳຫຼັບຕັດຄ່າທຳນຽມ",
          rules: [(v) => !!v || "Required."],
          valid: true,
        },
        {
          name: "ເງື່ອນໄຂການນຳໃຊ້ລະບົບ",
          rules: [(v) => !!v || "Required."],
          valid: true,
        },
      ],
      currency: [
        { state: "ສະກຸນເງິນກີບ", abbr: "LAK" },
        { state: "ສະກຸນເງິນໂດລາ", abbr: "USD" },
        { state: "ສະກຸນເງິນບາດ", abbr: "THB" },
      ],
      valid: false,
      stepForm: [],
      product_type: [],
      provider_fee_type: [],
      updateAccounts: {
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
        provider_channel: "",
        provider_send_data: "",
        provider_currency: "",
        bill_charge_fee: "",
        bill_charge_type: "",
        onday: false,
        stop_week: false,
        stop_month: false,
        aditional: false,
        input_type: "",
        start_time: "",
        end_time: "",
        contract_startdate: "",
        contract_stopdate: "",
        provider_fixacc: "",
        account_drfee: "",
        provider_fee_type: "",
        charge_company: false,
        charge_customer: false,
        charge_month: false,
        charge_txn: false,
        provider_acc_name: "",
      },
      create_privider: {
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
        provider_channel: "",
        provider_send_data: "",
        provider_currency: "",
        bill_charge_fee: "",
        bill_charge_type: "",
        onday: false,
        stop_week: false,
        stop_month: false,
        aditional: false,
        input_type: "",
        start_time: "",
        end_time: "",
        contract_startdate: "",
        contract_stopdate: "",
        provider_fixacc: "",
        account_drfee: "",
        provider_fee_type: "",
        charge_customer: "",
        amount_allow: "",
        amount_no_allow: "",
        input_amt: false,
        connect_mode: false,
        channel: "",
        fee_id: false,
      },
      loadChannel: {
        provider_channel: false,
        channel: false,
      },
      full_name_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      phone_no_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
        (v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      ],
      line_phone: "",
      line_phone_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
        (v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      ],
      provider_name_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      provider_code_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      product_type_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      account_year_fee_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
        (v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      ],
      account_name_year_fee_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      account_drfee_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      account_name_drfee_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      account_cr_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
        (v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      ],
      account_name_cr_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      provider_channel_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      contract_startdate_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      contract_stopdate_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      min_amount_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      max_amount_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      provider_fixacc_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      provider_fee_type_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      bill_charge_type_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      provider_send_data_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      bill_charge_fee_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      start_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      end_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_currency_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      input_type_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      charge_company_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      charge_customer_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      charge_month_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      charge_txn_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
    };
  },
  async mounted() {
    this.loadProductType();
    this.loadFeeType();
    this.loadPosting();
    //load provider bill payment
    let result = await api.GetProviderBillById(this.$route.params.id);
    this.create_privider = result.data.body;
    //load account bill payment
    let resacc = await api.GETBILLACCOUNT(this.$route.params.id);
    this.updateAccounts = resacc.data.body;

    if (this.create_privider.charge_company == "Y") {
      this.create_privider.charge_company = true;
    } else {
      this.create_privider.charge_company = false;
    }
    if (this.create_privider.provider_bill_status == "A") {
      this.create_privider.provider_bill_status = true;
    } else {
      this.create_privider.provider_bill_status = false;
    }
    if (this.create_privider.charge_month == "Y") {
      this.create_privider.charge_month = true;
    } else {
      this.create_privider.charge_month = false;
    }
    if (this.create_privider.charge_txn == "Y") {
      this.create_privider.charge_txn = true;
    } else {
      this.create_privider.charge_txn = false;
    }
    if (this.create_privider.input_amt == "Y") {
      this.create_privider.input_amt = true;
    } else {
      this.create_privider.input_amt = false;
    }
    if (this.create_privider.connect_mode == "ONLINE") {
      this.create_privider.connect_mode = true;
    } else {
      this.create_privider.connect_mode = false;
    }
    if (this.create_privider.onday == "Y") {
      this.create_privider.onday = true;
    } else {
      this.create_privider.onday = false;
    }
    if (this.create_privider.stop_week == "Y") {
      this.create_privider.stop_week = true;
    } else {
      this.create_privider.stop_week = false;
    }
    if (this.create_privider.stop_month == "Y") {
      this.create_privider.stop_month = true;
    } else {
      this.create_privider.stop_month = false;
    }
    if (this.create_privider.aditional == "Y") {
      this.create_privider.aditional = true;
    } else {
      this.create_privider.aditional = false;
    }
    if (this.loadChannel[0].provider_channel == "IBANK") {
      this.loadChannel[0].provider_channel = "true";
    } else {
      this.loadChannel[0].provider_channel = "false";
    }
    if (this.loadChannel[1].provider_channel == "BCELONE") {
      this.loadChannel[1].provider_channel = "true";
    } else {
      this.loadChannel[1].provider_channel = "false";
    }
    if (this.loadChannel[2].provider_channel == "COUNTER") {
      this.loadChannel[2].provider_channel = "true";
    } else {
      this.loadChannel[2].provider_channel = "false";
    }
  },
  methods: {
    //get account for check
    async getAccounts() {
      console.log("getAccounts");
    },
    async loadPosting() {
      //load bpay posting
      let result = await api.GETBPAYPOSTING(this.$route.params.id);
      this.loadChannel = result.data.body;
    },
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
      this.updateAccounts.splice([index], 1);
    },
    addRow() {
      this.updateAccounts.push({});
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
      console.log(this.updateAccounts);
      let arr = [];
      this.updateAccounts.forEach((value, index) => {
        arr.push({
          provider_acc: value.provider_acc,
          account_name_cr: value.account_name_cr,
          provider_ccy: value.provider_ccy,
          max_amount: value.max_amount,
          min_amount: value.min_amount,
        });
      });
      this.steps[n].valid = false;
      let v = this.$refs.stepForm[n].validate();
      if (v == true) {
        this.channels.push({
          ibank: this.loadChannel[0].provider_channel,
          bcelone: this.loadChannel[1].provider_channel,
          counter: this.loadChannel[2].provider_channel,
        });
        let formData = new FormData();
        const {
          full_name,
          phone_number,
          line_phone,
          provider_long,
          provider_auto,
          contract_startdate,
          contract_stopdate,
          product_type,
          account_drfee,
          account_name_drfee,
          charge_company,
          charge_customer,
          charge_txn,
          charge_month,
          input_amt,
          start_time,
          end_time,
          connect_mode,
          onday,
          stop_week,
          stop_month,
          aditional,
        } = this.create_privider;
        formData.append("full_name", full_name);
        formData.append("phone_number", phone_number);
        formData.append("line_phone", line_phone);
        formData.append("provider_long", provider_long);
        formData.append("provider_auto", provider_auto);
        formData.append("contract_startdate", contract_startdate);
        formData.append("contract_stopdate", contract_stopdate);
        formData.append("product_type", product_type);
        formData.append("account_drfee", account_drfee);
        formData.append("account_name_drfee", account_name_drfee);
        formData.append("charge_company", charge_company);
        formData.append("charge_customer", charge_customer);
        formData.append("charge_txn", charge_txn);
        formData.append("charge_month", charge_month);
        formData.append("input_amt", input_amt);
        formData.append("start_time", start_time);
        formData.append("end_time", end_time);
        formData.append("connect_mode", connect_mode);
        formData.append("onday", onday);
        formData.append("stop_week", stop_week);
        formData.append("stop_month", stop_month);
        formData.append("aditional", aditional);
        formData.append("channels", JSON.stringify(this.channels));
        formData.append("provider_acc", JSON.stringify(arr));
        let result = await api.updateProviderBill(formData);
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
