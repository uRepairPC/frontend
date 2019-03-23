<template>
	<el-dialog
		title="Редагування користувача"
		:visible="value"
		class="dialog--default"
		v-on="listeners"
	>
		<div class="content">
			<el-form
				ref="form"
				:model="form"
				:rules="rules"
				status-icon
				@submit.native.prevent="onSubmit"
			>
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
					v-if="canChangeRole"
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
					prop="textarea"
					label="Опис"
				>
					<el-input
						v-model="form.description"
						type="textarea"
						:autosize="{ minRows: 3 }"
						placeholder="Опис"
					/>
				</el-form-item>
			</el-form>
		</div>
		<span slot="footer">
			<el-button @click="close">Закрити</el-button>
			<el-button
				type="primary"
				:loading="loading"
				:disabled="loading"
				@click="onSubmit"
			>
				Зберегти
			</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { list as roleList } from '@/data/roles'
import { required } from '@/data/rules'
import sections from '@/data/sections'
import * as roles from '@/enum/roles'

export default {
	inheritAttrs: false,
	props: {
		value: {
			type: Boolean,
			default: false
		},
		user: {
			type: Object,
			required: true
		}
	},
	data() {
		const form = {
			first_name: this.user.first_name,
			middle_name: this.user.middle_name,
			last_name: this.user.last_name,
			description: this.user.description,
			phone: this.user.phone
		}

		if (this.user.role) {
			form.role = this.user.role
		}

		return {
			roleList,
			loading: false,
			rules: {
				first_name: required,
				last_name: required
			},
			form
		}
	},
	computed: {
		profile() {
			return this.$store.state.profile.user
		},
		listeners() {
			return {
				...this.$listeners,
				'update:visible': this.close
			}
		},
		canChangeRole() {
			return this.profile.role === roles.ADMIN && this.profile.id !== this.user.id
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			this.$axios.put(`users/${this.user.id}`, this.form)
				.then(({ data }) => {
					this.$store.dispatch('template/addSidebarItem', {
						section: sections.users,
						data: data.user
					})
					this.loading = false
					this.close()
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
		},
		close() {
			this.$emit('input', false)
		}
	}
}
</script>

<style lang="scss" scoped>
.dialog--default {
	/deep/ > .el-dialog {
		margin-top: 5vh !important;
		max-width: 700px;
	}
}

.content {
	/deep/ .el-select {
		width: 100%;
	}
}
</style>
