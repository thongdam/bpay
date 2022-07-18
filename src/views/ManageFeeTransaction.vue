<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-data-table :search="search" :headers="headers" :items="providers">
        <!-- table top section -->
        <template v-slot:top>
          <v-col cols="12" sm="6" md="6" xs="12">
            <v-toolbar flat color="white">
              <v-toolbar-title>ຈັດການຕັດຄ່າທຳນຽມ</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ຄົ້ນຫາ"
                single-line
                hide-details
              ></v-text-field>
            </v-toolbar>
          </v-col>
        </template>

        <!-- table tr section -->
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.provider_auto }}</td>
            <td>{{ item.provider_long }}</td>
            <td>{{ item.product_type }}</td>
            <td>
              <v-chip
                v-if="item.fee_company != null"
                class="ma-2"
                color="error"
                outlined
                small
                >{{ item.fee_company }}</v-chip
              >
            </td>
            <td>
              <v-btn
                class="mx-2"
                fab
                dark
                x-small
                color="primary"
                @click="viewFeeDlgs(item)"
              >
                <v-icon dark>mdi-eye</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <!-- select add fee for provider -->
    <v-row justify="center">
      <v-dialog
        v-model="confirmAddFeeDlg"
        persistent
        max-width="800px"
        transition="dialog-top-transition"
      >
        <v-card>
          <v-toolbar color="warning" dark>ຈັດການຕັດຄ່າທຳນຽມ</v-toolbar>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="6" md="12">
                  <v-autocomplete
                    dense
                    chips
                    small-chips
                    label="ເລືອກຄ່າທຳນຽມ"
                    multiple
                    solo
                  ></v-autocomplete>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="confirmAddFeeDlg = false" fab small>
              <v-icon> mdi-close </v-icon>
            </v-btn>
            <v-btn color="success" @click="confirmAddFeeDlg = false" fab small>
              <v-icon> mdi-content-save-check </v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <!-- selection view fee for provider -->
    <v-row justify="space-around">
      <v-col cols="auto">
        <v-dialog
          transition="dialog-bottom-transition"
          max-width="800"
          v-model="confirmViews"
        >
          <template v-slot:default="dialog">
            <v-card>
              <v-toolbar color="primary" dark>ລາຍລະອຽດຄ່າທຳນຽມ</v-toolbar>
              <v-card-text>
                <v-data-table
                  :search="search"
                  :headers="headers_fee"
                  :items="viewFee"
                >
                  <!-- table tr section -->
                  <template v-slot:item="{ item }">
                    <tr>
                      <td>{{ item.provider_code }}</td>
                      <td>{{ item.provider_group }}</td>
                      <td>{{ item.provider_channel }}</td>
                      <td>
                        <v-chip small color="primary" outlined>{{
                          formatNumber(item.from_amt)
                        }}</v-chip>
                      </td>

                      <td>
                        <v-chip small color="error" outlined>{{
                          formatNumber(item.to_amt)
                        }}</v-chip>
                      </td>
                      <td>
                        <v-chip small color="success" outlined>{{
                          formatNumber(item.total_amt)
                        }}</v-chip>
                      </td>
                    </tr>
                  </template>
                </v-data-table>
              </v-card-text>
              <v-card-actions class="justify-end">
                <v-btn
                  fab
                  dark
                  small
                  color="error"
                  @click="dialog.value = false"
                  ><v-icon>mdi-close</v-icon></v-btn
                >
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import api from "@/services/api";
export default {
  name: "ManageUser",
  data() {
    return {
      search: "",
      selectedProductId: "",
      confirmDeleteDlg: false,
      confirmAddFeeDlg: false,
      confirmViews: false,
      providers: [],
      AddFees: [],
      viewFee: [],
      headers: [
        {
          text: "ລຳດັບ",
          align: "left",
          sortable: true,
          value: "id",
        },
        { text: "ຊື່ຫຍໍ້", value: "username" },
        { text: "ບໍລິສັດ", value: "provider_code" },
        { text: "ຜະລິດຕະພັນ", value: "product_code" },
        { text: "ລະຫັດຄ່າທຳນຽມ", value: "create_date" },
        { text: "ຕົວເລືອກ", value: "action" },
      ],
      headers_fee: [
        { text: "ຊື່ຫຍໍ້", value: "username" },
        { text: "ປະເພດ", value: "provider_group" },
        { text: "ຊ່ອງທາງ", value: "channel" },
        { text: "ຈາກ", value: "from_amt" },
        { text: "ຫາ", value: "to_amt" },
        { text: "ເປັນເງິນ", value: "total_amt" },
      ],
    };
  },
  async mounted() {
    this.loadFEE();
  },
  methods: {
    formatNumber(num) {
      return parseFloat(num).toFixed(2);
    },
    async loadFEE() {
      let result = await api.getFee();
      this.providers = result.data.body;
    },
    async confirmAddFeeDlgs() {
      //await api.deleteprovider(this.selectedProductId);
      this.confirmAddFeeDlg = false;
      this.loadProvider();
    },
    async confirmFeeDlgs(items) {
      this.confirmAddFeeDlg = true;
      let formData = new FormData();
      formData.append("provider_code", items.provider_auto);
      let result = await api.addFeeProvider(formData);
      this.viewFee = result.data.body;
    },
    async viewFeeDlgs(items) {
      this.confirmViews = true;
      let formData = new FormData();
      formData.append("provider_code", items.provider_auto);
      formData.append("product_type", items.product_type);
      let result = await api.getViewFee(formData);
      this.viewFee = result.data.body;
    },
    async addFeeProvider() {
      console.log("add fee provider");
      let result = await api.addFeeProvider();
      this.addProviderFee = result.data.body;
    },
    async addFee() {
      console.log("add fee");
    },
  },
};
</script>
<style lang="scss" scoped></style>
