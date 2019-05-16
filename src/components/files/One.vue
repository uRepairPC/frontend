<template>
  <div class="file">
    <div
      :class="['file__left', {
        'can_download': canDownload
      }]"
      :title="canDownload ? 'Завантажити' : null"
      @click="onClickDownload"
    >
      <i class="material-icons file-icon-download">
        cloud_download
      </i>
      <div class="file-center">
        <div class="file-center__top">
          {{ top }}
        </div>
        <div class="file-center__bottom">
          {{ bottom }}
        </div>
      </div>
    </div>
    <div
      v-if="includePermission([permissionEdit, permissionDelete], file)"
      class="file__right"
    >
      <i
        v-if="includePermission(permissionEdit, file)"
        class="material-icons edit"
        title="Редагувати"
        @click="onClickEdit"
      >
        edit
      </i>
      <i
        v-if="includePermission(permissionDelete, file)"
        class="material-icons delete"
        title="Видалити"
        @click="onClickDelete"
      >
        delete
      </i>
    </div>
  </div>
</template>

<script>
import { formatBytes, getApiAuth } from '@/scripts/utils'
import { includePermission } from '@/scripts/utils'
import dayjs from 'dayjs'

export default {
  props: {
    file: {
      type: Object,
      required: true
    },
    urlDownload: {
      type: Function,
      default: null
    },
    permissionDownload: {
      type: [String, Boolean, Function],
      default: null
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
    top() {
      return `${this.file.name}.${this.file.ext}`
    },
    bottom() {
      const size = formatBytes(this.file.size).toLowerCase()

      return `${this.file.last_name} ${this.file.first_name}, ${this.createdAt}, ${size}`
    },
    createdAt() {
      return dayjs(this.file.created_at).format('lll')
    },
    canDownload() {
      return this.urlDownload && this.includePermission(this.permissionDownload)
    }
  },
  methods: {
    includePermission,
    onClickDownload() {
      if (this.canDownload) {
        window.open(getApiAuth(this.urlDownload(this.file)), '_blank')
      }
    },
    onClickEdit() {
      this.$emit('edit', this.file)
    },
    onClickDelete() {
      this.$emit('delete', this.file)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~scss/_colors";

$transition: .15s;

.flex-center-100 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

.file {
  display: flex;
  border-bottom: 1px solid $defaultBorder;
  transition: $transition;
  &:hover {
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, .12);
    .file__right {
      opacity: 1;
    }
  }
  &:last-child {
    border-bottom: 0;
  }
}

.file__left {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  padding: 10px 0;
  transition: color $transition;
  &.can_download {
    cursor: pointer;
    user-select: none;
  }
  &:hover {
    &,
    .file-center__top {
      color: $primary;
    }
  }
  i {
    user-select: none;
  }
}

.file-icon-download {
  width: 50px;
  min-width: 50px;
  text-align: center;
}

.file-center__top {
  color: $primaryText;
  font-weight: 600;
  margin-bottom: 5px;
  font-size: .9rem;
  transition: color $transition;
}

.file-center__bottom {
  color: $secondaryText;
  font-size: .8rem;
}

.file__right {
  display: flex;
  align-items: center;
  padding: 0 10px;
  opacity: 0;
  transition: opacity $transition;
  > i {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 30px;
    margin: 0 5px;
    cursor: pointer;
    color: $secondaryText;
    transition: color .1s;
    &:hover {
      &.edit {
        color: $primary;
      }
      &.delete {
        color: $danger;
      }
    }
  }
}
</style>
