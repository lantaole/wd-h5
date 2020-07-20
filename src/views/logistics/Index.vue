<template>
  <div
    class="logistics-wrap position-relative"
    :style="{ minHeight: screenHeight - 96 + 'px'}"
  >
    <div v-for="(item,index) in logisticsData" :key="`logisticsData${index}`">
      <div  class="h-94 bg-fff flex align-center  pl-40 pr-40">
        <div class=" flex align-center pl-50">
          <div class="fs-28 ml-28">{{item.expressProviderName}}：{{item.expressNo}} </div>
          <van-button id="copy"
                          :data-clipboard-text="item.expressNo" type="default" size="mini" class="cl-b7b7b7 ml-50 pl-50 pr-50">复制</van-button>
        </div>
      </div>
      <div class="mt-24">
        <van-steps direction="vertical" :active="0">
          <van-step v-for="(info,i) in item.traceInfoList" :key="`traceInfoList${index}${i}`">
            <div v-if="i===0" class="flex flex-column align-center">
              <!--<div class="cl-666 fs-28 text-left wd-100p">派送中</div>-->
              <div class="cl-666 fs-24 text-left wd-100p">
                {{info.info}}
              </div>
              <div class="cl-666 fs-10">
                {{info.time}}
              </div>
            </div>
            <div v-else class="flex flex-column align-center">
              <!--<div class="cl-979797 fs-28 text-left wd-100p">运输中</div>-->
              <div class="cl-979797 fs-24 text-left wd-100p">
                {{info.info}}
              </div>
              <div class="cl-979797 fs-10">
                {{info.time}}
              </div>
            </div>
          </van-step>
          <!--<van-step>-->
            <!--<div class="flex flex-column align-center">-->
              <!--<div class="cl-979797 fs-28 text-left wd-100p">运输中</div>-->
              <!--<div class="cl-979797 fs-24 text-left wd-100p">-->
                <!--[杭州市]快件已到达杭州留下区-->
              <!--</div>-->
              <!--<div class="cl-979797 fs-10">-->
                <!--2019-08-30 02:49-->
              <!--</div>-->
            <!--</div>-->
          <!--</van-step>-->
          <!--<van-step>-->
            <!--<div class="flex flex-column align-center">-->
              <!--<div class="cl-979797 fs-24 text-left wd-100p">-->
                <!--[芜湖市]快件已从杭州中转部发出，准备发往杭州留下区-->
              <!--</div>-->
              <!--<div class="cl-979797 fs-10">-->
                <!--2019-08-30 02:49-->
              <!--</div>-->
            <!--</div>-->
          <!--</van-step>-->
          <!--<van-step>-->
            <!--<div class="flex flex-column align-center">-->
              <!--<div class="cl-979797 fs-24 text-left wd-100p">-->
                <!--[芜湖市]快件已从芜湖中转部发出，准备发往杭州中转部-->
              <!--</div>-->
              <!--<div class="cl-979797 fs-10">-->
                <!--2019-08-30 02:49-->
              <!--</div>-->
            <!--</div>-->
          <!--</van-step>-->
          <!--<van-step>-->
            <!--<div class="flex flex-column align-center">-->
              <!--<div class="cl-979797 fs-24 text-left wd-100p">-->
                <!--[芜湖市]快件已到达芜湖中转部-->
              <!--</div>-->
              <!--<div class="cl-979797 fs-10">-->
                <!--2019-08-30 02:49-->
              <!--</div>-->
            <!--</div>-->
          <!--</van-step>-->
          <!--<van-step>-->
            <!--<div class="flex flex-column align-center">-->
              <!--<div class="cl-979797 fs-28 text-left wd-100p">已揽件</div>-->
              <!--<div class="cl-979797 fs-24 text-left wd-100p">-->
                <!--[芜湖市]芜湖南陵的仓库[<span class="cl-0091FF">15377776666</span>]已揽收-->
              <!--</div>-->
              <!--<div class="cl-979797 fs-10">-->
                <!--2019-08-30 02:49-->
              <!--</div>-->
            <!--</div>-->
          <!--</van-step>-->
          <!--<van-step>-->
            <!--<div class="flex flex-column align-center">-->
              <!--<div class="cl-979797 fs-28 text-left wd-100p">已发货</div>-->
              <!--<div class="cl-979797 fs-24 text-left wd-100p">-->
                <!--包裹正在等待揽收-->
              <!--</div>-->
            <!--</div>-->
          <!--</van-step>-->
        </van-steps>
      </div>
    </div>
  </div>
</template>

<script>
import {
  wexinPay,
  isWechat,
  wechatAuthorization,
  setStorage
} from "@/config/utils";
import { Tab, Tabs, Button, PullRefresh, List, Search,Cell,Divider,Icon, Steps, Step } from "vant";
import Clipboard from "clipboard";
import api from "@/api";
export default {
  name: "Logistics",
  components: {
    vanButton: Button,
    VanPullRefresh: PullRefresh,
    VanList: List,
    vanTab: Tab,
    vanTabs: Tabs,
    vanSearch: Search,
    vanCell: Cell,
    vanDivider: Divider,
    vanIcon: Icon,
    vanSteps: Steps,
    vanStep: Step,
  },
  data() {
    return {
      logisticsData: [
        {
          "expressProviderName": "中通",
          "expressNo": "75335738658572",
          "traceInfoList": [
            {
              "time": "2020-03-17 21:07:42",
              "info": "【洛阳】（0379-61299171） 的 恒澍（13233799779） 已揽收"
            },
            {
              "time": "2020-03-17 21:08:34",
              "info": "快件离开 【洛阳】 已发往 【杭州中转部】"
            },
            {
              "time": "2020-03-18 01:33:02",
              "info": "快件已经到达 【郑州中转】"
            },
            {
              "time": "2020-03-18 21:32:13",
              "info": "快件离开 【郑州中转】 已发往 【杭州中转部】"
            },
            {
              "time": "2020-03-19 21:01:25",
              "info": "快件已经到达 【杭州中转部】"
            },
            {
              "time": "2020-03-19 21:01:45",
              "info": "快件离开 【杭州中转部】 已发往 【杭州留下区】"
            },
            {
              "time": "2020-03-20 06:31:55",
              "info": "快件已经到达 【杭州留下区】"
            },
            {
              "time": "2020-03-20 08:11:47",
              "info": "【杭州留下区】 的朱彦朴（17613725805） 正在第1次派件, 请保持电话畅通,并耐心等待（95720为中通快递员外呼专属号码，请放心接听）"
            },
            {
              "time": "2020-03-20 13:48:49",
              "info": "快件已送达【快递超市的福鼎家园】, 如有问题请电联:（95311）, 投诉电话:（18736500758）, 感谢您使用中通快递, 期待再次为您服务!"
            },
            {
              "time": "2020-03-21 18:49:14",
              "info": "已签收, 签收人凭取货码签收, 如有疑问请电联:（95311）, 投诉电话:（18736500758）, 您的快递已经妥投。风里来雨里去, 只为客官您满意。上有老下有小, 赏个好评好不好？【请在评价快递员处帮忙点亮五颗星星哦~】"
            }
          ],
          "orderProductItemList": [
            {
              "productId": 2,
              "productName": "test_product5",
              "productImage": "https://wdzhanggui-app.oss-cn-hangzhou.aliyuncs.com/goods/1676aab74264d12a258922115a91705e",
              "itemCount": 5
            }
          ]
        }
      ],
      screenHeight: document.body.clientHeight,
    };
  },
  created(){
    this.$nextTick(function() {
      let clipboard = new Clipboard("#copy");
      clipboard.on("success", () => {
        this.$Toast("复制成功!");
      });
      clipboard.on("error", () => {
        this.$Toast("复制失败!");
        clipboard.destroy();
      });
    });
  },
  mounted() {
    //this.getLogistics();
  },
  computed: {
    userEnergy() {
      return this.$store.state.energy.balance;
    }
  },
  methods: {
    // 获取订单列表
    getLogistics() {
      const self = this;
      api
        .orderDesc({id: self.$route.query.id})
        .then(res => {
          if(res.success){
            self.orderDesc = res.data;
          }else {
            self.$Toast(res.msg);
          }
        });
    },
  }
};
</script>

<style lang="scss">
.logistics-wrap {
  background-color: #F2F2F2;
  z-index: 0;
}
</style>
