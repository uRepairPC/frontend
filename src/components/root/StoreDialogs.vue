<template>
  <component
    :is="dialog.component"
    :visible.sync="visible"
    v-bind="attrs"
    v-on="listeners"
  />
</template>

<script>
export default {
  data() {
    return {
      visible: false
    }
  },
  computed: {
    dialog() {
      return this.$store.state.template.dialog
    },
    listeners() {
      return {
        ...this.dialog.events,
        close: this.closeDialog
      }
    },
    attrs() {
      return {
        'close-on-click-modal': false,
        ...this.dialog.attrs
      }
    }
  },
  watch: {
    /**
     * FIXME Temporary fix problem on assign component (object)
     * @see https://stackoverflow.com/a/49122742/9612245
     */
    dialog(val) {
      if (val.component) {
        this.$store._committing = true
        this.visible = true
      } else {
        this.$store._committing = false
      }
    }
  },
  methods: {
    closeDialog() {
      this.$store.commit('template/CLOSE_DIALOG')
    }
  }
}
</script>
