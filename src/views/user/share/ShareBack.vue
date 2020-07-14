<template>
  <div class="share-wrap">
    <div class="share-top position-relative">
      <img
        class="share-top-bg"
        src="~assets/images/account/share/share-back-img1.png"
        alt=""
      />
      <img
        class="invite-btn position-absolute"
        src="~assets/images/account/share/btn.gif"
        @click="jumpTo('/account')"
        alt=""
      />
    </div>
    <div class="share-content">
      <div class="img-item position-relative mb-30">
        <img
          class="item-bg mg-auto"
          src="~assets/images/account/share/share-back-img2.png"
          alt=""
        />
        <div class="flex-row-space-around position-absolute tools-btns">
          <div
            v-for="(item, index) in toolsList"
            :key="index"
            @click="jumpTo(item.url)"
            style="width: 25%;height: 100%;"
          ></div>
        </div>
        <div
          class="now-to-get position-absolute"
          @click="jumpTo('/account')"
        ></div>
      </div>
      <div class="img-item position-relative mb-30">
        <img
          class="item-bg mg-auto"
          src="~assets/images/account/share/share-back-img3.png"
          alt=""
          @click="jumpTo('/seven-day')"
        />
        <div
          class="now-to-get position-absolute"
          @click="jumpTo('/seven-day')"
        ></div>
      </div>
      <div class="img-item position-relative mb-30">
        <img
          class="item-bg mg-auto"
          src="~assets/images/account/share/share-back-img4.png"
          alt=""
        />
        <div class="swiper-x position-absolute">
          <img
            v-for="(item, index) in bannerList"
            :key="index"
            class="border-radius-10 mr-20"
            :src="item.imgSrc"
            @click="jumpTo(item.url)"
            alt=""
          />
        </div>
        <div
          class="now-to-get position-absolute"
          @click="jumpTo('/account')"
        ></div>
      </div>
    </div>
    <div class="share-back-bottom pd-30 mt-30 bc-fff">
      <div class="flex-row-space-between btns">
        <img
          src="~assets/images/account/share/bot-btn1.png"
          @click="jumpTo('/share')"
          alt=""
        />
        <img
          src="~assets/images/account/share/bot-btn2.png"
          @click="jumpTo('/account')"
          alt=""
        />
      </div>
      <p class="fs-24 cl-999 text-center">能量可用于查询你想要的电商数据哦~</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "ShareBack",
  data() {
    return {
      bannerList: [
        {
          imgSrc: `${this.baseUrl}/images/common/share-banner-img1.png`,
          url: "/seven-day"
        },
        {
          imgSrc: `${this.baseUrl}/images/common/share-banner-img2.png`,
          url: "/buy-energy?opt=3"
        },
        {
          imgSrc: `${this.baseUrl}/images/common/share-banner-img3.png`,
          url: "/buy-energy"
        }
      ],
      toolsList: [
        {
          url: "/tools-cpm"
        },
        {
          url: "/tools-cxh"
        },
        {
          url: "/tools-jztc"
        },
        {
          url: "/wxToTb"
        }
      ]
    };
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  methods: {
    jumpTo(url) {
      this.$router.push({
        path: url
      });
    }
  }
};
</script>
<style scoped lang="scss">
.share-wrap {
  background-color: #f5f6f8;
  padding-bottom: 50px; /*no*/
  .tools-btns {
    width: 100%;
    height: 160px;
    bottom: 100px;
  }
  .share-top {
    .share-top-bg {
      width: 100%;
    }
    .invite-btn {
      width: 570px;
      top: 620px;
      left: 90px;
    }
  }
  .share-content {
    .img-item {
      width: 100%;
      .item-bg {
        width: 690px;
      }
      .now-to-get {
        width: 300px;
        height: 70px;
        left: 225px;
        bottom: 15px;
      }
      .swiper-x {
        width: 630px;
        height: 240px;
        top: 170px;
        left: 60px;
        display: inline;
        white-space: nowrap; /*规定段落中的文本不进行换行*/
        overflow-x: scroll; /*水平方向，超出部分添加滚动机制*/
        float: left; /*一定要设置左侧浮动*/
        overflow-y: hidden; /*竖直方向，超出部分隐藏*/
        img {
          width: 560px;
          height: 100%;
          display: inline-block;
        }
      }
    }
  }
  .share-back-bottom {
    .btns {
      img {
        width: 340px;
        height: 110px;
      }
    }
  }
}
</style>
