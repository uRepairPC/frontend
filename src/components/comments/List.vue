<template>
  <div class="comments-list">
    <comment-one
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment"
      :permission-edit="permissionEdit"
      :permission-delete="permissionDelete"
      @edit="onEdit($event, index)"
      @delete="onDelete($event, index)"
    />
  </div>
</template>

<script>
export default {
  components: {
    CommentOne: () => import('@/components/comments/One')
  },
  props: {
    comments: {
      type: Array,
      required: true
    },
    permissionEdit: {
      type: [String, Boolean, Function],
      default: null
    },
    permissionDelete: {
      type: [String, Boolean, Function],
      default: null
    }
  },
  methods: {
    onEdit(...data) {
      this.$emit('edit', ...data)
    },
    onDelete(...data) {
      this.$emit('delete', ...data)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~scss/_colors";

.comments-list {
  background: #fff;
  border: 1px solid $defaultBorder;
}
</style>
