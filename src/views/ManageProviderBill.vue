<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-data-table :search="search" :headers="headers" :items="providerBill">
        <!-- table top section -->
        <template v-slot:top>
          <v-col cols="12" sm="6" md="12" xs="12">
            <v-toolbar flat color="white">
              <v-toolbar-title>ຈັດການຂໍ້ມູນບໍລິສັດ(BILL)</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field
                v-model="search"
                append-icon="search"
                label="ຄົ້ນຫາ"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn
                @click="$router.push('/ManageProviderCrateBill')"
                class="mx-1"
                fab
                dark
                color="success"
              >
                <v-icon size="30"> mdi-plus-circle</v-icon>
              </v-btn>
            </v-toolbar>
          </v-col>
        </template>

        <!-- table tr section -->
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>
              <v-chip class="ma-2" color="deep-purple accent-4" outlined>{{
                item.provider_code
              }}</v-chip>
              <v-chip class="ma-2" x-small>
                {{ item.provider_long }}
              </v-chip>
            </td>
            <td>{{ item.provider_group }}</td>
            <td>
              <v-chip x-small class="ml-0 mr-2 white--text" color="success" outlined>
                F:{{item.start_time}}
              </v-chip>
              <v-chip x-small class="ml-0 mr-2 white--text" color="error" outlined>
                T:{{item.end_time}}
              </v-chip>
            </td>
            <td>
               <v-chip  x-small  class="ml-0 mr-2 white--text" :color="item.service_status =='A' ? 'success' : 'error'" outlined>
                {{ item.service_status =='A' ? 'ເປິດໃຫ້ບໍລິການ' : 'ປິດໃຫ້ບໍລິການ' }}
              </v-chip>
                <v-chip v-if="(item.provider_group == 'ELECTRICT') || (item.provider_group == 'WATER')"  x-small  class="ml-0 mr-2 white--text" :color="item.aditional =='N' ? 'error' : 'info'" outlined>
                {{ item.aditional =='N' ? 'ປິດວັນສຸກ ທ້າຍເດືອນ' : 'ປິດ ເສົາ-ທິດ ທ້າຍເດືອນ' }}
              </v-chip>
              <v-chip x-small v-if="(item.provider_group == 'ELECTRICT') || (item.provider_group == 'WATER')"   class="ml-0 mr-2 white--text" :color="item.onday =='N' ? 'info':'error'" outlined>
                D:{{item.onday =='N' ? 'ເປິດໃຫ້ບໍລິການ':'ປິດທ້າຍມື້ຕາມໂມງ'}}
              </v-chip>
              <v-chip x-small v-if="(item.provider_group == 'ELECTRICT') || (item.provider_group == 'WATER')"   class="ml-0 mr-2 white--text" :color="item.stop_week =='N' ? 'info':'error'" outlined>
                W:{{item.stop_week =='N' ? 'ເປິດໃຫ້ບໍລິການ':'ປິດທ້າຍທິດຕາມໂມງ'}}
              </v-chip>
              <v-chip x-small v-if="(item.provider_group == 'ELECTRICT') || (item.provider_group == 'WATER')"   class="ml-0 mr-2 white--text" :color="item.stop_week =='N' ? 'info':'error'" outlined>
                M:{{item.stop_month =='N' ? 'ເປິດໃຫ້ບໍລິການ':'ປິດທ້າຍເດືອນ'}}
              </v-chip>
            </td>
            <td>{{ item.provider_channel ==null ? 'Another': item.provider_channel}}</td>
            <td>
              <v-btn
                class="mr-2"
                @click="editProviderBill(item)"
                color="warning"
                fab
                dark
                small
              >
                <v-icon dark> mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                class="mr-2"
                @click="deleteItem(item)"
                color="danger"
                fab
                small
                dark
              >
                <v-icon dark> mdi-delete-empty</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>

      <v-dialog v-model="confirmDeleteDlg" max-width="350">
        <v-card>
          <v-card-title class="headline text-center"
            >ຢັງຢຶນການລືບຂໍ້ມູນ</v-card-title
          >
          <v-card-text class="body text-center red--text">
            ຕ້ອງການລືບ<v-chip
              small
              class="ma-2"
              color="red"
              text-color="white"
              >{{ provider_code }}</v-chip
            >ອອກຈາກລະບົບແທ້ບໍ ?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn tile @click="confirmDeleteDlg = false" color="error"
              ><v-icon>mdi-reload-alert</v-icon>ຍົກເລິກ</v-btn
            >
            <v-btn color="success" tile @click="confirmDelete"
              ><v-icon>mdi-check</v-icon> ຕົກລົງ
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-container>
</template>
<script>
import api from "@/services/api";
export default {
  name: "ManageProviderBill",
  data() {
    return {
      provider_code: "",
      search: "",
      selectedProductId: "",
      confirmDeleteDlg: false,
      providerBill: [],
      headers: [
        {
          align: "start",
          sortable: false,
        },
        { text: "ຊື່ຫຍໍ້ແລະຊື່ເຕັມ", value: "provider_code" },
        { text: "ກຸ່ມບໍລິສັດ", value: "provider_group" },
        { text: "ເລວາເປິດໃຫ້ຊຳລະ", value: "pay_time" },
        { text: "ເງື່ອນໄຂໃຫ້ບໍລິການ", value: "pay_condition" },
        { text: "ຊ່ອງທາງເຊື່ອມຕໍ່", value: "connection_mode" },
        { text: "ຕົວເລືອກ", value: "action" },
      ],
    };
  },
  async mounted() {
    this.loadProviderBill();
  },
  methods: {
    async loadProviderBill() {
      let result = await api.gitproviderbill();
      this.providerBill = result.data.body;
    },
    editProviderBill(item) {
      this.$router.push(`/ManageProviderEditBill/${item.provider_code}`);
    },
    deleteItem(item) {
      this.provider_code = item.provider_code;
      this.selectedProductId = item.provider_code;
      this.confirmDeleteDlg = true;
    },
    async confirmDelete() {
      await api.deleteprovider(this.selectedProductId);
      this.confirmDeleteDlg = false;
      this.loadProvider();
    },
  },
};
</script>
<style lang="scss" scoped></style>
