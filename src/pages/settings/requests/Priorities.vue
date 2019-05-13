<template>
  <basic-table
    :list="list"
    :loading="loading"
    :columns="columns"
    :dialogs="dialogs"
    :permission-create="permissions.REQUESTS_CONFIG_CREATE"
    :permission-edit="permissions.REQUESTS_CONFIG_EDIT"
    :permission-delete="permissions.REQUESTS_CONFIG_DELETE"
    @update="fetchRequest"
  />
</template>

<script>
import { requestPriorities as columns } from '@/data/columns'
import * as permissions from '@/enum/permissions'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/enum/sections'
import { mapState } from 'vuex'
import menu from '@/data/menu'

export default {
  name: 'RequestPriorities',
  breadcrumbs: [
    { title: menu[sections.settings].title, routeName: sections.settings },
    { title: menu[sections.settings].children[sections.requestsPriorities].title }
  ],
  components: {
    BasicTable: () => import('@/components/settings/BasicTable')
  },
  mixins: [
    breadcrumbs
  ],
  data() {
    return {
      columns,
      permissions,
      dialogs: {
        create: () => import('@/components/requests/priorities/dialogs/Create'),
        edit: () => import('@/components/requests/priorities/dialogs/Edit'),
        delete: () => import('@/components/requests/priorities/dialogs/Delete')
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.requestPriorities.loading,
      list: state => state.requestPriorities.list
    })
  },
  mounted() {
    if (!this.list.length) {
      this.fetchRequest()
    }
  },
  methods: {
    fetchRequest() {
      this.$store.dispatch('requestPriorities/fetchList')
    }
  }
}
</script>
