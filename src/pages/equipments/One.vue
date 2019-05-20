<template>
  <template-one
    :buttons="buttons"
    :table-data="tableData"
    :loading="loading"
  >
    <div
      slot="header"
      class="header__wrap"
    >
      <div class="header-item">
        <div class="header-item__title">
          Серійний номер
        </div>
        <div
          :class="['header-item__value', {
            'has_value': !!model.serial_number
          }]"
          @click="copy($event, model.serial_number)"
        >
          <span>{{ model.serial_number }}</span>
        </div>
      </div>
      <div class="header-item">
        <div class="header-item__title">
          Інвертарний номер
        </div>
        <div
          :class="['header-item__value', {
            'has_value': !!model.inventory_number
          }]"
          @click="copy($event, model.inventory_number)"
        >
          <span>{{ model.inventory_number }}</span>
        </div>
      </div>
    </div>
    <div
      v-if="model.files && (model.files.length || loadingFiles)"
      class="page--width"
    >
      <div class="divider">
        <span>Файли</span>
      </div>
      <div>
        <files-list
          :files="model.files"
          :loading="loadingFiles"
          :url-download="(file) => `equipments/${model.id}/files/${file.id}`"
          :permission-create="permissions.EQUIPMENTS_FILES_CREATE"
          :permission-download="permissions.EQUIPMENTS_FILES_DOWNLOAD"
          :permission-edit="permissions.EQUIPMENTS_FILES_EDIT"
          :permission-delete="permissions.EQUIPMENTS_FILES_DELETE"
          @add="onAdd"
          @edit="onEdit"
          @delete="onDelete"
          @refresh="fetchRequestFiles"
        />
      </div>
    </div>
  </template-one>
</template>

<script>
import EquipmentFile from '@/classes/EquipmentFile'
import { includePermission } from '@/scripts/utils'
import * as permissions from '@/enum/permissions'
import Equipment from '@/classes/Equipment'
import { copyNode } from '@/scripts/dom'
import sections from '@/enum/sections'
import onePage from '@/mixins/onePage'
import types from '@/enum/types'

export default {
  components: {
    TemplateOne: () => import('@/components/template/One'),
    FilesList: () => import('@/components/files/List')
  },
  mixins: [
    onePage(sections.equipments)
  ],
  data() {
    return {
      permissions,
      loading: false,
      loadingFiles: false
    }
  },
  computed: {
    buttons() {
      return [
        {
          title: 'Оновити',
          type: types.SUCCESS,
          disabled: this.loading,
          action: () => {
            this.fetchRequest()
            this.fetchRequestFiles()
          }
        },
        {
          title: 'Редагувати',
          type: types.PRIMARY,
          permissions: permissions.EQUIPMENTS_EDIT,
          action: () => this.openDialog(import('@/components/equipments/dialogs/Edit'))
        },
        {
          title: 'Завантажити файл',
          type: types.PRIMARY,
          permissions: permissions.EQUIPMENTS_FILES_CREATE,
          action: () => this.openDialog(import('@/components/equipments/dialogs/FilesUpload'))
        },
        {
          title: 'Видалили',
          type: types.DANGER,
          permissions: permissions.EQUIPMENTS_DELETE,
          action: () => this.openDialog(import('@/components/equipments/dialogs/Delete'))
        }
      ]
    },
    tableData() {
      const props = ['type_name', 'manufacturer_name', 'model_name', 'description', 'created_at', 'updated_at']
      const result = []

      this.$store.getters['equipments/columns']
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
      if (!this.model.files) {
        this.fetchRequestFiles()
      }
    },
    fetchRequest() {
      this.loading = true

      Equipment.fetchOne(+this.$route.params.id)
        .catch(() => {
          this.$router.push({ name: sections.equipments })
        })
        .finally(() => {
          this.loading = false
        })
    },
    fetchRequestFiles() {
      if (!includePermission(permissions.EQUIPMENTS_FILES_VIEW)) {
        return
      }

      this.loadingFiles = true
      this.updateFiles([])

      EquipmentFile.fetchAll(+this.$route.params.id)
        .then(({ data }) => {
          this.updateFiles(data.equipment_files)
        })
        .finally(() => {
          this.loadingFiles = false
        })
    },
    copy(evt, val) {
      if (!val) {
        return
      }

      copyNode(evt.target)
    },
    openDialog(component, attrs = {}) {
      this.$store.commit('template/OPEN_DIALOG', {
        component: () => component,
        attrs: {
          equipment: this.model,
          ...attrs
        },
        events: {
          delete: () => {
            this.$router.push({ name: sections.equipments })
          },
          'files-upload': (uploadFiles) => {
            const files = this.model.files || []
            files.unshift(...uploadFiles)
            this.updateFiles(files)
          },
          'file-update': (file, index) => {
            const files = this.model.files
            files[index] = file
            this.updateFiles(files)
          },
          'file-delete': (index) => {
            const files = [...this.model.files]
            files.splice(index, 1)
            this.updateFiles(files)
          }
        }
      })
    },
    updateFiles(files) {
      Equipment.sidebar().add({ id: +this.$route.params.id, files })
    },
    onAdd() {
      this.openDialog(import('@/components/equipments/dialogs/FilesUpload'))
    },
    onEdit(file, index) {
      this.openDialog(import('@/components/equipments/dialogs/FileEdit'), { file, index })
    },
    onDelete(file, index) {
      this.openDialog(import('@/components/equipments/dialogs/FileDelete'), { file, index })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~scss/_colors";

.header__wrap {
	display: flex;
	align-items: center;
	justify-content: space-around;
}

.header-item {
	width: 250px;
	&:last-child {
		margin-left: 20px;
	}
}

.header-item__title {
	font-weight: bold;
	margin-bottom: 10px;
	text-align: left;
	user-select: none;
}

.header-item__value {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	border: 1px solid $defaultBorder;
	background: #fff;
	padding: 10px 20px;
	box-shadow: $lightShadow;
	height: 50px;
	transition: .2s;
	&.has_value {
		cursor: pointer;
	}
	&:hover {
		box-shadow: $basicShadow;
	}
	> span {
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
