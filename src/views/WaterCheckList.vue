<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-container>
        <v-row>
          <v-col cols="12" sm="4" md="4" xs="12">
            <v-select
              v-model="checking_npp.provider_code"
              :items="providers"
              item-text="provider_code"
              item-value="provider_code"
              label="ເລືອກບໍລິສັດ"
              single-line
              outlined
            ></v-select>
          </v-col>
          <v-col cols="12" sm="4" md="4" xs="12">
            <v-text-field
              v-model="checking_npp.agreement_no"
              label="ເລກຜູ້ໃຊ້ນ້ຳ"
              outlined
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="4" md="4" xs="12">
            <v-btn
              @click="Searching_NPP()"
              class="mx-1"
              fab
              dark
              small
              color="success"
            >
              <v-icon dark size="25"> mdi-search-web </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-data-table :search="search" :headers="headers" :items="result_list">
        <!-- table top section -->
        <template v-slot:top>
          <v-row>
            <v-col cols="12" sm="8" md="8" xs="12">
              <v-toolbar flat color="white">
                <v-toolbar-title>ກວດສອບຍອດໜີ້ນ້ຳປະປາ</v-toolbar-title>
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-text-field
                  v-model="search"
                  append-icon="search"
                  label="ຄົ້ນຫາ"
                  single-line
                  hide-details
                ></v-text-field>
              </v-toolbar>
            </v-col>
          </v-row>
        </template>
        <!-- table tr section -->
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.agreement_no }}</td>
            <td>{{ item.provider_acc }}</td>
            <td>{{ item.provider_acc_name }}</td>
            <td>{{ item.provider_ccy }}</td>
            <td>{{ item.customer_name }}</td>
            <td>
              <v-chip
                :color="
                  item.provider_auto_status == '89'
                    ? 'danger'
                    : item.provider_auto_status == '00'
                    ? 'success'
                    : 'warning'
                "
                outlined
                pill
              >
                {{
                  item.provider_auto_status == "89"
                    ? "ຍອດເງິນໃນບັນຊີບໍ່ພຽງພໍ"
                    : item.provider_auto_status == "00"
                    ? "ຕັດເງິນສຳເລັດ"
                    : "ລໍຖ້າຕັດເງິນ"
                }}
              </v-chip>
            </td>
            <td>{{ item.provider_code }}</td>
            <td>
              <v-chip
                :color="
                  item.register_status == 'C'
                    ? 'danger'
                    : item.register_status == 'A'
                    ? 'success'
                    : 'warning'
                "
                outlined
                pill
              >
                {{
                  item.register_status == "C"
                    ? "ເລກສັນຍາຖືກປິດ"
                    : item.register_status == "A"
                    ? "ລົງທະບຽນສຳເລັດ"
                    : "ລໍຖ້າລົງທະບຽນ"
                }}
              </v-chip>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>
<script>
import api from "@/services/api";
export default {
  name: "ManageUser",
  data() {
    return {
      menu: false,
      modal: false,
      menu2: false,
      search: "",
      selectedProductId: "",
      confirmDeleteDlg: false,
      result_list: [],
      providers: [],
      checking_npp: {
        provider_code: "",
        status_auto: "",
        agreement_no: "",
        from_date: "",
        to_date: "",
      },
      headers: [
        {
          text: "ລຳດັບ",
          align: "left",
          sortable: true,
          value: "id",
        },
        { text: "ເລກຜູ້ໃຊ້ນ້ຳ", value: "agreement_no" },
        { text: "ຊື່ນາມສະກຸນ", value: "full_name" },
        { text: "ໜີ້ໃຫມ່", value: "amount" },
        { text: "ໜີ້ເກົ່າ", value: "old_amount" },
        { text: "ວັນທີໃບບິນ", value: "full_name" },
        { text: "ວັນທີອັບຂໍ້ມູນ", value: "status" },
      ],
    };
  },
  async mounted() {
    this.loadProvider();
  },
  methods: {
    async loadProvider() {
      let result = await api.GetAllProviderNpp();
      this.providers = result.data.body;
    },
    async Searching_NPP() {
      let formData = new FormData();
      const { provider_code, agreement_no, dblink } =
        this.checking_npp;
      formData.append("provider_code", provider_code);
      formData.append("agreement_no", agreement_no);
      formData.append("dblink", dblink);
      formData.append("username",this.$store.getters["username"])
      let result = await api.Searching_NPP(formData);
      this.result_list = result.data.body;
    },
  },
};
</script>
<style lang="scss" scoped></style>
