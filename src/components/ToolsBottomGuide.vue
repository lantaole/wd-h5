<template>
  <div>
    <div class="shadow" @click="getCurrentBgImg" v-show="!collapse">
      <img
        @click.stop="changeDaySign"
        class="close-icon"
        src="~assets/images/common/close_day_sign.png"
        alt=""
      />
    </div>
    <div v-show="collapse" class="day-sign-little" @click="changeDaySign"></div>
    <SharePoster
      :shareUserName="shareUserName"
      :showShareDialog="showPoster"
      :qrCodeStyle="qrCodeStyle"
      :posterItem="posterItem"
      @closeShareDialog="closeShareDialog"
    ></SharePoster>
  </div>
</template>

<script>
import SharePoster from "@/components/SharePoster";
export default {
  name: "ToolsBottomGuide",
  components: {
    SharePoster
  },
  data() {
    return {
      showPoster: false,
      qrCodeStyle: {
        width: 135,
        height: 135,
        x: 320,
        y: 658
      },
      backgroundImage: null,
      posterList: [
        {
          id: 1,
          title: "宜坚持",
          content:
            "今天很残酷，明天更残酷，后天很美好，但绝大部分人死在明天晚上，看不到后天的太阳",
          source: "马云",
          backgroundImage: "94fffae2-b98b-4786-b7d6-74c39cc7c6f1.png"
        },
        {
          id: 2,
          title: "宜争取",
          content:
            "只有走在时间的前面，才能掌握主动权，在有限的时间里变的更优秀。",
          source: "随手查",
          backgroundImage: "94fffae2-b98b-4786-b7d6-74c39cc7c6f1.png"
        },
        {
          id: 3,
          title: "宜探索",
          content: "我从不回忆过去，对我来说，唯一重要的事情就是永恒的现在。",
          source: "《月亮与六便士》毛姆",
          backgroundImage: "94fffae2-b98b-4786-b7d6-74c39cc7c6f1.png"
        },
        {
          id: 4,
          title: "忌危机",
          content:
            "三十岁的你比二十岁的你更深刻地理解很多事物，也更能忍受它们。",
          source: "普里莫·莱维《若非此时，何时？》",
          backgroundImage: "97880a34-5a47-41b3-8091-b1a9b3211fba.png"
        },
        {
          id: 5,
          title: "宜坚持",
          content: "做决定之前仔细考虑，一旦作了决定就要勇往直前、坚持到底。",
          source: "随手查",
          backgroundImage: "a202c854-67e6-4ffd-bda5-4bfe2e8a34eb.png"
        },
        {
          id: 6,
          title: "宜勇敢",
          content: "一个个强壮的日子仍然等在前面，像刚烤出来的面包一样诱惑。",
          source: "诗人，夏宇《强壮的日子》",
          backgroundImage: "7f98ab6f-cfb4-45e3-a633-5f1296248168.png"
        },
        {
          id: 7,
          title: "宜勇敢",
          content:
            "将一付好牌打好没有什么了不起，能将一付坏牌打好的人才值得钦佩。",
          source: "随手查",
          backgroundImage: "001bc27c-87d4-4493-9765-daf55777d8ab.png"
        },
        {
          id: 8,
          title: "忌毒舌",
          content: "没有所谓的玩笑，所有的玩笑都有认真的成分。",
          source: "西格蒙德·弗洛伊德",
          backgroundImage: "daa67562-93ac-4ce7-bf12-e9e4fb28261f.png"
        },
        {
          id: 9,
          title: "宜自省",
          content: "在什么平台，面对什么顾客，决定你应该卖什么。",
          source: "随手查",
          backgroundImage: "b47adb9c-e500-43ce-b740-229dcc78f522.png"
        },
        {
          id: 10,
          title: "宜勇敢",
          content: "去生活，去犯错，去跌倒，去胜利，去用生命再创生命。",
          source: "詹姆斯.乔伊斯",
          backgroundImage: "784b8a79-e86b-43a3-91c0-6840427df4b1.png"
        },
        {
          id: 11,
          title: "宜探索",
          content:
            "一个人最大的幸运，莫过于在他的人生中途，即在他年富力强时发现了自己生活的使命。",
          source: " 斯蒂芬茨威格 《人类群星闪耀时》",
          backgroundImage: "1ff3ff62-fc28-4e9f-b041-410919831a13.png"
        },
        {
          id: 12,
          title: "宜倾听",
          content: "你的高明之处不在于谈论你自己，而在于倾听别人谈论自己。",
          source: "《简爱》",
          backgroundImage: "495c7e2a-5f67-43a5-990c-d9db75fa85d4.png"
        },
        {
          id: 13,
          title: "忌贪心",
          content: "消费者不是为了“便宜”而购买，消费者是为了“值得”而购买。",
          source: "随手查",
          backgroundImage: "2497ead4-2e29-4f3f-a1a8-780b473a5b91.png"
        },
        {
          id: 14,
          title: "宜学习",
          content:
            "灵感并不是在逻辑思考的延长线上产生，而是在破除逻辑或常识的地方才有灵感。",
          source: "爱因斯坦",
          backgroundImage: "e92c7beb-ef28-414e-88c3-b9b06d02e800.png"
        },
        {
          id: 15,
          title: "宜务实",
          content:
            "创意是企业运营中一个很重要的一环，但它只是一环，不是所有，所以要把每项工作落实到实处。",
          source: "随手查",
          backgroundImage: "16b01923-5e38-4a8e-8c1a-4ad27bba58d1.png"
        },
        {
          id: 16,
          title: "宜钟情",
          content: "一定要爱着点什么，恰似草木对光阴的钟情。",
          source: "汪曾祺《人间草木》",
          backgroundImage: "b585efeb-8435-48c8-a881-fc72f40e7544.png"
        },
        {
          id: 17,
          title: "忌恶习",
          content: "好习惯成就一生，坏习惯毁人前程。",
          source: "随手查",
          backgroundImage: "b8c0849e-1c9e-4481-9475-241e9f89fdd4.png"
        },
        {
          id: 18,
          title: "宜坚定",
          content:
            "花一辈子去做自己厌烦的事，比永远自私地追逐梦想、随心所欲，要勇敢得多。",
          source: "阿利斯泰尔《海风中失落的血色馈赠》",
          backgroundImage: "8349ec69-28b5-4fb0-bae2-b48358fe06c5.png"
        },
        {
          id: 19,
          title: "宜坚持",
          content:
            "没有播种，何来收获；没有辛苦，何来成功；没有磨难，何来荣耀；没有挫折，何来辉煌。",
          source: "随手查",
          backgroundImage: "e3d9cddd-f2f3-45bc-b827-6d1375dda436.png"
        },
        {
          id: 20,
          title: "宜社交",
          content: "每天大家都在彼此周旋时，每个人是如何藏起一整个私密的世界。",
          source: "科尔姆·托宾《大师》",
          backgroundImage: "6ea7a7fa-5106-40c8-91c5-75ecf1c4de0f.png"
        },
        {
          id: 21,
          title: "忌高冷",
          content:
            "人生在世，并不是充满竞争和掠夺，更多的是共赢。有了这种人格，人生定会收货物质和精神的双重财富。",
          source: "随手查",
          backgroundImage: "e2af761c-c98b-4afa-a847-e94d16aa9750.png"
        },
        {
          id: 22,
          title: "宜勇敢",
          content:
            "翅膀长在你的肩上，太在乎别人对于飞行姿势的批评，所以你飞不起来。",
          source: "卡森麦卡勒斯 《伤心咖啡馆之歌》",
          backgroundImage: "04a5e835-94b8-4762-ab3e-5a7c01b34df2.png"
        },
        {
          id: 23,
          title: "忌虚度",
          content: "要真正了解一个人，只要看他怎样利用余暇时光就可以了。",
          source: "林语堂",
          backgroundImage: "c14bcf19-2f25-40b4-8885-2f337eba3ddc.png"
        },
        {
          id: 24,
          title: "宜独行",
          content:
            "生命中大部分时光是属于孤独的，努力成长是在孤独里可以进行的最好的游戏。",
          source: "绿川幸《夏目友人帐》",
          backgroundImage: "4f8342f6-a6a8-4608-b922-11b746052d7a.png"
        },
        {
          id: 25,
          title: "宜超越",
          content: "生命不是要超越别人，而是要超越自己。",
          source: "随手查",
          backgroundImage: "9cec8331-394e-4b44-a54f-5219ab689eb4.png"
        },
        {
          id: 26,
          title: "宜坚持",
          content:
            "在人生的道路上，当你的希望一个个落空的时候，你也要坚定，要沉着。",
          source: "朗费罗",
          backgroundImage: "a3f35233-86e5-4e64-90d4-44488d4103b6.png"
        },
        {
          id: 27,
          title: "宜坚持",
          content: "持续不断地劳动是人生的铁律，也是艺术的铁律。",
          source: "巴尔扎克",
          backgroundImage: "9a9516b4-c362-4986-9b1b-7e4dfa39e11d.png"
        },
        {
          id: 28,
          title: "宜勇敢",
          content:
            "人生就象打橄榄球一样，不能犯规，也不要闪避球，而应向底线冲过去。",
          source: "罗斯福",
          backgroundImage: "4ee2d810-8dc8-48e8-84d3-cc4b5561678d.png"
        },
        {
          id: 29,
          title: "宜期待",
          content: "生活真象这杯浓酒，不经三番五次的提炼呵，就不会这样可口！",
          source: "郭小川",
          backgroundImage: "414fda1b-0d26-4326-9539-2299a393c06e.png"
        },
        {
          id: 30,
          title: "宜坚持",
          content: "天才是百分之一的灵感加百分之九十九的汗水。",
          source: "爱迪生",
          backgroundImage: "c6bf414e-0a8d-42fe-bc62-e14ee0b10368.png"
        },
        {
          id: 31,
          title: "宜共情",
          content:
            "真正有力的组织，大部分的力量，都在于能够将虚构的信仰建立在一个让人顺从的现实之上。",
          source: "随手查",
          backgroundImage: "18d1f010-391e-4457-af5e-889a3d0ed399.png"
        }
      ],
      posterListSep: [
        {
          id: 1,
          title: "宝贝定位",
          content:
            "定位选款是开店第一步；选款测款可以借助直通车，定位分为店铺风格的定位，产品定位，和价格定位。",
          backgroundImage: ".png"
        },
        {
          id: 2,
          title: "自然搜索",
          content:
            "搜索排名，是每个卖家必备的技能，冲销量开直通车，其最终目的都是为了自然搜索排名靠前。",
          backgroundImage: ".png"
        },
        {
          id: 3,
          title: "标题优化",
          content:
            "对店铺，商品等标题进行符合规则化的优化操作，使之在众多同类内容中排名靠前，增加曝光率、点击量，从而提升转化率。",
          backgroundImage: ".png"
        },
        {
          id: 4,
          title: "主图优化",
          content:
            "产品的主图，需要和关键词做到“词图合一”，这样才能让消费者所见即所得。",
          backgroundImage: ".png"
        },
        {
          id: 5,
          title: "店铺上新",
          content:
            "新品发布，带来两个直接的结果：给店铺新增“流量提升”渠道，为店铺目标用户打上“历史行为标签”。",
          backgroundImage: ".png"
        },
        {
          id: 6,
          title: "品牌策略",
          content:
            "品牌是天时地利人和的综合结果，通过有品质的商品去传播店铺，积累客户，再让回头客为品牌买单。",
          backgroundImage: ".png"
        },
        {
          id: 7,
          title: "超级推荐",
          content:
            "在淘宝猜你喜欢、有好货、微淘、直播等站内外信息流中，依托AI个性化推荐商品及短视频等多种创意形式的营销平台。",
          backgroundImage: ".png"
        },
        {
          id: 8,
          title: "千人千面",
          content:
            "对消费者来说，他们对淘宝个性化的需求不仅仅是商品，还有优质的内容和契合的推荐。",
          backgroundImage: ".png"
        },
        {
          id: 9,
          title: "宝贝类目",
          content:
            "宝贝类目属性的错误填写，可能会引起宝贝下架或搜索流量减少，影响正常销售，务必重视。",
          backgroundImage: ".png"
        },
        {
          id: 10,
          title: "新品加权",
          content:
            "新品具有一定的流量扶持，只要在短时间内打爆点击率、收藏加购率、转化率，宝贝的流量就会爆发。",
          backgroundImage: ".png"
        },
        {
          id: 11,
          title: "主图优化",
          content:
            "把宝贝的各个细节大图都放在宝贝下面，并把相关的材质介绍、购买信息写得非常详细，越真实的信息越让用户及早下定决心进行购买。",
          backgroundImage: ".png"
        },
        {
          id: 12,
          title: "上下架",
          content:
            "700px以上的图片上传到宝贝主图，自带放大镜功能，但是大小一般不能超过3MB。",
          backgroundImage: ".png"
        },
        {
          id: 13,
          title: "隐形降权",
          content:
            "查排名的隐形降权查询是掌柜卖家在线检测淘宝天猫商城店铺宝贝是否被淘宝网隐形降权的分析工具。",
          backgroundImage: ".png"
        },
        {
          id: 14,
          title: "点击率",
          content:
            "直通车的点击率=点击量/展现量，可直观表示宝贝的吸引程度，点击率越高，说明宝贝对买家的吸引力越大。",
          backgroundImage: ".png"
        },
        {
          id: 15,
          title: "钻展定向",
          content:
            "系统根据买家的各种历史行为，给每一个访客打上相应的标签，当在设置广告计划时圈定相应标签的人群，系统就会把广告展现给想要的人群。",
          backgroundImage: ".png"
        },
        {
          id: 16,
          title: "商品标题",
          content:
            "标题是以关键词组合而成的，标题一定要符合淘宝搜索引擎的口味。",
          backgroundImage: ".png"
        },
        {
          id: 17,
          title: "淘宝信用",
          content:
            "淘宝网会根据卖家的淘信用分数，提供相应的经营保障服务。原则上，淘信用分数越高的卖家，保障服务的种类越多，服务水平越高。",
          backgroundImage: ".png"
        },
        {
          id: 18,
          title: "淘宝搜索",
          content:
            "淘宝搜索引擎利用杠杆原理，也叫前后原理，标题最前面跟最后面的词权重最高；所以好词写在前面或者后面，搜索引擎从前后向中间抓取。",
          backgroundImage: ".png"
        },
        {
          id: 19,
          title: "淘宝降权",
          content:
            "一般商品被降权的情况有：虚假交易、软件收藏、标题滥用、类目错放、淘宝刷销量、故意堆砌关键词、广告商品、价格作弊、重复铺货、邮费虚假等。",
          backgroundImage: ".png"
        },
        {
          id: 20,
          title: "词的权重",
          content:
            "在搜索引擎面前能加权重的词一般包括：带来过成交的词、带来过流量的词、成交转化率高的词，能够真实反映商品特征的词。",
          backgroundImage: ".png"
        },
        {
          id: 21,
          title: "新品加权",
          content:
            "新品期间可以结合直通车在七天内做出螺旋推广的销量增加趋势，再结合老客户回购，优惠券，买就送，店铺优惠活动等，很快就能提升权重和排名。",
          backgroundImage: ".png"
        },
        {
          id: 22,
          title: "展现量",
          content: "越临近下架的宝贝搜索权重越高，排名越靠前",
          backgroundImage: ".png"
        },
        {
          id: 23,
          title: "标题优化",
          content:
            "修改标题不宜太过于频繁，最多7天内不要超过两次，根据实际需要，一般一周修改一次，爆款不宜变更标题。",
          backgroundImage: ".png"
        },
        {
          id: 24,
          title: "浏览量",
          content:
            "三个对搜索权重有帮助的点击策略：停留时间长，无跳失，上下浏览，包括购买，收藏，浏览首页或者其他宝贝。",
          backgroundImage: ".png"
        },
        {
          id: 25,
          title: "店铺类目",
          content: "主营类目占比的高低决定着店铺跟客户搜索的关键词的相关性。",
          backgroundImage: ".png"
        },
        {
          id: 26,
          title: "修改宝贝",
          content:
            '宝贝标题，描述，主图，价格不可同时修改，否则会让淘宝误判"偷换宝贝"，非改不可的话得错开一个一个的换，一口价修改必死。',
          backgroundImage: ".png"
        },
        {
          id: 27,
          title: "注重选品",
          content:
            "所谓电子商务，电子是渠道，产品是根本，选好品也就成功了一半。",
          backgroundImage: ".png"
        },
        {
          id: 28,
          title: "标题优化",
          content:
            "一个好的标题，可以被客户最大程度的检索到，最大程度的吸引到流量的注入。",
          backgroundImage: ".png"
        },
        {
          id: 29,
          title: "淘宝客",
          content:
            "淘宝客是一种按成交计费的推广模式，也指帮助卖家推广商品并获取佣金收益的一类人。",
          backgroundImage: ".png"
        },
        {
          id: 30,
          title: "滞销宝贝",
          content:
            "若宝贝90天内无编辑、流量或出售的行为，系统将把宝贝作为滞销商品下架至滞销下架宝贝。",
          backgroundImage: ".png"
        }
      ],
      posterItem: {},
      collapse: false
    };
  },
  computed: {
    shareUserName() {
      return this.$store.state.userInfo.wechatInfo
        ? this.$store.state.userInfo.wechatInfo.nickname
        : "随手查";
    }
  },
  beforeCreate() {
    this.baseUrl = process.env.BASE_URL;
  },
  methods: {
    closeShareDialog() {
      let _this = this;
      _this.showPoster = !_this.showPoster;
    },
    getCurrentBgImg() {
      const i = new Date().getDate();
      let org = this.baseUrl + "/upload/";
      if (new Date().getMonth() === 8) {
        this.posterList = this.posterListSep;
        org =
          "https://llbs.oss-cn-hangzhou.aliyuncs.com/cpm/cal/2019/09/" +
          (i > 9 ? i : "0" + i);
      }
      this.posterItem = this.posterList[i - 1];
      this.posterItem.lines = Math.ceil(this.posterItem.content.length / 24);
      this.posterItem.backgroundImage = org + this.posterItem.backgroundImage;
      this.showPoster = true;
    },
    changeDaySign() {
      this.collapse = !this.collapse;
      this.$emit("collapse", this.collapse);
    }
  }
};
</script>

<style scoped lang="scss">
.shadow {
  width: 100%;
  position: fixed;
  bottom: 50px; /*no*/
  height: 100px; /*no*/
  background-image: url("../assets/images/common/every_day_enter_bg.png");
  background-size: 100% 100%;
}
.day-sign-little {
  position: fixed;
  bottom: 50px; /*no*/
  width: 72px;
  height: 182px;
  background-image: url("../assets/images/common/day_sign_bg_little.png");
  background-size: 100% 100%;
}
.close-icon {
  width: 60px;
  float: right;
}
</style>
