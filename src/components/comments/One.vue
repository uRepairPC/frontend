<template>
  <div class="comment-item">
    <div class="top">
      <div class="message">
        {{ comment.message }}
      </div>
    </div>
    <div class="bottom">
      <div class="user">
        <router-link :to="userPage">
          <i class="material-icons">person</i>
          <span>{{ `${comment.last_name} ${comment.first_name},` }}</span>
        </router-link>
      </div>
      <div class="date">
        {{ createdAt }}
      </div>
    </div>
  </div>
</template>

<script>
import sections from '@/enum/sections'
import dayjs from 'dayjs'

export default {
  props: {
    comment: {
      type: Object,
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
  computed: {
    userPage() {
      return { name: `${sections.users}-id`, params: { id: this.comment.user_id } }
    },
    createdAt() {
      return dayjs(this.comment.created_at).format('lll')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~scss/_colors";

.comment-item {
  padding: 10px 15px;
  border-bottom: 1px solid $defaultBorder;
  transition: 0.15s;
  &:hover {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, .12);
    .comment__right {
      opacity: 1;
    }
  }
  &:last-child {
    border-bottom: 0;
  }
}

.top {
  color: $primaryText;
  margin-bottom: 7px;
}

.bottom {
  display: flex;
  align-items: center;
  font-size: .7rem;
  color: $secondaryText;
}

.user a {
  display: flex;
  align-items: center;
  i {
    margin-right: 4px;
  }
}

.message {
  font-weight: 600;
  font-size: .9rem;
}

.date {
  margin-left: 5px;
}
</style>
