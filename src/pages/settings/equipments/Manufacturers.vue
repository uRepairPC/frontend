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
import { equipmentManufacturers as columns } from '@/data/columns'
import * as permissions from '@/enum/permissions'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/enum/sections'
import { mapState } from 'vuex'
import menu from '@/data/menu'

export default {
  name: 'EquipmentManufacturers',
  breadcrumbs: [
    { title: menu[sections.settings].title, routeName: sections.settings },
    { title: menu[sections.settings].children[sections.equipmentsManufacturers].title }
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
        create: () => import('@/components/equipments/manufacturers/dialogs/Create'),
        edit: () => import('@/components/equipments/manufacturers/dialogs/Edit'),
        delete: () => import('@/components/equipments/manufacturers/dialogs/Delete')
      }
    }
  },
  computed: {
    ...mapState({
      loading: state => state.equipmentManufacturers.loading,
      list: state => state.equipmentManufacturers.list
    })
  },
  mounted() {
    if (!this.list.length) {
      this.fetchRequest()
    }
  },
  methods: {
    fetchRequest() {
      this.$store.dispatch('equipmentManufacturers/fetchList')
    }
  }
}
</script>
