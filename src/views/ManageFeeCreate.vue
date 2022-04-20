<template lang="html">
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12">
        <v-card class="mx-auto pa-5" outlined>
          <v-toolbar-title class="mb-5"
            >ຈັດການຂັ້ນບັນໃດຄ່າທຳນຽມ</v-toolbar-title
          >
          <v-form @submit.prevent="submit" ref="form">
            <v-btn @click="addRow" small text color="danger" class="ml-2">
              <v-icon>mdi-briefcase-plus</v-icon>
              <span>ເພິ່ມຂັນບັນໃດ</span>
            </v-btn>
            <v-row
              class="rounded mb-2"
              v-for="(fee, index) in create_fee.fee_amount"
              :key="index"
              style="border: 1px solid lightgrey"
            >
              <v-col cols="4">
                <v-text-field
                  v-model="fee.from_amt"
                  label="ຈາກ"
                  required
                  solo
                  type="number"
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  v-model="fee.to_amt"
                  label="ຫາ"
                  required
                  solo
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  v-model="fee.total_amt"
                  label="ເປັນເງິນ"
                  required
                  solo
                ></v-text-field>
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
                  :disabled="Object.keys(create_fee.fee_amount).length === 1"
                  @click="deleteRow(index)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-col>
            </v-row>
            <v-layout row>
              <v-spacer></v-spacer>
              <v-btn color="error" class="mr-4" @click="cancel"
                ><v-icon>mdi-refresh-auto</v-icon> ຍົກເລິກ
              </v-btn>
              <v-btn color="success" type="submit"
                ><v-icon>mdi-database-plus</v-icon> ບັນທຶກ
              </v-btn>
            </v-layout>
          </v-form>
          {{create_fee}}
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
      isShowPassword: false,
      create_fee: {
        fee_amount: [{}],
      },
    };
  },
  methods: {
    addRow() {
      this.create_fee.fee_amount.push({});
    },
        deleteRow(index) {
      this.create_fee.fee_amount.splice([index], 1);
    },
  },
};
</script>
<style lang="scss" scoped></style>