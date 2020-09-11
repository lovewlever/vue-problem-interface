<template>
  <nav>
    <svg t="1599818336121" class="svg-more" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3692" width="24" height="24"><path d="M138.5 261.4h749c22.4 0 40.5-18.1 40.5-40.5s-18.1-40.5-40.5-40.5h-749c-22.4 0-40.5 18.1-40.5 40.5s18.1 40.5 40.5 40.5zM887.5 470.4h-749c-22.4 0-40.5 18.1-40.5 40.5s18.1 40.5 40.5 40.5h749c22.4 0 40.5-18.1 40.5-40.5s-18.1-40.5-40.5-40.5zM887.5 760.4h-749c-22.4 0-40.5 18.1-40.5 40.5s18.1 40.5 40.5 40.5h749c22.4 0 40.5-18.1 40.5-40.5s-18.1-40.5-40.5-40.5z" p-id="3693" fill="#ffffff"></path></svg>
  </nav>
</template>

<script>
export default {
  name: "Navigation"
};
</script>

<style scoped>
nav {
  margin: 0;
  height: 45px;
  width: 100%;
  background: #202020;
  position: fixed;
  top: 0;
  box-shadow: 0 0 12px #181818;
  display: flex;
}
  .svg-more {
    margin: auto 0 auto 24px;
  }
</style>
