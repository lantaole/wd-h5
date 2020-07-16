<template>
  <div
    class="order-list-wrap position-relative"
    :style="{ minHeight: screenHeight - 96 + 'px' }"
  >
    <van-search
      background="#FD4C72"
      placeholder="请输入商品关键词"
    />
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <div class="bg-fff mb-20 ml-40 mr-40 border-radius-10 mt-30 pd-28">
          <div class="flex justify-space-between align-center">
            <span class="fs-32 cl-666">一点点代购</span>
            <span class="cl-666">2020-04-02 18:00:00</span>
          </div>
          <div class="flex mt-30">
            <div style="background: #999 url('/src/assets/images/common/logo.png') no-repeat center;" class="wd-100 h-100 border-radius-50p"></div>
            <div class="flex flex-column align-center ml-20">
              <div class="fs-10">香奈儿XXXX香奈儿XXXX香奈儿XXXX香奈儿XXXX</div>
              <div class="fs-8 cl-b7b7b7">红 ;XL</div>
              <div class="wd-100p flex justify-space-between">
                <span class="cl-666">¥ 160</span>
                <span class="cl-666 ">*2</span>
              </div>
            </div>
          </div>
          <div class="mt-50 flex-column align-center fs-10">
            <span class="cl-979797 pr-15">总价￥360，运费￥10，其他费用￥10，优惠￥20</span> <span class="cl-666 fs-24">合计 ¥ 360</span>
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
import { Tab, Tabs, Button, PullRefresh, List, Search,Cell } from "vant";
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
  },
  data() {
    return {
      refreshing: false,
      loadingMore: true,
      orderList: [],
      active: 0,
      //1待支付，2已支付，3已关闭
      orderStatus: 1,
      pageIndex: 1,
      pageSize: 30,
      operationOrderIndex: null,
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
    //下拉刷新
    onRefresh() {
      let _this = this;
      _this.pageIndex = 1;
      _this.finished = false;
      _this.orderList = [];
      _this.getOrderPage();
    },
    //上拉加载
    loadMore() {
      let _this = this;
      setTimeout(() => {
        _this.pageIndex = _this.pageIndex + 1;
        _this.getOrderPage();
      }, 200);
    },
    // 获取订单列表
    getOrderPage() {
      const _this = this;
      _this.loadingMore = true;
      api
        .getOrderPage({
          pageIndex: _this.pageIndex,
          pageSize: _this.pageSize,
          //1待支付，2已支付，3已关闭
          orderStatus: this.orderStatus
        })
        .then(res => {
          if (res.success) {
            let arr = res.result.list || [];
            if (arr.length < _this.pageSize) {
              _this.finished = true;
            }
            _this.orderList = _this.orderList.concat(arr);
            _this.refreshing = false;
            _this.loadingMore = false;
          }
        });
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 20; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  }
};
</script>

<style lang="scss">
.order-list-wrap {
  background-color: #F2F2F2;
  z-index: 0;

}
</style>
