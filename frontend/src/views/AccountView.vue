<template>
  <v-app>
    <v-card width="100%" max-width="800" class="mx-auto overflow-hidden">
      <v-app-bar color="red lighten-4">
        <v-btn @click="returnMain" class="btnFeed" color="red lighten-3" dark>
          Fil d'actu
          <v-icon dark right> mdi-chat-processing </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title>Mon compte</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn @click="exitSession" class="btnExit" color="red lighten-3" dark>
          Quitter
          <v-icon dark right> mdi-cancel </v-icon>
        </v-btn>
      </v-app-bar>
      <div class="accountCont">
        <div
          class="userPict"
          :style="{ backgroundImage: 'url(' + this.user[0][`image`] + ')' }"
        ></div>
        <div class="infoUser">
          <h3>Prenom : {{ this.user[0]["prenom"] }}</h3>
          <h3>email : {{ this.user[0]["email"] }}</h3>
          <div class="bio">
            <h3>Ma bio :</h3>
            <p>{{ this.user[0]["bio"] }}</p>
          </div>
        </div>
        <div class="update">
          <h2>Modifier ses informations :</h2>
          <v-form class="formUpdate">
            <v-form v-model="isFormValid" class="formDiv">
              <label for="newEmail">Modifier l'adresse email</label>
              <v-text-field
                type="text"
                name="newEmail"
                id="newEmail"
                placeholder="Adresse mail valide"
                v-model="newEmail"
                :rules="emailRules"
              ></v-text-field>
              <button
                :disabled="!isFormValid"
                class="formBtn"
                @click.prevent="updateEmail"
              >
                Modifier
              </button>
            </v-form>
            <v-form class="formDiv" v-model="isFormValid">
              <label for="newPassword">Modifier le mot de passe </label>
              <v-text-field
                type="password"
                name="newPassword"
                id="newPassword"
                placeholder="6 caractères minimum"
                v-model="newPassword"
                :rules="passwordRules"
              ></v-text-field>
              <label for="newPasswordConfirm">Confirmer le mot de passe</label>
              <v-text-field
                type="password"
                name="newPasswordConfirm"
                id="NewPasswordConfirm"
                placeholder="6 caractères minimum"
                v-model="newPasswordConfirm"
                :rules="passwordRules"
              ></v-text-field>
              <button
                :disabled="!isFormValid"
                class="formBtn"
                @click.prevent="updatePassword"
              >
                Modifier
              </button>
            </v-form>
            <div class="formDiv">
              <label for="newImg">Modifier image du profil</label>
              <input
                type="text"
                name="newImg"
                id="newImg"
                placeholder="Copier ici l'url de votre image"
                v-model="newImg"
              />
              <button class="formBtn" @click.prevent="updateImg">
                Modifier
              </button>
            </div>
            <div class="formDiv">
              <label for="newBio">Modifier la biographie</label>
              <textarea name="newBio" id="newBio" v-model="newBio"></textarea>
              <button class="formBtn" @click.prevent="updateBio">
                Modifier
              </button>
            </div>
          </v-form>
        </div>
        <button class="btnDelete" @click.prevent="deleteUser">
          Supprimer Compte
        </button>
      </div>
    </v-card>
  </v-app>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "App",

  data() {
    return {
      user: {},
      newEmail: "",
      newBio: ``,
      newImg: ``,
      newPassword: "",
      newPasswordConfirm: "",

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
    //Logout
    exitSession() {
      this.$router.push("/");
      localStorage.clear();
    },
    //Return to the /main page
    returnMain() {
      this.$router.push("/main");
    },
    // UPDATE Image
    updateImg() {
      let local = JSON.parse(localStorage.user);
      let userId = local.userId;
      let token = local.token;
      axios
        .put(
          "http://localhost:3000/auth/update/" + userId,
          { image: this.newImg },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            text: "Modification de l'image réussie",
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
            timerProgressBar: true,
            willClose: () => {
              location.reload();
            },
          });
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    },
    // UPDATE Email
    updateEmail() {
      let local = JSON.parse(localStorage.user);
      let userId = local.userId;
      let token = local.token;
      axios
        .put(
          "http://localhost:3000/auth/update/" + userId,
          { email: this.newEmail },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            text: "Modification de l'adresse Email réussie !",
            footer: "Redirection en cours...",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
            timerProgressBar: true,
            willClose: () => {
              location.reload();
            },
          });
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    },
    // UPDATE Password
    updatePassword() {
      let local = JSON.parse(localStorage.user);
      let userId = local.userId;
      let token = local.token;
      if (this.newPassword === this.newPasswordConfirm) {
        axios
          .put(
            `http://localhost:3000/auth/update/` + userId,
            { password: this.newPassword },
            {
              headers: {
                Authorization: "Bearer " + token,
              },
            }
          )
          .then((res) => {
            console.log(res.data);
            Swal.fire({
              text: "Modification du Mot de passe réussi !",
              icon: "success",
              timer: 1200,
              showConfirmButton: false,
              timerProgressBar: true,
              willClose: () => {
                location.reload();
              },
            });
          })
          .catch((error) => {
            console.log(error.response.data.error);
          });
      } else {
        alert("Mot de passe non confirmé");
      }
    },
    // UPDATE Bio
    updateBio() {
      let local = JSON.parse(localStorage.user);
      let userId = local.userId;
      let token = local.token;
      axios
        .put(
          "http://localhost:3000/auth/update/" + userId,
          { bio: this.newBio },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            text: "Modification de la bio réussie",
            icon: "success",
            timer: 1200,
            showConfirmButton: false,
            timerProgressBar: true,
            willClose: () => {
              location.reload();
            },
          });
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    },
    // DELETE User
    deleteUser() {
      let local = JSON.parse(localStorage.user);
      let token = local.token;
      axios
        .delete("http://localhost:3000/auth/delete", {
          headers: {
            Authorization: "Bearer " + token,
          },
          data: local,
        })
        .then((res) => {
          console.log(res.data);
          Swal.fire({
            text: "Compte supprimé",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
            willClose: () => {
              localStorage.clear();
              this.$router.push("/");
            },
          });
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    },
    // GET USER
    getUser() {
      let local = JSON.parse(localStorage.user);
      let userId = local.userId;
      let token = local.token;
      axios
        .get("http://localhost:3000/auth/" + userId, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          this.user = res.data;
        })
        .catch((error) => {
          console.log(error.response.data.error);
        });
    },
  },
  created() {
    this.getUser();
  },
};
</script>

<style lang="scss" scoped>
.accountCont {
  width: 95%;
  margin: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
}

.infoUser {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  width: 68%;
  border: 1px solid rgb(199, 199, 199);
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0px 20px 0px;

  @media screen and (max-width: 576px) {
    width: 95%;
  }
}

.bio {
  width: 100%;
  font-weight: lighter;
}

.userPict {
  width: 180px;
  height: 180px;
  background-position: center;
  background-size: cover;
  border: 1px solid rgb(61, 66, 66);
  border-radius: 50%;
  margin: 20px 0px 20px 0px;
}

.formUpdate {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.formDiv {
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin: 15px;
  padding: 10px;
  border: 1px solid rgb(199, 199, 199);
  border-radius: 10px;

  @media screen and (max-width: 600px) {
    width: 95%;
  }
}

h2 {
  display: flex;
  justify-content: center;
  margin: 10px 0px 10px 0px;
}

h3 {
  margin: 10px 0px;
  border-bottom: 2px solid #ffd7d7;
}

label {
  font-weight: bold;
  margin: 10px;
}
input {
  margin: 10px;
  border-radius: 5px;
  border: 1px solid rgb(199, 199, 199);
}
textarea {
  height: 80px;
  border: 1px solid darkslategray;
}

.formBtn {
  margin: 10px;
  padding: 10px;
  background-color: rgb(109, 182, 109);
  border: 1px solid rgb(109, 182, 109);
  border-radius: 15px;
  color: white;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    transition: 0.8s;
  }
}

.btnDelete {
  margin: 30px;
  padding: 20px;
  background-color: rgb(253, 106, 106);
  border: 1px solid rgb(253, 106, 106);
  color: white;
  cursor: pointer;
  border-radius: 15px;

  &:hover {
    transform: scale(1.05);
    transition: 0.8s;
  }
}

.btnFeed {
  color: black;
  @media screen and (max-width: 500px) {
    width: 20%;
    font-size: 0%;
    border-radius: 10px;
  }
}

.btnFeed i {
  position: relative;
  right: 5px;
}

.btnExit {
  color: black;
  @media screen and (max-width: 500px) {
    width: 20%;
    font-size: 0%;
    border-radius: 10px;
  }
}

.btnExit i {
  position: relative;
  right: 5px;
}
</style>