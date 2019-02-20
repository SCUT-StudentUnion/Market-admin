<template>
  <el-tag :type="tagType">
    {{tagText}}
  </el-tag>
</template>

<script lang="ts">
import Vue from 'vue';
import { reviewStatus } from '@/i18n';


export default Vue.extend({
  props: {
    status: String as () => keyof typeof reviewStatus
  },
  computed:{
    tagType() {
      switch (this.status) {
        case 'approved':
          return 'success';
        case 'changeRequested':
          return 'danger';
        case 'pending':
        default:
          return '';
      }
    },
    tagText(): string {
      return reviewStatus[this.status];
    }
  }
});
</script>
