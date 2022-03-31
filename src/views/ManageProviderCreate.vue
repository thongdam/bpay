<template lang="html">
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12">
        <v-card class="mx-auto pa-5" outlined>
          <v-toolbar-title class="mb-5 text-center"
            ><v-icon color="success">mdi-database-plus</v-icon
            >ຕັ້ງຄ່າໃຫ້ກັບບໍລິສັດເພື່ອເປິດນຳໃຊ້ບໍລິການ B-Pay</v-toolbar-title
          >
          <v-form @submit.prevent="submit" ref="form">
            <v-toolbar-title class="mb-2"
              ><v-icon color="success">mdi-domain</v-icon
              >ຂໍ້ມູນບໍລິສັດ:</v-toolbar-title
            >
            <v-row>
              <v-col cols="4">
                <v-text-field
                  v-model="create_users.full_name"
                  label="ຊື່ ແລະ ນາມສະກຸນ"
                  required
                  filled
                  dense
                  :rules="full_name_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="create_users.phone_no"
                  label="ໂທລະສັບມືຖື"
                  required
                  filled
                  dense
                  :rules="phone_no_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="create_users.line_phone"
                  label="ໂທລະສັບຕັ້ງໂຕະ"
                  required
                  filled
                  dense
                  :rules="line_phone_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="create_users.provider_name"
                  label="ຊື່ ບໍລິສັດ"
                  required
                  filled
                  dense
                  :rules="provider_name_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="create_users.provider_code"
                  label="ຊື່ຫຍໍ້"
                  required
                  filled
                  dense
                  :rules="provider_code_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="create_users.product_type"
                  label="ປະເພດທຸລະກິດ"
                  required
                  filled
                  dense
                  :rules="product_type_Rul"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-toolbar-title class="mb-2"
              ><v-icon color="success">mdi-bank</v-icon
              >ຂໍ້ມູນບັນຊີທີ່ໃຊ້ຊຳລະສະສາງ ແລະ ຕັດຄ່າທຳນຽມ:</v-toolbar-title
            >
            <v-row>
              <v-col cols="3">
                <v-text-field
                  v-model="create_users.account_year_fee"
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
                  v-model="create_users.account_name_year_fee"
                  label="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ"
                  required
                  filled
                  dense
                  :rules="account_name_year_fee_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="create_users.account_drfee"
                  label="ເລກ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                  required
                  filled
                  dense
                  counter
                  :rules="account_drfee_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="create_users.account_name_drfee"
                  label="ຊື່ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ"
                  required
                  filled
                  dense
                  :rules="account_name_drfee_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="create_users.account_cr"
                  label="ຊື່ ບັນຊີຮອງຮັບ"
                  required
                  filled
                  dense
                  counter
                  :rules="account_cr_Rul"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="create_users.account_name_cr"
                  label="ຊື່ ບັນຊີຮອງຮັບ"
                  required
                  filled
                  dense
                  :rules="account_name_cr_Rul"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" sm="4" md="4">
                <v-toolbar-title class="mb-2"
                  ><v-icon color="success">mdi-credit-card-marker</v-icon
                  >ເລືອກຮູບແບບການຊຳລະ:</v-toolbar-title
                >
                <v-col cols="6">
                  <v-autocomplete
                    v-model="create_users.provider_chanel"
                    dense
                    filled
                    label="ເລືອກຊ່ອງທາງ"
                    :rules="provider_chanel_Rul"
                  ></v-autocomplete>
                </v-col>
                <v-col cols="6">
                  <v-checkbox
                    v-model="create_users.provider_chanel_auto"
                    label="ຕັດບັນຊີຜ່ານລະບົບໂອໂຕເດບິດ"
                    value=""
                    required
                    color="success"
                  ></v-checkbox>
                </v-col>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-toolbar-title class="mb-2"
                  ><v-icon color="success">mdi-send</v-icon
                  >ຮູບແບບການຮັບສົ່ງຂໍ້ມູນໃຫ້ທະນາຄານ:</v-toolbar-title
                >
                <v-col cols="6">
                  <v-checkbox
                    v-model="create_users.provider_data_offline"
                    label="ຮັບສົ່ງຂໍ້ມູນຜ່ານລະບົບຂອງທະນາຄານສະໜອງໃຫ້(Offline)"
                    value="A"
                    required
                    color="success"
                  ></v-checkbox>
                </v-col>
                <v-col cols="6">
                  <v-checkbox
                    v-model="create_users.provider_data_online"
                    label="ຮັບສົ່ງຂໍ້ມູນຜ່ານລະບົບຂອງບໍລິສັດ(API)"
                    value=""
                    required
                    color="success"
                  ></v-checkbox>
                </v-col>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-toolbar-title class="mb-2"
                  ><v-icon color="success">mdi-currency-usd-off</v-icon
                  >ສະກຸນເງິນທີ່ຮັບຊຳລະ:</v-toolbar-title
                >
                <v-col cols="12" sm="4" md="4">
                  <v-checkbox
                    v-model="create_users.provider_lak"
                    label="ສະກຸນເງິນກີບ"
                    value="A"
                    required
                    color="success"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="create_users.provider_bath"
                    label="ສະກຸນເງິນບາດ"
                    value=""
                    required
                    color="success"
                  ></v-checkbox>
                  <v-checkbox
                    v-model="create_users.provider_usd"
                    label="ສະກຸນໂດລາ"
                    value=""
                    required
                    color="success"
                  ></v-checkbox>
                </v-col>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-toolbar-title class="mb-2"
                  ><v-icon color="success">mdi-cash-multiple</v-icon
                  >ຄ່າທຳນຽມໃນການດຳເນິດທຸລະກຳສຳຫຼັບ(Leasing):</v-toolbar-title
                >
                <v-checkbox
                  v-model="create_users.bill_chg_provider"
                  label="ຄ່າທຳນຽມການດຳເນິນທຸລະກຳຕັດຈາກບັນຊີບໍລິສັດ"
                  value="A"
                  required
                  color="success"
                ></v-checkbox>
                <v-checkbox
                  v-model="create_users.bill_chg_customer"
                  label="ຄ່າທຳນຽມການດຳເນິດທູລະກຳຕັດຈາກບັນຊີລູກຄ້າ"
                  value=""
                  required
                  color="success"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-toolbar-title class="mb-2"
                  ><v-icon color="success">mdi-archive-refresh</v-icon
                  >ຮູບແບບໃນການຕັດຄ່າທຳນຽມ(Leasing):</v-toolbar-title
                >
                <v-checkbox
                  v-model="create_users.bill_day_chg"
                  label="ເທື່ອລະລາຍການ"
                  value=""
                  required
                  color="success"
                ></v-checkbox>
                <v-checkbox
                  v-model="create_users.bill_week_chg"
                  label="ລວມຍອດທ້າຍທິດ"
                  value=""
                  required
                  color="success"
                ></v-checkbox>
                <v-checkbox
                  v-model="create_users.bill_month_chg"
                  label="ລວມຍອດທ້າຍເດືອນ"
                  value=""
                  required
                  color="success"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-toolbar-title class="mb-2"
                  ><v-icon color="success">mdi-cash-multiple</v-icon
                  >ຄ່າທຳນຽມໃນການດຳເນິດທຸລະກຳສຳຫຼັບ(Auto Debit):</v-toolbar-title
                >
                <v-checkbox
                  v-model="create_users.auto_chg_provider"
                  label="ຄ່າທຳນຽມການດຳເນິນທຸລະກຳຕັດຈາກບັນຊີບໍລິສັດ"
                  value="A"
                  required
                  color="success"
                ></v-checkbox>
                <v-checkbox
                  v-model="create_users.auto_chg_provider"
                  label="ຄ່າທຳນຽມການດຳເນິດທູລະກຳຕັດຈາກບັນຊີລູກຄ້າ"
                  value=""
                  required
                  color="success"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-toolbar-title class="mb-2"
                  ><v-icon color="success">mdi-archive-refresh</v-icon
                  >ຮູບແບບໃນການຕັດຄ່າທຳນຽມ(Auto Debit):</v-toolbar-title
                >
                <v-checkbox
                  v-model="create_users.auto_day_chg"
                  label="ເທື່ອລະລາຍການ"
                  value=""
                  required
                  color="success"
                ></v-checkbox>
                <v-checkbox
                  v-model="create_users.bill_week_chg"
                  label="ລວມຍອດທ້າຍທິດ"
                  value=""
                  required
                  color="success"
                ></v-checkbox>
                <v-checkbox
                  v-model="create_users.bill_month_chg"
                  label="ລວມຍອດທ້າຍເດືອນ"
                  value=""
                  required
                  color="success"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-toolbar-title class="mb-2"
                  ><v-icon color="success">mdi-calendar-plus</v-icon
                  >ຈຳນວນເງິນທີ່ຕັດແຕ່ລະຄັ້ງແລະຮູບແບບໃນການຕັດ (Auto
                  Debit):</v-toolbar-title
                >
                <v-row>
                  <v-col cols="6" sm="4" md="4">
                    <strong class="">ຈຳນວນເງິນເດິມ:</strong>
                    <v-checkbox
                      v-model="create_users.tt_one_day"
                      label="1 ເດືອນ"
                      value="A"
                      required
                      color="success"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="create_users.tt_three_month"
                      label="3 ເດືອນ"
                      value=""
                      required
                      color="success"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="create_users.tt_six_month"
                      label="6 ເດືອນ"
                      value=""
                      required
                      color="success"
                    ></v-checkbox>
                  </v-col>
                  <v-col cols="6" sm="4" md="4">
                    <strong class="">ປ່ຽນແປງຈຳນວນເງິນ:</strong>
                    <v-checkbox
                      v-model="create_users.to_one_day"
                      label="ວັນ"
                      value="A"
                      required
                      color="success"
                    ></v-checkbox>
                    <v-checkbox
                      v-model="create_users.to_one_month"
                      label="ເດືອນ"
                      value=""
                      required
                      color="success"
                    ></v-checkbox>
                  </v-col>
                </v-row>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-toolbar-title class="mb-2"
                  ><v-icon color="success">mdi-refresh-auto</v-icon
                  >ຮູບແບບການ(Loop):</v-toolbar-title
                >
                <v-checkbox
                  v-model="create_users.data_daily"
                  label="ສົ່ງຂໍ້ມູນທຸກມື້"
                  value="A"
                  required
                  color="success"
                ></v-checkbox>
                <v-checkbox
                  v-model="create_users.end_of_month"
                  label="ຕັດສິນສຸດເດືອນ"
                  value=""
                  required
                  color="success"
                ></v-checkbox>
                <v-checkbox
                  v-model="create_users.cut_back"
                  label="ຕັດຄືນ"
                  hide-details
                  class="shrink mr-2 mt-0"
                ></v-checkbox>
                <v-text-field label="ຈຳນວນວັນທີ່ຕ້ອງການຕັດຄືນ"></v-text-field>
              </v-col>
            </v-row>
            <v-layout row>
              <v-spacer></v-spacer>
              <v-btn color="danger" class="mr-4 white--text" @click="cancel">
                <v-icon>mdi-refresh </v-icon> [ຍົກເລິກ]
              </v-btn>
              <v-btn color="success" type="submit">
                <v-icon>mdi-content-save </v-icon> [ບັນທຶກ]
              </v-btn>
            </v-layout>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  name: "ManageUserCreate",
  data() {
    return {
      items: ['ຊຳລະເອງ(B-Pay)ຜ່ານຊ່ອງທາງ Bcel One,Bcel i-Bank,Counter', 'ຕັດບັນຊີແບບໂອໂຕ(Auto Debit)',],
      value: ['A','A'],
      create_users: {
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
        provider_chanel: [{ text: "ຊຳລະເອງ(B-Pay)ຜ່ານຊ່ອງທາງ Bcel One,Bcel i-Bank,Counter", value: "A" },{ text: "ຕັດບັນຊີແບບໂອໂຕ(Auto Debit)", value: "A" }],
        provider_chanel_auto: "",
        provider_data_offline: "",
        provider_data_online: "",
        provider_lak: "",
        provider_bath: "",
        provider_usd: "",
        bill_chg_provider: "",
        bill_chg_customer: "",
        bill_day_chg: "",
        bill_week_chg: "",
        bill_month_chg: "",
        auto_chg_provider: "",
        auto_day_chg: "",
        auto_week_chg: "",
        auto_month_chg: "",
        tt_one_day: "",
        tt_three_month: "",
        tt_six_month: "",
        to_one_day: "",
        to_one_month: "",
        data_daily: "",
        end_of_month: "",
        cut_back: "",
      },
      full_name: "",
      full_name_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ຊື່ ແລະ ນາມສະກຸນ"],
      phone_no: "",
      phone_no_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ເບີໂທລະສັບມືຖື"],
      line_phone: "",
      line_phone_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ເບີໂທລະສັບຕັ້ງໂຕະ"],
      provider_name: "",
      provider_name_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ຊື່ ບໍລິສັດ"],
      provider_code: "",
      provider_code_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ຊື້ ຫຍໍ້ບໍລິສັດ"],
      product_type: "",
      product_type_Rul: [(v) => !!v || "ກະລຸນາ ເລືອກປະເພດທຸລະກິດ"],
      account_year_fee: "",
      account_year_fee_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນ ເລກ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ",
      ],
      account_name_year_fee: "",
      account_name_year_fee_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນ ຊື່ ບັນຊີຕັດຄ່າທຳນຽມລາຍປີ",
      ],
      account_drfee: "",
      account_drfee_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນ ເລກ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ",
      ],
      account_name_drfee: "",
      account_name_drfee_Rul: [
        (v) => !!v || "ກະລຸນາປ້ອນ ຊື່ ບັນຊີຕັດຄ່າທຳນຽມເຮັດທຸລະກຳ",
      ],
      account_cr: "",
      account_cr_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ເລກ ບັນຊີຮອງຮັບ"],
      account_name_cr: "",
      account_name_cr_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ຊື່ ບັນຊີຮອງຮັບ"],
      provider_chanel: "",
      provider_chanel_Rul: [(v) => !!v || "ກະລຸນາ ເລືອກ ຊ່ອງທາງການຊຳລະ"],

      provider_chanel_auto_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      provider_data_offline_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      provider_data_online_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      provider_lak_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      provider_bath_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      provider_usd_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      bill_chg_provider_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      bill_chg_customer_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      bill_day_chg_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      bill_week_chg_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      bill_month_chg_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      auto_chg_provider_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      auto_day_chg_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      tt_one_day_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      tt_three_month_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      tt_six_month_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      to_one_day_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      to_one_month_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      data_daily_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      end_of_month_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
      cut_back_Rul: [(v) => !!v || "ກະລຸນາປ້ອນຊື້ຫຍໍ້ບໍລິສັດ"],
    };
  },
  methods: {
    async submit() {
      console.log(this.create_users)
      // if (this.$refs.form.validate()) {
      //   let formData = new FormData();
      //   const { provider_code, provider_name, provider_auto, provider_bill } =
      //     this.create_users;
      //   formData.append("provider_code", provider_code);
      //   formData.append("provider_name", provider_name);
      //   formData.append("provider_auto", provider_auto);
      //   formData.append("provider_bill", provider_bill);
      //   let result = await api.addProvider(formData);
      //   if (result.status == 200) {
      //     this.$router.back();
      //   }
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
