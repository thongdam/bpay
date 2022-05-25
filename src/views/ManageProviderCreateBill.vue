<template lang="html">
  <v-container>
    {{ create_privider }}
    <v-toolbar-title class="mb-5 text-center mt-5">
      <v-icon color="success">mdi-bank</v-icon
      >ຕັ້ງຄ່າໃຫ້ກັບບໍລິສັດເພື່ອເປິດນຳໃຊ້ບໍລິການ Bill payment
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
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_privider.full_name"
                label="ຊື່ ແລະ ນາມສະກຸນ"
                required
                solo
                :rules="full_name_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_privider.phone_no"
                label="ໂທລະສັບມືຖື"
                required
                solo
                :rules="phone_no_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_privider.line_phone"
                label="ໂທລະສັບຕັ້ງໂຕະ"
                required
                solo
                :rules="line_phone_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_privider.provider_name"
                label="ຊື່ ບໍລິສັດ"
                required
                solo
                :rules="provider_name_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_privider.provider_code"
                label="ຊື່ຫຍໍ້"
                required
                solo
                :rules="provider_code_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="2" md="2" xs="12">
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
            <v-col cols="12" sm="2" md="2" xs="12">
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
            <v-col cols="12" sm="2" md="2" xs="12">
              <v-select
                v-model="create_privider.product_type"
                :items="product_type"
                item-text="provider_group"
                :rules="product_type_Rul"
                label="ປະເພດທຸລະກິດ"
                single-line
                persistent-hint
                solo
              ></v-select>
            </v-col>
            <v-col cols="12" sm="2" md="2" xs="12" class="pa-4">
              <v-switch
                v-model="create_privider.provider_status"
                inset
                color="success"
                :label="`ສະຖານະ: ${
                  create_privider.provider_status.toString() == 'true'
                    ? 'ເປິດ'
                    : 'ປິດ'
                }`"
              ></v-switch>
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
              <v-col cols="12" sm="2" md="2" xs="12">
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
              <v-col cols="12" sm="4" md="4" xs="12">
                <v-text-field
                  v-model="acc.account_name_cr"
                  label="ຊື່ ບັນຊີຮອງຮັບ"
                  required
                  solo
                  persistent-hint
                  :rules="account_name_cr_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="1" md="1" xs="12">
                <v-select
                  v-model="acc.provider_currency"
                  :items="currency"
                  item-text="abbr"
                  :rules="provider_currency_Rul"
                  label="ເລືອກສະກຸນເງິນທີ່ຮັບຊຳລະ"
                  single-line
                  persistent-hint
                  solo
                  @change="getAccounts()"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="2" md="2" xs="12">
                <v-text-field
                  v-model="acc.min_amount"
                  label="ຍອດທີ່ອະນຸຍາດໃຫ້ຊຳລະຕ່ຳສຸດ"
                  required
                  type="number"
                  solo
                  persistent-hint
                  :rules="min_amount_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="2" xs="12">
                <v-text-field
                  type="number"
                  v-model="acc.max_amount"
                  label="ຍອດທີ່ອະນຸຍາດໃຫ້ຊຳລະສູງສຸດ"
                  required
                  solo
                  persistent-hint
                  :rules="max_amount_Rul"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                md="1"
                sm="1"
                xs="12"
                class="d-flex justify-center align-center mx-0 px-0"
              >
                <v-btn
                  icon
                  small
                  color="danger"
                  :disabled="Object.keys(create_privider.account).length === 1"
                  @click="deleteRow(index)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </div>

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
                  inset
                  color="success"
                  label="ຄ່າທຳນຽມເກັບຈາກບໍລິສັດ"
                  :disabled="
                    create_privider.charge_customer == true
                      ? true
                      : create_privider.charge_txn == true
                      ? true
                      : false
                  "
                  :rules="
                    create_privider.charge_customer == true
                      ? []
                      : [charge_company_Rul]
                  "
                ></v-switch>
                <v-switch
                  v-model="create_privider.charge_customer"
                  inset
                  label="ຄ່າທຳນຽມເກັບຈາກລູກຄ້າ"
                  color="success"
                  :disabled="
                    create_privider.charge_company == true ? true : false
                  "
                  :rules="
                    create_privider.charge_company == true
                      ? []
                      : [charge_customer_Rul]
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
                  :disabled="
                    create_privider.charge_company == true ? true : false
                  "
                  :rules="
                    create_privider.charge_company == true
                      ? []
                      : [charge_txn_Rul]
                  "
                ></v-switch>
                <v-switch
                  v-model="create_privider.charge_month"
                  inset
                  label="ຕັດລວມຍອດທ້າຍເດືອນ"
                  color="success"
                  :disabled="
                    create_privider.charge_customer == true
                      ? true
                      : create_privider.charge_txn == true
                      ? true
                      : false
                  "
                  :rules="
                    create_privider.charge_customer == true
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
                      v-model="create_privider.ibank"
                      inset
                      color="success"
                      :label="`ຊຳລະຜ່ານຊ່ອງທາງ Ibank: ${
                        create_privider.ibank.toString() == 'true'
                          ? 'ເປິດ'
                          : 'ປິດ'
                      }`"
                    ></v-switch>
                    <v-switch
                      v-model="create_privider.bcelone"
                      inset
                      color="success"
                      :label="`ຊຳລະຜ່ານຊ່ອງທາງ Bcel one: ${
                        create_privider.bcelone.toString() == 'true'
                          ? 'ເປິດ'
                          : 'ປິດ'
                      }`"
                    ></v-switch>
                    <v-switch
                      v-model="create_privider.counter"
                      inset
                      color="success"
                      :label="`ຊຳລະຜ່ານຊ່ອງທາງ Counter: ${
                        create_privider.counter.toString() == 'true'
                          ? 'ເປິດ'
                          : 'ປິດ'
                      }`"
                    ></v-switch>
                    <v-switch
                      v-model="create_privider.connect_mode"
                      inset
                      color="success"
                      :label="`ສົ່ງຂໍ້ມູນແບບ: ${
                        create_privider.connect_mode.toString() == 'false'
                          ? 'OFFLINE'
                          : 'ONLINE'
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
          <v-icon dark> mdi-content-save </v-icon>
        </v-btn>
        <v-btn class="mx-2" fab dark color="red" @click="curr = 1">
          <v-icon dark> mdi-menu-left </v-icon>
        </v-btn>
      </v-stepper-content>
    </v-stepper>
    <v-dialog v-model="errorAccount" max-width="500px">
      <v-card align="center">
        <v-card-title class="justify-center">
          <v-alert dense outlined type="error">
            ເລກບັນຊີ
            <strong>ບໍ່ຖືກຕ້ອງ</strong> ກະລຸນາກວດສອບ.
          </v-alert>
        </v-card-title>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  name: "ManageProviderCreateBill",
  data() {
    return {
      errorAccount: false,
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
      currency: [
        { state: "ສະກຸນເງິນກີບ", abbr: "LAK" },
        { state: "ສະກຸນເງິນໂດລາ", abbr: "USD" },
        { state: "ສະກຸນເງິນບາດ", abbr: "THB" },
      ],
      create_privider: {
        account: [
          {
            account_cr: "",
            account_name_cr: "",
            provider_currency: "",
            min_amount: "",
            max_amount: "",
          },
        ],
        full_name: "",
        phone_no: "",
        line_phone: "",
        provider_name: "",
        provider_code: "",
        product_type: "",
        account_name_drfee: "",
        provider_chanel: "",
        onday: false,
        stop_week: false,
        stop_month: false,
        aditional: false,
        start_time: "",
        end_time: "",
        ibank: false,
        bcelone: false,
        counter: false,
        connect_mode: false,
        charge_company: false,
        charge_txn: false,
        charge_month: false,
        input_amt: false,
        provider_status: false,
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
        account_drfee: "",
        provider_fee_type: "",
      },
      check_account: {
        txnAcc: "",
        txnCcy: "",
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
      provider_chanel_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
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
      input_type_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      charge_company_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      charge_customer_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      charge_month_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      charge_txn_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      input_amt_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
    };
  },
  async mounted() {
    this.loadProductType();
    this.loadFeeType();
  },
  methods: {
    //get account for check
    async getAccounts() {
      let txnAcc;
      let txnCcy;
      let formData = new FormData();
      this.create_privider.account.forEach((value, index) => {
        txnAcc = value.account_cr;
        txnCcy = value.provider_currency;
      });
      formData.append("txnAcc", txnAcc);
      formData.append("txnCcy", txnCcy);
      let result = await api.getAccounts(formData);
      if (result.data.body.respCode == "00") {
        this.create_privider.account.forEach((value, index) => {
          value.account_name_cr = result.data.body.accountName;
        });
      } else {
        this.errorAccount = true;
        this.create_privider.account.forEach((value, index) => {
          value.account_name_cr = "";
        });
      }
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
      this.create_privider.account.splice([index], 1);
    },
    addRow() {
      this.create_privider.account.push({
        account_cr: "",
        account_name_cr: "",
        provider_currency: "",
        min_amount: "",
        max_amount: "",
      });
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
      console.log(this.create_privider);
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
          account_name_drfee,
          provider_chanel,
          onday,
          stop_week,
          stop_month,
          aditional,
          start_time,
          end_time,
          ibank,
          bcelone,
          counter,
          connect_mode,
          charge_company,
          charge_txn,
          charge_month,
          input_amt,
          provider_status,
          contract_startdate,
          contract_stopdate,
          account_drfee,
          provider_fee_type,
          account
        } = this.create_privider;
        formData.append("full_name", full_name);
        formData.append("phone_no", phone_no);
        formData.append("line_phone", line_phone);
        formData.append("provider_name", provider_name);
        formData.append("provider_code", provider_code);
        formData.append("product_type", product_type);
        formData.append("account_name_drfee", account_name_drfee);
        formData.append("provider_chanel", provider_chanel);
        formData.append("onday", onday);
        formData.append("stop_week", stop_week);
        formData.append("stop_month", stop_month);
        formData.append("aditional", aditional);
        formData.append("start_time", start_time);
        formData.append("end_time", end_time);
        formData.append("ibank", ibank);
        formData.append("bcelone", bcelone);
        formData.append("counter", counter);
        formData.append("connect_mode", connect_mode);
        formData.append("charge_company", charge_company);
        formData.append("charge_txn", charge_txn);
        formData.append("charge_month", charge_month);
        formData.append("input_amt", input_amt);
        formData.append("provider_status", provider_status);
        formData.append("contract_startdate", contract_startdate);
        formData.append("contract_stopdate", contract_stopdate);
        formData.append("account_drfee", account_drfee);
        formData.append("provider_fee_type", provider_fee_type);
        formData.append("account", JSON.stringify(account));
        console.log(this.create_privider);
        let result = await api.addProviderBill(formData);
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
