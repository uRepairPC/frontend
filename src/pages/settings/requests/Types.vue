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
import { requestTypes as columns } from '@/data/columns'
import * as permissions from '@/enum/permissions'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import { mapState } from 'vuex'
import menu from '@/data/menu'

export default {
  name: 'RequestTypes',
  breadcrumbs: [
    { title: menu[sections.settings].title, routeName: sections.settings },
    { title: menu[sections.settings].children[sections.requestsTypes].title }
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
        create: () => import('@/components/requests/types/dialogs/Create'),
        edit: () => import('@/components/requests/types/dialogs/Edit'),
        delete: () => import('@/components/requests/types/dialogs/Delete')
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.requestTypes.loading,
      list: state => state.requestTypes.list
    })
  },
  mounted() {
    if (!this.list.length) {
      this.fetchRequest()
    }
  },
  methods: {
    fetchRequest() {
      this.$store.dispatch('requestTypes/fetchList')
    }
  }
}
</script>
