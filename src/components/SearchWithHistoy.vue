<template>
  <div class="search-with-histoy">
    <van-search :placeholder="placeholder" v-model="searchVal" @focus="focus">
      <img
        v-if="queryName === 'shopInfo'"
        slot="left-icon"
        class="search-icon-slot"
        src="~assets/images/tools/cpm/shop.png"
        alt=""
      />
      <img
        v-else
        slot="left-icon"
        class="search-icon-slot"
        src="~assets/images/tools/cpm/search.png"
        alt=""
      />
    </van-search>
    <div class="history-content">
      <div
        class="history-item left mr-20 mt-20 fs-20 cl-666"
        v-for="(item, index) in history"
        :key="index"
        @click="chooseHistory(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
import { Search } from "vant";
import { getStorage, setStorage } from "@/config/utils";
export default {
  name: "SearchWithHistoy",
  components: {
    vanSearch: Search
  },
  props: {
    queryName: {
      required: true,
      default: ""
    },
    changeHistory: {
      required: true,
      default: false
    },
    placeholder: {
      default: "请输入内容搜索"
    }
  },
  data() {
    return {
      searchVal: "",
      queryData: {
        searchVal: "",
        history: []
      },
      history: []
    };
  },
  watch: {
    searchVal(val) {
      const _this = this;
      _this.$emit("getSearchVal", [_this.queryName, val]);
    },
    changeHistory() {
      this.addHistory();
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化
    init() {
      const _this = this;
      let queryName = _this.queryName;
      let history = getStorage(queryName);
      if (history) {
        _this.history = history;
        _this.searchVal = history[0];
      }
    },
    // 更新
    resetHistory() {
      const _this = this;
      setStorage(_this.queryName, _this.history);
    },
    // 添加历史记录
    addHistory() {
      const _this = this;
      let val = _this.searchVal;
      let arr = _this.history;
      if (val && arr[0] !== val) {
        if (arr.includes(_this.searchVal)) {
          arr.splice(
            arr.findIndex(item => item === val),
            1
          );
        }
        if (arr.length > 4) {
          arr = arr.slice(0, 4);
        }
        arr.unshift(val);
        _this.history = arr;
        this.resetHistory();
      }
    },
    // 选择历史记录
    chooseHistory(item) {
      this.searchVal = item;
    },
    focus() {
      this.$emit("focus");
    }
  }
};
</script>

<style lang="scss">
.search-with-histoy {
  .van-search {
    padding: 0;
    border-radius: 10px;
    border: 2px solid #9fe1ff;
    .van-search__content {
      background-color: transparent;
      .van-cell {
        .van-field__left-icon {
          display: flex;
          align-items: center;
          .search-icon-slot {
            width: 18px; /*no*/
            height: 18px; /*no*/
          }
        }
      }
    }
  }
  .history-content {
    width: 100%;
    overflow: hidden;
    .history-item {
      height: 38px;
      line-height: 38px;
      padding: 0px 25px;
      background-color: #eeeeee;
      border-radius: 19px;
    }
  }
}
</style>
