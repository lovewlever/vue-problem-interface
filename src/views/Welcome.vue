<template>
    <div style="display: flex;width: 100%;height: 100%">
        <div style="margin: auto">
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-border text-secondary" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-border text-success" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-border text-danger" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-border text-warning" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-border text-info" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-border text-light" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-border text-dark" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>

</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import ConstWeb from "../constants/ConstWeb";
//import _axios from "axios";
import $ from "jquery";
import FuncCommon from "../constants/FuncCommon";

export default {
  name: "Welcome",
    created() {
      const timer = setInterval(() => {
          this.firstVerifyToken()
          clearInterval(timer)
      },2000)

        window.Notification.requestPermission();
    },
    methods: {
      firstVerifyToken() {
          let _this = this
          let info = FuncCommon.getStorageLoginInfo()
          console.info(info)
          if (info === null) {
              this.$router.push("/login")
          } else {
              console.info(info)
              $.ajax({
                  url: ConstWeb.WebApi.UNIVERSAL_VERIFY_TOKEN,
                  headers: {
                      "token":info.token
                  },
                  data:{},
                  success:function (data) {
                      console.info(data)
                      if (data.code === 200) {
                          _this.$router.push("/home")
                      } else {
                          _this.$router.push("/login")
                      }
                  }
              })
          }
      }
    }
};
</script>

<style scoped></style>
