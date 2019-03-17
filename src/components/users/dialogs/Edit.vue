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
				status-icon
				@submit.native.prevent="onSubmit"
			>
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
							:value="key">
							<span :class="`${role.color}--text`">{{ role.name }}</span>
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item
					prop="phone"
					label="Телефон"
				>
					<el-input
						placeholder="Телефон"
						v-model="form.phone">
					</el-input>
				</el-form-item>
				<el-form-item
					prop="textarea"
          label="Опис"
				>
					<el-input
						type="textarea"
						:autosize="{ minRows: 3 }"
						placeholder="Опис"
						v-model="form.description">
					</el-input>
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
		return {
			roleList,
			loading: false,
			form: {
				role: this.user.role,
				description: this.user.description,
				phone: this.user.phone
			}
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
					this.$store.dispatch('template/addSidebarUser', data.user)
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
.content {
	/deep/ .el-select {
		width: 100%;
	}
}
</style>
