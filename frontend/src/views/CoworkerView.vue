<template>
  <v-app>
    <v-card width="100%" max-width="800" class="mx-auto overflow-hidden">
      <v-app-bar color="red lighten-4">
        <v-btn @click="returnMain" class="btnFeed" color="red lighten-3" dark>
          Fil d'actu
          <v-icon dark right> mdi-chat-processing </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title>Son profil</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn @click="exitSession" class="btnExit" color="red lighten-3" dark>
          Quitter
          <v-icon dark right> mdi-cancel </v-icon>
        </v-btn>
      </v-app-bar>
      <div class="accountCont">
        <div
          class="userPict"
          :style="{ backgroundImage: 'url(' + this.user.image + ')' }"
        ></div>
        <div class="infoUser">
          <h3>Prenom : {{ this.user.prenom }}</h3>
          <h3>email : {{ this.user.email }}</h3>
          <div class="bio">
            <h3>Ma bio :</h3>
            <p>{{ this.user.bio }}</p>
          </div>
        </div>
      </div>
    </v-card>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data() {
    return {
      user: {},
    };
  },
  methods: {
    exitSession() {
      this.$router.push("/");
      localStorage.clear();
    },
    returnMain() {
      this.$router.push("/main");
      localStorage.removeItem("coworker");
    },
    // Profile coworker
    getCoworker() {
      this.user = JSON.parse(localStorage.coworker);
    },
  },
  created() {
    this.getCoworker();
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

textarea {
  height: 80px;
  border: 1px solid darkslategray;
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
