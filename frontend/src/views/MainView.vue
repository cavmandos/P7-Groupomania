<template>
  <v-app>
    <v-card width="100%" max-width="800" class="mx-auto overflow-hidden">
      <v-app-bar color="red lighten-4">
        <v-btn
          class="btnAccount"
          @click="goToAccount"
          color="red lighten-3"
          dark
        >
          Mon compte
          <v-icon dark right> mdi-account </v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-toolbar-title>Fil d'actu</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="btnExit" @click="exitSession" color="red lighten-3" dark>
          Quitter
          <v-icon dark right> mdi-cancel </v-icon>
        </v-btn>
      </v-app-bar>
    </v-card>
    <v-main>
      <br />
      <PostsView />
    </v-main>
  </v-app>
</template>

<script>
import PostsView from "@/components/PostsView";
export default {
  name: "App",
  components: {
    PostsView,
  },
  data: () => ({}),
  methods: {
    exitSession() {
      this.$router.push("/");
      localStorage.clear();
    },
    goToAccount() {
      this.$router.push("/account");
    },
    userConnected() {
      if (!localStorage.getItem("user")) {
        this.$router.push("/");
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.btnAccount {
  color: black;
  @media screen and (max-width: 500px) {
    width: 20%;
    font-size: 0%;
    border-radius: 10px;
  }
}

.btnAccount i {
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
