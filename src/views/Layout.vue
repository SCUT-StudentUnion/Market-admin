<template>
  <div>
    <el-menu :default-active="activeIndex" mode="horizontal" @select="handleSelect">
      <el-menu-item index="dashboard">仪表盘</el-menu-item>
      <el-menu-item index="goods">物品</el-menu-item>
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
        // do logout
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
</style>
