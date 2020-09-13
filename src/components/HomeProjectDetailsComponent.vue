<template>
    <div>
        <div style="display: flex">
            <ul class="hmc-top-label">
                <li>:{{projectObj?.projectName}}&nbsp;BY&nbsp;{{projectObj?.tuserEntity?.unickname}}</li>
            </ul>

            <ul class="hpdc-top-add">
                <li>
                    <router-link to="/" >添加问题</router-link>
                </li>
                <li>
                    <router-link to="/" >添加接口</router-link>
                </li>
            </ul>
        </div>
        <hr/>
        <br/>
        <div class="hmc-item-content" id="setHeight">
            <template v-for="(obj,index) in operateRecorders" :key="index">
                <!--操作记录-->
                <div style="margin-left: 24px;text-align: left">
                    <div style="border-left: 1px red solid;height: 40px"></div>
                    <div style="display: flex">
                  <span style="margin: auto 0;width: 30px">
                      <svg style="margin: 0 0 0 -5px" width="1em" height="1em" viewBox="0 0 16 16"
                           class="bi bi-caret-right-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                      </svg>
                  </span>
                        <div>
                            <p style="margin: 0">{{obj?.tporOperateType}}&{{obj?.tporName}}->{{obj?.tporOperateContent}}&nbsp;&nbsp;<span>&nbsp;BY&nbsp;{{obj?.refTUserEntity?.unickname}}</span></p>
                            <hr style="margin: 8px 0"/>
                            <p style="margin: 0">{{obj?.tporOperateType}}<span>&nbsp;&nbsp;{{obj?.tporTimestamp}}</span></p>
                        </div>
                    </div>
                    <div style="border-left: 1px red solid;height: 40px"></div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    import "bootstrap/dist/js/bootstrap.min";
    import $ from "jquery";
    import ConstWeb from "../constants/ConstWeb";
    import FuncCommon from "../constants/FuncCommon";

    export default {
        name: "HomeProjectDetailsComponent",
        data() {
            return {
                projectObj: null,
                operateRecorders: []
            };
        },
        components: {},
        created() {
            this.queryProjectDetails()
        },
        mounted() {
            //设置容器高度 防止内容移除
            $("#setHeight").height(document.body.clientHeight - 180);
            window.onresize = () => {
                return (() => {
                    FuncCommon.showConsoleInfo(
                        document.body.clientWidth + "==" + document.body.clientHeight
                    );
                    $("#setHeight").height(document.body.clientHeight - 180);
                })();
            };

        },
        methods: {
            queryProjectDetails() { //查询项目详情
                const urlParams = new URLSearchParams()
                urlParams.append("projectId", this.$route.query.projectId);
                ConstWeb.axiosRequest(ConstWeb.WebApi.QUERY_PROJECT_DETAILS, urlParams, data => {
                    FuncCommon.showConsoleInfo(data)
                    this.projectObj = data.data.data[0]
                    //查询项目的操作记录
                    this.queryProjectOperateRecorders();
                }, err => {
                    FuncCommon.showConsoleError(err)
                })
            },
            queryProjectOperateRecorders() { // 查询项目的操作记录
                FuncCommon.showConsoleInfo("查询项目的操作记录")
                const urlParams = new URLSearchParams()
                urlParams.append("projectId", this.$route.query.projectId);
                urlParams.append("page", 1);
                urlParams.append("pageCountSize", 30);
                ConstWeb.axiosRequest(ConstWeb.WebApi.QUERY_PROJECT_OPERATE_RECORDER, urlParams, data => {
                    FuncCommon.showConsoleInfo(data)
                    this.operateRecorders = data.data.data
                }, err => {
                    FuncCommon.showConsoleError(err)
                })
            }
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

    label {
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
    }

    .hpdc-top-add {
        flex: 1;
        list-style-type: none;
        text-align: right;
        margin: 3px 0 13px 0px;
        display: flex;
    }

    .hpdc-top-add li {
        display: inline;
        margin: auto 0 auto 24px;
        padding: 3px 10px 0px 10px;
        font-size: 0.8rem;
        height: 26px;
        color: #696969;
        border: 1px solid;
        border-radius: 6px;
    }
    .hpdc-top-add li:hover {
        cursor: pointer;
    }
    .hpdc-top-add li a {
        color: #696969;
    }
</style>
