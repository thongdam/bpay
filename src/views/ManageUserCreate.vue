<template lang="html">
  <v-container>
    <v-row class="justify-center">
      <v-col cols="10">
        <v-card class="mx-auto pa-5" outlined>
          <v-toolbar-title class="mb-5">ຈັດການຂໍ້ມູນຜູ້ໃຊ້ງານ</v-toolbar-title>
          <v-form @submit.prevent="submit" ref="form">
            <v-text-field
              v-model="create_users.username"
              label="Username"
              required
              filled
              dense
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
              filled
              dense
            />

            <v-select
              v-model="create_users.status"
              :items="items"
              filled
              label="Status"
            ></v-select>

            <input type="file" @change="onFileSelected" />
            <br />
            <img
              v-if="imageURL"
              :src="imageURL"
              style="height: 200px"
              class="mt-3"
            />
            <br />
            <br />
            <v-layout row>
              <v-spacer></v-spacer>
              <v-btn class="mr-4" @click="cancel"> Cancel </v-btn>

              <v-btn color="success" type="submit"> Confirm </v-btn>
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
