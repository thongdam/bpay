<template>
  <v-container>
    <!-- Table section -->
    <v-card>
      <v-data-table :search="search" :headers="headers" :items="BDataArray">
        <!-- table top section -->
        <template v-slot:top>
          <v-col cols="12" sm="6" md="12" xs="12">
            <v-toolbar flat color="white">
              <v-toolbar-title>ຈັດການຂໍ້ມູນຜູ້ໃຊ້ງານ</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="ຄົ້ນຫາ"
                single-line
                hide-details
              ></v-text-field>
              <v-spacer></v-spacer>
              <v-btn
                disabled
                @click="$router.push('/manageuserCreate')"
                class="mx-1"
                fab
                dark
                color="success"
              >
                <v-icon size="30">mdi-plus-circle</v-icon>
              </v-btn>
            </v-toolbar>
          </v-col>
        </template>

        <!-- table tr section -->
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.id }}</td>
            <td>{{ item.username }}</td>
            <td><v-chip small :color="item.status =='A' ? 'success' :'danger'" outlined>{{item.status =='A' ? 'ນຳໃຊ້' : 'ປິດ'}}</v-chip ></td>
            <td>{{ item.provider_code }}</td>
            <td>{{ item.create_date }}</td>
            <td>{{ item.active_date }}</td>
            <td>+ {{ item.login_attemp }}</td>
            <td>{{ item.login_time }}</td>
            <td>
              <v-btn
                @click="AddPermission(item)"
                class="mr-2"
                color="success"
                fab
                x-small
                dark
              >
                <v-icon dark> mdi-key-plus</v-icon>
              </v-btn>
              <v-btn
                class="mr-2"
                color="warning"
                fab
                x-small
                dark
                @click="EditUsers(item)"
              >
                <v-icon dark> mdi-pencil</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-row justify="center">
      <v-dialog v-model="EditUser" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">ແກ້ໄຂຜູ້ໃຊ້ງານ</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="12" md="12">
                  <v-text-field
                    v-model="UpdateUser.username"
                    label="ຊື່ເຂົ້າໃຊ້ງານ*"
                    required
                    solo
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    v-model="UpdateUser.status"
                    :items="check_status"
                    item-text="keys"
                    item-value="values"
                    label="ເລືອກສະຖານະ"
                    single-line
                    persistent-hint
                    solo
                  ></v-select>
                </v-col>
                <v-col cols="12" sm="12" md="12">
                  <v-select
                    v-model="UpdateUser.provider_code"
                    :items="providers"
                    item-text="provider_long"
                    item-value="provider_auto"
                    label="ເລືອກບໍລິສັດ"
                    single-line
                    persistent-hint
                    solo
                  ></v-select>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="EditUser = false">
              Close
            </v-btn>
            <v-btn color="blue darken-1" text @click="UpdateUsers()">
              Save
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
    <v-snackbar v-model="btn_register" :timeout="timeout" color="success">
      {{ text }}
    </v-snackbar>
  </v-container>
</template>
<script>
import api from "@/services/api";
export default {
  name: "ManageUser",
  data() {
    return {
      btn_register: false,
      text: "ແກ້ໄຂຂໍ້ມູນສຳເລັດ.",
      timeout: 2000,
      EditUser: false,
      search: "",
      selectedProductId: "",
      confirmDeleteDlg: false,
      BDataArray: [],
      UpdateUser: [],
      providers: [],
      check_status: [
        { keys: "Active", values: "A" },
        { keys: "Pending", values: "P" },
        { keys: "Lock", values: "L" },
        { keys: "Unlock", values: "U" },
        { keys: "Expired", values: "N" },
        { keys: "Close", values: "C" },
      ],
      headers: [
        {
          text: "ລຳດັບ",
          align: "left",
          sortable: true,
          value: "id",
        },
        { text: "ຊື່ເຂົ້າໃຊ້ງານ", value: "username" },
        { text: "ສະຖານະ", value: "status" },
        { text: "ບໍລິສັດ", value: "provider_code" },
        { text: "ວັນທີສ້າງ", value: "create_date" },
        { text: "ມື້ເປິດນຳໃຊ້", value: "active_date" },
        { text: "ເຂົ້າລະບົບຜິດ", value: "login_attem" },
        { text: "ເຂົ້າໃຊ້ງານລະບົບລ່າສຸດ", value: "login_time" },
        { text: "ຕົວເລືອກ", value: "action" },
      ],
    };
  },
  async mounted() {
    this.loadUsers();
    this.loadProvider();
  },
  methods: {
    AddPermission(item){
      this.$router.push(`/ManagePermission/${item.username}`);
    },
    async UpdateUsers() {
      let formData = new FormData();
      const { login_attemp, login_time, provider_code, username, id, status } =
        this.UpdateUser;
      formData.append("login_attemp", login_attemp);
      formData.append("login_time", login_time);
      formData.append("provider_code", provider_code);
      formData.append("username", username);
      formData.append("id", id);
      formData.append("status", status);
      let result = await api.UpdateUsers(formData);
      if (result.data.body.responseMsg == "true") {
        this.btn_register  = true;
        this.EditUser = false;
        setTimeout(() => this.$router.push({ path: "/ManageUser" }), 2000);
      } else {
        console.log(result.status);
      }
    },
    async loadProvider() {
      let result = await api.getProviders();
      this.providers = result.data.body;
    },
    EditUsers(item) {
      this.EditUser = true;
      this.UpdateUser = item;
    },
    async loadUsers() {
      let result = await api.Users();
      this.BDataArray = result.data.body;
    },
  },
};
</script>
<style lang="scss" scoped></style>
