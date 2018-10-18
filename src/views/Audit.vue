<template>
  <div class="audit-container">
    <h2>正在审核商品</h2>
    <el-progress :text-inside="true" :stroke-width="18" :percentage="30" />

    <h3>
      商品标题
      <goods-status-tag status="pendingAudit" />
    </h3>
    <el-row tag="dl">
      <el-col tag="dt" :span="24">图片:</el-col>
      <el-col tag="dd" :span="24">
        <img src="https://source.unsplash.com/hRZDd1ekhrA/1024x768" alt="">
      </el-col>

      <el-col tag="dt" :span="6">详细信息:</el-col>
      <el-col tag="dd" :span="18">详细信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息信息。</el-col>

      <el-col tag="dt" :span="6">联系方式:</el-col>
      <el-col tag="dd" :span="18">12345678900</el-col>

      <el-col tag="dt" :span="6">分类:</el-col>
      <el-col tag="dd" :span="18">电子产品</el-col>

      <el-col tag="dt" :span="6">发布时间:</el-col>
      <el-col tag="dd" :span="18">2018-9-23 18:23</el-col>
    </el-row>
    <el-button type="success" @click="auditOk">通过</el-button>
    <el-button type="warning">不通过</el-button>

    <el-pagination layout="prev, pager, next" :total="12" :page-size="1" :pager-count="5" />
  </div>
</template>

<script>
import GoodsStatusTag from "../components/GoodsStatusTag.vue";

export default {
  components: {
    "goods-status-tag": GoodsStatusTag
  },
  methods: {
    auditOk() {
      console.log("OK");
    }
  },
};
</script>

<style lang="scss" scoped>
.audit-container {
  margin: 0 20px;
}
.el-progress {
  max-width: 500px;
}
img {
  max-width: 500px;
  max-height: 100vh;

  @media screen and (max-width: 768px) {
    max-width: 100%;
  }
}
</style>
