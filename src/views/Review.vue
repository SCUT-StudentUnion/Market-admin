<template>
  <div>
    <h2>正在审核商品</h2>
    <el-radio-group v-model="reviewStatus">
      <el-radio label="pending">待审核</el-radio>
      <el-radio label="changeRequested">未通过</el-radio>
    </el-radio-group>
    <el-table v-loading="loading" :data="descriptions" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <goods-description :description="row" @reviewStatusUpdated="load"/>
        </template>
      </el-table-column>
      <el-table-column label="提交日期" width="190">
        <template slot-scope="{row}">{{row.createdTime.toLocaleDateString()}}</template>
      </el-table-column>
      <el-table-column prop="title" label="标题"/>
      <el-table-column prop="category.name" label="分类" width="150"/>
    </el-table>

    <el-pagination
      layout="prev, pager, next"
      :current-page.sync="currentPage"
      :page-count="totalPages"
      :pager-count="5"
    />
  </div>
</template>

<script>
import GoodsDescription from "@/components/GoodsDescription.vue";
import { getAllNeedReviewGoods, getAllChangeRequestedGoods } from "@/api";

export default {
  components: {
    GoodsDescription
  },
  data() {
    return {
      totalPages: 0,
      currentPage: 0,
      descriptions: null,
      loading: false,
      reviewStatus: "pending",
      requestId: 0
    };
  },
  watch: {
    currentPage() {
      this.load();
    },
    reviewStatus() {
      this.load();
    }
  },
  methods: {
    async load() {
      this.loading = true;
      const api = {
        pending: getAllNeedReviewGoods,
        changeRequested: getAllChangeRequestedGoods
      }
      const currentRequestId = ++this.requestId;
      try {
        const result = await api[this.reviewStatus]({
          page: this.currentPage - 1,
          size: 10
        });
        if (currentRequestId != this.requestId) {
          return; // another request has started
        }
        this.totalPages = result.totalPages;
        this.descriptions = result.content;
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
