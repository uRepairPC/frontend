<template>
  <basic-delete
    :title="request.title"
    :confirm="request.id"
    :loading="loading"
    v-bind="$attrs"
    v-on="listeners"
  >
    <el-checkbox
      slot="content-bottom"
      v-model="fileDelete"
    >
      Видалити файли?
    </el-checkbox>
  </basic-delete>
</template>

<script>
import Request from '@/classes/Request'

export default {
  components: {
    BasicDelete: () => import('@/common/components/dialogs/BasicDelete')
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
      fileDelete: true
    }
  },
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        submit: this.fetchRequest
      }
    }
  },
  methods: {
    fetchRequest() {
      this.loading = true

      Request.fetchDelete(this.request.id, {
        data: {
          file_delete: this.fileDelete
        }
      })
        .then(() => {
          this.$emit('delete')
          this.$emit('close')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
