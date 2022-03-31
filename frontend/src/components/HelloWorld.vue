<template>
  <v-container class="contLogo">
    <img src="../assets/icon.png" alt="Logo Groupomania" />
    <h1>Groupomania</h1>
    <p>Social Network</p>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
};
</script>

<style lang="scss" scoped>
.contLogo {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3px;
}

img {
  width: 120px;
}

p {
  margin: 0px;
}
</style>
