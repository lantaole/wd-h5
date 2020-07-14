<template>
  <div class="tools-clm-result">
    <div class="return-to-clm" @click="goBack">
      <span class="return-icon"></span>
      <span class="ml-15">返回查询</span>
    </div>
    <div class="result-content">
      <div class="result-content-top clear">
        <section class="left flex-center" @click="goBack">
          <span class="return-icon return-icon-one"></span>
          <span class="cl-main-second fs-22 ml-10">换个产品词，重新查询</span>
        </section>
        <section class="right flex-center" @click="isShowContactUs = true">
          <img
            class="contact-img mr-10"
            src="~assets/images/tools/cpm/contact.png"
            alt=""
          />
          <span class="fs-20 cl-666">有疑问？联系导师</span>
        </section>
      </div>
      <div class="result-content-center">
        <section class="result-content-center-top cl-333 fs-22">
          匹配到<span class="font-bold cl-37ACE3"> {{ totalCount }} </span
          >个类目
        </section>
        <section
          class="text-center no-leimu-box"
          v-if="categoryList.length === 0"
        >
          <img
            class="no-leimu-img"
            src="~assets/images/tools/clm/no_leimu.png"
            alt=""
          />
          <div class="text-center cl-999 fs-22 mt-20">
            换个产品词 <span class="cl-37ACE3" @click="goBack">重新查询</span>
          </div>
        </section>
        <section v-else>
          <div
            class="category-item"
            v-for="(item, index) in categoryList"
            :key="index"
          >
            <span class="category-item-left cl-666 fs-12">{{ index + 1 }}</span>
            <span class="category-item-right cl-666 fs-20">{{ item }}</span>
          </div>
        </section>
      </div>
    </div>
    <ToolsCustomBottom></ToolsCustomBottom>
    <!--联系导师-->
    <contact-us
      :isShow="isShowContactUs"
      @on-close="isShowContactUs = false"
    ></contact-us>
    <CustomLoading v-model="showCustomLoading"></CustomLoading>
    <!--底部引导图片-->
  </div>
</template>

<script>
import api from "@/api/index";
import ContactUs from "@/components/ContactUs";
import CustomLoading from "@/components/CustomLoading";
import ToolsCustomBottom from "@/components/ToolsCustomBottom";

export default {
  name: "ToolsCheckCategoryResult",
  components: {
    ContactUs,
    CustomLoading,
    ToolsCustomBottom
  },
  data() {
    return {
      isShowContactUs: false,
      totalCount: 0,
      categoryList: [],
      showCustomLoading: false
    };
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  created() {
    this.showCustomLoading = true;
    this.getLeiMu();
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    async getLeiMu() {
      try {
        const { result, success } = await api.getLeiMu({
          keyword: this.$route.query.searchKey
        });
        this.showCustomLoading = false;
        if (success) {
          this.$store.dispatch("UPDATE_USER_ENERGY");
          this.totalCount = result.length;
          this.categoryList = result;
        } else {
          // this.$Toast(message);
        }
      } catch (e) {
        this.showCustomLoading = false;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.tools-clm-result {
  background-image: url("../../../assets/images/tools/cpm/bg.png");
  background-repeat: no-repeat;
  background-size: 750px 537px;
  background-color: #f5f6f8;
  overflow: hidden;
  padding-bottom: 20px;
  min-height: 100%;
  .return-to-clm {
    width: 630px;
    height: 88px;
    background-color: #fff;
    color: #29a7e1;
    font-size: 34px;
    font-weight: bold;
    text-align: center;
    line-height: 88px;
    margin-top: 90px;
    margin-left: auto;
    margin-right: auto;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .return-icon {
    display: inline-block;
    width: 36px;
    height: 36px;
    background-image: url("../../../assets/images/tools/clm/return_icon.png");
    background-size: 100% 100%;
  }
  .return-icon-one {
    width: 28px;
    height: 28px;
  }
  .result-content {
    background-color: #fff;
    border-radius: 10px;
    margin: 50px 30px 0 30px;
    padding: 20px 30px;
    box-sizing: border-box;
    box-shadow: 0 0 20px 0 rgba(41, 167, 225, 0.15);
    min-height: 600px;
    .contact-img {
      width: 20px;
      height: 20px;
    }
    .cl-37ACE3 {
      color: #37ace3;
    }
    .no-leimu-box {
      height: 450px;
      box-sizing: border-box;
      padding-top: 100px;
    }
    .no-leimu-img {
      width: 220px;
      height: 173px;
    }
    .result-content-center {
      margin-top: 22px;
      .result-content-center-top {
        height: 54px;
        line-height: 54px;
        padding-left: 20px;
        background-color: #d4edf9;
        border-top: 1px solid #29a7e1;
      }
      .category-item {
        display: flex;
        padding: 20px;
        justify-content: center;
        align-items: center;
        background-color: #eef9ff;
        border-bottom: 1px dashed #e1e3e5;
        height: 88px;
        box-sizing: border-box;
      }
      .category-item:nth-of-type(2n) {
        background-color: #fff;
      }
      .category-item-left {
        display: inline-block;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        border: 1px solid #666;
        text-align: center;
        line-height: 24px;
        box-sizing: border-box;
      }
      .category-item-right {
        flex: 1;
        margin-left: 20px;
      }
    }
  }
}
</style>
