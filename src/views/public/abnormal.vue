<template>
<div class="abnormalone">
  <h2>异常事件</h2>
  <div class="scrollDiv" id="s2">
		<div class="one"></div>
		<!-- <div class="two"></div> -->
	  <ul>
		  <li><span class="fa fa-exclamation-triangle"></span>1号机自助终端办理业务过长</li>
		  <li><span class="fa fa-volume-up"></span>2号机自助终端需要人工帮助</li>
		  <li><span class="fa fa-hourglass"></span>当前排队等候业务办理人员较多</li>
		  <li><span class="fa fa-cubes"></span> 4号机自助终端出现故障,请维修</li>
		  <li><span class="fa fa-exclamation-triangle"></span>1号机自助终端办理业务过长</li>
		  <li><span class="fa fa-volume-up"></span>2号机自助终端需要人工帮助</li>
		  <li><span class="fa fa-hourglass"></span>当前排队等候业务办理人员较多</li>
		  <li><span class="fa fa-cubes"></span> 4号机自助终端出现故障,请维修</li>
		  <li><span class="fa fa-exclamation-triangle"></span>1号机自助终端办理业务过长</li>
		  <li><span class="fa fa-volume-up"></span>2号机自助终端需要人工帮助</li>
		  <li><span class="fa fa-hourglass"></span>当前排队等候业务办理人员较多</li>
		  <li><span class="fa fa-cubes"></span> 4号机自助终端出现故障,请维修</li>
		  <li><span class="fa fa-exclamation-triangle"></span>1号机自助终端办理业务过长</li>
		  <li><span class="fa fa-volume-up"></span>2号机自助终端需要人工帮助</li>
		  <li><span class="fa fa-hourglass"></span>当前排队等候业务办理人员较多</li>
		  <li><span class="fa fa-cubes"></span> 4号机自助终端出现故障,请维修</li>

	  </ul>
  </div>
</div>
</template>
<script>
    export default {
        name: "abnormals",
        data(){
            return{

            }
        },
        methods:{
            abnormal(){
                
            }
        },
        mounted(){
            this.abnormal()
        },
        components:{

        }
    }

</script>

<style scoped lang="scss">
* {
	margin: 0;
	padding: 0;
}

.abnormalone h2{font-size: 1.1rem;
	color: #ccc;
	height: 1.5rem;
	line-height: 1.5rem;
	text-align: center;
	font-weight: normal
	}
ul, li {
	list-style-type: none;
	font-size: 14px;
	text-align: left;
    padding-left: 5%;
	color: #ccc
}
.one{
	width: 100%;height: 100%;
	position:absolute;
	left: 0;
	background-color: rgba(255, 255, 0, 0);
	top: 0;
	-moz-box-shadow: 1x 1px 30px rgba(210, 146, 44, .9) inset;               /* For Firefox3.6+ */
	-webkit-box-shadow:1px 1px 30px rgba(210, 146, 44, .9) inset;            /* For Chrome5+, Safari5+ */
	box-shadow:1px 1px 30px rgba(210, 146, 44, .9) inset;                    /* For Latest Opera */}
.abnormalone{padding-top: 1.1rem;}
.scrollDiv {
	height: 25px;/* 必要元素 */
	line-height: 25px;
	border: #7f5c25 1px dotted;
    padding: 10px 0;
	position: relative;
	overflow: hidden;/* 必要元素 */
}
.fa-exclamation-triangle{color: yellow;padding: 0 10px;text-align: center;}
.fa-volume-up{color: #17daef;padding: 0 10px;text-align: center;}
.fa-hourglass{color: #d31717;padding: 0 10px;text-align: center;}
.fa-cubes{color: #d37823;padding: 0 10px;text-align: center;}
.scrollDiv li {
	height: 25px;
//	padding-left: 10px;
}
#s2, #s3 {
	height: 100px;
}
</style>