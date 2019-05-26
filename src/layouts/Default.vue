<template>
  <div class="layout layout_default">
    <el-container direction="vertical">
      <header-box />
      <el-container>
        <sidebar-box />
        <el-main>
          <breadcrumbs-box />
          <keep-alive :include="keepAliveRoutesName">
            <router-view
              ref="content"
              :key="$route.params.id"
              class="page"
            />
          </keep-alive>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { root as keepAliveRoutesName } from '@/data/keepAliveComponents'

export default {
  components: {
    BreadcrumbsBox: () => import('@/components/root/Breadcrumbs'),
    SidebarBox: () => import('@/components/root/Sidebar'),
    HeaderBox: () => import('@/components/root/Header')
  },
  data() {
    return {
      keepAliveRoutesName
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~scss/_variables";

.el-main {
  padding: 1px;
}
</style>
