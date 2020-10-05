<template>
    <div class="item-con">
        <!--坐-->
        <div class="item-con" v-if="doubleDataList.length > 0" @click="clickToProjectDetails(doubleDataList[0].id)">
            <div class="item-con-c-left">
                <h5 style="color: #CDCDCD;margin: 14px 0 auto 24px">
                    {{doubleDataList[0].projectName}}&nbsp;&nbsp;@{{doubleDataList[0].tuserEntity.unickname}}
                </h5>
                <div class="progress">
                    <div
                            class="progress-bar"
                            role="progressbar"
                            :style="{width: doubleDataList[0].overallProgress + '%'}"
                            :aria-valuenow="doubleDataList[0].overallProgress"
                            aria-valuemin="0"
                            aria-valuemax="100"

                    >
                        {{doubleDataList[0].overallProgress}}%
                    </div>
                </div>
                <div class="progress-bottom">
                    <div class="progress-bottom-lr">
                        <p>最新问题：{{doubleDataList[0]?.tprojectProblemEntity?.ppContent}}</p>
                    </div>
                    <div class="progress-bottom-lr">
                        <p>添加时间：{{formatDate(doubleDataList[0]?.tprojectProblemEntity?.ppAddTimestamp)}}</p>
                    </div>
                </div>

                <div class="progress-bottom">
                    <div class="progress-bottom-lr">
                        <p>最新接口：----</p>
                    </div>
                    <div class="progress-bottom-lr">
                        <p>添加时间：20-09-12</p>
                    </div>
                </div>
            </div>
        </div>


        <!--右-->
        <div class="item-con" v-if="doubleDataList.length > 1" @click="clickToProjectDetails(doubleDataList[1].id)">
            <div class="item-con-c-right">
                <h5 style="color: #CDCDCD;margin: 14px 0 auto 24px">
                    {{doubleDataList[1].projectName}}&nbsp;&nbsp;@{{doubleDataList[1].tuserEntity.unickname}}
                </h5>
                <div class="progress">
                    <div
                            class="progress-bar"
                            role="progressbar"
                            :style="{width: doubleDataList[1].overallProgress + '%'}"
                            :aria-valuenow="doubleDataList[1].overallProgress"
                            aria-valuemin="0"
                            aria-valuemax="100"
                    >
                        {{doubleDataList[1].overallProgress}}%
                    </div>
                </div>
                <div class="progress-bottom">
                    <div class="progress-bottom-lr">
                        <p>最新问题：{{doubleDataList[1]?.tprojectProblemEntity?.ppContent}}</p>
                    </div>
                    <div class="progress-bottom-lr">
                        <p>添加时间：{{formatDate(doubleDataList[1]?.tprojectProblemEntity?.ppAddTimestamp)}}</p>
                    </div>
                </div>

                <div class="progress-bottom">
                    <div class="progress-bottom-lr">
                        <p>最新接口：----</p>
                    </div>
                    <div class="progress-bottom-lr">
                        <p>添加时间：20-09-12</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    import "bootstrap/dist/js/bootstrap.min";
    import {formatDate2} from "@/constants/Filter";

    export default {
        name: "ItemProject",
        data() {
            return {}
        },
        props: {
            doubleDataList: Array()
        },
        methods: {
            clickToProjectDetails(projectId) {
                console.info(projectId)
                this.$router.push({path: "/homeProjectDetailsComponent", query: {projectId: projectId}})
            },
            formatDate(time) { //
                if (time !== undefined) {
                    const data = new Date(time);
                    return formatDate2(data, 'yyyy-MM-dd HH:mm:ss');
                } else {
                    return "--"
                }
            }
        }
    };
</script>

<style scoped>
    .item-con {
        flex: 1;
        margin: 0 auto 10px auto;
        display: flex;
    }

    .item-con-c-left {
        flex: 1;
        text-align: left;
        margin: 10px 50px 0 50px;
        border-radius: 8px;
      border: 1px #696969 solid;
        background: #202020;
      box-shadow: 0 0 0px #090909;
        transition: box-shadow 500ms;
    }

    .item-con-c-right {
        flex: 1;
        text-align: left;
        margin: 10px 50px 0 0px;
        border-radius: 8px;
      border: 1px #696969 solid;
        background: #202020;
      box-shadow: 0 0 0px #090909;
        transition: box-shadow 500ms;
    }

    .item-con-c-left:hover {
        box-shadow: 0 0px 12px black;
        cursor: pointer;
        transition: box-shadow 500ms;
    }

    .item-con-c-right:hover {
        box-shadow: 0 0px 12px black;
        cursor: pointer;
        transition: box-shadow 500ms;
    }

    .progress {
        margin: 14px 24px;
        height: 12px;
    }

    .progress-bottom {
        display: flex;
        margin: auto 24px;
        font-size: 0.7rem;
        color: #787878;
    }

    .progress-bottom-lr {
        flex: 1;
    }

</style>
