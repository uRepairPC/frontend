<template>
	<el-dialog
		:title="`${equipment.serial_number} / ${equipment.inventory_number}`"
		:visible="value"
		class="dialog--default"
		v-bind="$attrs"
		v-on="listeners"
	>
		<div class="content">
			<el-upload
				ref="upload"
				:auto-upload="false"
				drag
				multiple
				action
			>
				<i class="el-icon-upload" />
				<div class="el-upload__text">
					Перетягніть файл сюди або <em>натисніть, щоб завантажити</em>
				</div>
				<div
					slot="tip"
					class="el-upload__tip"
				>
					файл повинен мати не більше 20мб.
				</div>
			</el-upload>
		</div>
		<span slot="footer">
			<el-button @click="close">Закрити</el-button>
			<el-button
				type="primary"
				:loading="loading"
				:disabled="loading"
				@click="onSubmit"
			>
				Додати
			</el-button>
		</span>
	</el-dialog>
</template>

<script>
import { isArray, isObject } from '@/scripts/helpers'

export default {
	inheritAttrs: false,
	props: {
		value: {
			type: Boolean,
			default: false
		},
		equipment: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			loading: false
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
	beforeDestroy() {
		this.$emit('fetch-files')
	},
	methods: {
		onSubmit() {
			const files = this.$refs.upload.uploadFiles
			const fd = new FormData
			this.loading = true

			files.forEach((file) => {
				fd.append('files[]', file.raw, file.name)
			})

			this.$axios.post(`equipments/${this.equipment.id}/files`, fd)
				.then(() => {
					this.loading = false
					this.close()
				})
				.catch(({ response: { data } }) => {
					const files = this.$refs.upload.uploadFiles

					// Delete success uploaded files from list.
					if (isObject(data.errors) && isArray(files)) {
						const filesErrorsNames = Object.keys(data.errors)

						files.forEach((file, key) => {
							if (!filesErrorsNames.includes(file.name)) {
								this.$delete(files, key)
							}
						})
					}

					this.loading = false
				})
		},
		close() {
			this.$emit('input', false)
		}
	}
}
</script>

<style lang="scss" scoped>
/deep/ .el-upload-dragger,
/deep/ .el-upload {
	width: 100%;
}
</style>
