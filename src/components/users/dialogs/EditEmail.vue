<template>
	<el-dialog
		title="Редагування E-mail"
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
				<el-form-item prop="email">
					<el-input
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
import sections from '@/data/sections'
import * as rules from '@/data/rules'

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
			loading: false,
			form: {
				email: ''
			},
			rules: {
				email: rules.email
			}
		}
	},
	computed: {
		listeners() {
			return {
				...this.$listeners,
				'update:visible': this.close
			}
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			this.$axios.post(`users/${this.user.id}/email`, this.form)
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
