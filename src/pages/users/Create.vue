<template>
	<div class="user">
		<div class="wrap">
			<div class="title">Створення користувача</div>
			<el-form
				ref="form"
				:model="form"
				:rules="rules"
				status-icon
				@submit.native.prevent="onSubmit"
			>
				<el-form-item
					prop="email"
					label="E-mail"
				>
					<el-input
						v-model="form.email"
						placeholder="E-mail"
					/>
				</el-form-item>
				<el-form-item
					prop="first_name"
					label="Ім'я"
				>
					<el-input
						v-model="form.first_name"
						placeholder="Ім'я"
					/>
				</el-form-item>
				<el-form-item
					prop="middle_name"
					label="По-батькові"
				>
					<el-input
						v-model="form.middle_name"
						placeholder="По-батькові"
					/>
				</el-form-item>
				<el-form-item
					prop="last_name"
					label="Прізвище"
				>
					<el-input
						v-model="form.last_name"
						placeholder="Прізвище"
					/>
				</el-form-item>
				<el-form-item
					label="Роль"
					prop="role"
				>
					<el-select v-model="form.role">
						<el-option
							v-for="(role, key) in roleList"
							:key="key"
							:label="role.name"
							:value="key"
						>
							<span :class="role.color">{{ role.name }}</span>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					prop="phone"
					label="Телефон"
				>
					<el-input
						v-model="form.phone"
						placeholder="Телефон"
					/>
				</el-form-item>
				<el-form-item
					prop="description"
					label="Опис"
				>
					<el-input
						v-model="form.description"
						type="textarea"
						:autosize="{ minRows: 3 }"
						placeholder="Опис"
					/>
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
import { list as roleList } from '@/data/roles'
import * as dataRules from '@/data/rules'
import * as roles from '@/enum/roles'
import sections from '@/data/sections'

export default {
	breadcrumbs: [
		{ title: 'Користувачі', route: { name: sections.users } },
		{ title: 'Створення' }
	],
	data() {
		return {
			roleList,
			loading: false,
			form: {
				role: roles.USER
			},
			rules: {
				email: dataRules.email,
				first_name: dataRules.required,
				last_name: dataRules.required,
				role: dataRules.required
			}
		}
	},
	computed: {
		profile() {
			return this.$store.state.profile.user
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			this.$axios.post('users', this.form)
				.then(() => {
					this.$router.push({ name: 'users' })
				})
				.catch(() => {
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
	padding: 0 20px 20px;
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

/deep/ .el-form-item__label {
	float: none;
}
</style>
