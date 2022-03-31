<template>
  <v-app>
    <div @click="goToLogin" class="logoTitre">
      <img src="../assets/icon.png" alt="Logo de Groupomania" />
      <h1>Groupomania</h1>
    </div>
    <v-main>
      <v-container fluid fill-height>
        <v-layout justify-center>
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-12">
              <v-toolbar class="red lighten-4">
                <v-toolbar-title>Créer un compte</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form
                  v-model="isFormValid"
                  ref="form"
                  action="/auth/register"
                  method="POST"
                  @submit.prevent="signin"
                >
                  <v-text-field
                    v-model="firstName"
                    name="firstName"
                    label="Prenom"
                    type="text"
                    placeholder="Votre prénom"
                    required
                    :rules="nameRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="lastName"
                    name="lastName"
                    label="Nom"
                    type="text"
                    placeholder="Votre nom"
                    required
                    :rules="nameRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="email"
                    name="email"
                    label="Email"
                    type="text"
                    placeholder="Votre adresse email"
                    required
                    :rules="emailRules"
                  ></v-text-field>
                  <v-text-field
                    v-model="password"
                    name="password"
                    label="Mot de passe"
                    type="password"
                    placeholder="Votre mot de passe"
                    required
                    :rules="passwordRules"
                  ></v-text-field>
                  <div class="btnCtn">
                    <v-btn
                      type="submit"
                      class="mt-4 rounded-pill"
                      color="red lighten-4"
                      value="register"
                      :disabled="!isFormValid"
                      >S'inscrire</v-btn
                    >
                  </div>
                </v-form>
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
  name: "SigninView",
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      nameRules: [
        (v) => !!v || "Ce champ est requis",
        (v) => (v && v.length <= 20) || "Doit être inférieur à 20 caractères",
      ],
      emailRules: [
        (v) => !!v || "Adresse email requise",
        (v) =>
          /^(([^<>()[\]\\.,;:\s@']+(\.[^<>()\\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          ) || "Une adresse email valide est requise",
      ],
      passwordRules: [
        (v) => !!v || "Un mot de passe est requis",
        (v) =>
          /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(v) ||
          "Le mot de passe doit contenir au moins 6 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial",
      ],
      isFormValid: false,
    };
  },
  methods: {
    signin() {
      let prenom = this.firstName;
      let nom = this.lastName;
      let email = this.email;
      let password = this.password;
      if (
        prenom.length == 0 ||
        nom.length == 0 ||
        email.length <= 6 ||
        password.length <= 5
      ) {
        Swal.fire({
          title: "Presque...",
          text: "Votre formulaire est incomplet",
          icon: "warning",
          confirmButtonText: "J'ai compris",
          iconColor: "#ffd7d7",
          confirmButtonColor: "#955DAD",
        });
      } else {
        let contact = {
          prenom: prenom,
          nom: nom,
          email: email,
          password: password,
        };
        // Send form with axios
        axios({
          method: "post",
          url: "http://localhost:3000/auth/register",
          data: contact,
          headers: { "Content-Type": "application/json" },
        })
          // It works, redirection
          .then((reponse) => {
            console.log(reponse);
            Swal.fire({
              title: "Bienvenue !",
              text: "Votre inscription est validée",
              icon: "success",
              confirmButtonText: "Yes",
            });
            localStorage.clear();
            this.$router.push("/");
          })
          .catch((err) => {
            alert(err.response.data.message);
          });
      }
    },
    goToLogin() {
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.logoTitre {
  display: flex;
  align-items: center;
  justify-content: center;
}
img {
  width: 80px;
  &:hover {
    cursor: pointer;
  }
}

h1:hover {
  cursor: pointer;
}

.btnCtn {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
