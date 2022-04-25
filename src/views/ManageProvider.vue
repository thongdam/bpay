<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-data-table :search="search" :headers="headers" :items="BDataArray">
        <!-- table top section -->
        <template v-slot:top>
          <v-col cols="12" sm="6" md="12" xs="12">
            <v-toolbar flat color="white">
              <v-toolbar-title>ຈັດການຂໍ້ມູນບໍລິສັດ</v-toolbar-title>
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
                @click="$router.push('/ManageProviderCrate')"
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
                item.provider_auto
              }}</v-chip>
              <v-chip class="ma-2" x-small>
                {{ item.provider_long }}
              </v-chip>
            </td>
            <td>{{ item.phone_number }}</td>
            <td>
              <v-chip
                v-if="item.provider_auto_status != null"
                class="ml-0 mr-2 white--text"
                color="success"
                outlined
                >{{ item.provider_auto_status == "A" ? "AUTO" : "" }}</v-chip
              >
              <v-chip
                v-if="item.provider_bill_status != null"
                class="ml-0 mr-2 white--text"
                color="success"
                outlined
                >{{ item.provider_bill_status == "A" ? "BILL" : "" }}</v-chip
              >
            </td>
            <td>
              <v-chip class="ml-0 mr-2 white--text" color="success" outlined>
                <strong
                  v-html="
                    item.is_generate_term == 'Y' ? 'ເທີມຍາວ' : 'ພາຍໃນເດືອນ'
                  "
                ></strong>
              </v-chip>
            </td>
            <td>
              <v-chip class="ml-0 mr-2 white--text" color="info" outlined>
                <strong
                  v-html="item.fee_compayny == 'Y' ? 'ຈາກບໍລິສັດ' : 'ຈາກລູກຄ້າ'"
                ></strong>
              </v-chip>
            </td>
            <td>{{ item.create_date }}</td>
            <td>
              <v-chip class="ma-2" color="primary" outlined>{{
                item.contract_stopdate
              }}</v-chip>
              <v-chip class="ma-2" color="error" outlined>{{
                item.contract_stopdate
              }}</v-chip>
            </td>
            <td>
              <v-btn
                disabled
                class="mr-2"
                @click="editItem(item)"
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
  name: "ManageUser",
  data() {
    return {
      provider_code: "",
      search: "",
      selectedProductId: "",
      confirmDeleteDlg: false,
      BDataArray: [],
      headers: [
        {
          text: "ລຳດັບ",
          align: "start",
          sortable: false,
          value: "id",
        },
        { text: "ຊື່ຫຍໍ້ແລະຊື່ເຕັມ", value: "provider_code" },
        { text: "ເບີໂທ", value: "phone_no" },
        { text: "ນຳໃຊ້ຜະລິດຕະພັນ", value: "provider_auto" },
        { text: "ເງື່ອນໄຂການຕັດ", value: "cut_condition" },
        { text: "ເກັບຄ່າທຳນຽມຈາກ", value: "fee" },
        { text: "ເປິດນຳໃຊ້", value: "create_date" },
        { text: "ມື້ເລິ່ມຕົ້ນແລະສິ້ນສຸດສັນຍາ", value: "contract" },
        { text: "ຕົວເລືອກ", value: "action" },
      ],
    };
  },
  async mounted() {
    this.loadProvider();
  },
  methods: {
    async loadProvider() {
      let result = await api.getProviders();
      this.BDataArray = result.data.body;
    },
    editItem(item) {
      this.$router.push(`/ManageProviderEdit/${item.provider_auto}`);
    },
    deleteItem(item) {
      this.provider_code = item.provider_auto;
      this.selectedProductId = item.provider_auto;
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
