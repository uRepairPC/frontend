<template>
  <el-select v-model="locale">
    <el-option
      v-for="(name, key) in LANGUAGES"
      :key="key"
      :label="name"
      :value="key">
      <span>{{ name }}</span>
    </el-option>
  </el-select>
</template>

<script>
import Lang, { LANGUAGES } from '@/classes/Lang'

export default {
  data() {
    return {
      LANGUAGES
    }
  },
  computed: {
    locale: {
      get() {
        return this.$i18n.locale
      },
      set(value) {
        Lang.setLocale(value)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.change-locale {
  position: absolute;
}
</style>
