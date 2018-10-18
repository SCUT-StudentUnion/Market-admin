<template>
  <div>
    <h2>物品列表</h2>
    <el-table :data="goods" :row-class-name="tableRowClassName" style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <el-row tag="dl">
            <el-col tag="dt" :span="3">详细信息:</el-col>
            <el-col tag="dd" :span="9">{{row.detail}}</el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建日期" width="190">
        <template slot-scope="{row}">
          {{row.createdTime.toLocaleString()}}
        </template>
      </el-table-column>
      <el-table-column prop="title" label="标题" />
      <el-table-column prop="category.name" label="分类" width="150" />
      <el-table-column prop="status" label="状态" width="120">
        <goods-status-tag slot-scope="{row}" :status="row.status" />
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button v-if="['pendingAudit', 'auditFailed'].includes(scope.row.status)" type="success">通过</el-button>
          <el-button v-if="scope.row.status === 'pendingAudit'" type="warning">不通过</el-button>
          <el-button v-if="scope.row.status === 'selling'" type="danger">下架</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import GoodsStatusTag from "../components/GoodsStatusTag.vue";
import { ListGoods } from "../api"

export default {
  components: {
    "goods-status-tag": GoodsStatusTag
  },
  methods: {
    tableRowClassName({ row }) {
      return row.status + "-row";
    }
  },
  data() {
    return {
      goods: []
    };
  },
  async created() {
    this.goods = await ListGoods();
  }
};
</script>

<style lang="scss" scoped>
h2 {
  margin: 10px 20px;
}
</style>

<style lang='scss'>
.el-table {
  .soldOut-row {
    color: #00000057;
  }
  .auditFailed-row {
    background-color: #f56c6c23;
  }
  .pendingAudit-row {
    background-color: #409eff23;
  }
}
</style>
