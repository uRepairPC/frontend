<template>
	<div class="role">
		<div class="wrap">
			<div class="title">
				{{ titlePage }}
			</div>
			<el-form
				ref="form"
				:model="form"
				:rules="rules"
				status-icon
				class="form--full"
				@submit.native.prevent="onSubmit"
			>
				<el-form-item
					prop="name"
					label="Ім'я"
				>
					<el-input
						v-model="form.name"
						placeholder="Ім'я"
					/>
				</el-form-item>
				<el-form-item
					prop="display_name"
					label="Відображене ім'я"
				>
					<el-input
						v-model="form.display_name"
						placeholder="Відображене ім'я"
					/>
				</el-form-item>
				<el-form-item
					prop="color"
					label="Колір"
				>
					<el-color-picker v-model="form.color" />
				</el-form-item>
				<div class="btn-wrap">
					<el-button
						type="primary"
						:loading="loading"
						:disabled="loading"
						class="btn"
						@click="onSubmit"
					>
						Створити
					</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
import breadcrumbs from '@/mixins/breadcrumbs'
import { required } from '@/data/rules'
import sections from '@/data/sections'
import Role from '@/classes/Role'
import menu from '@/data/menu'

export default {
	breadcrumbs: [
		{ title: menu[sections.roles].title, routeName: sections.roles },
		{ title: menu[sections.roles].children.add.title }
	],
	mixins: [
		breadcrumbs
	],
	data() {
		return {
			loading: false,
			form: {},
			rules: {
				name: required,
				display_name: required
			}
		}
	},
	computed: {
		titlePage() {
			return menu[sections.roles].children.add.title
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			Role.fetchStore(this.form)
				.then(({ data }) => {
					this.$router.push({ name: `${sections.roles}-id`, params: { id: data.role.id } })
				})
				.finally(() => {
					this.loading = false
				})
		},
		onSubmit() {
			this.$refs.form.validate((valid) => {
				if (!valid) {
					return
				}

				this.fetchRequest()
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
</style>
