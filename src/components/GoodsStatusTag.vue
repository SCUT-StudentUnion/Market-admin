<template>
  <el-tag :type="tagType">
    {{tagText}}
  </el-tag>
</template>

<script>
const statusTranslate = {
  soldOut: '已售出',
  selling: '出售中',
  auditFailed: '审核未通过',
  pendingAudit: '等待审核'
};

export default {
  props: {
    status: String
  },
  computed:{
    tagType() {
      switch (this.status) {
        case 'soldOut':
          return 'info';
        case 'selling':
          return 'success';
        case 'auditFailed':
          return 'danger';
        case 'pendingAudit':
        default:
          return '';
      }
    },
    tagText() {
      return statusTranslate[this.status];
    }
  }
}
</script>
