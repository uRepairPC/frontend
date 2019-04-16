<template>
	<div class="user visible-scroll">
		<div class="wrap">
			<div class="title">
				{{ titlePage }}
			</div>
			<el-alert type="info">
				Фотографію, роль або ж інші дані можно будет змінити після створення.<br>
				Роль за умовчанням буде присвоєно в залежності від налаштувань.
			</el-alert>
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
import GenerateForm from '@/components/GenerateForm'
import breadcrumbs from '@/mixins/breadcrumbs'
import * as rules from '@/data/rules'
import sections from '@/data/sections'
import User from '@/classes/User'
import menu from '@/data/menu'

export default {
	breadcrumbs: [
		{ title: menu[sections.users].title, routeName: sections.users },
		{ title: menu[sections.users].children.add.title }
	],
	components: {
		GenerateForm
	},
	mixins: [
		breadcrumbs
	],
	data() {
		return {
			loading: false,
			form: {
				email: {
					component: 'el-input',
					value: '',
					label: 'E-mail',
					rules: rules.email,
					attrs: {
						placeholder: 'E-mail'
					}
				},
				first_name: {
					component: 'el-input',
					value: '',
					label: 'Ім\'я',
					rules: rules.required,
					attrs: {
						placeholder: 'Ім\'я'
					}
				},
				middle_name: {
					component: 'el-input',
					value: '',
					label: 'По-батькові',
					attrs: {
						placeholder: 'По-батькові'
					}
				},
				last_name: {
					component: 'el-input',
					value: '',
					label: 'Прізвище',
					rules: rules.required,
					attrs: {
						placeholder: 'Прізвище'
					}
				},
				phone: {
					component: 'el-input',
					value: '',
					label: 'Телефон',
					attrs: {
						placeholder: 'Телефон'
					}
				},
				description: {
					component: 'el-input',
					value: '',
					label: 'Опис',
					attrs: {
						type: 'textarea',
						autosize: { minRows: 3 },
						placeholder: 'Опис'
					}
				}
			}
		}
	},
	computed: {
		titlePage() {
			return menu[sections.users].children.add.title
		}
	},
	methods: {
		fetchRequest(form) {
			this.loading = true

			User.fetchStore(form)
				.then(({ data }) => {
					this.$router.push({ name: `${sections.users}-id`, params: { id: data.user.id } })
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

.el-alert {
	margin-bottom: 20px;
}

.el-select {
	width: 100%;
}

.btn-wrap {
	text-align: center;
	button {
		max-width: 200px;
		width: 100%;
	}
}

/deep/ .el-form-item__label {
	float: none;
}
</style>
