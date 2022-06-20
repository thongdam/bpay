<template lang="html">
  <v-container>
    <v-toolbar-title class="mb-5 text-center mt-5">
      <v-icon color="success">mdi-bank</v-icon
      >ແກ້ໄຂການຕັ້ງຄ່າໃຫ້ກັບບໍລິສັດເພື່ອເປິດນຳໃຊ້ບໍລິການ Bill payment
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
          <v-row v-if="n == 0" class="mt-5">
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-autocomplete
                v-model="create_provider.providers"
                :items="viewProviders"
                item-text="provider_code"
                outlined
                label="ບໍລິສັດ"
                placeholder="ບໍລິສັດ"
                @change="fetchProviders()"
              ></v-autocomplete>
            </v-col>
            <v-col co <v-col cols="12" sm="12" md="3">
              <v-text-field
                v-model="create_provider.provider_code"
                label="ຊື່ຫຍໍ້"
                placeholder="ຊື່ຫຍໍ້"
                outlined
                required
                :rules="provider_code_Rul"
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                v-model="create_provider.full_name"
                required
                label="ຊື່ ແລະ ນາມສະກຸນ"
                placeholder="ຊື່ ແລະ ນາມສະກຸນ"
                outlined
                :rules="full_name_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                v-model="create_provider.phone_number"
                required
                label="ໂທລະສັບມືຖື"
                placeholder="ໂທລະສັບມືຖື"
                outlined
                type="number"
                :rules="phone_no_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                v-model="create_provider.line_phone"
                label="ໂທລະສັບຕັ້ງໂຕະ"
                placeholder="ໂທລະສັບຕັ້ງໂຕະ"
                outlined
                required
                type="number"
                :rules="line_phone_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-text-field
                v-model="create_provider.provider_name"
                label="ຊື່ ບໍລິສັດ"
                placeholder="ຊື່ ບໍລິສັດ"
                outlined
                required
                :rules="provider_name_Rul"
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
                    v-model="create_provider.contract_startdate"
                    label="ເລືອກວັນທີເລິ່ມຕົ້ນສັນຍາ"
                    placeholder="ເລືອກວັນທີເລິ່ມຕົ້ນສັນຍາ"
                    persistent-hint
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    prepend-inner-icon="mdi-calendar-plus"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="create_provider.contract_startdate"
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
                    v-model="create_provider.contract_stopdate"
                    label="ເລືອກວັນທີເລິ່ມຕົ້ນສັນຍາ"
                    placeholder="ເລືອກວັນທີເລິ່ມຕົ້ນສັນຍາ"
                    persistent-hint
                    v-bind="attrs"
                    v-on="on"
                    outlined
                    prepend-inner-icon="mdi-calendar-plus"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="create_provider.contract_stopdate"
                  no-title
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="12" md="3">
              <v-select
                v-model="create_provider.product_type"
                :items="product_type"
                item-text="provider_group"
                :rules="product_type_Rul"
                label="ເລືອກປະເພດທູລະກິດ"
                placeholder="ເລືອກປະເພດທູລະກິດ"
                outlined
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="4" md="4" xs="12" class="pa-4">
              <v-switch
                v-model="create_provider.provider_status"
                inset
                color="success"
                :label="`ສະຖານະ: ${
                  create_provider.provider_status == true ? 'ເປິດ' : 'ປິດ'
                }`"
              ></v-switch>
            </v-col>
          </v-row>
          <v-row v-if="n == 1" class="mt-5">
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
                  placeholder="ເລກ ບັນຊີຮອງຮັບ"
                  outlined
                  required
                  counter
                  type="number"
                  :rules="account_cr_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="2">
                <v-select
                  v-model="item.provider_ccy"
                  :items="currency"
                  item-text="abbr"
                  :rules="provider_currency_Rul"
                  label="ເລືອກສະກຸນເງິນທີ່ຮັບຊຳລະ"
                  placeholder="ເລືອກສະກຸນເງິນທີ່ຮັບຊຳລະ"
                  outlined
                  @change="CheckAccounts()"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="2" md="2">
                <v-text-field
                  v-model="item.provider_acc_name"
                  label="ຊື່ ບັນຊີຮອງຮັບ"
                  placeholder="ຊື່ ບັນຊີຮອງຮັບ"
                  outlined
                  required
                  :rules="account_name_cr_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="2">
                <v-text-field
                  v-model="item.min_amount"
                  label="ຍອດທີ່ອະນຸຍາດໃຫ້ຊຳລະຕ່ຳສຸດ"
                  placeholder="ຍອດທີ່ອະນຸຍາດໃຫ້ຊຳລະຕ່ຳສຸດ"
                  outlined
                  type="number"
                  :rules="min_amount_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="2">
                <v-text-field
                  type="number"
                  v-model="item.max_amount"
                  label="ຍອດທີ່ອະນຸຍາດໃຫ້ຊຳລະສູງສຸດ"
                  placeholder="ຍອດທີ່ອະນຸຍາດໃຫ້ຊຳລະສູງສຸດ"
                  outlined
                  required
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
          <v-row v-if="n == 2" class="pa-10 mt-5">
            <v-col cols="12" sm="3" md="3">
              <v-text-field
                v-model="accountFee.provider_fee_acc"
                label="ເລກ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                placeholder="ເລກ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                outlined
                type="number"
                counter
                :rules="[account_drfee_Rul]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3">
              <v-select
                v-model="accountFee.provider_fee_ccy"
                :items="currency"
                item-text="abbr"
                :rules="provider_currency_Rul"
                label="ເລືອກສະກຸນເງິນ"
                placeholder="ເລືອກສະກຸນເງິນ"
                outlined
                @change="getAccounts()"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="3" md="3">
              <v-text-field
                v-model="accountFee.provider_fee_name"
                label="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                placeholder="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                outlined
                required
                :rules="[account_name_drfee_Rul]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3">
              <v-select
                v-model="create_provider.fee_id"
                :items="provider_fee_type"
                item-text="fee_company"
                :rules="provider_fee_type_Rul"
                label="ອັດຕາຄ່າທຳນຽມ"
                placeholder="ອັດຕາຄ່າທຳນຽມ"
                outlined
                @change="ViewFeeProvider()"
              >
              </v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6" xs="12">
              <v-card class="mx-auto" outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 mb-1">
                      ຄ່າທຳນຽມການດຳເນິນທຸລະກຳຕັດຈາກບັນຊີບໍລິສັດ
                    </v-list-item-title>
                    <v-row cols="12" class="pa-3">
                      <v-col cols="12" sm="12" md="12" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.charge_company"
                            :rules="
                              create_provider.charge_customer == true
                                ? []
                                : [charge_company_Rul]
                            "
                            inset
                            color="success"
                            label="ຄ່າທຳນຽມເກັບຈາກບໍລິສັດ"
                            :disabled="
                              (create_provider.charge_txn == true
                                ? true
                                : false) ||
                              (create_provider.charge_customer == true
                                ? true
                                : false)
                            "
                          ></v-switch>
                          <v-switch
                            v-model="create_provider.charge_month"
                            inset
                            label="ລວມຍອດທ້າຍເດືອນ"
                            :disabled="
                              (create_provider.charge_txn == true
                                ? true
                                : false) ||
                              (create_provider.charge_customer == true
                                ? true
                                : false)
                            "
                            color="success"
                            :rules="
                              create_provider.charge_customer == true
                                ? []
                                : [charge_month_Rul]
                            "
                          ></v-switch>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="6" xs="12">
              <v-card class="mx-auto" outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 mb-1">
                      ຄ່າທຳນຽມການດຳເນິນທຸລະກຳຕັດຈາກບັນຊີລູກຄ່າຊຳລະເອງ
                    </v-list-item-title>
                    <v-row cols="12" class="pa-3">
                      <v-col cols="12" sm="12" md="12" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.charge_customer"
                            inset
                            :rules="
                              create_provider.charge_company == null
                                ? [charge_customer_Rul]
                                : []
                            "
                            label="ຄ່າທຳນຽມເກັບຈາກລູກຄ້າ"
                            color="success"
                            :disabled="
                              (create_provider.charge_company == true
                                ? true
                                : false) ||
                              (create_provider.charge_month == true
                                ? true
                                : false)
                            "
                          ></v-switch>
                          <v-switch
                            v-model="create_provider.charge_txn"
                            inset
                            label="ຕັດເທື່ອລະລາຍການ"
                            color="success"
                            :disabled="
                              (create_provider.charge_month == true
                                ? true
                                : false) ||
                              (create_provider.charge_company == true
                                ? true
                                : false)
                            "
                            :rules="
                              create_provider.charge_company == null
                                ? [charge_txn_Rul]
                                : []
                            "
                          ></v-switch>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
          <v-row v-if="n == 3" class="mt-5">
            <v-col cols="12" sm="6" md="6" xs="12">
              <v-card class="mx-auto" outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h5 mb-1">
                      ເວລາເປິດໃຫ້ຊຳລະ
                    </v-list-item-title>
                    <v-row cols="12" class="pa-3">
                      <v-col cols="12" sm="6" md="6" xs="12">
                        <h5>ເວລາເລິ່ມຕົ້ນ</h5>
                        <v-time-picker
                          v-model="create_provider.start_time"
                          :max="end"
                          format="24hr"
                          :rules="[start_Rul]"
                          flat
                          scrollable
                        ></v-time-picker>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" xs="12">
                        <h5>ເວລາສິ້ນສຸດ</h5>
                        <v-time-picker
                          v-model="create_provider.end_time"
                          :min="start"
                          format="24hr"
                          :rules="[end_Rul]"
                          flat
                          scrollable
                        ></v-time-picker>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="6" xs="12">
              <v-card class="mx-auto" outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 mb-1">
                      ເງື່ອນໄຂອື່ນໆ
                    </v-list-item-title>
                    <v-row cols="12" class="pa-3">
                      <v-col cols="12" sm="12" md="12" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.onday"
                            :label="`ປະຈຳວັນ: ${
                              create_provider.onday == true ? 'ເປິດ' : 'ປິດ'
                            }`"
                            color="success"
                            inset
                          ></v-switch>
                          <v-switch
                            v-model="create_provider.stop_week"
                            :label="`ປະຈຳທິດ: ${
                              create_provider.stop_week == true ? 'ເປິດ' : 'ປິດ'
                            }`"
                            color="success"
                            inset
                          ></v-switch>
                          <v-switch
                            v-model="create_provider.stop_month"
                            color="success"
                            :label="`ປະຈຳເດືອນ: ${
                              create_provider.stop_month == true
                                ? 'ເປິດ'
                                : 'ປິດ'
                            }`"
                            inset
                          ></v-switch>
                          <v-switch
                            v-model="create_provider.aditional"
                            :label="`ວັນສຸກທ້າຍເດືອນ: ${
                              create_provider.aditional == true ? 'ເປິດ' : 'ປິດ'
                            }`"
                            color="success"
                            inset
                          ></v-switch>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="6" xs="12">
              <v-card class="mx-auto" outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 mb-1">
                      ຮູບແບບການຊຳລະ
                    </v-list-item-title>
                    <v-row cols="12" class="pa-3">
                      <v-col cols="12" sm="12" md="12" xs="12">
                        <v-switch
                          v-for="(item, index) in loadChannel"
                          :key="index"
                          v-model="item.provider_channel"
                          inset
                          color="success"
                          :label="`ຜ່ານຊ່ອງທາງ: ${
                            item.provider_channel == true
                              ? item.channel
                              : item.channel
                          }`"
                        ></v-switch>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>

            <v-col cols="12" sm="6" md="6" xs="12">
              <v-card class="mx-auto" outlined>
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 mb-1">
                      ຮູບແບບການຮັບສົ່ງຂໍ້ມູນແລະການຊຳລະ
                    </v-list-item-title>
                    <v-row cols="12" class="pa-3">
                      <v-col cols="12" sm="12" md="12" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.input_amt"
                            inset
                            :label="`ອະນຸຍາດໃຫ້ຕີຈຳນວນເງິນ: ${
                              create_provider.input_amt == true ? 'ເປິດ' : 'ປິດ'
                            }`"
                            color="success"
                          ></v-switch>
                          <v-switch
                            v-model="create_provider.connect_mode"
                            inset
                            color="success"
                            :label="`ສົ່ງຂໍ້ມູນ: ${
                              create_provider.connect_mode == true
                                ? 'ONLINE'
                                : 'OFFLINE'
                            }`"
                          ></v-switch>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
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
          <v-icon dark> mdi-content-save-check </v-icon>
        </v-btn>
        <v-btn
          :disabled="curr == 1 ? true : false"
          class="mx-2"
          fab
          dark
          color="red"
          @click="curr -= 1"
        >
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

    <v-dialog v-model="dialog" fullscreen transition="dialog-bottom-transition">
      <v-card>
        <v-toolbar flat dark color="success">
          <v-btn fab small @click="dialog = false" color="error">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-data-table :search="search" :headers="headers_fee" :items="viewFee">
          <!-- table tr section -->
          <template v-slot:item="{ item }">
            <tr>
              <td>
                <v-chip small color="success" outlined>{{
                  item.fee_id
                }}</v-chip>
              </td>
              <td>
                <v-chip small color="secondary" outlined>{{
                  item.provider_channel == "M001" ? "ONLINE" : "COUNTER"
                }}</v-chip>
              </td>
              <td>
                <v-chip small color="primary" outlined>{{
                  formatNumber(item.from_amt) + " " + "LAK"
                }}</v-chip>
              </td>

              <td>
                <v-chip small color="error" outlined>{{
                  formatNumber(item.to_amt) + " " + "LAK"
                }}</v-chip>
              </td>
              <td>
                <v-chip small color="success" outlined>{{
                  formatNumber(item.total_amt) + " " + "LAK"
                }}</v-chip>
              </td>
            </tr>
          </template>
        </v-data-table>
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
      dialog: false,
      viewProviders: [],
      search: "",
      viewFee: [],
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
      headers_fee: [
        { text: "ລະຫັດຄ່າທຳນຽມ", value: "fee" },
        { text: "ຊ່ອງທາງ", value: "channel" },
        { text: "ຈາກ", value: "from_amt" },
        { text: "ຫາ", value: "to_amt" },
        { text: "ຄ່າທຳນຽມ", value: "total_amt" },
      ],
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
      accountFee: {
        provider_fee_acc: "",
        provider_fee_name: "",
        provider_fee_ccy: "",
      },
      product_type: [],
      provider_fee_type: [],
      updateAccounts: {
        full_name: "",
        phone_number: "",
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
        provider_ccy: "",
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
        provider_fee_acc: "",
        provider_fee_name: "",
        provider_fee_ccy: "",
        provider_name: "",
        phone_number: "",
      },
      create_provider: {
        full_name: "",
        phone_number: "",
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
        provider_ccy: "",
        bill_charge_fee: "",
        bill_charge_type: "",
        onday: false,
        stop_week: false,
        stop_month: false,
        aditional: false,
        input_type: "",
        start_time: "",
        end_time: "",
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
        charge_customer: "",
        amount_allow: "",
        amount_no_allow: "",
        input_amt: false,
        connect_mode: false,
        channel: "",
        fee_id: false,
        provider_fee_acc: "",
        provider_fee_name: "",
        provider_fee_ccy: "",
        provider_status: "",
        provider_name: "",
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
      provider_code_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
        (v) =>
          (v && /[A-Za-z0-9]{1}/.test(v)) ||
          "ກະລຸນາປ້ອນຂໍ້ມູນເປັນອັງກິດແລະຕົວເລກເທົ່ານັ້ນ*.",
      ],
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
    this.loadProvider();
    //load provider bill payment
    let result = await api.GetProviderBillById(this.$route.params.id);
    this.create_provider = result.data.body;
    this.create_provider.provider_code = this.$route.params.id;
    //load account bill payment
    let resacc = await api.GetBillAccount(this.$route.params.id);
    this.updateAccounts = resacc.data.body;
    //load account bill fee
    let acc_fee = await api.GetFeeBillAccount(this.$route.params.id);
    this.accountFee = acc_fee.data.body;

    if (this.create_provider.charge_company == "Y") {
      this.create_provider.charge_company = true;
    } else {
      this.create_provider.charge_company = false;
    }
    if (this.create_provider.charge_customer == "N") {
      this.create_provider.charge_customer = true;
    } else {
      this.create_provider.charge_customer = false;
    }
    if (this.create_provider.provider_status == "A") {
      this.create_provider.provider_status = true;
    } else {
      this.create_provider.provider_status = false;
    }
    if (this.create_provider.charge_month == "Y") {
      this.create_provider.charge_month = true;
    } else {
      this.create_provider.charge_month = false;
    }
    if (this.create_provider.charge_txn == "Y") {
      this.create_provider.charge_txn = true;
    } else {
      this.create_provider.charge_txn = false;
    }
    if (this.create_provider.input_amt == "Y") {
      this.create_provider.input_amt = true;
    } else {
      this.create_provider.input_amt = false;
    }
    if (this.create_provider.connect_mode == "ONLINE") {
      this.create_provider.connect_mode = true;
    } else {
      this.create_provider.connect_mode = false;
    }
    if (this.create_provider.onday == "Y") {
      this.create_provider.onday = true;
    } else {
      this.create_provider.onday = false;
    }
    if (this.create_provider.stop_week == "Y") {
      this.create_provider.stop_week = true;
    } else {
      this.create_provider.stop_week = false;
    }
    if (this.create_provider.stop_month == "Y") {
      this.create_provider.stop_month = true;
    } else {
      this.create_provider.stop_month = false;
    }
    if (this.create_provider.aditional == "Y") {
      this.create_provider.aditional = true;
    } else {
      this.create_provider.aditional = false;
    }
    //load bpay posting
    let results = await api.GetBpayPosting(this.$route.params.id);
    this.loadChannel = results.data.body;
    this.loadChannel.forEach((value, index) => {
      if (value.provider_channel == "A") {
        value.provider_channel = true;
      } else {
        value.provider_channel = false;
      }
    });
  },
  methods: {
    async loadProvider() {
      let result = await api.providersAll();
      this.viewProviders = result.data.body;
    },
    formatNumber(num) {
      return parseFloat(num).toFixed(2);
    },
    //view fee provider
    async ViewFeeProvider() {
      this.dialog = true;
      let formData = new FormData();
      formData.append("fee_id", this.create_provider.fee_id);
      let results = await api.ViewFeeProviders(formData);
      this.viewFee = results.data.body;
    },
    async getAccounts() {
      let formData = new FormData();
      formData.append("txnAcc", this.accountFee.provider_fee_acc);
      formData.append("txnCcy", this.accountFee.provider_fee_ccy);
      let result = await api.getAccounts(formData);
      if (result.data.body.respCode == "00") {
        this.accountFee.provider_fee_name = result.data.body.accountName;
      } else {
        this.errorAccount = true;
        this.accountFee.provider_fee_name = "";
      }
    },
    async CheckAccounts() {
      let txnAcc;
      let txnCcy;
      let formData = new FormData();
      this.updateAccounts.forEach((value, index) => {
        txnAcc = value.provider_acc;
        txnCcy = value.provider_ccy;
      });
      formData.append("txnAcc", txnAcc);
      formData.append("txnCcy", txnCcy);
      let result = await api.getAccounts(formData);
      if (result.data.body.respCode == "00") {
        this.updateAccounts.forEach((value, index) => {
          value.provider_acc_name = result.data.body.accountName;
        });
      } else {
        this.errorAccount = true;
        this.updateAccounts.forEach((value, index) => {
          value.provider_acc_name = "";
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
      this.updateAccounts.splice([index], 1);
    },
    addRow() {
      this.updateAccounts.push({
        account_cr: "",
        provider_acc_name: "",
        provider_ccy: "",
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
      let arr = [];
      this.updateAccounts.forEach((value, index) => {
        arr.push({
          provider_acc: value.provider_acc,
          provider_acc_name: value.provider_acc_name,
          provider_ccy: value.provider_ccy,
          max_amount: value.max_amount,
          min_amount: value.min_amount,
        });
      });
      this.steps[n].valid = false;
      let v = this.$refs.stepForm[n].validate();
      if (v == true) {
        let formData = new FormData();
        const {
          full_name,
          phone_number,
          line_phone,
          provider_long,
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
          fee_id,
          provider_status,
          provider_code,
          provider_name,
        } = this.create_provider;
        formData.append("full_name", full_name);
        formData.append("phone_number", phone_number);
        formData.append("line_phone", line_phone);
        formData.append("provider_long", provider_long);
        formData.append("provider_code", provider_code);
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
        formData.append("fee_id", fee_id);
        formData.append("provider_status", provider_status);
        formData.append("provider_name", provider_name);
        formData.append("provider_acc", JSON.stringify(arr));
        formData.append("ibank", this.loadChannel[0].provider_channel);
        formData.append("counter", this.loadChannel[1].provider_channel);
        formData.append("bcelone", this.loadChannel[2].provider_channel);
        formData.append("provider_fee_acc", this.accountFee.provider_fee_acc);
        formData.append("provider_fee_name", this.accountFee.provider_fee_name);
        formData.append("provider_fee_ccy", this.accountFee.provider_fee_ccy);
        formData.append("username", this.$store.getters["username"]);
        console.log(this.create_provider);
        let result = await api.updateProviderBill(formData);
        if ((result.data.body.responseMsg = true)) {
          this.$router.back();
        } else {
          console.log(result.status);
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
