<template>
  <div class="container">
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="dashboard">仪表盘</el-menu-item>
      <el-menu-item index="goods">物品</el-menu-item>
      <el-menu-item index="audit">审核<el-badge :value="12" :max="99" /></el-menu-item>
      <el-menu-item index="logout" class="right-menu-item">注销</el-menu-item>
    </el-menu>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    activeIndex() {
      return this.$route.name;
    }
  },
  methods: {
    handleSelect(key) {
      if (key === "logout") {
        //TODO: do logout
        this.$router.replace({ name: "login" });
      } else {
        this.$router.replace({ name: key });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.right-menu-item {
  float: right !important;
}

.container {
  max-width: 1140px;
  margin: 0 auto;
}
</style>
