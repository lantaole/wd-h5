<template>
  <div class="pd-20 pb-85 score">
    <section class="font-bold">
      请大家根据实际情况对以下运营同事的业务能力进行打分！
    </section>
    <section class="mt-10">
      请至少选择<span class="cl-red font-bold">5到10个人</span
      >进行评分，评分范围
      <span class="cl-red font-bold">1到10分</span>
    </section>
    <div class="clear mt-10">
      <span class="left">请填写您的名字：</span>
      <input class="input left" placeholder="评分人姓名" v-model="scoreName" />
    </div>
    <div class="clear mt-10" v-for="(item, index) in userNameList" :key="index">
      <span class="left name">{{ item.name }}：</span>
      <input
        class="input left"
        type="number"
        placeholder="分数(1-10分)"
        v-model="item.score"
        step="1"
      />
      <span class="left ml-5">分</span>
    </div>
    <div class="text-center button">
      <van-button class="bc-red cl-fff" size="large" @click="submit"
        >提交评分</van-button
      >
    </div>
  </div>
</template>

<script>
import { Button } from "vant";
import api from "@/api";
import { isInteger } from "@/config/utils";
export default {
  name: "score",
  components: {
    vanButton: Button
  },
  data() {
    return {
      scoreName: null,
      userNameList: [
        {
          name: "黄枭雄",
          score: null
        },
        {
          name: "史培耀",
          score: null
        },
        {
          name: "万爽",
          score: null
        },
        {
          name: "何凯",
          score: null
        },
        {
          name: "谢春香",
          score: null
        },
        {
          name: "胡欣雨",
          score: null
        },
        {
          name: "李倩",
          score: null
        },
        {
          name: "田林",
          score: null
        },
        {
          name: "李淇",
          score: null
        },
        {
          name: "刘艳",
          score: null
        },
        {
          name: "冯超",
          score: null
        },
        {
          name: "唐思隆",
          score: null
        },
        {
          name: "傅叶琦",
          score: null
        },
        {
          name: "俞曼璐",
          score: null
        },
        {
          name: "王佳莹",
          score: null
        },
        {
          name: "倪俊侃",
          score: null
        },
        {
          name: "吴仕康",
          score: null
        },
        {
          name: "唐芹凯",
          score: null
        },
        {
          name: "刘皓文",
          score: null
        },
        {
          name: "程俊超",
          score: null
        },
        {
          name: "李扬",
          score: null
        },
        {
          name: "方玉虎",
          score: null
        },
        {
          name: "徐锦霞",
          score: null
        },
        {
          name: "李靖娜",
          score: null
        }
      ]
    };
  },
  methods: {
    submit() {
      let count = 0;
      for (let i = 0; i < this.userNameList.length; i++) {
        if (this.userNameList[i].score) {
          count++;
          if (
            this.userNameList[i].score <= 0 ||
            this.userNameList[i].score > 10 ||
            !isInteger(this.userNameList[i].score * 1)
          ) {
            this.$Toast("请填写1-10的整数");
            return;
          }
        }
      }
      if (!this.scoreName) {
        this.$Toast("请填写打分人姓名");
        return;
      }
      if (count < 5) {
        this.$Toast("最少给5人打分");
        return;
      }
      api
        .score({
          param: JSON.stringify({
            maker: this.scoreName,
            list: this.userNameList
          })
        })
        .then(res => {
          this.$Toast(res.message);
        });
    }
  }
};
</script>

<style scoped lang="scss">
.score {
  font-size: 18px; /*no*/
}
.input {
  border: 1px solid #666;
  padding: 3px 5px;
  width: 220px;
}
.name {
  width: 150px;
  display: inline-block;
}
.button {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
</style>
