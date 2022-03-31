<template>
  <div>
    <hello-world />
    <LoginView />
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld";
import LoginView from "../components/LoginView.vue";
export default {
  name: "HomeView",
  components: {
    HelloWorld,
    LoginView,
  },
  data: () => ({}),
};
</script>
