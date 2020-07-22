<template>
  <div class="verification-code-wrap bg-fff flex">
    <div class="text-center wd-100p mt-20p">
      <div class="cl-666 fs-40 mb-15">输入验证码</div>
      <div class="cl-666 fs-32 mb-15">验证码已发送至：{{phone}}</div>
      <div class="cl-b7b7b7 fs-24 mb-10" v-if="phone">
          <sms-countdown
            ref='verificationCodeSmsCountDown'
            slot="button"
            :phone="phone"
            purpose="reg"
          ></sms-countdown>
      </div>
      <!--<div>-->
        <!--<van-button type="primary" size="mini">-->
          <!--<span class="fs-24 pl-30 pr-30 pt-10 pb-10">重新发送</span>-->
        <!--</van-button>-->
      <!--</div>-->
      <div class="mt-100 ml-30 mr-30 captcha" >
        <input v-for="(c, index) in ct" :key="index"
               type="number" v-model="ct[index]" ref="input"
               :style="{borderBottomColor: index <= cIndex ? '#333' : ''}"
               @input="e => {onInput(e.target.value, index)}"
               @keydown.delete="e=>{onKeydown(e.target.value, index)}"
               @focus="onFocus"
               :disabled="loading"
        >
      </div>
      <p class="mt-20">{{msg}}</p>
    </div>
  </div>
</template>

<script>
import { Button,  Row, Col,Field } from "vant";
import SmsCountdown from "@/components/SmsCountdown";
import api from "@/api";
import {
  setStorage,
  getStorage,
  wechatAuthorization,
  isWechat,
  getWechatImg,
  getWxConfigParams
} from "@/config/utils";
export default {
  name: "VerificationCode",
  components: {
    vanButton: Button,
    vanRow: Row,
    vanCol: Col,
    vanField: Field,
    SmsCountdown: SmsCountdown,
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  computed: {
    ctSize() {
      return this.ct.length;
    },
    cIndex() {
      let i = this.ct.findIndex(item => item === '');
      i = (i + this.ctSize) % this.ctSize;
      return i;
    },
    lastCode() {
      return this.ct[this.ctSize - 1];
    }
  },
  data() {
    return {
      phone: null,
      ct: ['', '', '', ''],
      msg: '',
      loading: false,
    };
  },
  created() {
    this.phone = this.$route.query.phone
  },
  mounted() {
    this.init()
    this.$nextTick(function () {
      this.resetCaret();
    })
  },
  methods: {
    init(){
      this.$refs.verificationCodeSmsCountDown.run();
    },

    onInput(val, index) {
      this.msg = ''
      val = val.replace(/\s/g, '');
      if (index == this.ctSize - 1) {
        this.ct[this.ctSize - 1] = val[0];   // 最后一个码，只允许输入一个字符。
      } else if(val.length > 1) {
        let i = index;
        for (i = index; i < this.ctSize && i - index < val.length; i++) {
          this.ct[i] = val[i];
        }
        this.resetCaret();
      }
    },
    // 重置光标位置。
    resetCaret() {
      this.$refs.input[this.ctSize-1].focus();
    },
    onFocus() {
      // 监听 focus 事件，将光标重定位到“第一个空白符的位置”。
      let index = this.ct.findIndex(item => item === '');
      index = (index + this.ctSize) % this.ctSize;
      this.$refs.input[index].focus();
    },
    onKeydown(val, index) {
      if (val === '') {
        // 删除上一个input里的值，并对其focus。
        if (index > 0) {
          this.ct[index - 1] = '';
          this.$refs.input[index - 1].focus();
        }
      }
    },
    sendCaptcha() {
      let self = this;
      self.msg = this.ct.join('');
      // 此时无法操作 input。。
      self.loading = true;
      api.bindMobile({userType: 2, mobile: self.phone.toString(), mobileCode: self.msg}).then(res => {
        if(res.success){
          self.$router.push({name: 'OrderList'})
        }
        self.$Toast(res.msg)
      })
      // setTimeout(() => {
      //   this.msg = ('验证码错误')
      //   this.loading = false;
      //   this.$nextTick(() => {
      //     this.reset();
      //   })
      // }, 3000)
    },

    reset() {
      // 重置。一般是验证码错误时触发。
      this.ct = this.ct.map(item => '');
      this.resetCaret();
    }
  },
  watch: {
    cIndex() {
      this.resetCaret();
    },
    lastCode(val) {
      if (val) {
        console.log('this.ctSize', this.ctSize)
        this.$refs.input[this.ctSize - 1].blur();
        this.sendCaptcha();
      }
    }
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
      width: 90%;
      margin: auto;
      text-align: center;
      font-size: 40px;
    }
  }
  .captcha {
    display: flex;
    justify-content: center;
  }
  input {
    margin-right: 20px;
    width: 20%;
    text-align: center;
    border: none;
    border-bottom: 1px solid #eee;
    font-size: 40px;
    outline: none;
  }
  input:last-of-type {
    margin-right: 0;
  }
  input:disabled {
    color: #000;
    background-color: #fff;
  }
  .msg {
    text-align: center;
  }
</style>
