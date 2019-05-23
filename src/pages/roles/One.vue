<template>
  <template-one
    :buttons="buttons"
    :table-data="tableData"
    :loading="loading"
  >
    <template slot="header">
      <div class="title">
        {{ model.name }}
      </div>
      <div
        v-if="model.color"
        class="color"
        :style="{ 'background-color': model.color }"
      />
    </template>
    <div class="page--width">
      <div class="divider">
        <span>Доступи</span>
      </div>
      <list-checkboxes
        v-loading="loadingPermissions || loadingPermissionsStore"
        :permissions-grouped="model.permissions_grouped || {}"
        class="list-checkboxes"
        only-view
      />
    </div>
    <!--TODO Users section (Table, component)-->
  </template-one>
</template>

<script>
import * as permissions from '@/enum/permissions'
import sections from '@/enum/sections'
import onePage from '@/mixins/onePage'
import Role from '@/classes/Role'
import types from '@/enum/types'

export default {
  components: {
    ListCheckboxes: () => import('@/components/permissions/ListCheckboxes'),
    TemplateOne: () => import('@/components/template/One')
  },
  mixins: [
    onePage(sections.roles)
  ],
  data() {
    return {
      loading: false,
      loadingPermissions: false
    }
  },
  computed: {
    permissions() {
      return this.$store.state.permissions.listGrouped
    },
    loadingPermissionsStore() {
      return this.$store.state.permissions.loading
    },
    buttons() {
      return [
        {
          title: 'Оновити',
          type: types.SUCCESS,
          action: () => this.fetchRequest('loading'),
          disabled: this.loading
        },
        {
          title: 'Редагувати дані',
          type: types.PRIMARY,
          permissions: permissions.ROLES_MANAGE,
          action: () => this.openDialog(import('@/components/roles/dialogs/Edit'))
        },
        {
          title: 'Редагувати доступи',
          type: types.PRIMARY,
          disabled: this.model.id === 1,
          permissions: permissions.ROLES_MANAGE,
          action: () => this.openDialog(import('@/components/roles/dialogs/EditPermissions'))
        },
        {
          title: 'Видалити роль',
          type: types.DANGER,
          disabled: this.model.id === 1,
          permissions: permissions.ROLES_MANAGE,
          action: () => this.openDialog(import('@/components/roles/dialogs/Delete'))
        }
      ]
    },
    tableData() {
      const props = ['color', 'default', 'created_at', 'updated_at']
      const result = []

      this.$store.getters['roles/columns']
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
        this.fetchRequest('loading')
      } else if (!this.model.permissions) {
        this.fetchRequest('loadingPermissions')
      }

      if (!Object.keys(this.permissions).length) {
        this.$store.dispatch('permissions/fetchListGrouped')
      }
    },
    fetchRequest(loadingAttr) {
      this[loadingAttr] = true

      Role.fetchOne(this.pageId)
        .catch(() => {
          this.$router.push({ name: sections.roles })
        })
        .finally(() => {
          this[loadingAttr] = false
        })
    },
    openDialog(component, attrs = {}) {
      this.$store.commit('template/OPEN_DIALOG', {
        component: () => component,
        attrs: {
          role: this.model,
          ...attrs
        },
        events: {
          delete: () => {
            this.$router.push({ name: sections.roles })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~scss/_colors";

.title {
	font-size: 1.5rem;
	font-weight: bold;
}

.color {
	width: 100px;
	height: 5px;
	margin: 15px auto 0;
	border-radius: 5px;
}

.list-checkboxes {
	padding: 30px;
	background: #fff;
	border: 1px solid $defaultBorder;
}
</style>
