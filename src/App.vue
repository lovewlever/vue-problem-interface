<template>
    <router-view />

  <!-- Position it -->
  <div class="toast-content" >
    <template v-for="(obj,index) in notifys" :key="index">

    <!-- Then put toasts within -->
    <div class="toast" role="alert" aria-live="assertive" aria-atomic="true"  data-delay="5000">
      <div class="toast-header">
        <img src="" class="rounded mr-2" alt="...">
        <strong class="mr-auto">Bootstrap</strong>
        <small class="text-muted">just now</small>
        <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="toast-body">
        {{obj?.notifyMsg}}
      </div>
    </div>
    </template>
  </div>
</template>

<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap/dist/js/bootstrap.min";
  import $ from 'jquery'
  import NotifyCommon from "@/constants/NotifyCommon";
  import Classes from "@/constants/Classes";

  export default {
    components: {},
    data() {
      return {
      }
    },
    created() {
      NotifyCommon.sendNotification(new Classes.NotificationInfo("system","","12:32","一条新消息"))
    },
    mounted() {
      $(".toast").toast('show')
    },
    computed: {
      notifys () {
        return this.$store.state.notifications
      }
    }
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

