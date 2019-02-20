<template>
  <div>
    <h3>
      {{description.title}}
      <goods-status-tag v-if="description.reviewStatus" :status="description.reviewStatus"/>
    </h3>
    <el-row>
      <template v-if="description.reviewStatus == 'changeRequested'">
        <el-col :span="6">审核评论:</el-col>
        <el-col :span="18">{{description.reviewComments}}</el-col>

        <el-col :span="6">审核时间:</el-col>
        <el-col :span="18">{{description.reviewedTime.toLocaleString()}}</el-col>
      </template>
      <el-col :span="24">图片:</el-col>
      <el-col :span="24">
        <img :src="p.url" v-for="p in description.photos" :key="p.id">
        <p v-if="description.photos.length == 0">无图片</p>
      </el-col>

      <el-col :span="6">详细信息:</el-col>
      <el-col :span="18">{{description.detail}}</el-col>

      <el-col :span="6">联系方式:</el-col>
      <el-col :span="18">{{description.contactInfo}}</el-col>

      <el-col :span="6">分类:</el-col>
      <el-col :span="18">{{description.category.name}}</el-col>

      <el-col :span="6">买/卖:</el-col>
      <el-col :span="18">{{active}}</el-col>

      <el-col :span="6">校区:</el-col>
      <el-col :span="18">{{area}}</el-col>

      <el-col :span="6">买价:</el-col>
      <el-col :span="18">{{description.buyingPrice}}</el-col>

      <el-col :span="6">售价:</el-col>
      <el-col :span="18">{{description.sellingPrice}}</el-col>

      <el-col :span="6">提交时间:</el-col>
      <el-col :span="18">{{description.createdTime.toLocaleString()}}</el-col>
    </el-row>

    <el-button v-if="['pending', 'changeRequested'].includes(description.reviewStatus)" type="success" @click="approve">通过</el-button>
    <el-button type="warning" @click="requestChange">不通过</el-button>
  </div>
</template>

<script>
import GoodsStatusTag from "@/components/GoodsStatusTag.vue";
import { goodsReviewApprove, goodsReviewRequestChange } from "@/api";
import { sellOrBuy, area } from "@/i18n";

export default {
  components: {
    GoodsStatusTag
  },
  props: {
    description: Object
  },
  computed: {
    active() {
      return sellOrBuy[this.description.active];
    },
    area() {
      return area[this.description.area];
    }
  },
  methods: {
    async approve() {
      await goodsReviewApprove(this.description.id);
      this.description.reviewStatus = "approved";
      this.$emit("reviewStatusUpdated");
    },
    async requestChange() {
      try {
        const comments = await this.$prompt("审核失败原因")
        await goodsReviewRequestChange(this.description.id, comments.value);
      } catch (e) {
        if (e === "cancel") { return; }
        throw e;
      }
      this.description.reviewStatus = "changeRequested";
      this.$emit("reviewStatusUpdated");
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  max-width: 500px;
  max-height: 100vh;

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
}
</style>
