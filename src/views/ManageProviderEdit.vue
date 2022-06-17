<template lang="html">
  <v-container>
    <v-toolbar-title class="mb-5 text-center mt-5">
      <v-icon color="success">mdi-bank</v-icon
      >ແກ້ໄຂຕັ້ງຄ່າໃຫ້ກັບບໍລິສັດເພື່ອເປິດນຳໃຊ້ບໍລິການ Auto debit
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
              <v-text-field
                readonly
                v-model="create_provider.provider_code"
                label="ຊື່ຫຍໍ້"
                placeholder="ຊື່ຫຍໍ້"
                outlined
                :rules="provider_code_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_provider.full_name"
                label="ຊື່ ແລະ ນາມສະກຸນ"
                placeholder="ຊື່ ແລະ ນາມສະກຸນ"
                outlined
                :rules="[full_name_Rul]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                type="number"
                v-model="create_provider.phone_number"
                label="ໂທລະສັບມືຖື"
                placeholder="ໂທລະສັບມືຖື"
                outlined
                :rules="phone_no_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                type="number"
                v-model="create_provider.line_phone"
                label="ໂທລະສັບຕັ້ງໂຕະ"
                placeholder="ໂທລະສັບຕັ້ງໂຕະ"
                outlined
                :rules="line_phone_Rul"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-text-field
                v-model="create_provider.provider_name"
                label="ຊື່ ບໍລິສັດ"
                placeholder="ຊື່ ບໍລິສັດ"
                outlined
                :rules="[provider_name_Rul]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-select
                v-model="create_provider.provider_group"
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
            <v-col cols="12" sm="3" md="3" xs="12" class="pa-4">
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
          <div v-if="n == 1">
            <v-btn @click="addRow" small text color="danger" class="ml-2 mt-5">
              <v-icon>mdi-briefcase-plus</v-icon>
              <span>ເພິ່ມບັນຊີ</span>
            </v-btn>
            <v-row
              class="mt-5 rounded"
              v-for="(item, index) in updateAutoAccounts"
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
                  :disabled="Object.keys(updateAutoAccounts).length === 1"
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
                v-model="create_provider.provider_fee_acc"
                label="ເລກ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ"
                placeholder="ເລກ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ"
                outlined
                required
                :rules="provider_fee_acc_Rul"
                counter
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-select
                v-model="create_provider.provider_fee_ccy"
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
              <v-text-field
                v-model="create_provider.provider_fee_name"
                label="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ"
                placeholder="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ"
                outlined
                required
                :rules="[provider_fee_name_Rul]"
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3" md="3" xs="12">
              <v-select
                v-model="create_provider.fee_id"
                :items="provider_fee_type"
                item-text="fee_company"
                :rules="[fee_id_Rul]"
                label="ອັດຕາຄ່າທຳນຽມ"
                placeholder="ອັດຕາຄ່າທຳນຽມ"
                outlined
                @change="ViewFeeProvider()"
              ></v-select>
            </v-col>
            <v-col cols="12" sm="6" md="6" xs="12">
              <v-card
                class="mx-auto"
                outlined
                :disabled="create_provider.charge_fee_customer == true"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 mb-1">
                      ຄ່າທຳນຽມການດຳເນິນທຸລະກຳຕັດຈາກບັນຊີບໍລິສັດ
                    </v-list-item-title>
                    <v-row cols="12" class="pa-3">
                      <v-col cols="12" sm="12" md="12" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.charge_fee_provider"
                            inset
                            color="success"
                            label="ບໍລິສັດ"
                            :rules="
                              create_provider.charge_fee_customer == true ||
                              create_provider.charge_fee_provider == true
                                ? []
                                : [charge_fee_provider_RUL]
                            "
                          ></v-switch>
                        </v-sheet>
                      </v-col>
                      <v-col cols="12" sm="4" md="4" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.charge_day"
                            inset
                            color="success"
                            label="ຕັດເທື່ອລະລາຍການ"
                            :rules="
                              create_provider.charge_fee_customer == true ||
                              create_provider.charge_week == true ||
                              create_provider.charge_month == true
                                ? []
                                : [charge_day_RUL]
                            "
                            :disabled="
                              create_provider.charge_month == true ||
                              create_provider.charge_week == true
                            "
                          ></v-switch>
                        </v-sheet>
                      </v-col>
                      <v-col cols="12" sm="4" md="4" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.charge_week"
                            inset
                            color="success"
                            label="ຍອດລວມປະຈຳທິດ"
                            :rules="
                              create_provider.charge_fee_customer == true ||
                              create_provider.charge_fee_provider == true ||
                              create_provider.charge_day == true ||
                              create_provider.charge_month == true
                                ? []
                                : [charge_week_RUL]
                            "
                            :disabled="
                              create_provider.charge_day == true ||
                              create_provider.charge_month == true
                            "
                          ></v-switch>
                        </v-sheet>
                      </v-col>
                      <v-col cols="12" sm="4" md="4" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.charge_month"
                            inset
                            color="success"
                            label="ຍອດລວມປະຈຳເດືອນ"
                            :rules="
                              create_provider.charge_fee_customer == true ||
                              create_provider.charge_fee_provider == true ||
                              create_provider.charge_week == true ||
                              create_provider.charge_day == true
                                ? []
                                : [charge_month_RUL]
                            "
                            :disabled="
                              create_provider.charge_day == true ||
                              create_provider.charge_week == true
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
              <v-card
                class="mx-auto"
                outlined
                :disabled="create_provider.charge_fee_provider == true"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 mb-1">
                      ຄ່າທຳນຽມການດຳເນິນທຸລະກຳຕັດຈາກບັນຊີລູກຄ່າຊຳລະເອງ
                    </v-list-item-title>
                    <v-row cols="12" class="pa-3">
                      <v-col cols="12" sm="12" md="12" xs="12">
                        <v-switch
                          v-model="create_provider.charge_fee_customer"
                          inset
                          color="success"
                          label="ລູກຄ້າ"
                          :rules="
                            create_provider.charge_fee_provider == false
                              ? [charge_fee_customer_RUL]
                              : []
                          "
                        ></v-switch>
                      </v-col>
                      <v-col cols="12" sm="4" md="4" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.charge_transaction"
                            inset
                            color="success"
                            label="ຕັດເທື່ອລະລາຍການ"
                            :rules="
                              create_provider.charge_fee_customer == true
                                ? [charge_transaction_RUL]
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
            <v-col cols="12" sm="6" md="6" xs="12">
              <v-card
                class="mx-auto"
                outlined
                :disabled="create_provider.change_amount == true"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 mb-1">
                      ຈຳນວນເງິນທີ່ຕັດໃນແຕ່ລະຄັ້ງ ແລະ
                      ຮູບແບບໃນການຕັດ(ຈຳນວນເງິນເດິມ)
                    </v-list-item-title>
                    <v-row cols="12" class="pa-3">
                      <v-col cols="12" sm="4" md="4" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.no_change_amount"
                            inset
                            color="success"
                            label="ຈຳນວນເງິນເດິມ"
                            :rules="
                              create_provider.change_amount == false
                                ? [no_chang_amount_RUL]
                                : []
                            "
                          ></v-switch>
                        </v-sheet>
                      </v-col>
                      <v-col cols="12=" sm="4" md="4" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.onmonth"
                            inset
                            color="success"
                            label="ເດືອນ"
                            :rules="
                              create_provider.threemonth == true ||
                              create_provider.no_change_amount == false
                                ? []
                                : [onmonth_RUL]
                            "
                            :disabled="create_provider.threemonth == true"
                          ></v-switch>
                        </v-sheet>
                      </v-col>
                      <v-col cols="12=" sm="4" md="4" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.threemonth"
                            inset
                            color="success"
                            label="3 ເດືອນ"
                            :rules="
                              create_provider.onmonth == true ||
                              create_provider.no_change_amount == false
                                ? []
                                : [onmonth_RUL]
                            "
                            :disabled="create_provider.onmonth == true"
                          ></v-switch>
                        </v-sheet>
                      </v-col>
                    </v-row>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
            <v-col cols="12" sm="6" md="6" xs="12">
              <v-card
                class="mx-auto"
                outlined
                :disabled="create_provider.no_change_amount == true"
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-list-item-title class="text-h6 mb-1">
                      ຈຳນວນເງິນທີ່ຕັດໃນແຕ່ລະຄັ້ງ ແລະ
                      ຮູບແບບໃນການຕັດ(ປ່ຽນແປງຈຳນວນເງິນ)
                    </v-list-item-title>
                    <v-row cols="12" class="pa-3">
                      <v-col cols="12" sm="4" md="4" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.change_amount"
                            inset
                            color="success"
                            label="ປ່ຽນແປງຈຳນວນເງິນ"
                            :rules="
                              create_provider.no_change_amount == false
                                ? [chang_amount_RUL]
                                : []
                            "
                          ></v-switch>
                        </v-sheet>
                      </v-col>
                      <v-col cols="12=" sm="4" md="4" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.onday"
                            inset
                            color="success"
                            label="ວັນ"
                            :rules="
                              create_provider.onmonths == true ||
                              create_provider.no_change_amount == true
                                ? []
                                : [onday_RUL]
                            "
                            :disabled="create_provider.onmonths == true"
                          ></v-switch>
                        </v-sheet>
                      </v-col>
                      <v-col cols="12=" sm="4" md="4" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.onmonths"
                            inset
                            color="success"
                            label="ເດືອນລະຄັ້ງ"
                            :rules="
                              create_provider.onday == true ||
                              create_provider.no_change_amount == true
                                ? []
                                : [onmonths_Rul]
                            "
                            :disabled="create_provider.onday == true"
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
                      ຮູບແບບການຕັດເງິນຄືນໃນກໍລິນີເງິນບໍ່ພຽງພໍໃນການຕັດ
                    </v-list-item-title>
                    <v-row cols="12" class="pa-3">
                      <v-col cols="12" sm="4" md="4" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.notcutback"
                            inset
                            color="success"
                            label="ບໍ່ຕັດຄືນ"
                            :disabled="
                              create_provider.cutback == true ||
                              create_provider.endofmonth == true
                            "
                          ></v-switch>
                        </v-sheet>
                      </v-col>
                      <v-col cols="12=" sm="4" md="4" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.cutback"
                            inset
                            color="success"
                            label="ຕັດຄືນ"
                            :disabled="
                              create_provider.notcutback == true ||
                              create_provider.endofmonth == true
                            "
                          ></v-switch>
                        </v-sheet>
                      </v-col>
                      <v-col cols="12=" sm="4" md="4" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.endofmonth"
                            inset
                            color="success"
                            label="ຕັດສິນສຸດເດືອນ"
                            :disabled="
                              create_provider.notcutback == true ||
                              create_provider.cutback == true
                            "
                          ></v-switch>
                        </v-sheet>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" xs="12">
                        <v-text-field
                          v-model="create_provider.day_amount"
                          :rules="
                            create_provider.notcutback == true ||
                            create_provider.cutback == false
                              ? []
                              : [day_amount_Rul]
                          "
                          :disabled="
                            create_provider.notcutback == true ||
                            create_provider.cutback == false
                          "
                          label="ຈຳນວນວັນວົນລູບ"
                          placeholder="ຈຳນວນວັນວົນລູບ"
                          outlined
                        ></v-text-field>
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
                      ກໍລະນີຕັດຄ່າທຳນຽມຈາກບັນຊີອື່ນ
                    </v-list-item-title>
                    <v-row cols="12" class="pa-3">
                      <v-col cols="12" sm="6" md="6" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.provider_acc_no_fix"
                            inset
                            color="success"
                            label="ຕັດຈາກບັນຊີອື່ນ"
                            :disabled="create_provider.provider_acc_fix == true"
                            :rules="
                              create_provider.provider_acc_fix == true
                                ? []
                                : [provider_acc_fix_RUL]
                            "
                          ></v-switch>
                        </v-sheet>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" xs="12">
                        <v-sheet>
                          <v-switch
                            v-model="create_provider.provider_acc_fix"
                            inset
                            color="success"
                            label="ຕັດຈາກບັນຊີຮອງຮັບ"
                            :disabled="
                              create_provider.provider_acc_no_fix == true
                            "
                            :rules="
                              create_provider.provider_acc_no_fix == true
                                ? []
                                : [provider_acc_fix_RUL]
                            "
                          ></v-switch>
                        </v-sheet>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" xs="12">
                        <v-text-field
                          v-model="create_provider.provider_fix_acc"
                          label="ເລກ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                          placeholder="ເລກ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                          outlined
                          counter
                          :disabled="create_provider.provider_acc_fix == true"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12=" sm="6" md="6" xs="12">
                        <v-select
                          v-model="create_provider.provider_fix_ccy"
                          :items="currency"
                          item-text="abbr"
                          label="ສະກຸນເງິນ"
                          placeholder="ສະກຸນເງິນ"
                          outlined
                          :disabled="create_provider.provider_acc_fix == true"
                          @change="CheckAccountsFee()"
                        ></v-select>
                      </v-col>
                      <v-col cols="12=" sm="12" md="12" xs="12">
                        <v-text-field
                          v-model="create_provider.provider_fix_name"
                          label="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                          placeholder="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                          outlined
                          :disabled="create_provider.provider_acc_fix == true"
                        ></v-text-field>
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
        <v-btn :disabled="curr==1 ? true : false" class="mx-2" fab dark color="red" @click="curr -= 1">
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
      updateAutoAccounts: [{}],
      create_provider: {
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
        provider_status: "",
        provider_fee_acc: "",
        provider_fee_ccy: "",
        provider_fee_name: "",
        fee_id: "",
        charge_fee_provider: "",
        charge_day: "",
        charge_week: "",
        charge_month: "",
        charge_fee_customer: "",
        charge_transaction: "",
        no_change_amount: "",
        onmonth: "",
        threemonth: "",
        change_amount: "",
        onday: "",
        onmonth: "",
        onmonths: "",
        notcutback: "",
        cutback: "",
        endofmonth: "",
        day_amount: "",
        provider_acc_fix: "",
        provider_acc_no_fix: "",
        provider_fix_acc: "",
        provider_fix_ccy: "",
        provider_fix_name: "",
      },
      full_name_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      phone_no_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
        (v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນຂໍ້ມູນເປັນຕົວເລກ*",
      ],
      line_phone_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
        (v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນຂໍ້ມູນເປັນຕົວເລກ*",
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
        (v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນຂໍ້ມູນເປັນຕົວເລກ*",
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
        (v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນຂໍ້ມູນເປັນຕົວເລກ*",
      ],
      provider_fix_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_fee_acc_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
        (v) => Number.isInteger(Number(v)) || "ກະລຸນາປ້ອນຂໍ້ມູນເປັນຕົວເລກ*",
      ],
      provider_fee_name_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_fee_ccy_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_fix_acc_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_fix_name_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_fix_ccy_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      fee_id_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      charge_transaction_RUL: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      auto_charge_fee_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      auto_charge_type_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      onmonth_RUL: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      auto_cut_type_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      onday_RUL: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      day_amount_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      provider_acc_fix_RUL: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      onmonths_Rul: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      chang_amount_RUL: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      no_chang_amount_RUL: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      charge_month_RUL: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      charge_week_RUL: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      charge_day_RUL: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      charge_fee_provider_RUL: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
      charge_fee_customer_RUL: (v) => !!v || "ກະລຸນາປ້ອນຂໍ້ມູນ*",
    };
  },
  async mounted() {
    this.$store.dispatch({ type: "restoreLogin" });
    this.loadProductType();
    this.loadFeeType();
    this.loadProvider();
    // get provider for ebit auto debit
    let result = await api.GetProviderAutoById(this.$route.params.id);
    this.create_provider = result.data.body;
    //get account auto debit for updateAccounts
    let resacc = await api.GetAutoAccount(this.$route.params.id);
    this.updateAutoAccounts = resacc.data.body;

    if (this.create_provider.provider_status == "A") {
      this.create_provider.provider_status = true;
    } else {
      this.create_provider.provider_status = false;
    }
    if (this.create_provider.provider_fix == "Y") {
      this.create_provider.provider_fix = true;
    } else {
      this.create_provider.provider_fix = false;
    }
    if (this.create_provider.charge_fee_provider == "Y") {
      this.create_provider.charge_fee_provider = true;
    } else {
      this.create_provider.charge_fee_provider = false;
    }
    if (this.create_provider.charge_fee_customer == "N") {
      this.create_provider.charge_fee_customer = true;
    } else {
      this.create_provider.charge_fee_customer = false;
    }
    if (
      this.create_provider.charge_day == "DAILY" &&
      this.create_provider.charge_fee_provider == "Y"
    ) {
      this.create_provider.charge_day = true;
    } else {
      this.create_provider.charge_day = false;
    }
    if (this.create_provider.charge_transaction == "DAILY") {
      this.create_provider.charge_transaction = true;
    } else {
      this.create_provider.charge_transaction = false;
    }
    if (this.create_provider.charge_week == "WEEKLY") {
      this.create_provider.charge_week = true;
    } else {
      this.create_provider.charge_week = false;
    }
    if (this.create_provider.charge_month == "MONTHLY") {
      this.create_provider.charge_month = true;
    } else {
      this.create_provider.charge_month = false;
    }
    if (this.create_provider.auto_condition_type == "N") {
      this.create_provider.auto_condition_type = true;
    } else {
      this.create_provider.auto_condition_type = false;
    }
    if (this.create_provider.onday == "N") {
      this.create_provider.onday = true;
    } else {
      this.create_provider.onday = false;
    }
    if (
      this.create_provider.onmonth == "Y" &&
      this.create_provider.no_change_amount == "TTLL"
    ) {
      this.create_provider.onmonth = true;
    } else {
      this.create_provider.onmonth = false;
    }
    if (
      this.create_provider.onmonths == "Y" &&
      this.create_provider.no_change_amount == "TTLL_AUTO"
    ) {
      this.create_provider.onmonths = true;
    } else {
      this.create_provider.onmonths = false;
    }
    if (this.create_provider.notcutback == "N") {
      this.create_provider.notcutback = true;
    } else {
      this.create_provider.notcutback = false;
    }
    if (this.create_provider.cutback == "Y") {
      this.create_provider.cutback = true;
    } else {
      this.create_provider.cutback = false;
    }
    if (this.create_provider.endofmonth == "Y") {
      this.create_provider.endofmonth = true;
    } else {
      this.create_provider.endofmonth = false;
    }
    if (this.create_provider.no_change_amount == "TTLL") {
      this.create_provider.no_change_amount = true;
    } else {
      this.create_provider.no_change_amount = false;
    }
    if (this.create_provider.change_amount == "TTLL_AUTO") {
      this.create_provider.change_amount = true;
    } else {
      this.create_provider.change_amount = false;
    }
    if (this.create_provider.provider_acc_fix == "N") {
      this.create_provider.provider_acc_fix = true;
    } else {
      this.create_provider.provider_acc_fix = false;
    }
    if (this.create_provider.provider_acc_no_fix == "Y") {
      this.create_provider.provider_acc_no_fix = true;
    } else {
      this.create_provider.provider_acc_no_fix = false;
    }
  },
  methods: {
    formatNumber(num) {
      return parseFloat(num).toFixed(2);
    },
    async ViewFeeProvider() {
      this.Fee_dialog = true;
      let formData = new FormData();
      formData.append("fee_id", this.create_provider.fee_id);
      let results = await api.ViewFeeProviders(formData);
      this.viewFee = results.data.body;
    },
    //get account for check
    async getAccounts() {
      let txnAcc;
      let txnCcy;
      let formData = new FormData();
      this.create_provider.account.forEach((value, index) => {
        txnAcc = value.provider_acc;
        txnCcy = value.provider_ccy;
      });
      formData.append("txnAcc", txnAcc);
      formData.append("txnCcy", txnCcy);
      let result = await api.getAccounts(formData);
      if (result.data.body.respCode == "00") {
        this.create_provider.account.forEach((value, index) => {
          value.provider_acc_name = result.data.body.accountName;
        });
      } else {
        this.errorAccount = true;
        this.create_provider.account.forEach((value, index) => {
          value.provider_acc_name = "";
        });
      }
    },
    //CheckAccounts fee
    async CheckAccounts() {
      let formData = new FormData();
      formData.append("txnAcc", this.create_provider.provider_fee_acc);
      formData.append("txnCcy", this.create_provider.provider_fee_ccy);
      let result = await api.getAccounts(formData);
      if (result.data.body.respCode == "00") {
        this.create_provider.provider_fee_name = result.data.body.accountName;
      } else {
        this.errorAccount = true;
        this.create_provider.provider_fee_name = "";
      }
    },
    //check  fixaccount
    async CheckAccountsFee() {
      let formData = new FormData();
      formData.append("txnAcc", this.create_provider.provider_fix_acc);
      formData.append("txnCcy", this.create_provider.provider_fix_ccy);
      let result = await api.getAccounts(formData);
      if (result.data.body.respCode == "00") {
        this.create_provider.provider_fix_name = result.data.body.accountName;
      } else {
        this.errorAccount = true;
        this.create_provider.provider_fix_name = "";
      }
    },
    async fetchProviders() {
      let formData = new FormData();
      formData.append("provider_code", this.create_provider.providers);
      let results = await api.fetchProviders(formData);
      this.create_provider = results.data.body;
      this.create_provider.account.push({
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
      this.create_provider.account.splice([index], 1);
    },
    addRow() {
      this.create_provider.account.push({
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
      let arr = [];
      this.updateAutoAccounts.forEach((value, index) => {
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
          charge_fee_provider,
          charge_fee_customer,
          charge_transaction,
          change_amount,
          no_change_amount,
          provider_acc_fix,
          provider_acc_no_fix,
          onmonths,
        } = this.create_provider;
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
        formData.append("provider_acc_fix", provider_acc_fix);
        formData.append("provider_acc_no_fix", provider_acc_no_fix);
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
        formData.append("charge_fee_provider", charge_fee_provider);
        formData.append("charge_fee_customer", charge_fee_customer);
        formData.append("charge_transaction", charge_transaction);
        formData.append("change_amount", change_amount);
        formData.append("no_change_amount", no_change_amount);
        formData.append("onmonths", onmonths);
        formData.append("username", this.$store.getters["username"]);
        formData.append("provider_acc", JSON.stringify(arr));
        let result = await api.UpdateProvider(formData);
        if (result.data.body.responseMsg = true) {
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
