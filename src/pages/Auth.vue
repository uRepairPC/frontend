<template>
  <div id="auth">
    <big-logo />
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      status-icon
      @submit.native.prevent="onSubmit"
    >
      <el-form-item prop="email">
        <el-input
          ref="email"
          v-model="form.email"
          placeholder="E-mail"
        >
          <i
            slot="prepend"
            class="material-icons"
          >
            email
          </i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          v-model="form.password"
          type="password"
          placeholder="Пароль"
        >
          <i
            slot="prepend"
            class="material-icons"
          >
            lock
          </i>
        </el-input>
      </el-form-item>
      <el-form-item class="mb-0">
        <el-button
          native-type="submit"
          type="primary"
          :loading="loading"
        >
          Увійти
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as rules from '@/data/rules'
import { isDev } from '@/data/env'

export default {
  components: {
    BigLogo: () => import('@/components/root/BigLogo')
  },
  data() {
    return {
      form: {
        email: isDev ? 'admin@example.com' : '',
        password: isDev ? 'admin123' : ''
      },
      rules: {
        email: rules.email,
        password: rules.password
      }
    }
  },
  computed: {
    loading() {
      return this.$store.state.profile.loading
    }
  },
  mounted() {
    this.$refs.email.focus()
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return
        }

        this.$store.dispatch('profile/auth', this.form)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~scss/mobile/_sizes";

#auth {
  width: 100%;
  max-width: 450px;
  margin: 50px auto;
  padding: 35px;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .2), 0 1px 1px 0 rgba(0, 0, 0, .14), 0 2px 1px -1px rgba(0, 0, 0, .12);
}

.el-button {
  width: 100%;
}

@media only screen and (max-width: $mobileL) {
  #auth {
    background: none;
    box-shadow: none;
  }
}
</style>
