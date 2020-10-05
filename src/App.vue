<template>
  <router-view />

  <NotificationToast />
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import NotificationToast from "@/components/NotificationToast";

export default {
  components: { NotificationToast },
  data() {
    return {};
  },
  created() {},
  mounted() {}
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  width: 100%;
  height: 100%;
}
html {
  width: 100%;
  height: 100%;
}
* {
  margin: 0;
}
.toast {
  min-width: 250px;
}
.toast-content {
  position: absolute;
  top: 70px;
  right: 20px;
  max-height: 600px;
  overflow-y: auto;
}
.toast-content::-webkit-scrollbar {
  display: none;
}
</style>
