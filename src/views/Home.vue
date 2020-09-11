<template>
  <Navigation />
  <div class="app-content">
    <div class="app-content-left">
      <div class="app-content-left-list">
        <ul>
          <li>
            <svg t="1599819012508" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4554" width="24" height="24"><path d="M836.576 566.848l0 274.272q0 14.848-10.848 25.728t-25.728 10.848l-219.424 0 0-219.424-146.272 0 0 219.424-219.424 0q-14.848 0-25.728-10.848t-10.848-25.728l0-274.272q0-0.576 0.288-1.728t0.288-1.728l328.576-270.848 328.576 270.848q0.576 1.152 0.576 3.424zM964 527.424l-35.424 42.272q-4.576 5.152-12 6.272l-1.728 0q-7.424 0-12-4l-395.424-329.728-395.424 329.728q-6.848 4.576-13.728 4-7.424-1.152-12-6.272l-35.424-42.272q-4.576-5.728-4-13.44t6.272-12.288l410.848-342.272q18.272-14.848 43.424-14.848t43.424 14.848l139.424 116.576 0-111.424q0-8 5.152-13.152t13.152-5.152l109.728 0q8 0 13.152 5.152t5.152 13.152l0 233.152 125.152 104q5.728 4.576 6.272 12.288t-4 13.44z" p-id="4555" fill="#ffffff"></path></svg>
            <span>首页</span></li>
          <li>
            <svg t="1599819012508" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4554" width="24" height="24"><path d="M836.576 566.848l0 274.272q0 14.848-10.848 25.728t-25.728 10.848l-219.424 0 0-219.424-146.272 0 0 219.424-219.424 0q-14.848 0-25.728-10.848t-10.848-25.728l0-274.272q0-0.576 0.288-1.728t0.288-1.728l328.576-270.848 328.576 270.848q0.576 1.152 0.576 3.424zM964 527.424l-35.424 42.272q-4.576 5.152-12 6.272l-1.728 0q-7.424 0-12-4l-395.424-329.728-395.424 329.728q-6.848 4.576-13.728 4-7.424-1.152-12-6.272l-35.424-42.272q-4.576-5.728-4-13.44t6.272-12.288l410.848-342.272q18.272-14.848 43.424-14.848t43.424 14.848l139.424 116.576 0-111.424q0-8 5.152-13.152t13.152-5.152l109.728 0q8 0 13.152 5.152t5.152 13.152l0 233.152 125.152 104q5.728 4.576 6.272 12.288t-4 13.44z" p-id="4555" fill="#ffffff"></path></svg>
            <span>首页</span></li>
        </ul>
      </div>
    </div>
    <div class="app-content-right">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navigation from "@/views/Navigation";
export default {
  name: "Home",
  components: { Navigation }
};
</script>

<style scoped>
* {
  margin: 0;
}
.app-content {
  width: 100%;
  height: 100%;
  margin: 0 0 0 0;
  display: flex;
}
.app-content-left {
  width: 250px;
  height: 100%;
  background: #202020;
}
.app-content-left-list {
  margin-top: 60px;
  width: 100%;
}
.app-content-left-list ul {
  margin: 0;
  padding: 0;
  text-align: center;
}
.app-content-left-list ul li {
  list-style: none;
  height: 40px;
  text-align: center;
  margin: 0;
  padding: 0;
  display: flex;
  color: #eeeeee;
  font-size: 0.95rem;
  cursor: pointer;
}

.app-content-left-list ul li:hover {
  list-style: none;
  height: 40px;
  text-align: center;
  background: #383838;
  margin: 0;
  padding: 0;
  display: flex;
}
.app-content-left-list ul li svg {
  margin: auto 0 auto 24px;
}
.app-content-left-list ul li span {
  margin: auto auto auto 24px;
}
.app-content-right {
  flex: 1;
  height: 100%;
  background: #181818;
}
</style>
