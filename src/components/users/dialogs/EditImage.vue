<template>
	<basic-edit
		title="Редагування зображення"
		:loading="loading"
		v-bind="$attrs"
		v-on="listeners"
	>
		<el-upload
			ref="upload"
			drag
			:http-request="onHttpRequest"
			:on-change="onChange"
			:auto-upload="false"
			list-type="picture"
			:limit="1"
			accept="image/jpeg, image/jpg, image/png"
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
				jpeg/jpg/png зображення повинне мати не більше 2мб.
			</div>
		</el-upload>
	</basic-edit>
</template>

<script>
import BasicEdit from '@/components/dialogs/BasicEdit'
import sections from '@/data/sections'

export default {
	components: {
		BasicEdit
	},
	inheritAttrs: false,
	props: {
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
				submit: this.save
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
					this.$store.dispatch('template/addSidebarItem', {
						section: sections.users,
						data: { ...this.user, image: data.image }
					})
					this.loading = false
					this.$emit('close')
				})
				.catch(() => {
					this.loading = false
				})
		},
		save() {
			this.$refs.upload.submit()
		},
		onChange(file) {
			this.file = file
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
