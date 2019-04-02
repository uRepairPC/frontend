<template>
	<basic-create
		title="Додати тип"
		:loading="loading"
		v-bind="$attrs"
		v-on="listeners"
	>
		<el-form
			ref="form"
			:model="form"
			:rules="rules"
			status-icon
			@submit.native.prevent="onSubmit"
		>
			<el-form-item
				prop="name"
				label="Назва"
			>
				<el-input
					v-model="form.name"
					placeholder="Назва"
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
		</el-form>
	</basic-create>
</template>

<script>
import BasicCreate from '@/components/dialogs/BasicCreate'
import { required } from '@/data/rules'

export default {
	components: {
		BasicCreate
	},
	inheritAttrs: false,
	data() {
		return {
			loading: false,
			form: {
				name: '',
				description: ''
			},
			rules: {
				name: required
			}
		}
	},
	computed: {
		listeners() {
			return {
				...this.$listeners,
				submit: this.fetchRequest
			}
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			this.$axios.post('equipments/types', this.form)
				.then(() => {
					this.$store.dispatch('equipmentTypes/fetchList')
					this.$emit('close')
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
