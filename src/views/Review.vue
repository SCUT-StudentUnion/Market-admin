<template>
  <div>
    <h2>正在审核商品</h2>
    <el-radio-group v-model="reviewStatus">
      <el-radio label="pending">待审核</el-radio>
      <el-radio label="changeRequested">未通过</el-radio>
    </el-radio-group>
    <el-table v-loading="pageLoading" :data="descriptions" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <goods-description :description="row" @reviewStatusUpdated="loadPage"/>
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

<script lang="ts">
import GoodsDescriptionComponent from "@/components/GoodsDescription.vue";
import { getAllNeedReviewGoods, getAllChangeRequestedGoods, GoodsDescription } from "@/api";
import PagedContent from "@/mixins/PagedContent";

export default PagedContent.extend({
  components: {
    'goods-description': GoodsDescriptionComponent
  },
  data() {
    return {
      reviewStatus: "pending" as "pending" | "changeRequested",
    };
  },
  computed: {
    descriptions(): null | GoodsDescription[]{
      return this.content as null | GoodsDescription[]
    }
  },
  watch: {
    reviewStatus() {
      this.loadPage();
    }
  },
  methods: {
    async doLoadPage() {
      const api = {
        pending: getAllNeedReviewGoods,
        changeRequested: getAllChangeRequestedGoods
      };
      return await api[this.reviewStatus]({
        page: this.currentPage - 1,
        size: 10
      });
    }
  }
});
</script>
