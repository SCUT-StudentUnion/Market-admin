<template>
  <div>
    <h2>物品列表</h2>
    <p>此处展示的均为公众可见信息</p>
    <el-table :data="goods" style="width: 100%" v-loading="goods === null">
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <goods-description :description="row.currentDescription" @reviewStatusUpdated="load"/>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="#" width="30"/>
      <el-table-column label="上架日期" width="120">
        <template slot-scope="{row}">
          {{row.onShelfTime.toLocaleDateString()}}
        </template>
      </el-table-column>
      <el-table-column prop="currentDescription.title" label="标题" />
      <el-table-column prop="currentDescription.category.name" label="分类" width="140" />
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
import { getAllGoods } from "../api";

export default {
  components: {
    GoodsDescription
  },
  methods: {
    async load() {
      this.goods = await getAllGoods();
    }

  },
  mounted() {
    this.load();
  },
  data() {
    return {
      totalPages: 0,
      currentPage: 0,
      goods: null
    };
  }
};
</script>
