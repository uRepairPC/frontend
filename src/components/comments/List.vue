<template>
  <div class="comments-list">
    <comment-one
      v-for="(comment, index) in comments"
      :key="index"
      :comment="comment"
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
