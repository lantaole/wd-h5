<template>
  <van-dialog
    id="activity717"
    v-model="show"
    :closeOnClickOverlay="false"
    :showConfirmButton="false"
    @close="close"
  >
    <img
      :src="this.baseUrl + '/images/common/717/popup.png'"
      class="follow-img mg-auto"
    />
    <div class="open position-absolute" @click="open"></div>
    <img
      class="close-img mg-auto mt-40"
      :src="this.baseUrl + '/images/common/717/close.png'"
      alt=""
      @click="close"
    />
  </van-dialog>
</template>
<script>
export default {
  name: "ActivityPop",
  data() {
    return {
      show: false
    };
  },
  props: {
    isShow: {
      required: true,
      default: false
    }
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  watch: {
    isShow(val) {
      this.show = val;
    }
  },
  mounted() {
    this.show = this.isShow;
  },
  methods: {
    close() {
      this.show = false;
      this.$emit("on-close");
    },
    open() {
      this.$router.push({
        path: "/activity-717"
      });
      this.close();
    }
  }
};
</script>

<style scoped lang="scss">
#activity717 {
  background-color: transparent;
  .follow-img {
    width: 90%;
  }
  .close-img {
    width: 60px;
    height: 60px;
  }
  .open {
    width: 180px;
    height: 180px;
    top: 380px;
    left: 50%;
    margin-left: -90px;
  }
}
</style>
