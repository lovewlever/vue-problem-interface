<template>
  <div style="height: 100%;width: 100%">
    <div class="arc"></div>
    <div
      style="margin-top: -70%;font-size: 0.5rem;text-align: center;color: #3E5BF2"
    >
      0%
    </div>
  </div>
</template>

<script>
export default {
  name: "LoadingComponents"
};
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.arc {
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border-top: 2px solid #ffea29;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  animation: rt 2s infinite linear;
}
.arc::before {
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 70%;
  height: 70%;
  border-radius: 50%;
  border-top: 2px solid #8d29ff;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
  animation: rt 4s infinite linear reverse;
  content: "";
}
/*    .arc::after {
        position: absolute;
        margin: auto;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width: 0;
        height: 0;
        border-radius: 50%;
        border-top: initial;
        border-left: initial;
        border-right: initial;
        animation: cw 1s infinite;
        content: "";
        background: snow;
    }*/

@keyframes rt {
  100% {
    transform: rotate(360deg);
  }
}
@keyframes cw {
  0% {
    width: 0;
    height: 0;
  }
  75% {
    width: 40px;
    height: 40px;
  }
  100% {
    width: 0;
    height: 0;
  }
}
</style>
