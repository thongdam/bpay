<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-data-table :search="search" :headers="headers" :items="BDataArray">
        <!-- table top section -->
        <template v-slot:top>
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
              color="success"
              dark
              class="mb-2"
            >
              <v-icon left>mdi-plus-circle</v-icon>
              <span>ເປິດ ບໍລິສັດ ໃຫມ່</span>
            </v-btn>
          </v-toolbar>
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
              <v-avatar color="success" size="30">
                <span class="white--text text-h6">{{
                  item.provider_auto_status
                }}</span>
              </v-avatar>
              <v-avatar
                color="primary"
                size="30"
                v-if="item.provider_bill_status != null"
              >
                <span class="white--text text-h6">{{
                  item.provider_bill_status
                }}</span>
              </v-avatar>
            </td>
            <td>
              <v-chip color="success" class="ml-0 mr-2 white--text" label small>
                <strong
                  v-html="
                    item.is_generate_term == 'Y' ? 'ແບບເທີມຍາວ' : 'ພາຍໃນເດືອນ'
                  "
                ></strong>
              </v-chip>
            </td>
            <td>
              <v-chip color="accent" class="ml-0 mr-2 white--text" label small>
                <strong
                  v-html="
                    item.fee_compayny == 'Y'
                      ? 'ເກັບຈາກບໍລິສັດ'
                      : 'ເກັບຈາກລູກຄ້າ'
                  "
                ></strong>
              </v-chip>
            </td>
            <td>{{ item.create_date }}</td>
            <td>
              <v-chip color="success" class="ml-0 mr-2 white--text" label small>
                <span class="white--text">{{ item.contract_stopdate }}</span>
              </v-chip>
              <v-chip color="danger" class="ml-0 mr-2 white--text" label small>
                <span class="white--text">{{ item.contract_stopdate }}</span>
              </v-chip>
            </td>
            <td>
              <v-icon class="mr-2" @click="editItem(item)" color="warning">
                mdi-pencil
              </v-icon>
              <span class="ma-1"></span>
              <v-icon @click="deleteItem(item)" color="danger">
                mdi-delete-empty
              </v-icon>
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
            ຕ້ອງການລືບ<v-chip small class="ma-2" color="red" text-color="white">{{
              provider_code
            }}</v-chip>ອອກຈາກລະບົບແທ້ບໍ ?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn tile @click="confirmDeleteDlg = false" color="error"><v-icon>mdi-reload-alert</v-icon>ຍົກເລິກ</v-btn>
            <v-btn color="success" tile @click="confirmDelete"><v-icon>mdi-check</v-icon> ຕົກລົງ </v-btn>
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
