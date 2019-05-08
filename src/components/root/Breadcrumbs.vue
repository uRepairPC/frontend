<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item
      v-for="(item, index) in list"
      :key="index"
      :to="{ name: item.routeName }"
    >
      {{ getTitle(item.title) }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  computed: {
    list() {
      return this.$store.state.template.breadcrumbs
    }
  },
  methods: {
    getTitle(val) {
      return typeof val === 'function' ? val(this.$route) : val
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~scss/_variables";

.el-breadcrumb {
  display: flex;
  align-items: center;
  height: $breadcrumbsHeight;
  white-space: nowrap;
  overflow: hidden;
}
</style>
