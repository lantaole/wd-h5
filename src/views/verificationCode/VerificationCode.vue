<template>
  <div class="verification-code-wrap bg-fff flex">
    <div class="text-center wd-100p mt-20p">
      <div class="cl-666 fs-40 mb-15">输入验证码</div>
      <div class="cl-666 fs-32 mb-15">验证码已发送至：{{phone}}</div>
      <div class="cl-b7b7b7 fs-24 mb-10">52s</div>
      <div>
        <van-button type="primary" size="mini">
          <span class="fs-24 pl-30 pr-30 pt-10 pb-10">重新发送</span>
        </van-button>
      </div>
      <div class="mt-100 ml-30 mr-30" >
        <van-row gutter="20">
          <van-col span="6">
            <van-field class="verification-code-input"></van-field>
          </van-col>
          <van-col span="6">
            <van-field class="verification-code-input"></van-field>
          </van-col>
          <van-col span="6">
            <van-field class="verification-code-input"></van-field>
          </van-col>
          <van-col span="6">
            <van-field class="verification-code-input"></van-field>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Button,  Row, Col,Field } from "vant";
import LoginDialog from "@/components/LoginDialog";
import api from "@/api";
import { getStorage, isWechat, getWxConfigParams } from "@/config/utils";

export default {
  name: "VerificationCode",
  components: {
    vanButton: Button,
    vanRow: Row,
    vanCol: Col,
    vanField: Field,
    LoginDialog
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  computed: {

  },
  data() {
    return {
      phone: '188****5405'
    };
  },
  created() {
  },
  mounted() {
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
  .verification-code-wrap{
    position: fixed;
    width: 100%;
    height: 100%;
    .verification-code-input{
      border-bottom: 1px solid #979797 !important;
    }
  }
</style>
