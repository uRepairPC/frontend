<template>
	<el-dialog
		title="Редагування зображення"
		:visible="value"
		class="dialog--default"
		v-on="listeners"
	>
		<div class="content">
			<el-upload
				ref="upload"
				drag
				:http-request="onHttpRequest"
				:on-change="onChange"
				:auto-upload="false"
				list-type="picture"
				:limit="1"
				accept="image/jpeg, image/jpg, image/png"
				action>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">Перетягніть файл сюди або <em>натисніть, щоб завантажити</em></div>
				<div class="el-upload__tip" slot="tip">jpeg/jpg/png зображення повинне мати меньше 2мб.</div>
			</el-upload>
		</div>
		<span slot="footer">
			<el-button @click="close">Закрити</el-button>
			<el-button
				type="primary"
				:loading="loading"
				:disabled="loading"
				@click="save"
			>
				Зберегти
			</el-button>
		</span>
	</el-dialog>
</template>

<script>
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
			file: null,
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
	methods: {
		onHttpRequest() {
			this.loading = true

			const fd = new FormData
			fd.append('image', this.file.raw)

			this.$axios.post(`users/${this.user.id}/image`, fd)
				.then(({ data }) => {
					this.$store.commit('template/ADD_SIDEBAR_USER', { ...this.user, image: data.image })
					this.loading = false
					this.close()
				})
				.catch(() => this.loading = false)
		},
		save() {
			this.$refs.upload.submit()
		},
		onChange(file) {
			this.file = file
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
