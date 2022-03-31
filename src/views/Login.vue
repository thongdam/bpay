<template>
  <v-container>
    <v-row class="justify-center">
      <v-card style="width: 400px">
        <v-img
          class="white--text align-end"
          src="@/assets/vue_displays.jpg"
          height="350px"
        >
        </v-img>
        <v-card-text>
          <h1 class="mb-10 mt-5 text-center">AUTO DEBIT FOR ADMIN</h1>
          <v-form @submit.prevent="submit"  ref="form">
            <!-- Username -->
            <v-text-field
              name="username"
              label="Username"
              id="username"
              v-model="account.username"
              filled
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
              filled
              dense
              required
              :rules="password_Rul"
            />

            <v-row class="justify-space-between px-3 pt-5 pb-5">
              <v-btn text @click.prevent="$router.push('/register')"
                >Register</v-btn
              >
              <v-btn type="submit" color="success">Login</v-btn>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import api from "@/services/api";

export default {
  name:"Login",
  mounted() {
    if (api.isLoggedIn()) {
      this.$router.push("/dashboard");
    }
  },
  data() {
    return {
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
        this.$router.push("/dashboard");
        this.$store.dispatch({
          type: "doLogin",
          username: this.account.username,
          password: this.account.password,
        });
      }
    },
  },
};
</script>

<style></style>
