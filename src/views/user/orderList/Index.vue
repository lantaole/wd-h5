<template>
  <div
    class="order-list-wrap position-relative"
    :style="{ minHeight: screenHeight - 96 + 'px' }"
  >
    <van-search
      background="#FD4C72"
      placeholder="请输入商品关键词"
      v-model="page.name"
      @search="search"
    />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div v-for="(item,index) in orderList" :ke="`orderListWrap${index}`" class="bg-fff mb-20 ml-40 mr-40 border-radius-10 mt-30 pd-28">
          <div class="flex justify-space-between align-center">
            <span class="fs-32 cl-666">{{item.shopName}}</span>
            <span class="cl-666">{{item.updateTime}}</span>
          </div>
          <div class="flex mt-30" v-for="(data, i) in item.items" :key="`orderListWrapItems${index}${i}`">
            <div>
              <img class="wd-100 h-100 border-radius-50p" src="http://downza.img.zz314.com/edu/pc/wlgj-1008/2017-10-25/70f7c3979189f24c446a3611e583f06a.jpg" alt="">
            </div>
            <div class="flex flex-column align-center ml-20 wd-100p">
              <div class="fs-10">{{data.productName}}</div>
              <div class="fs-8 cl-b7b7b7" >{{data.specName}}</div>
              <div class="wd-100p flex justify-space-between">
                <span class="cl-666">¥ {{data.amount/100 | fixNumber(0) || 0}}</span>
                <span class="cl-666 ">×{{data.count}}</span>
              </div>
            </div>
          </div>
          <div class="mt-50 flex align-center fs-10">
            <span class="cl-979797 pr-10">
              总价￥{{item.receivableAmount/100 | fixNumber(0) || 0}}，
              运费￥{{item.freightAmount/100 | fixNumber(0) || 0}}，
              其他费用￥{{item.otherAmount/100 | fixNumber(0) || 0}}，
              优惠￥{{item.discountAmount/100 | fixNumber(0) || 0}}
            </span>
            <span class="cl-666 fs-26 ">合计 ¥ {{(item.receivableAmount/100) | fixNumber(0)}}</span>
          </div>
          <van-divider />
          <div class="text-right">
            <van-button type="primary" size="mini" class="pr-30 pl-30" @click="goOrderDesc(item)">查看物流</van-button>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import {
  wexinPay,
  isWechat,
  wechatAuthorization,
  setStorage
} from "@/config/utils";
import { Tab, Tabs, Button, PullRefresh, List, Search,Cell,Divider } from "vant";
import api from "@/api";
export default {
  name: "OrderList",
  components: {
    vanButton: Button,
    VanPullRefresh: PullRefresh,
    VanList: List,
    vanTab: Tab,
    vanTabs: Tabs,
    vanSearch: Search,
    vanCell: Cell,
    vanDivider: Divider,
  },
  data() {
    return {
      refreshing: false,
      loadingMore: true,
      orderList: [
        {
          "id": 140,
          "shopName": "18868945405",
          "updateTime": "2020-06-30 10:18:34",
          "receivableAmount": 4000,
          "paymentAmount": 0,
          "discountAmount": 0,
          "freightAmount": 0,
          "otherAmount": 0,
          "items": [
            {
              "id": 168,
              "productName": "夹子",
              "specName": "红色,l",
              "count": 2,
              "amount": 4000
            },
            {
              "id": 169,
              "productName": "夹子",
              "specName": "红色,m",
              "count": 3,
              "amount": 4001
            }
          ]
        },
        {
          "id": 141,
          "shopName": "18868945405",
          "updateTime": "2020-06-27 23:36:54",
          "receivableAmount": 4001,
          "paymentAmount": 0,
          "discountAmount": 0,
          "freightAmount": 0,
          "otherAmount": 0,
          "items": [
            {
              "id": 170,
              "productName": "夹子",
              "specName": "红色,l",
              "count": 4,
              "amount": 4002
            },
            {
              "id": 171,
              "productName": "夹子",
              "specName": "红色,m",
              "count": 5,
              "amount": 4003
            }
          ]
        }
      ],
      page: {name: ''},
      screenHeight: document.body.clientHeight,
      list: [],
      loading: false,
      finished: false,
    };
  },
  mounted() {
    this.getOrderPage();
  },
  computed: {
    userEnergy() {
      return this.$store.state.energy.balance;
    }
  },
  methods: {
    search(v){
      this.getOrderPage();
    },
    //下拉刷新
    onRefresh() {
      let self = this;
      self.page.name = '';
      self.getOrderPage();
    },
    //上拉加载
    loadMore() {
      let self = this;
      self.getOrderPage();
    },
    onLoad() {
      this.getOrderPage()
    },
    // 获取订单列表
    getOrderPage() {
      const self = this;
      self.loadingMore = true;
      api
        .orderList({name: self.page.name})
        .then(res => {
          if(res.success){
            self.orderList = res.data;
          }else {
            self.$Toast(res.msg);
          }
        });
    },
    goOrderDesc(item){
      this.$router.push({name: 'OrderDesc', query: {id: item.id}})
    }
  }
};
</script>

<style lang="scss">
.order-list-wrap {
  background-color: #F2F2F2;
  z-index: 0;
}
</style>
