<template>
  <div>
    <h2>物品列表</h2>
    <p>此处展示的均为公众可见信息</p>
    <el-table :data="goods" style="width: 100%" v-loading="goods === null">
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <el-row tag="dl">
            <el-col tag="dt" :span="3">详细信息:</el-col>
            <el-col tag="dd" :span="21">{{row.currentDescription.detail}}</el-col>

            <el-col tag="dt" :span="3">联系信息:</el-col>
            <el-col tag="dd" :span="21">{{row.currentDescription.contactInfo}}</el-col>

            <el-col tag="dt" :span="3">买/卖:</el-col>
            <el-col tag="dd" :span="9">{{mapActive(row)}}</el-col>

            <el-col tag="dt" :span="3">校区:</el-col>
            <el-col tag="dd" :span="9">{{mapArea(row)}}</el-col>

            <el-col tag="dt" :span="3">买价:</el-col>
            <el-col tag="dd" :span="9">{{row.currentDescription.buyingPrice}}</el-col>

            <el-col tag="dt" :span="3">售价:</el-col>
            <el-col tag="dd" :span="9">{{row.currentDescription.sellingPrice}}</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="#" />
      <el-table-column prop="createdTime" label="上架日期" width="190">
        <template slot-scope="{row}">
          {{row.onShelfTime.toLocaleDateString()}}
        </template>
      </el-table-column>
      <el-table-column prop="currentDescription.title" label="标题" />
      <el-table-column prop="currentDescription.category.name" label="分类" width="150" />
      <el-table-column label="操作" width="200">
        <template slot-scope="{row}">
          <el-button type="warning" @click="requestChange(row)" :loading="row.loading">审核不通过</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import GoodsStatusTag from "../components/GoodsStatusTag.vue";
import { goodsReviewRequestChange, getAllGoods } from "../api";

export default {
  components: {
    "goods-status-tag": GoodsStatusTag
  },
  methods: {
    async requestChange(goods) {
      goods.loading = true;
      try {
        const comments = await this.$prompt("审核失败原因")
        await goodsReviewRequestChange(goods.currentDescription.id, comments.value);
      } catch (e) {
        if (e === "cancel") { return; }
        throw e;
      } finally {
        goods.loading = false;
      }
    },
    mapActive(goods) {
      switch(goods.currentDescription.active) {
        case "sell": return "卖";
        case "buy": return "买";
      }
    },
    mapArea(goods) {
      switch(goods.currentDescription.area) {
        case "north": return "北校";
        case "south": return "南校";
      }
    }
  },
  data() {
    return {
      goods: null
    };
  },
  async created() {
    const goods = await getAllGoods();
    goods.forEach(g => g.loading = false);
    this.goods = goods;
  }
};
</script>
