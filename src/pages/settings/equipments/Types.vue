<template>
  <basic-table
    :list="list"
    :loading="loading"
    :columns="columns"
    :dialogs="dialogs"
    :permission-create="permissions.EQUIPMENTS_CONFIG_CREATE"
    :permission-edit="permissions.EQUIPMENTS_CONFIG_EDIT"
    :permission-delete="permissions.EQUIPMENTS_CONFIG_DELETE"
    @update="fetchRequest"
  />
</template>

<script>
import { equipmentTypes as columns } from '@/data/columns'
import * as permissions from '@/enum/permissions'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import { mapState } from 'vuex'
import menu from '@/data/menu'

export default {
  name: 'EquipmentTypes',
  breadcrumbs: [
    { title: menu[sections.settings].title, routeName: sections.settings },
    { title: menu[sections.settings].children[sections.equipmentsTypes].title }
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
        create: () => import('@/components/equipments/types/dialogs/Create'),
        edit: () => import('@/components/equipments/types/dialogs/Edit'),
        delete: () => import('@/components/equipments/types/dialogs/Delete')
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.equipmentTypes.loading,
      list: state => state.equipmentTypes.list
    })
  },
  mounted() {
    if (!this.list.length) {
      this.fetchRequest()
    }
  },
  methods: {
    fetchRequest() {
      this.$store.dispatch('equipmentTypes/fetchList')
    }
  }
}
</script>
