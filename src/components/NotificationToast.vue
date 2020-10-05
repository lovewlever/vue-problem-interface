<template>
    <!-- Position it -->
    <div style="position: absolute; top: 90px; right: 30px;">
      <!-- Then put toasts within -->
      <template v-for="(obj, index) in notifys" :key="index" >

      <div :id="'nt' + index" class="toast" role="alert" aria-live="assertive" aria-atomic="true" data-delay="3000">
        <div class="toast-header">
          <img src="../assets/logo.png" alt="..." width="16px" height="16px">
          <strong class="mr-auto">系统消息</strong>
          <small class="text-muted">现在</small>
          <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="toast-body">
          {{ obj?.notifyMsg }}
        </div>

        <span style="display: none">
          {{removeNotification("nt" + index)}}
        </span>
      </div>
      </template>
    </div>
</template>

<script>
import jQuery from 'jquery'
import FuncCommon from "@/constants/FuncCommon";

export default {
name: "NotificationToast",
  data() {
    return {
      jq: jQuery
    }
  },
  methods: {
    removeNotification(id) {
      FuncCommon.showConsoleInfo(id);
      const timer1 = setInterval(() => {
        clearInterval(timer1);
        jQuery("#" + id).toast('show');
      }, 500);

      const timer = setInterval(() => {
        clearInterval(timer);
        jQuery("#" + id).remove();
      }, 4000);
    }
  },
computed: {
  notifys () {
    return this.$store.state.notifications
  }
}
};
</script>

<style scoped>

</style>