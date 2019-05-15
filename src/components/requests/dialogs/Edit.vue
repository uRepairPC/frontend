<template>
  <basic-edit
    :title="request.title"
    :loading="loading"
    v-bind="$attrs"
    v-on="listeners"
  >
    <generate-form
      ref="form"
      :form="form"
      :loading="loading"
      @submit="fetchRequest"
    />
  </basic-edit>
</template>

<script>
import * as permissions from '@/enum/permissions'
import { required } from '@/data/rules'
import Request from '@/classes/Request'

export default {
  components: {
    BasicEdit: () => import('@/common/components/dialogs/BasicEdit'),
    GenerateForm: () => import('@/components/GenerateForm')
  },
  inheritAttrs: false,
  props: {
    request: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      form: {
        title: {
          component: 'el-input',
          value: this.request.title,
          label: 'Назва',
          rules: required
        },
        location: {
          component: 'el-input',
          value: this.request.location,
          label: 'Розташування'
        },
        assign_id: {
          component: () => import('@/components/users/Select'),
          value: this.request.assign_id,
          permissions: permissions.USERS_VIEW,
          label: 'Виконує',
          attrs: {
            defaultValue: {
              id: this.request.assign_id,
              last_name: this.request.assign_last_name,
              first_name: this.request.assign_first_name
            }
          }
        },
        type_id: {
          component: () => import('@/components/requests/types/Select'),
          value: this.request.type_id,
          label: 'Тип',
          permissions: permissions.REQUESTS_CONFIG_VIEW,
          rules: required,
          attrs: {
            defaultValue: { name: this.request.type_name, id: this.request.type_id }
          }
        },
        priority_id: {
          component: () => import('@/components/requests/priorities/Select'),
          value: this.request.priority_id,
          label: 'Пріорітет',
          permissions: permissions.REQUESTS_CONFIG_VIEW,
          rules: required,
          attrs: {
            defaultValue: { name: this.request.priority_name, id: this.request.priority_id }
          }
        },
        status_id: {
          component: () => import('@/components/requests/statuses/Select'),
          value: this.request.status_id,
          label: 'Статус',
          permissions: permissions.REQUESTS_CONFIG_VIEW,
          rules: required,
          attrs: {
            defaultValue: { name: this.request.status_name, id: this.request.status_id }
          }
        },
        equipment_id: {
          component: () => import('@/components/equipments/Select'),
          value: this.request.equipment_id,
          permissions: permissions.EQUIPMENTS_VIEW,
          label: 'Обладнання',
          attrs: {
            clearable: true,
            defaultValue: {
              id: this.request.equipment_id,
              model_name: this.request.equipment_name,
              serial_number: this.request.serial_number,
              inventory_number: this.request.inventory_number
            }
          }
        },
        description: {
          component: 'el-input',
          value: this.request.description,
          label: 'Опис',
          attrs: {
            type: 'textarea',
            autosize: { minRows: 3 }
          }
        }
      }
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        submit: () => {
          this.$refs.form.onSubmit()
        }
      }
    }
  },
  methods: {
    fetchRequest(form) {
      this.loading = true

      Request.fetchEdit(this.request.id, form)
        .then(() => {
          this.$emit('edit')
          this.$emit('close')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
