<template>
	<el-dialog
		title="Видалення користувача"
		:visible="value"
		class="dialog--default"
		v-on="listeners"
	>
		<div class="content">
			<div>Ви дійсно хочете <strong>видалити</strong> цього користувача?</div>
			<div>Для підтвердження - введіть ID користувача.</div>
			<el-input-number
				ref="input"
				v-model="input"
				:controls="false"
				:min="0"
			/>
		</div>
		<span slot="footer">
			<el-button @click="close">Відмінити</el-button>
			<el-button
				type="danger"
				:disabled="btnDisabled"
				:loading="loading"
				@click="fetchDelete"
			>
				Видалити
			</el-button>
		</span>
	</el-dialog>
</template>

<script>
import sections from '@/data/sections'

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
			input: null
		}
	},
	computed: {
		listeners() {
			return {
				...this.$listeners,
				'update:visible': this.close
			}
		},
		btnDisabled() {
			if (this.loading) {
				return true
			}

			return !this.input || this.input !== this.user.id
		}
	},
	watch: {
		value(val) {
			if (val) {
				this.$nextTick(() => {
					this.input = null
					this.$refs.input.$refs.input.select()
					this.$refs.input.$refs.input.focus()
				})
			}
		}
	},
	methods: {
		async fetchDelete() {
			this.loading = true

			try {
				const res = await this.$axios.delete(`users/${this.user.id}`)

				if (res.status === 200) {
					this.close()
					this.$router.push({ name: sections.users })
				}
			} finally {
				this.loading = false
			}
		},
		close() {
			this.$emit('input', false)
		}
	}
}
</script>

<style lang="scss" scoped>
.content {
	> div {
		margin-bottom: 20px;
		&:last-child {
			margin-bottom: 0;
		}
	}
}
</style>
