<template>
  <el-tag :type="tagType">
    {{tagText}}
  </el-tag>
</template>

<script>
const statusTranslate = {
  approved: '审核通过',
  changeRequested: '审核未通过',
  pending: '等待审核',
};

export default {
  props: {
    status: String
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
    tagText() {
      return statusTranslate[this.status];
    }
  }
}
</script>
