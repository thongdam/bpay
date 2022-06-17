<template lang="html">
  <v-container>
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
          <v-row v-if="n == 0" class="mt-5">
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-autocomplete
                v-model="create_privider.providers"
                :items="viewProviders"
                item-text="provider_code"
                outlined
                label="ບໍລິສັດ"
                placeholder="ບໍລິສັດ"
                @change="fetchProviders()"
              ></v-autocomplete>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_privider.provider_code"
                label="ຊື່ຫຍໍ້"
                placeholder="ຊື່ຫຍໍ້"
                outlined
                :rules="provider_code_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_privider.full_name"
                clearable
                label="ຊື່ ແລະ ນາມສະກຸນ"
                placeholder="ຊື່ ແລະ ນາມສະກຸນ"
                outlined
                :rules="full_name_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_privider.phone_number"
                label="ໂທລະສັບມືຖື"
                placeholder="ໂທລະສັບມືຖື"
                type="number"
                outlined
                :rules="phone_no_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_privider.line_phone"
                label="ໂທລະສັບຕັ້ງໂຕະ"
                placeholder="ໂທລະສັບຕັ້ງໂຕະ"
                type="number"
                outlined
                :rules="line_phone_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_privider.provider_name"
                label="ຊື່ ບໍລິສັດ"
                placeholder="ຊື່ ບໍລິສັດ"
                outlined
                :rules="provider_name_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-select
                v-model="create_privider.product_type"
                :items="product_type"
                item-text="provider_group"
                :rules="product_type_Rul"
                label="ປະເພດທຸລະກິດ"
                placeholder="ປະເພດທຸລະກິດ"
                outlined
              ></v-select>
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
                    v-model="create_privider.contract_startdate"
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
                  v-model="create_privider.contract_startdate"
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
                    v-model="create_privider.contract_stopdate"
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
                  v-model="create_privider.contract_stopdate"
                  no-title
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="4" md="4" xs="12" class="pa-4">
              <v-switch
                v-model="create_privider.provider_status"
                inset
                color="success"
                :label="`ສະຖານະ: ${
                  create_privider.provider_status == true ? 'ເປິດ' : 'ປິດ'
                }`"
              ></v-switch>
            </v-col>
          </v-row>
          <div v-if="n == 1">
            <v-btn @click="addRow" small text color="danger" class="ml-2 mt-5">
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
                  v-model="acc.provider_acc"
                  required
                  label="ເລກ ບັນຊີຮອງຮັບ"
                  placeholder="ເລກ ບັນຊີຮອງຮັບ"
                  outlined
                  counter
                  :rules="account_cr_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="2" xs="12">
                <v-select
                  v-model="acc.provider_ccy"
                  :items="currency"
                  item-text="abbr"
                  :rules="provider_currency_Rul"
                  label="ເລືອກສະກຸນເງິນທີ່ຮັບຊຳລະ"
                  placeholder="ເລືອກສະກຸນເງິນທີ່ຮັບຊຳລະ"
                  outlined
                  @change="getAccounts()"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="3" md="3" xs="12">
                <v-text-field
                  v-model="acc.provider_acc_name"
                  required
                  label="ຊື່ ບັນຊີຮອງຮັບ"
                  placeholder="ຊື່ ບັນຊີຮອງຮັບ"
                  outlined
                  :rules="account_name_cr_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="2" xs="12">
                <v-text-field
                  v-model="acc.min_amount"
                  label="ຍອດທີ່ອະນຸຍາດໃຫ້ຊຳລະຕ່ຳສຸດ"
                  placeholder="ຍອດທີ່ອະນຸຍາດໃຫ້ຊຳລະຕ່ຳສຸດ"
                  outlined
                  min="3"
                  required
                  type="number"
                  persistent-hint
                  :rules="min_amount_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="2" xs="12">
                <v-text-field
                  type="number"
                  max="9"
                  v-model="acc.max_amount"
                  label="ຍອດທີ່ອະນຸຍາດໃຫ້ຊຳລະສູງສຸດ"
                  placeholder="ຍອດທີ່ອະນຸຍາດໃຫ້ຊຳລະສູງສຸດ"
                  outlined
                  required
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

          <v-row v-if="n == 2" class="pa-5 mt-5">
            <v-col cols="12" sm="3" md="3">
              <v-text-field
                v-model="create_privider.provider_fee_acc"
                label="ເລກ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                placeholder="ເລກ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                outlined
                required
                counter
                :rules="[account_drfee_Rul]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3">
              <v-select
                v-model="create_privider.provider_fee_ccy"
                :items="currency"
                item-text="abbr"
                :rules="provider_currency_Rul"
                label="ເລືອກສະກຸນເງິນ"
                placeholder="ເລືອກສະກຸນເງິນ"
                outlined
                @change="CheckAccounts()"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="3" md="3">
              <v-text-field
                v-model="create_privider.provider_fee_name"
                label="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                placeholder="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                outlined
                required
                :rules="[account_name_drfee_Rul]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3">
              <v-select
                v-model="create_privider.fee_id"
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
                            v-model="create_privider.charge_customer"
                            inset
                            label="ຄ່າທຳນຽມເກັບຈາກລູກຄ້າ"
                            color="success"
                            :disabled="
                              create_privider.charge_company == true
                                ? true
                                : false
                            "
                            :rules="
                              create_privider.charge_company == true
                                ? []
                                : [charge_customer_Rul]
                            "
                          ></v-switch>
                          <v-switch
                            v-model="create_privider.charge_txn"
                            inset
                            label="ຕັດເທື່ອລະລາຍການ"
                            color="success"
                            :disabled="
                              create_privider.charge_company == true
                                ? true
                                : false
                            "
                            :rules="
                              create_privider.charge_company == true
                                ? []
                                : [charge_txn_Rul]
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
                          v-model="create_privider.start_time"
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
                          v-model="create_privider.end_time"
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
                            v-model="create_privider.onday"
                            :label="`ປະຈຳວັນ: ${
                              create_privider.onday == true ? 'ເປິດ' : 'ປິດ'
                            }`"
                            color="success"
                            inset
                          ></v-switch>
                          <v-switch
                            v-model="create_privider.stop_week"
                            :label="`ປະຈຳທິດ: ${
                              create_privider.stop_week == true ? 'ເປິດ' : 'ປິດ'
                            }`"
                            color="success"
                            inset
                          ></v-switch>
                          <v-switch
                            v-model="create_privider.stop_month"
                            color="success"
                            :label="`ປະຈຳເດືອນ: ${
                              create_privider.stop_month == true
                                ? 'ເປິດ'
                                : 'ປິດ'
                            }`"
                            inset
                          ></v-switch>
                          <v-switch
                            v-model="create_privider.aditional"
                            :label="`ວັນສຸກທ້າຍເດືອນ: ${
                              create_privider.aditional == true ? 'ເປິດ' : 'ປິດ'
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
                        <v-sheet>
                          <v-switch
                            v-model="create_privider.ibank"
                            inset
                            color="success"
                            :label="`ຊຳລະຜ່ານຊ່ອງທາງ IBANK: ${
                              create_privider.ibank == true ? 'ເປິດ' : 'ປິດ'
                            }`"
                          ></v-switch>
                          <v-switch
                            v-model="create_privider.bcelone"
                            inset
                            color="success"
                            :label="`ຊຳລະຜ່ານຊ່ອງທາງ BCEL ONE: ${
                              create_privider.bcelone == true ? 'ເປິດ' : 'ປິດ'
                            }`"
                          ></v-switch>
                          <v-switch
                            v-model="create_privider.counter"
                            inset
                            color="success"
                            :label="`ຊຳລະຜ່ານຊ່ອງທາງ COUNTER: ${
                              create_privider.counter == true ? 'ເປິດ' : 'ປິດ'
                            }`"
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
                      ຮູບແບບການຮັບສົ່ງຂໍ້ມູນແລະການຊຳລະ
                    </v-list-item-title>
                    <v-row cols="12" class="pa-3">
                      <v-col cols="12" sm="12" md="12" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_privider.input_amt"
                            inset
                            :label="`ອະນຸຍາດໃຫ້ຕີຈຳນວນເງິນ: ${
                              create_privider.input_amt == true ? 'ເປິດ' : 'ປິດ'
                            }`"
                            color="success"
                          ></v-switch>
                          <v-switch
                            v-model="create_privider.connect_mode"
                            inset
                            color="success"
                            :label="`ສົ່ງຂໍ້ມູນ: ${
                              create_privider.connect_mode == true
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
          <v-icon dark> mdi-content-save </v-icon>
        </v-btn>
        <v-btn  :disabled="curr == 1 ? true : false" class="mx-2" fab dark color="red" @click="curr = 1">
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
    <v-dialog
      v-model="Fee_dialog"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-toolbar flat dark color="success">
          <v-btn fab small @click="Fee_dialog = false" color="error">
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
      Fee_dialog: false,
      search: "",
      viewFee: [],
      viewProviders: [],
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
      headers_fee: [
        { text: "ລະຫັດຄ່າທຳນຽມ", value: "fee" },
        { text: "ຊ່ອງທາງ", value: "channel" },
        { text: "ຈາກ", value: "from_amt" },
        { text: "ຫາ", value: "to_amt" },
        { text: "ຄ່າທຳນຽມ", value: "total_amt" },
      ],
      create_privider: {
        account: [
          {
            provider_acc: "",
            provider_acc_name: "",
            provider_ccy: "",
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
        provider_fee_acc: "",
        provider_fee_name: "",
        provider_fee_ccy: "",
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
        fee_id: "",
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
      provider_chanel_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      contract_startdate_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      contract_stopdate_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*"],
      min_amount_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
        (v) =>
          (v && v.length > 0 && v.length <= 4) ||
          "This field must have atleast 4 characters",
      ],
      max_amount_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
        (v) =>
          (v && v.length <= 10) || "This field must have atleast 10 characters",
      ],
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
    this.loadProvider();
  },
  methods: {
    async fetchProviders() {
      let formData = new FormData();
      formData.append("provider_code", this.create_privider.providers);
      let results = await api.fetchProviders(formData);
      this.create_privider = results.data.body;
      this.create_privider.account.push({
        provider_acc: "",
        provider_acc_name: "",
        provider_ccy: "",
        min_amount: "",
        max_amount: "",
      });
    },
    async loadProvider() {
      let result = await api.providersAll();
      this.viewProviders = result.data.body;
    },
    formatNumber(num) {
      return parseFloat(num).toFixed(2);
    },
    async ViewFeeProvider() {
      this.Fee_dialog = true;
      let formData = new FormData();
      formData.append("fee_id", this.create_privider.fee_id);
      let results = await api.ViewFeeProviders(formData);
      this.viewFee = results.data.body;
    },
    async CheckAccounts() {
      let formData = new FormData();
      formData.append("txnAcc", this.create_privider.provider_fee_acc);
      formData.append("txnCcy", this.create_privider.provider_fee_ccy);
      let result = await api.getAccounts(formData);
      if (result.data.body.respCode == "00") {
        this.create_privider.provider_fee_name = result.data.body.accountName;
      } else {
        this.errorAccount = true;
        this.create_privider.provider_fee_name = "";
      }
    },
    //get account for check
    async getAccounts() {
      let txnAcc;
      let txnCcy;
      let formData = new FormData();
      this.create_privider.account.forEach((value, index) => {
        txnAcc = value.provider_acc;
        txnCcy = value.provider_ccy;
      });
      formData.append("txnAcc", txnAcc);
      formData.append("txnCcy", txnCcy);
      let result = await api.getAccounts(formData);
      if (result.data.body.respCode == "00") {
        this.create_privider.account.forEach((value, index) => {
          value.provider_acc_name = result.data.body.accountName;
        });
      } else {
        this.errorAccount = true;
        this.create_privider.account.forEach((value, index) => {
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
      this.create_privider.account.splice([index], 1);
    },
    addRow() {
      this.create_privider.account.push({
        provider_acc: "",
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
      console.log(this.create_privider);
      this.steps[n].valid = false;
      let v = this.$refs.stepForm[n].validate();
      if (v == true) {
        let formData = new FormData();
        const {
          full_name,
          phone_number,
          line_phone,
          contract_startdate,
          contract_stopdate,
          product_type,
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
          account,
          provider_fee_acc,
          provider_fee_name,
          provider_fee_ccy,
          ibank,
          bcelone,
          counter,
        } = this.create_privider;
        formData.append("full_name", full_name);
        formData.append("phone_number", phone_number);
        formData.append("line_phone", line_phone);
        formData.append("provider_code", provider_code);
        formData.append("contract_startdate", contract_startdate);
        formData.append("contract_stopdate", contract_stopdate);
        formData.append("product_type", product_type);
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
        formData.append("provider_acc", JSON.stringify(account));
        formData.append("ibank", ibank);
        formData.append("bcelone", bcelone);
        formData.append("counter", counter);
        formData.append("provider_fee_acc", provider_fee_acc);
        formData.append("provider_fee_name", provider_fee_name);
        formData.append("provider_fee_ccy", provider_fee_ccy);
        formData.append("username", this.$store.getters["username"]);
        let result = await api.addProviderBill(formData);
        if (result.data.body.responseMsg = true) {
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
