<template>
  <div class="mark-account-wrap position-relative">
    <div class="mark-top text-center cl-fff fs-40 pt-45 pb-45">
      曝光恶意买家, 传递正能量
    </div>

    <div class="mark-content border-radius-10 mr-30 mt-30 ml-30 box-shadow">
      <div class="mark-form bc-fff">
        <div class="mark-form-tip fs-30 cl-333 text-center font-bold pd-30">
          标记您遇到或经历的恶意账号
        </div>
        <div class="mark-form-content">
          <div class="mark-form-item">
            <div class="mark-form-name fs-28">举报类型:</div>
            <div class="mark-item-con pt-10 ml-10">
              <van-checkbox-group v-model="checkResult">
                <van-checkbox
                  v-for="(item, index) in markChecllist"
                  :key="index"
                  :name="item.value"
                  shape="square"
                  checked-color="#29a7e1"
                  class="left mb-40"
                >
                  {{ item.name }}
                </van-checkbox>
              </van-checkbox-group>
            </div>
          </div>
          <div class="mark-form-item">
            <div class="mark-form-name fs-28">举报账号:</div>
            <div class="mark-item-con ml-10">
              <van-field
                class="account-input"
                v-model="account"
                disabled
                placeholder="目前支持淘宝旺旺账号举报"
              />
            </div>
          </div>
          <div class="mark-form-item mt-30">
            <div class="mark-form-name fs-28">举报内容:</div>
            <div class="mark-item-con ml-10">
              <van-field
                class="mark-text-input"
                v-model="markText"
                type="textarea"
                placeholder="提示 : 请详细描述事件起因经过"
                rows="1"
                autosize
              />
              <p class="fs-22 cl-666 mt-10 text-right">
                请描述举报内容, 不少于10字
              </p>
            </div>
          </div>
        </div>
      </div>

      <div class="mark-prompt">
        <div class="prompt-top flex-row-space-between pd-20">
          <div class="prompt-left cl-main fs-24">
            <img
              class="mr-10"
              src="~assets/images/tools/cpm/point.png"
              alt=""
            />
            举报须知 :
          </div>
          <div
            class="prompt-right"
            v-if="showPrompt"
            @click="showPrompt = !showPrompt"
          >
            <span class="cl-666 fs-24">收起</span>
            <van-icon class="fs-28 ml-10" name="arrow-up" />
          </div>
          <div class="prompt-right" v-else @click="showPrompt = !showPrompt">
            <span class="cl-main fs-24">查看详情</span>
            <van-icon class="fs-28 ml-10" name="arrow-down" />
          </div>
        </div>
        <div
          class="prompt-content fs-24 cl-333 pd-20 ml-20 mr-20 mb-20"
          v-if="showPrompt"
        >
          <div>
            <li></li>
            <p>请勿言语粗俗或提供虚假消息;</p>
          </div>
          <div>
            <li></li>
            <p>请勿泄露任何个人隐私信息;</p>
          </div>
          <div>
            <li></li>
            <p>根据相关法律, 您将被记录IP, 并对提交的信息承担责任;</p>
          </div>
          <div>
            <li></li>
            <p>
              请发布投诉信息时, 采取证据证明或者诉说,
              无意义的诋毁谩骂不能代表真相, 容易被系统剔除.
            </p>
          </div>
        </div>
      </div>

      <div class="mark-form bc-fff">
        <div class="mark-form-content">
          <div class="mark-form-item">
            <div class="mark-form-name fs-28">上传凭证:</div>
            <div class="mark-item-con ml-10">
              <div class="img-upload pb-30">
                <div
                  class="img-item left mr-20"
                  v-for="(item, index) in imgs"
                  :key="index"
                >
                  <img :src="item.content" alt="" />
                  <van-icon
                    class="delete-img"
                    @click="deleteImg(index)"
                    name="close"
                  />
                </div>
                <van-uploader
                  v-if="imgs.length < 3"
                  :after-read="onRead"
                  accept="image/gif,image/jpeg,image/png"
                >
                  <img src="~assets/images/tools/cxh/upload.png" alt="" />
                </van-uploader>
              </div>
            </div>
          </div>
          <van-button
            size="large"
            type="primary"
            class="border-radius-10 mt-30"
            @click="auth"
            >立即举报</van-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Button, Checkbox, CheckboxGroup, Field, Icon, Uploader } from "vant";
import api from "@/api";
export default {
  name: "ToolsMarkAccount",
  components: {
    vanButton: Button,
    vanCheckbox: Checkbox,
    vanCheckboxGroup: CheckboxGroup,
    vanField: Field,
    vanIcon: Icon,
    vanUploader: Uploader
  },
  computed: {},
  data() {
    return {
      markChecllist: [
        {
          name: "违规",
          value: "illegal"
        },
        {
          name: "差评",
          value: "badrate"
        },
        {
          name: "作假",
          value: "fake"
        },
        {
          name: "降权",
          value: "deweight"
        },
        {
          name: "退单",
          value: "refund"
        },
        {
          name: "其他",
          value: "other"
        }
      ],
      checkResult: [],
      account: "",
      markText: "",
      imgs: [],
      showPrompt: false
    };
  },
  mounted() {
    this.account = this.$route.query.markname;
  },
  methods: {
    // 图片选择后回调
    onRead(file) {
      this.imgs.push(file);
    },
    // 删除图片
    deleteImg(index) {
      this.imgs.splice(index, 1);
    },
    // 提交举报内容
    auth() {
      const _this = this;
      if (!_this.checkResult.length) {
        _this.$Toast("请选择举报类型");
        return;
      }
      if (!_this.account) {
        _this.$Toast("请填写旺旺昵称");
        return;
      }
      if (!_this.markText || _this.markText.length < 10) {
        _this.$Toast("请描述举报内容, 不少于10字");
        return;
      }
      // 图片上传
      let fd = new FormData();
      fd.append("acPic1", _this.imgs[0] ? _this.imgs[0].file : "");
      fd.append("acPic2", _this.imgs[1] ? _this.imgs[1].file : "");
      fd.append("acPic3", _this.imgs[2] ? _this.imgs[2].file : "");
      api.upload(fd).then(res => {
        if (res.success) {
          _this.submit(res.result);
        } else {
          _this.$Toast("图片上传失败,请重试");
        }
      });
    },
    submit(data) {
      const _this = this;
      let markType = "";
      for (var i = 0; i < _this.checkResult.length; i++) {
        if (i == 0) {
          markType = _this.checkResult[i];
        } else {
          markType = markType + "," + _this.checkResult[i];
        }
      }
      api
        .wwSign({
          nick: _this.account,
          type: markType,
          content: _this.markText,
          acPic1: data.acPic1,
          acPic2: data.acPic2,
          acPic3: data.acPic3
        })
        .then(res => {
          _this.$dialog
            .confirm({
              message: res.success ? "举报成功" : res.message,
              showCancelButton: false,
              confirmButtonText: "我知道了"
            })
            .then(() => {
              _this.$router.go(-1);
            });
        })
        .catch(() => {
          _this.$Toast("举报失败,请重试!");
        });
    }
  }
};
</script>

<style lang="scss">
.mark-account-wrap {
  min-height: 100%;
  background-color: #ebf8ff;
  z-index: 0;
  padding-bottom: 100px; /*no*/
  .mark-top {
    background: linear-gradient(to bottom, #1390f6, #9adcf9);
  }
  .mark-content {
    overflow: hidden;
    .mark-form {
      padding: 30px 20px;
      .mark-form-content {
        .mark-form-item {
          display: flex;
          .mark-form-name {
            width: 160px;
            line-height: 30px; /*no*/
          }
          .mark-item-con {
            width: 100%;
            .van-checkbox {
              width: 33%;
            }
            .account-input {
              height: 30px; /*no*/
              border: 1px solid #9fe1ff; /*no*/
              font-size: 14px; /*no*/
              line-height: 30px; /*no*/
              padding: 0 20px;
            }
            .mark-text-input {
              min-height: 150px; /*no*/
              border: 1px solid #9fe1ff; /*no*/
              font-size: 14px; /*no*/
              line-height: 30px; /*no*/
              padding: 0 20px;
              textarea {
                min-height: 150px; /*no*/
              }
            }
            .img-upload {
              display: inline-block;
              .img-item {
                width: 145px;
                height: 145px;
                position: relative;
                img {
                  width: 100%;
                  height: 100%;
                }
                .delete-img {
                  font-size: 50px;
                  position: absolute;
                  top: -15px;
                  right: -15px;
                  z-index: 2;
                }
              }
              .van-uploader {
                width: 145px;
                height: 145px;
                float: left;
                img {
                  width: 100%;
                  height: 100%;
                }
              }
            }
          }
        }
      }
    }
    .mark-prompt {
      .prompt-top {
        align-items: center;
        .prompt-left {
          display: flex;
          align-items: center;
          img {
            height: 40px;
          }
        }
        .prompt-right {
          display: flex;
          align-items: center;
        }
      }
      .prompt-content {
        border: 1px solid #9fe1ff; /*no*/
        div {
          display: flex;
          li {
            list-style: disc;
            margin-bottom: 5px;
          }
          p {
            line-height: 45px;
          }
        }
      }
    }
  }
}
</style>
