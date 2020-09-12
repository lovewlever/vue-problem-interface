<template>
  <div>
    <div>
      <ul class="hmc-top-label">
        <li>创建项目</li>
      </ul>
    </div>
    <hr />
    <br />
    <div class="hmc-item-content" id="setHeight">
      <div class="hcpc-input-name">
        <label>
          <input type="text" name="project-name" placeholder="请输入项目名称" />
        </label>
      </div>
      <br />

      <div class="hcpc-input-level">
        <label>
          请选择项目优先级(非必须)：
          <select size="1" name="selectLevel">
            <option label="优先级:0" value="0" selected></option>
            <option label="优先级:1" value="1"></option>
            <option label="优先级:2" value="2"></option>
            <option label="优先级:3" value="3"></option>
            <option label="优先级:4" value="4"></option>
            <option label="优先级:5" value="5"></option>
            <option label="优先级:6" value="6"></option>
            <option label="优先级:7" value="7"></option>
            <option label="优先级:8" value="8"></option>
            <option label="优先级:9" value="9"></option>
            <option label="优先级:10" value="10"></option>
          </select>
        </label>
      </div>

      <br />
      <div class="hcpc-input-desc">
        <label>
          <textarea
            type="text"
            name="project-name"
            placeholder="请输入项目描述"
          ></textarea>
        </label>
      </div>

      <br />
      <div class="hcpc-input-button">
        <label>
          <button type="button" value="">创建</button>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";
import $ from "jquery";

export default {
  name: "HomeCreateProjectComponent",
  components: {},
  created() {},
  mounted() {
    //设置容器高度 防止内容移除
    $("#setHeight").height(document.body.clientHeight - 160);
    window.onresize = () => {
      return (() => {
        console.info(
          document.body.clientWidth + "==" + document.body.clientHeight
        );
        $("#setHeight").height(document.body.clientHeight - 160);
      })();
    };
  }
};
</script>

<style scoped>
.hmc-top-label {
  list-style-type: none;
  text-align: left;
  margin: 3px 0 13px 0;
}
.hmc-top-label li {
  display: inline;
  margin: auto 12px;
  padding: 4px 10px 4px 10px;
  font-size: 1.5rem;
  color: #696969;
}
.hmc-top-label li:hover {
  cursor: pointer;
}

.hmc-item-content {
  margin: auto 0;
  overflow-y: auto;
  height: auto;
}

.hmc-item-content::-webkit-scrollbar {
  display: none;
}

.page-item a {
  background: #202020;
  border-color: #383838;
}
hr {
  background: #383838;
}
.hcpc-input-name {
  text-align: left;
  margin: 0 0 0 65px;
}

.hcpc-input-name input {
  margin: 0;
  padding: 0 8px;
  background: #383838;
  border: 1px #383838 solid;
  border-radius: 8px;
  outline: none;
  height: 40px;
  width: 300px;
  color: #eeeeee;
  box-shadow: 0 0 0;
  transition: box-shadow 500ms;
}
.hcpc-input-name input:focus {
  box-shadow: 0 0 8px;
  transition: box-shadow 500ms;
}
.hcpc-input-level {
  text-align: left;
  margin: 0 0 0 65px;
}
.hcpc-input-level label {
  margin: 0;
  padding: 6px 0 0 8px;
  background: #383838;
  border: 1px #383838 solid;
  border-radius: 8px;
  outline: none;
  height: 40px;
  width: 300px;
  color: #eeeeee;
  font-size: 0.92rem;
}

.hcpc-input-level label select {
  background: #383838;
  color: #eeeeee;
  width: 88px;
  height: 26px;
  box-shadow: 0 0 0;
  transition: box-shadow 500ms;
}
.hcpc-input-level label select:focus {
  box-shadow: 0 0 8px;
  transition: box-shadow 500ms;
}

.hcpc-input-desc {
  text-align: left;
  margin: 0 0 0 65px;
}
.hcpc-input-desc textarea {
  width: 300px;
  height: 150px;
  background: #383838;
  border: 1px #383838 solid;
  border-radius: 8px;
  padding: 8px;
  outline: none;
  color: #eeeeee;
  box-shadow: 0 0 0;
  transition: box-shadow 500ms;
}

.hcpc-input-desc textarea:focus {
  box-shadow: 0 0 8px;
  transition: box-shadow 500ms;
}

.hcpc-input-button {
  text-align: left;
  margin: 0 0 0 65px;
}
.hcpc-input-button button {
  width: 300px;
  height: 40px;
  background: #d57a01;
  border: 1px #383838 solid;
  border-radius: 8px;
  color: #eeeeee;
  box-shadow: 0 0 0;
  outline: none;
  transition: box-shadow 500ms;
}
.hcpc-input-button button:hover {
  box-shadow: 0 0 8px;
  transition: box-shadow 500ms;
}

label {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
</style>
