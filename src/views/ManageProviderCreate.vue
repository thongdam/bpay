<template lang="html">
  <v-container>
    <v-toolbar-title class="mb-5 text-center mt-5">
      <v-icon color="success">mdi-bank</v-icon>
      ຕັ້ງຄ່າໃຫ້ກັບບໍລິສັດເພື່ອເປິດນຳໃຊ້ບໍລິການ Auto debit
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
                label="ຊື່ ແລະ ນາມສະກຸນ"
                placeholder="ຊື່ ແລະ ນາມສະກຸນ"
                outlined
                :rules="[full_name_Rul]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_privider.phone_number"
                label="ໂທລະສັບມືຖື"
                placeholder="ໂທລະສັບມືຖື"
                outlined
                :rules="phone_no_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_privider.line_phone"
                label="ໂທລະສັບຕັ້ງໂຕະ"
                placeholder="ໂທລະສັບຕັ້ງໂຕະ"
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
                :rules="[provider_name_Rul]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-select
                v-model="create_privider.provider_group"
                :items="product_type"
                item-text="provider_group"
                :rules="[product_type_Rul]"
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
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="create_privider.contract_stopdate"
                  no-title
                  @input="menu2 = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12" class="pa-4">
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
              class="mt-5 rounded"
              v-for="(item, index) in create_privider.account"
              :key="index"
              style="border: 1px solid lightgrey"
            >
              <v-col cols="12" sm="2" md="2" xs="12">
                <v-text-field
                  v-model="item.provider_acc"
                  required
                  label="ເລກ ບັນຊີຮອງຮັບ"
                  placeholder="ເລກ ບັນຊີຮອງຮັບ"
                  outlined
                  counter
                  type="number"
                  :rules="provider_acc_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="3" md="3" xs="12">
                <v-text-field
                  v-model="item.provider_acc_name"
                  required
                  label="ຊື່ ບັນຊີຮອງຮັບ"
                  placeholder="ຊື່ ບັນຊີຮອງຮັບ"
                  outlined
                  :rules="[provider_acc_name_Rul]"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="2" xs="12">
                <v-select
                  v-model="item.provider_ccy"
                  :items="currency"
                  item-text="abbr"
                  :rules="[provider_ccy_Rul]"
                  label="ເລືອກສະກຸນເງິນທີ່ຮັບຊຳລະ"
                  placeholder="ເລືອກສະກຸນເງິນທີ່ຮັບຊຳລະ"
                  outlined
                  @change="getAccounts()"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="2" md="2" xs="12">
                <v-text-field
                  v-model="item.min_amount"
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
                  v-model="item.max_amount"
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
          <v-row v-if="n == 2" class="mt-5 pa-3">
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_privider.provider_fee_acc"
                label="ເລກ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ"
                placeholder="ເລກ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ"
                outlined
                required
                type="number"
                :rules="[provider_fee_acc_Rul]"
                counter
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_privider.provider_fee_name"
                label="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ"
                placeholder="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ"
                outlined
                required
                :rules="[provider_fee_name_Rul]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-select
                v-model="create_privider.provider_fee_ccy"
                :items="currency"
                item-text="abbr"
                :rules="[provider_fee_ccy_Rul]"
                label="ສະກຸນເງິນ"
                placeholder="ສະກຸນເງິນ"
                outlined
                @change="CheckAccounts()"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-select
                v-model="create_privider.fee_id"
                :items="provider_fee_type"
                item-text="fee_company"
                :rules="[fee_id_Rul]"
                label="ປະເພດຄ່າທຳນຽມ"
                placeholder="ປະເພດຄ່າທຳນຽມ"
                outlined
                @change="ViewFeeProvider()"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-sheet>
                <v-switch
                  v-model="create_privider.auto_charge_fee"
                  inset
                  color="success"
                  :label="`ຕັດຄ່າທຳນຽມ${
                    create_privider.auto_charge_fee == true
                      ? 'ຈາກບັນຊີບໍລິສັດ'
                      : 'ຈາກບັນຊີລູກຄ້າ'
                  }`"
                ></v-switch>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-sheet>
                <v-switch
                  v-model="create_privider.charge_day"
                  inset
                  color="success"
                  :label="`ຕັດຄ່າທຳນຽມເປັນລາຍການ:${
                    create_privider.charge_day == true ? 'ເປິດ' : 'ປິດ'
                  }`"
                  :disabled="
                    create_privider.charge_week == true ||
                    create_privider.charge_month == true
                  "
                ></v-switch>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-sheet>
                <v-switch
                  v-model="create_privider.charge_week"
                  inset
                  color="success"
                  :label="`ຕັດຄ່າທຳນຽມເປັນອາທິດ:${
                    create_privider.charge_week == true ? 'ເປິດ' : 'ປິດ'
                  }`"
                  :disabled="
                    create_privider.charge_day == true ||
                    create_privider.charge_month == true ||
                    create_privider.auto_charge_fee == false
                  "
                ></v-switch>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-sheet>
                <v-switch
                  v-model="create_privider.charge_month"
                  inset
                  color="success"
                  :label="`ຕັດຄ່າທຳນຽມເປັນລາຍເດືອນ:${
                    create_privider.charge_month == true ? 'ເປິດ' : 'ປິດ'
                  }`"
                  :disabled="
                    create_privider.charge_day == true ||
                    create_privider.charge_week == true ||
                    create_privider.auto_charge_fee == false
                  "
                ></v-switch>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-sheet>
                <v-switch
                  v-model="create_privider.auto_condition_type"
                  inset
                  color="success"
                  :label="`ການປ່ຽນແປງເງື່ອນໄຂຈຳນວນເງິນ:${
                    create_privider.auto_condition_type == true ? 'ເປິດ' : 'ປິດ'
                  }`"
                ></v-switch>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-sheet>
                <v-switch
                  v-model="create_privider.onday"
                  inset
                  color="success"
                  :label="`ເງື່ອນໄຂການຕັດເງິນພາຍໃນວັນ:${
                    create_privider.onday == true ? 'ເປິດ' : 'ປິດ'
                  }`"
                  :disabled="
                    create_privider.auto_condition_type == false ||
                    create_privider.onmonth == true
                  "
                ></v-switch>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-sheet>
                <v-switch
                  v-model="create_privider.onmonth"
                  inset
                  color="success"
                  :label="`ເງື່ອນໄຂການຕັດເງິນພາຍໃນເດືອນ:${
                    create_privider.onmonth == true ? 'ເປິດ' : 'ປິດ'
                  }`"
                  :disabled="
                    create_privider.threemonth == true ||
                    create_privider.onday == true
                  "
                ></v-switch>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-sheet>
                <v-switch
                  v-model="create_privider.threemonth"
                  inset
                  color="success"
                  :label="`ເງື່ອນໄຂການຕັດເງິນ 3 ເດືອນຕໍ່ຄັ້ງ:${
                    create_privider.threemonth == true ? 'ເປິດ' : 'ປິດ'
                  }`"
                  :disabled="
                    create_privider.auto_condition_type == true ||
                    create_privider.onmonth == true
                  "
                ></v-switch>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-sheet>
                <v-switch
                  v-model="create_privider.notcutback"
                  inset
                  color="success"
                  :label="`ບໍ່ອະນຸຍາດໃຫ້ລະບົບຕັດຄືນ:${
                    create_privider.notcutback == true ? 'ເປິດ' : 'ປິດ'
                  }`"
                  :disabled="
                    create_privider.cutback == true ||
                    create_privider.endofmonth == true
                  "
                ></v-switch>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-sheet>
                <v-switch
                  v-model="create_privider.cutback"
                  inset
                  color="success"
                  :label="`ອະນຸຍາດໃຫ້ລະບົບຕັດຄືນ:${
                    create_privider.cutback == true ? 'ເປິດ' : 'ປິດ'
                  }`"
                  :disabled="
                    create_privider.endofmonth == true ||
                    create_privider.notcutback == true
                  "
                ></v-switch>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-sheet>
                <v-switch
                  v-model="create_privider.endofmonth"
                  inset
                  color="success"
                  :label="`ອະນຸຍາດໃຫ້ລະບົບຕັດສິ້ນສຸດເດືອນ:${
                    create_privider.endofmonth == true ? 'ເປິດ' : 'ປິດ'
                  }`"
                  :disabled="
                    create_privider.notcutback == true ||
                    create_privider.cutback == true
                  "
                ></v-switch>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-sheet>
                <v-switch
                  v-model="create_privider.provider_fix"
                  inset
                  color="success"
                  :label="`ຕັດຄ່າທຳນຽມຈາກບັນຊີ${
                    create_privider.provider_fix == true
                      ? 'ທົ່ວໄປ'
                      : 'ບິວເພເມັ້ນ'
                  }`"
                  :disabled="create_privider.auto_charge_fee == false"
                ></v-switch>
              </v-sheet>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_privider.day_amount"
                :rules="
                  create_privider.notcutback == true ||
                  create_privider.cutback == false
                    ? []
                    : [day_amount_Rul]
                "
                :disabled="
                  create_privider.notcutback == true ||
                  create_privider.cutback == false
                "
                label="ຈຳນວນວັນວົນລູບ"
                placeholder="ຈຳນວນວັນວົນລູບ"
                outlined
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_privider.provider_fix_acc"
                label="ເລກ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                placeholder="ເລກ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                outlined
                type="number"
                counter
                :rules="
                  create_privider.provider_fix == true
                    ? [provider_fix_acc_Rul]
                    : []
                "
                :disabled="create_privider.provider_fix == true ? false : true"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_privider.provider_fix_name"
                label="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                placeholder="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                outlined
                outlined
                :rules="
                  create_privider.provider_fix == true
                    ? [provider_fix_name_Rul]
                    : []
                "
                :disabled="create_privider.provider_fix == true ? false : true"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-select
                v-model="create_privider.provider_fix_ccy"
                :items="currency"
                item-text="abbr"
                :rules="
                  create_privider.provider_fix == true
                    ? [provider_fix_ccy_Rul]
                    : []
                "
                :disabled="create_privider.provider_fix == true ? false : true"
                label="ສະກຸນເງິນ"
                placeholder="ສະກຸນເງິນ"
                outlined
                @change="CheckAccountsFee()"
              ></v-select>
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
  name: "ManageProviderCreate",
  data() {
    return {
      search: "",
      viewFee: [],
      Fee_dialog: false,
      errorAccount: false,
      viewProviders: [],
      menu: false,
      modal: false,
      menu2: false,
      curr: 1,
      lastStep: 3,
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
      provider_fix: [
        {
          state: "ຕັດຄ່າທຳນຽມຈາກບັນຊີທົ່ວໄປ",
          abbr: "provider_fix",
        },
        { state: "ຕັດຈາກບັນຊີຮອງຮັບບິວເພເມັນ", abbr: "provider_no_fix" },
      ],
      auto_charge_fee: [
        {
          state: "ຄ່າທຳນຽມການດຳເນິນທຸລະກຳຕັດຈາກບັນຊີບໍລິສັດ",
          abbr: "charge_provider",
        },
        {
          state: "ຄ່າທຳນຽມການດຳເນິດທູລະກຳຕັດຈາກບັນຊີລູກຄ້າ",
          abbr: "charge_customer",
        },
      ],
      auto_charge_type: [
        { state: "ຕັດເທື່ອລະລາຍການ", abbr: "charge_day" },
        { state: "ລວມຍອດທ້າຍທິດ", abbr: "charge_week" },
        { state: "ລວມຍອດທ້າຍເດືອນ", abbr: "charge_month" },
      ],
      auto_condition_type: [
        { state: "ຈຳນວນເງິນເດິມ", abbr: "constant_amount" },
        { state: "ປ່ຽນແປງຈຳນວນເງິນ", abbr: "change_amount" },
      ],
      auto_data_cut_type: [
        { state: "ບໍ່ຕັດຄືນ", abbr: "notcutback" },
        { state: "ຕັດຄືນ", abbr: "cutback" },
        { state: "ສິ້ນສຸດເດືອນ", abbr: "endofmonth" },
      ],
      auto_cut_type: [
        { state: "ວັນ", abbr: "onday" },
        { state: "ເດືອນ", abbr: "onmonth" },
        { state: "3 ເດືອນ", abbr: "threemonth" },
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
        provider_code: "",
        full_name: "",
        phone_number: "",
        line_phone: "",
        provider_name: "",
        provider_group: "",
        contract_startdate: "",
        contract_stopdate: "",
        provider_status: "",
        provider_fee_acc: "",
        provider_fee_name: "",
        provider_fee_ccy: "",
        fee_id: "",
        auto_charge_fee: "",
        charge_day: "",
        charge_week: "",
        charge_month: "",
        auto_condition_type: "",
        onday: "",
        onmonth: "",
        threemonth: "",
        notcutback: "",
        cutback: "",
        endofmonth: "",
        provider_fix: "",
        day_amount: "",
        provider_fix_acc: "",
        provider_fix_name: "",
        provider_fix_ccy: "",
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
      full_name_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      phone_no_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
        (v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      ],
      line_phone_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
        (v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      ],
      provider_name_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      product_type_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_code_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
        (v) =>
          (v && /[A-Za-z0-9]{1}/.test(v)) ||
          "ກະລຸນາປ້ອນຂໍ້ມູນເປັນອັງກິດແລະຕົວເລກເທົ່ານັ້ນ*.",
      ],
      contract_startdate_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      contract_stopdate_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_status_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_acc_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
        (v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      ],
      provider_acc_name_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_ccy_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
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
      account_fee_acc_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
        (v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      ],
      provider_fix_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_fee_acc_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_fee_name_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_fee_ccy_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_fix_acc_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_fix_name_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_fix_ccy_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      fee_id_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_chanel_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      auto_charge_fee_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      auto_charge_type_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      auto_condition_type_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      auto_cut_type_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      auto_data_cut_type_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      day_amount_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
    };
  },
  async mounted() {
    this.loadProductType();
    this.loadFeeType();
    this.loadProvider();
  },
  methods: {
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
    //CheckAccounts fee
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
    //check  fixaccount
    async CheckAccountsFee() {
      let formData = new FormData();
      formData.append("txnAcc", this.create_privider.provider_fix_acc);
      formData.append("txnCcy", this.create_privider.provider_fix_ccy);
      let result = await api.getAccounts(formData);
      if (result.data.body.respCode == "00") {
        this.create_privider.provider_fix_name = result.data.body.accountName;
      } else {
        this.errorAccount = true;
        this.create_privider.provider_fix_name = "";
      }
    },
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
      this.steps[n].valid = false;
      let v = this.$refs.stepForm[n].validate();
      if (v == true) {
        let formData = new FormData();
        const {
          account,
          provider_code,
          full_name,
          phone_number,
          line_phone,
          provider_name,
          provider_group,
          contract_startdate,
          contract_stopdate,
          provider_status,
          provider_fee_acc,
          provider_fee_name,
          provider_fee_ccy,
          fee_id,
          auto_charge_fee,
          charge_day,
          charge_week,
          charge_month,
          auto_condition_type,
          onday,
          onmonth,
          threemonth,
          notcutback,
          cutback,
          endofmonth,
          provider_fix,
          day_amount,
          provider_fix_acc,
          provider_fix_name,
          provider_fix_ccy,
        } = this.create_privider;
        formData.append("provider_code", provider_code);
        formData.append("full_name", full_name);
        formData.append("phone_number", phone_number);
        formData.append("line_phone", line_phone);
        formData.append("provider_name", provider_name);
        formData.append("provider_group", provider_group);
        formData.append("contract_startdate", contract_startdate);
        formData.append("contract_stopdate", contract_stopdate);
        formData.append("provider_status", provider_status);
        formData.append("provider_fee_acc", provider_fee_acc);
        formData.append("provider_fee_name", provider_fee_name);
        formData.append("provider_fee_ccy", provider_fee_ccy);
        formData.append("provider_fix", provider_fix);
        formData.append("provider_fix_acc", provider_fix_acc);
        formData.append("provider_fix_name", provider_fix_name);
        formData.append("provider_fix_ccy", provider_fix_ccy);
        formData.append("fee_id", fee_id);
        formData.append("auto_charge_fee", auto_charge_fee);
        formData.append("charge_day", charge_day);
        formData.append("charge_week", charge_week);
        formData.append("charge_month", charge_month);
        formData.append("auto_condition_type", auto_condition_type);
        formData.append("onday", onday);
        formData.append("onmonth", onmonth);
        formData.append("threemonth", threemonth);
        formData.append("notcutback", notcutback);
        formData.append("cutback", cutback);
        formData.append("endofmonth", endofmonth);
        formData.append("day_amount", day_amount);
        formData.append("cutback", cutback);
        formData.append("username",this.$store.getters["username"])
        formData.append("provider_acc", JSON.stringify(account));
        let result = await api.addProvider(formData);
        if (result.data.body.responseMsg=true) {
          this.$router.back();
        } else {
          console.log(result.status);
        }
      } else {
        this.steps[n].valid = true;
        this.curr = n + 2;
      }
      this.curr = 3;
    },
  },
};
</script>
<style lang="scss" scoped></style>
