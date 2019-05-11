<template>
  <basic-create
    title="Додати тип"
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
  </basic-create>
</template>

<script>
import RequestType from '@/classes/RequestType'
import { required } from '@/data/rules'

export default {
  components: {
    BasicCreate: () => import('@/components/dialogs/BasicCreate'),
    GenerateForm: () => import('@/components/GenerateForm')
  },
  inheritAttrs: false,
  data() {
    return {
      loading: false,
      form: {
        name: {
          component: 'el-input',
          value: '',
          label: 'Назва',
          rules: required
        },
        description: {
          component: 'el-input',
          value: '',
          label: 'Опис',
          attrs: {
            type: 'textarea',
            autosize: { minRows: 3 }
          }
        },
        default: {
          component: 'el-checkbox',
          value: false,
          attrs: {
            label: 'За замовчуванням'
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

      RequestType.fetchStore(form)
        .then(() => {
          this.$store.dispatch('requestTypes/fetchList')
          this.$emit('create')
          this.$emit('close')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
