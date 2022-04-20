<template lang="html">
  <v-container>
    <v-row class="justify-center">
      <v-col cols="12">
        <v-card class="mx-auto pa-5" outlined>
          <v-toolbar-title class="mb-5">ຈັດການຂໍ້ມູນຜູ້ໃຊ້ງານ</v-toolbar-title>
          <v-form @submit.prevent="submit" ref="form">
            <v-text-field
              v-model="create_users.username"
              label="Username"
              required
              solo
              dense
              prepend-icon="mdi-badge-account"
            ></v-text-field>
            <v-text-field
              name="password"
              label="Password"
              id="password"
              v-model="create_users.password"
              :append-icon="isShowPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="isShowPassword = !isShowPassword"
              :type="isShowPassword ? 'text' : 'password'"
              :counter="8"
              solo
              dense
              prepend-icon="mdi-eye-off"
            />
            <v-select
              v-model="create_users.status"
              :items="items"
              solo
              label="Status"
              prepend-icon="mdi-arrow-down-bold-circle"
            ></v-select>
            <v-file-input
              label="ເລືອກໄຟລ໌"
              solo
              prepend-icon="mdi-camera"
            ></v-file-input>
            <v-layout row>
              <v-spacer></v-spacer>
              <v-btn color="error" class="mr-4" @click="cancel"><v-icon>mdi-refresh-auto</v-icon> ຍົກເລິກ </v-btn>
              <v-btn color="success" type="submit"><v-icon>mdi-database-plus</v-icon> ບັນທຶກ </v-btn>
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
      isShowPassword: false,
      create_users: {
        name: "",
        price: "",
        stock: "",
        image: null,
      },
    };
  },
  methods: {
    onFileSelected(event) {
      const reader = new FileReader();
      reader.onload = (event) => {
        this.imageURL = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      this.product.image = event.target.files[0];
    },
    async submit() {
      let formData = new FormData();
      const { name, price, stock } = this.product;
      formData.append("name", name);
      formData.append("stock", stock);
      formData.append("price", price);
      formData.append("image", this.product.image);
      await api.addProduct(formData);
      this.$router.back();
    },
    cancel() {
      this.$router.back();
    },
  },
};
</script>
<style lang="scss" scoped></style>