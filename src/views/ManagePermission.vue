<template>
  <v-container>
    <v-card>
      <v-card-text>
        <v-toolbar-title class="mb-5 text-center mt-5">
          <v-icon color="success"> mdi-key-plus </v-icon> ເພິ່ນສິດຜູ້ໃຊ້ງານ
        </v-toolbar-title>
        <v-row>
          <v-col cols="12" sm="3" md="3">
            <v-switch
              inset
              v-model="permissions.dashboard"
              label="ພາບລວມລະບົບ"
              color="success"
            ></v-switch>
            <v-switch
              inset
              v-model="permissions.manage_user"
              label="ຈັດການຂໍ້ມູນຜູ້ໃຊ້"
              color="success"
            ></v-switch>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-switch
              inset
              v-model="permissions.manage_provider"
              label="ຈັດການຂໍ້ມູນບໍລິສັດ(AUTO)"
              color="success"
            ></v-switch>
            <v-switch
              inset
              v-model="permissions.manage_provider_bill"
              label="ຈັດການຂໍ້ມູນບໍລິສັດ(BILL)"
              color="success"
            ></v-switch>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-switch
              inset
              v-model="permissions.manage_register"
              label="ຈັດການລົງທະບຽນ"
              color="success"
            ></v-switch>
            <v-switch
            inset
              v-model="permissions.check_upload_data"
              label="ກວດສອບລາຍການອັບໂຫຼດ"
              color="success"
            ></v-switch>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-switch
              inset
              v-model="permissions.manage_auto_debit"
              label="ກວດສອບລາຍການ(Auto)"
              color="success"
            ></v-switch>
            <v-switch
            inset
              v-model="permissions.manage_end_of_year"
              label="ຈັດການປິດລະບົບສະຫຼຸບປີ"
              color="success"
            ></v-switch>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-switch
              inset
              v-model="permissions.water_check_list"
              label="ກວດສອບຍອດໜີ້ນ້ຳປະປາ"
              color="success"
            ></v-switch>
            <v-switch
              inset
              v-model="permissions.manage_bill"
              label="ກວດສອບລາຍການ(Bill)"
              color="success"
            ></v-switch>
          </v-col>
          <v-col cols="12" sm="3" md="3">
            <v-switch
              inset
              v-model="permissions.manage_fee"
              label="ຈັດການຂັ້ນບັນໃດຄ່າທຳນຽມ"
              color="success"
            ></v-switch>
            <v-switch
              inset
              v-model="permissions.manage_fee_transaction"
              label="ຈັດການຄ່າທຳນຽມ"
              color="success"
            ></v-switch>
          </v-col>
                    <v-col cols="12" sm="3" md="3">
            <v-switch
              inset
              v-model="permissions.insert_data"
              label="ບັນທຶກຂໍ້ມູນ"
              color="success"
            ></v-switch>
            <v-switch
              inset
              v-model="permissions.update_data"
              label="ແກ້ໄຂຂໍ້ມູນ"
              color="success"
            ></v-switch>
          </v-col>
            <v-col cols="12" sm="3" md="3">
            <v-switch
              inset
              v-model="permissions.delete_data"
              label="ລຶບຂໍ້ມູນ"
              color="success" 
            ></v-switch>
            <v-switch
              inset
              v-model="permissions.search_data"
              label="ຄົ້ນຫາຂໍ້ມູນ"
              color="success"
            ></v-switch>
          </v-col>
        </v-row>
        <v-row>
          <div class="pa-5">
            <v-btn @click="addPermissions()" color="success" fab dark>
              <v-icon>mdi-content-save</v-icon>
            </v-btn>
            <v-btn @click="PageBack()" color="error" class="ml-2" fab dark>
              <v-icon>mdi-refresh</v-icon>
            </v-btn>
          </div>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import api from "@/services/api";
export default {
  data() {
    return {
      valid: false,
      permissions: {
        dashboard: false,
        manage_user: false,
        manage_provider: false,
        manage_provider_bill: false,
        manage_register: false,
        check_upload_data: false,
        manage_auto_debit: false,
        manage_bill: false,
        manage_fee: false,
        manage_fee_transaction: false,
        manage_end_of_year: false,
        water_check_list: false,
        insert_data:false,
        update_data:false,
        delete_data:false,
        search_data:false,
      },
    };
  },
  async mounted() {
    let results = await api.GetPermission(this.$route.params.id);
    this.permissions = results.data.body;
  },
  methods: {
    PageBack() {
      this.$router.push("/ManageUser");
    },
    async addPermissions() {
      let formData = new FormData();
      const {
        dashboard,
        manage_user,
        manage_provider,
        manage_provider_bill,
        manage_register,
        check_upload_data,
        manage_auto_debit,
        manage_bill,
        manage_fee,
        manage_fee_transaction,
        manage_end_of_year,
        water_check_list,
        insert_data,
        update_data,
        delete_data,
        search_data,
      } = this.permissions;
      formData.append("dashboard", dashboard);
      formData.append("manage_user", manage_user);
      formData.append("manage_provider_bill", manage_provider_bill);
      formData.append("manage_register", manage_register);
      formData.append("check_upload_data", check_upload_data);
      formData.append("manage_auto_debit", manage_auto_debit);
      formData.append("manage_bill", manage_bill);
      formData.append("manage_fee", manage_fee);
      formData.append("manage_fee_transaction", manage_fee_transaction);
      formData.append("manage_end_of_year", manage_end_of_year);
      formData.append("manage_provider", manage_provider);
      formData.append("water_check_list", water_check_list);
      formData.append("username", this.$route.params.id);
      formData.append("username_add", this.$store.getters["username"]);
      formData.append("insert_data", insert_data);
      formData.append("update_data", update_data);
      formData.append("delete_data", delete_data);
      formData.append("search_data", search_data);
      let result = await api.AddPermission(formData);
      if (result.data.body.responseMsg == "true") {
        this.$router.back();
      }
    },
  },
};
</script>
