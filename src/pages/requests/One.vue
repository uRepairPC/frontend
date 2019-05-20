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
      <span v-else>{{ row.value }}</span>
    </template>
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
          :url-download="(file) => `requests/${model.id}/files/${file.id}`"
          :permission-edit="fileActionPermissions"
          :permission-delete="fileActionPermissions"
          @add="onAdd"
          @edit="onEdit"
          @delete="onDelete"
          @refresh="fetchRequestFiles"
        />
      </div>
    </div>
    <div
      v-if="model.comments && (model.comments.length || loadingComments)"
      class="page--width"
    >
      <div class="divider">
        <span>Коментарії</span>
      </div>
      <div>
        <comments-list
          :comments="model.comments"
          :loading="loadingComments"
        />
      </div>
    </div>
  </template-one>
</template>

<script>
import RequestComment from '@/classes/RequestComment'
import * as permissions from '@/enum/permissions'
import RequestFile from '@/classes/RequestFile'
import Request from '@/classes/Request'
import sections from '@/enum/sections'
import onePage from '@/mixins/onePage'
import types from '@/enum/types'

export default {
  components: {
    TableCellColor: () => import('@/components/TableCellColor'),
    CommentsList: () => import('@/components/comments/List'),
    TemplateOne: () => import('@/components/template/One'),
    FilesList: () => import('@/components/files/List')
  },
  mixins: [
    onePage(sections.requests)
  ],
  data() {
    return {
      loading: false,
      loadingFiles: false,
      loadingComments: false
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
          title: 'Написати коментарій',
          type: types.PRIMARY,
          action: () => this.openDialog(import('@/components/requests/dialogs/CommentCreate'))
        },
        {
          title: 'Завантажити файл',
          type: types.PRIMARY,
          action: () => this.openDialog(import('@/components/requests/dialogs/FilesUpload'))
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
        'location', 'user_name', 'assign_name', 'type_name', 'priority_name', 'status_name', 'equipment_name',
        'equipment_serial_number', 'equipment_inventory_number', 'description', 'created_at', 'updated_at'
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
    },
    currentUser() {
      return this.$store.state.profile.user
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
      if (!this.model.comments) {
        this.fetchRequestComments()
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
    fetchRequestFiles() {
      this.loadingFiles = true
      this.updateData({ files: [] })

      RequestFile.fetchAll(+this.$route.params.id)
        .then(({ data }) => {
          this.updateData({ files: data.request_files })
        })
        .finally(() => {
          this.loadingFiles = false
        })
    },
    fetchRequestComments() {
      this.loadingComments = true
      this.updateData({ comments: [] })

      RequestComment.fetchAll(+this.$route.params.id)
        .then(({ data }) => {
          this.updateData({ comments: data.request_comments })
        })
        .finally(() => {
          this.loadingComments = false
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
          },
          'files-upload': (uploadFiles) => {
            const files = this.model.files || []
            files.unshift(...uploadFiles)
            this.updateData({ files })
          },
          'file-update': (file, index) => {
            const files = this.model.files
            files[index] = file
            this.updateData({ files })
          },
          'file-delete': (index) => {
            const files = [...this.model.files]
            files.splice(index, 1)
            this.updateData({ files })
          }
        }
      })
    },
    fileActionPermissions() {
      return [
        permissions.REQUESTS_EDIT,
        (file) => file.user_id === this.currentUser.id
      ]
    },
    updateData(data) {
      Request.sidebar().add({ id: +this.$route.params.id, ...data })
    },
    onAdd() {
      this.openDialog(import('@/components/requests/dialogs/FilesUpload'))
    },
    onEdit(file, index) {
      this.openDialog(import('@/components/requests/dialogs/FileEdit'), { file, index })
    },
    onDelete(file, index) {
      this.openDialog(import('@/components/requests/dialogs/FileDelete'), { file, index })
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
