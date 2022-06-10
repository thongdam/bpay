<template>
  <v-container>
    <v-row class="justify-center">
      <v-card style="width: 400px" class="mt-15">
        <v-img
          class="white--text align-end"
          src="@/assets/vue_displays.jpg"
          height="350px"
        >
        </v-img>
        <v-card-text>
          <h1 class="mb-10 mt-5 text-center">AUTO DEBIT FOR ADMIN</h1>
          <v-form @submit.prevent="submit" ref="form">
            <!-- Username -->
            <v-text-field
              name="username"
              label="Username"
              id="username"
              v-model="account.username"
              solo
              dense
              required
              :rules="username_Rul"
            />

            <!-- Password -->
            <v-text-field
              name="password"
              label="Password"
              id="password"
              v-model="account.password"
              :append-icon="isShowPassword ? 'mdi-eye-off' : 'mdi-eye'"
              @click:append="isShowPassword = !isShowPassword"
              :type="isShowPassword ? 'text' : 'password'"
              counter
              solo
              dense
              required
              :rules="password_Rul"
            />

            <v-row class="justify-space-between px-3 pt-5 pb-5">
              <v-btn text>Register</v-btn>
              <v-btn type="submit" color="success"
                ><v-icon>mdi-login-variant</v-icon> Login</v-btn
              >
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
      <v-dialog v-model="errorLogin" max-width="500px">
        <v-card  align="center">
          <v-card-title class="justify-center">
            <v-alert dense outlined type="error">
              ຊື່ຜູ້ໃຊ້ງານ ຫຼື ລະຫັດຜ່ານ
              <strong>ບໍ່ຖືກຕ້ອງ</strong> ກະລຸນາກວດສອບ.
            </v-alert>
          </v-card-title>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  name: "Login",
  mounted() {
    if (api.isLoggedIn()) {
      this.$router.push("/dashboard");
    }
  },
  data() {
    return {
      errorLogin: false,
      isShowPassword: false,
      account: {
        username: "",
        password: "",
      },
      username: "",
      username_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ຊື່ ແລະ ນາມສະກຸນ"],
      password: "",
      password_Rul: [(v) => !!v || "ກະລຸນາປ້ອນ ເບີໂທລະສັບມືຖື"],
    };
  },
  methods: {
    async submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch({
            type: "doLogin",
            username: this.account.username,
            password: this.account.password,
          })
          .then((res) => {
            if (res) {
            } else {
              this.errorLogin = true;
            }
          });
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
