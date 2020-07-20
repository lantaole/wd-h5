<template>
  <div
    class="order-desc-wrap position-relative"
    :style="{ minHeight: screenHeight - 96 + 'px'}"
  >
    <div class="h-94 bg-fff flex align-center justify-space-between pl-40 pr-40">
      <div class=" flex align-center">
        <img src="~assets/images/orderDesc/car.png" alt="">
        <div class="cl-0091FF fs-28 ml-28">
          {{
            orderDesc.status === 1 ? '待确认':
            orderDesc.status === 2 ? '代发货':
            orderDesc.status === 3 ? '已发货':'已取消'
          }}
        </div>
      </div>
      <div class="flex align-center">
        <div class="cl-666 fs-28" @click="goLogistics()">查看物流</div> <van-icon class="cl-ccc fs-28" name="arrow" />
      </div>
    </div>
    <div class="mt-24 bg-fff flex align-center  pl-40 pr-40 pt-28 pb-28">
      <div class="flex align-center">
        <img src="~assets/images/orderDesc/positioning.png" alt="">
      </div>
      <div class="ml-28">
        <div class="flex" style="align-items: baseline;">
          <div class="fs-28 cl-666 font-bold">{{orderDesc.express.receiverName}}</div>
          <div class="fs-24  ml-40">{{orderDesc.express.receiverPhone}}</div>
        </div>
        <div class="fs-24 cl-666">
          {{orderDesc.express.receiverAddress}}
        </div>
      </div>
    </div>
    <div class="bg-fff mb-20 pl-40 pr-40  mt-24 pd-28">
      <div class="flex mt-30" v-for="(data,index) in orderDesc.items" :key="`orderDescWrap${index}`">
        <div >
          <img class="wd-100 h-100 border-radius-50p" :src="data.productImage" alt="">
        </div>
        <div class="flex flex-column align-center ml-20 wd-100p">
          <div class="fs-24 wd-100p">{{data.productName}}</div>
          <div class="fs-8 cl-b7b7b7">{{data.specName}}</div>
          <div class="wd-100p flex justify-space-between">
            <span class="cl-666">¥ {{data.purchasePrice}}</span>
            <span class="cl-666 ">× {{data.count}}</span>
          </div>
        </div>
      </div>
      <van-divider />
      <div class="flex align-center fs-28  justify-space-between">
        <div>运费</div>
        <div>¥{{orderDesc.freightAmount || 0}}</div>
      </div>
      <div class="flex align-center fs-28 justify-space-between mt-10">
        <div>其他费用</div>
        <div>¥{{orderDesc.otherAmount || 0}}</div>
      </div>
      <van-divider />
      <div class="flex align-center fs-28 justify-space-between">
        <div>优惠</div>
        <div>- ¥ {{orderDesc.discountAmount || 0}}</div>
      </div>
      <van-divider />
      <div class="flex align-center fs-28 justify-space-between">
        <div>备注</div>
        <div>{{orderDesc.remark}}</div>
      </div>
      <div class="h-24 bg-F2F2F2 mt-36 mb-36"></div>
      <div class="text-right cl-666 fs-32">
        合计 ¥ {{orderDesc.totalAmount}}
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
import { Tab, Tabs, Button, PullRefresh, List, Search,Cell,Divider,Icon } from "vant";
import api from "@/api";
export default {
  name: "ToolsCxh",
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
  },
  data() {
    return {
      orderDesc: {
        "id": 146,
        "status": 2,
        "receivableAmount": "20.00",
        "paymentAmount": "0.00",
        "freightAmount": "0.00",
        "otherAmount": "0.00",
        "discountAmount": "0.00",
        "remark": null,
        "notReceivedAmount": "20.00",
        "totalAmount": "20.00",
        "customer": {
          "id": 23,
          "customerName": "王一",
          "customerRemark": null
        },
        "travel": {
          "id": 27,
          "destination": "韩国",
          "startDate": "2020-05-06 00:00:00",
          "backDate": "2020-05-22 00:00:00"
        },
        "express": {
          "id": 173,
          "status": 1,
          "expressType": 1,
          "receiverAddressId": 24,
          "receiverName": "贾毛毛",
          "receiverPhone": "18088889999",
          "receiverAddress": "浙江省杭州市余杭区杭州大厦1100室"
        },
        "expressPackages": null,
        "items": [
          {
            "id": 172,
            "productId": 23,
            "productName": "夹子",
            "specIds": [
              72,
              74
            ],
            "specName": "红色,l",
            "productImage": "http://downza.img.zz314.com/edu/pc/wlgj-1008/2017-10-25/70f7c3979189f24c446a3611e583f06a.jpg",
            "purchasePrice": "10.00",
            "retailPrice": "20.00",
            "count": 1
          }
        ]
      },
      screenHeight: document.body.clientHeight,
    };
  },
  mounted() {
    // this.getOrderDesc();
  },
  computed: {

  },
  methods: {
    goLogistics(){
      this.$router.push({name: 'Logistics', query: {id: this.orderDesc.id}})
    },
    // 获取订单列表
    getOrderDesc() {
      const self = this;
      self.loadingMore = true;
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
.order-desc-wrap {
  background-color: #F2F2F2;
  z-index: 0;
}
</style>
