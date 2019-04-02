<template>
	<basic-edit
		:title="file.name"
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
		</el-form>
	</basic-edit>
</template>

<script>
import BasicEdit from '@/components/dialogs/BasicEdit'
import { required } from '@/data/rules'

export default {
	components: {
		BasicEdit
	},
	inheritAttrs: false,
	props: {
		equipment: {
			type: Object,
			required: true
		},
		file: {
			type: Object,
			required: true
		},
		index: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			loading: false,
			form: {
				name: this.file.name
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
				submit: this.onSubmit
			}
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			this.$axios.put(`equipments/${this.equipment.id}/files/${this.file.id}`, this.form)
				.then((res) => {
					this.$emit('update-file', res.data.file, this.index)
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
