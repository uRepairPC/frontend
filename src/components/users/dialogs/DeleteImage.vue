<template>
  <basic-delete
    title="Видалення зображення"
    :loading="loading"
    v-bind="$attrs"
    v-on="listeners"
  >
    <template slot="content-alert">
      Ви дійсно хочете видалити зображення?
    </template>
  </basic-delete>
</template>

<script>
import User from '@/classes/User'

export default {
  components: {
    BasicDelete: () => import('@/components/dialogs/BasicDelete')
  },
  inheritAttrs: false,
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      loading: false
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

      User.fetchDeleteImage(this.user.id)
        .then(() => {
          this.$emit('delete-image')
          this.$emit('close')
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>
