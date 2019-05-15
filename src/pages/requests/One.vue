<template>
  <template-one
    :buttons="buttons"
    :table-data="tableData"
    :loading="loading"
  >
    <div
      slot="header"
      class="title"
    >
      {{ model.title }}
    </div>
    <template
      slot="table"
      slot-scope="{ row }"
    >
      <table-cell-color
        v-if="row.prop === 'priority_name'"
        :value="row.value"
        :color="model.priority_color"
      />
      <table-cell-color
        v-else-if="row.prop === 'status_name'"
        :value="row.value"
        :color="model.status_color"
      />
    </template>
  </template-one>
</template>

<script>
import * as permissions from '@/enum/permissions'
import Request from '@/classes/Request'
import sections from '@/enum/sections'
import onePage from '@/mixins/onePage'
import types from '@/enum/types'

export default {
  components: {
    TableCellColor: () => import('@/components/TableCellColor'),
    TemplateOne: () => import('@/components/template/One')
  },
  mixins: [
    onePage(sections.requests)
  ],
  data() {
    return {
      loading: false
    }
  },
  computed: {
    buttons() {
      return [
        {
          title: 'Оновити',
          type: types.SUCCESS,
          action: () => this.fetchRequest('loading'),
          disabled: this.loading
        },
        {
          title: 'Редагувати',
          type: types.PRIMARY,
          permissions: [permissions.REQUESTS_EDIT, this.model.id === this.model.assign_id],
          action: () => this.openDialog(import('@/components/requests/dialogs/Edit'))
        },
        {
          title: 'Видалити',
          type: types.DANGER,
          permissions: [permissions.REQUESTS_DELETE, this.model.id === this.model.assign_id],
          action: () => this.openDialog(import('@/components/requests/dialogs/Delete'))
        }
      ]
    },
    tableData() {
      const props = [
        'user_name', 'assign_name', 'type_name', 'priority_name', 'status_name', 'equipment_name',
        'equipment_serial_number', 'equipment_inventory_number', 'created_at', 'updated_at'
      ]
      const result = []

      this.$store.getters['requests/columns']
        .forEach((obj) => {
          if (props.includes(obj.prop)) {
            const customType = obj.customType === 'timestamp'
              ? { key: 'timestamp', value: 'LLL' }
              : obj.customType

            result.push({ ...obj, customType, value: this.model[obj.prop] })
          }
        })

      return result
    }
  },
  methods: {
    fetchData() {
      if (!this.model.id) {
        this.fetchRequest()
      }
    },
    fetchRequest() {
      this.loading = true

      Request.fetchOne(+this.$route.params.id)
        .catch(() => {
          this.$router.push({ name: sections.requests })
        })
        .finally(() => {
          this.loading = false
        })
    },
    openDialog(component, attrs = {}) {
      this.$store.commit('template/OPEN_DIALOG', {
        component: () => component,
        attrs: {
          request: this.model,
          ...attrs
        },
        events: {
          delete: () => {
            this.$router.push({ name: sections.requests })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 1.5rem;
  font-weight: bold;
}
</style>
