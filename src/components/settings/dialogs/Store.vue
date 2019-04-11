<template>
	<basic-edit
		:title="title"
		:loading="loading"
		v-bind="$attrs"
		v-on="listeners"
	>
		<el-form
			ref="form"
			:model="form"
			status-icon
			class="form--full"
			@submit.native.prevent="onSubmit"
		>
			<el-form-item
				v-for="(row, index) in rows"
				:key="index"
				:prop="row.attr"
				:label="row.type !== 'bool' ? row.title : null"
			>
				<el-upload
					v-if="row.type === 'img'"
					ref="upload"
					:limit="1"
					:auto-upload="false"
					:accept="row.mimes"
					:name="row.attr"
					:disabled="isDisabled(row.attr)"
					action
				>
					<el-button
						slot="trigger"
						size="small"
						:disabled="isDisabled(row.attr)"
					>
						Оберіть файл
					</el-button>
					<el-button
						v-if="settings[row.attr]"
						type="danger"
						size="small"
						:disabled="isDisabled(row.attr)"
						@click="deleteFile(row.attr)"
					>
						Видалити
					</el-button>
				</el-upload>
				<el-checkbox
					v-else-if="row.type === 'bool'"
					v-model="form[row.attr]"
				>
					{{ row.title }}
				</el-checkbox>
				<el-input
					v-else
					v-model="form[row.attr]"
					:placeholder="row.title"
				/>
			</el-form-item>
		</el-form>
	</basic-edit>
</template>

<script>
import SettingsFrontend from '@/classes/SettingsFrontend'
import BasicEdit from '@/components/dialogs/BasicEdit'
import sections from '@/data/sections'
import menu from '@/data/menu'

export default {
	components: {
		BasicEdit
	},
	inheritAttrs: false,
	data() {
		return {
			rows: SettingsFrontend.rows,
			loading: false,
			form: {}
		}
	},
	computed: {
		listeners() {
			return {
				...this.$listeners,
				submit: this.fetchRequest
			}
		},
		title() {
			return menu[sections.settings].children[sections.settingsGlobal].title
		},
		settings() {
			return this.$store.state.template.settings
		}
	},
	created() {
		this.rows.forEach((row) => {
			switch (row.type) {
			case 'bool':
				this.$set(this.form, row.attr, !!this.settings[row.attr])
				break
			case 'text':
				this.$set(this.form, row.attr, this.settings[row.attr])
				break
			}
		})
	},
	methods: {
		fetchRequest() {
			const fd = new FormData
			this.loading = true

			Object.entries(this.form).forEach(([key, val]) => {
				if (typeof val === 'boolean') {
					fd.append(key, +val)
				} else {
					fd.append(key, val)
				}
			})

			this.$refs.upload.forEach((component) => {
				if (!component.disabled && component.uploadFiles && component.uploadFiles.length) {
					fd.append(component.name, component.uploadFiles[0].raw)
				}
			})

			SettingsFrontend.fetchStore(fd)
				.then(() => {
					this.$emit('store')
					this.$emit('close')
				})
				.finally(() => {
					this.loading = false
				})
		},
		isDisabled(attr) {
			return typeof this.form[attr] !== 'undefined'
		},
		deleteFile(attr) {
			this.$set(this.form, attr, '')

			// Clear active upload files before delete
			this.$refs.upload.forEach((component) => {
				if (component.name === attr) {
					component.clearFiles()
				}
			})
		}
	}
}
</script>
