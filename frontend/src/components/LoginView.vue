<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar class="red lighten-4">
                <v-toolbar-title>Se connecter</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <form ref="form" @submit.prevent="login()">
                  <v-text-field
                    v-model="email"
                    name="email"
                    label="Email"
                    type="text"
                    placeholder="Votre adresse email"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    name="password"
                    label="Mot de passe"
                    type="password"
                    placeholder="Votre mot de passe"
                    required
                  ></v-text-field>
                  <div class="btnCtn">
                    <v-btn
                      small
                      type="submit"
                      class="mt-4 rounded-pill"
                      color="red lighten-4"
                      value="log in"
                      >Se connecter</v-btn
                    >
                    <v-btn
                      small
                      @click="goToRegister()"
                      class="mt-4 rounded-pill"
                      color="red lighten-5"
                      >Créer un compte</v-btn
                    >
                  </div>
                </form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "LoginView",
  data: function () {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    //LOGIN
    login() {
      let email = this.email;
      let password = this.password;
      axios
        .post("http://localhost:3000/auth/login", {
          email,
          password,
        })
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
          Swal.fire({
            text: "Connexion réussie",
            footer: "Redirection en cours...",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
          });
          this.$router.push("/main");
        })
        .catch((err) => {
          this.valid = false;
          this.error = err.response.data.message;
          Swal.fire({
            title: "Oups",
            text: "Le mail/mot de passe n'est pas bon",
            icon: "error",
          });
        });
    },
    //Go to register
    goToRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style lang="scss" scoped>
.btnCtn {
  display: flex;
  justify-content: space-between;
}
</style>
