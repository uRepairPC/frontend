<template>
  <div>
    <div class="wrap">
      <div class="title">
        {{ titlePage }}
      </div>
      <generate-form
        :form="form"
        :loading="loading"
        @submit="fetchRequest"
      >
        <template slot="button">
          Створити
        </template>
      </generate-form>
    </div>
  </div>
</template>

<script>
import * as permissions from '@/enum/permissions'
import breadcrumbs from '@/mixins/breadcrumbs'
import { required } from '@/data/rules'
import Request from '@/classes/Request'
import sections from '@/data/sections'
import menu from '@/data/menu'

export default {
  breadcrumbs: [
    { title: menu[sections.requests].title, routeName: sections.requests },
    { title: menu[sections.requests].children.add.title }
  ],
  components: {
    GenerateForm: () => import('@/components/GenerateForm')
  },
  mixins: [
    breadcrumbs
  ],
  data() {
    return {
      loading: false,
      form: {
        title: {
          component: 'el-input',
          value: '',
          label: 'Назва',
          rules: required
        },
        location: {
          component: 'el-input',
          value: undefined,
          label: 'Розташування'
        },
        equipment_id: {
          component: () => import('@/components/equipments/Select'),
          value: undefined,
          permissions: permissions.EQUIPMENTS_VIEW,
          label: 'Обладнання'
        },
        description: {
          component: 'el-input',
          value: '',
          label: 'Опис',
          attrs: {
            type: 'textarea',
            autosize: { minRows: 3 }
          }
        }
      }
    }
  },
  computed: {
    titlePage() {
      return menu[sections.requests].children.add.title
    }
  },
  methods: {
    fetchRequest(form) {
      this.loading = true

      Request.fetchStore(form)
        .then(({ data }) => {
          this.$router.push({ name: `${sections.requests}-id`, params: { id: data.request.id } })
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
	padding: 10px 20px 40px;
	max-width: 550px;
	margin: 0 auto;
}

.title {
	text-align: center;
	font-size: 1.5rem;
	font-weight: bold;
	margin: 25px 15px;
}
</style>
