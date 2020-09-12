<template>
  <nav>
      <div @click="clickOpenOrHiddenHomeLeft" style="margin: auto 0;display: flex">
          <svg  t="1599818336121" class="svg-more" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3692" width="24" height="24"><path d="M138.5 261.4h749c22.4 0 40.5-18.1 40.5-40.5s-18.1-40.5-40.5-40.5h-749c-22.4 0-40.5 18.1-40.5 40.5s18.1 40.5 40.5 40.5zM887.5 470.4h-749c-22.4 0-40.5 18.1-40.5 40.5s18.1 40.5 40.5 40.5h749c22.4 0 40.5-18.1 40.5-40.5s-18.1-40.5-40.5-40.5zM887.5 760.4h-749c-22.4 0-40.5 18.1-40.5 40.5s18.1 40.5 40.5 40.5h749c22.4 0 40.5-18.1 40.5-40.5s-18.1-40.5-40.5-40.5z" p-id="3693" fill="#ffffff"></path></svg>
      </div>
    <h2 class="title-more">PROBLEM</h2>

    <ul class="nav-user-info">
        <li @click="clickCreateProject">
            <svg style="margin-right: 24px" t="1599836517593" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3700" width="26" height="26"><path d="M821.76 479.488c0 0-6.272-206.4-174.4-247.424S398.208 368.192 396.544 373.248C394.88 378.304 386.624 376 386.624 376c-13.44-12.736-72.704-41.984-134.976-4.48-62.208 37.504-39.68 108.736-39.68 108.736S119.744 472.768 72.448 615.168c-47.232 142.528 118.464 182.912 118.464 182.912l278.144 0 0-151.616-55.68 0L408.512 646.464 404.736 646.464l0-0.256c-3.2 0-5.76-2.56-5.76-5.824 0-1.92 1.024-3.584 2.56-4.672l113.984-119.872c1.6-1.792 3.84-3.008 6.464-3.008 2.688 0 5.056 1.344 6.656 3.328l113.152 118.912c0.192 0.128 0.384 0.32 0.576 0.512l1.088 1.152-0.384 0c0.576 1.024 0.96 1.92 0.96 3.136 0 3.584-2.88 6.528-6.528 6.528-0.128 0-0.128-0.128-0.256-0.128l0 0.256L575.936 646.528l0 151.616 252.48 0c0 0 120.384-30.144 131.008-154.432C970.176 519.424 821.76 479.488 821.76 479.488z" p-id="3701" fill="#ffffff"></path></svg>
        </li>
        <li>
          <svg style="margin-right: 24px" t="1599835265293" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="819" width="18" height="18"><path d="M287.8 319.8h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM608.3 319.8h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM928.2 319.8h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM287.8 639.2h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM608.3 639.2h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM928.2 639.2h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM287.8 959.7h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM608.3 959.7h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32zM928.2 959.7h-192c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h192c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32z" p-id="820" fill="#ffffff"></path></svg>
        </li>
        <li>
          <img src="../assets/logo.png" height="26" width="26" alt="avatar" style="border-radius: 50%;background: white">
        </li>
      </ul>

  </nav>
</template>

<script>
export default {
  name: "Navigation",
    methods: {
      clickOpenOrHiddenHomeLeft() {
          this.$parent.openOrHiddenLeftList()
      },
        clickCreateProject() {
          this.$parent.createProject()
        }
    }
};
</script>

<style scoped>
nav {
  margin: 0;
  height: 48px;
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

.svg-more:hover {
    cursor: pointer;
}
  .title-more {
    margin: auto 0 auto 24px;
    padding-top: 2px;
  }
.title-more:hover {
    cursor: pointer;
}
  .nav-user-info {
    margin: auto 24px auto auto;
    list-style-type: none;
    text-align: center;
    display: flex;
  }
.nav-user-info li {
  margin: auto;
  display: flex;
}

.nav-user-info li svg,
img {
  margin: auto;
  display: flex;
}
.nav-user-info li svg,
img :hover{
  cursor: pointer;
}
</style>
