<template>
  <div class="container">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="dashboard">仪表盘</el-menu-item>
      <el-menu-item index="goods">物品</el-menu-item>
      <el-menu-item index="review">审核<el-badge :value="needReviewCount" :max="99" /></el-menu-item>
      <el-menu-item index="logout" class="right-menu-item">注销</el-menu-item>
    </el-menu>
    <div class="content-container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import { logout, getAllNeedReviewGoods } from '@/api';

export default {
  data() {
    return {
      needReviewCount: null,
    };
  },
  computed: {
    activeIndex() {
      return this.$route.name;
    }
  },
  methods: {
    handleSelect(key) {
      if (key === "logout") {
        logout();
        this.$router.replace({ name: "login" });
      } else {
        this.$router.replace({ name: key });
      }
    }
  },
  async mounted() {
    const pages = (await getAllNeedReviewGoods({page:0, size:1})).totalPages
    if (pages > 0) {
      this.needReviewCount = pages;
    }
  }
};
</script>

<style lang="scss" scoped>
.content-container {
  margin: 0 10px;
}

.right-menu-item {
  float: right !important;
}

.container {
  max-width: 1140px;
  margin: 0 auto;
}
</style>
