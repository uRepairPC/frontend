<template>
	<template-one
		:buttons="buttons"
		:table-data="tableData"
		:loading="loading"
	>
		<div
			slot="header"
			class="header__wrap"
		>
			<div class="header-item">
				<div class="header-item__title">
					Серійний номер
				</div>
				<div
					:class="['header-item__value', {
						'has_value': !!model.serial_number
					}]"
					@click="copy($event, model.serial_number)"
				>
					<span>{{ model.serial_number }}</span>
				</div>
			</div>
			<div class="header-item">
				<div class="header-item__title">
					Інвертарний номер
				</div>
				<div
					:class="['header-item__value', {
						'has_value': !!model.inventory_number
					}]"
					@click="copy($event, model.inventory_number)"
				>
					<span>{{ model.inventory_number }}</span>
				</div>
			</div>
		</div>
		<div
			v-if="model.files && (model.files.length || loadingFiles)"
			class="page--width"
		>
			<div class="divider">
				<span>Файли</span>
			</div>
			<div>
				<files-list
					:files="model.files"
					:loading="loadingFiles"
					:url-download="(file) => `equipments/${model.id}/files/${file.id}`"
					@add="onAdd"
					@edit="onEdit"
					@delete="onDelete"
					@refresh="fetchRequestFiles"
				/>
			</div>
		</div>
	</template-one>
</template>

<script>
import FilesUploadDialog from '@/components/equipments/dialogs/FilesUpload'
import FileDeleteDialog from '@/components/equipments/dialogs/FileDelete'
import FileEditDialog from '@/components/equipments/dialogs/FileEdit'
import DeleteDialog from '@/components/equipments/dialogs/Delete'
import EditDialog from '@/components/equipments/dialogs/Edit'
import TemplateOne from '@/components/template/One'
import EquipmentFile from '@/classes/EquipmentFile'
import FilesList from '@/components/files/List'
import Equipment from '@/classes/Equipment'
import { copyNode } from '@/scripts/dom'
import sections from '@/data/sections'
import onePage from '@/mixins/onePage'
import * as types from '@/enum/types'

export default {
	components: {
		TemplateOne, FilesList
	},
	mixins: [
		onePage(sections.equipments)
	],
	data() {
		return {
			loading: false,
			loadingFiles: false
		}
	},
	computed: {
		buttons() {
			return [
				{
					title: 'Оновити',
					type: types.SUCCESS,
					action: () => {
						this.fetchRequest()
						this.fetchRequestFiles()
					},
					disabled: this.loading
				},
				{
					title: 'Редагувати',
					type: types.PRIMARY,
					action: () => this.openDialog(EditDialog)
				},
				{
					title: 'Завантажити файл',
					type: types.PRIMARY,
					action: () => this.openDialog(FilesUploadDialog)
				},
				{
					title: 'Видалили',
					type: types.DANGER,
					action: () => this.openDialog(DeleteDialog)
				}
			]
		},
		tableData() {
			const props = ['type_name', 'manufacturer_name', 'model_name', 'description', 'created_at', 'updated_at']
			const result = []

			this.$store.getters['equipments/columns']
				.forEach((obj) => {
					if (props.includes(obj.prop)) {
						const customType = obj.customType === 'timestamp'
							? { key: 'timestamp', value: 'LLL' }
							: obj.customType

						result.push({ ...obj, customType, value: this.model[obj.prop] })
					}
				})

			return result
		}
	},
	methods: {
		fetchData() {
			if (!this.model.id) {
				this.fetchRequest()
			}
			if (!this.model.files) {
				this.fetchRequestFiles()
			}
		},
		fetchRequest() {
			this.loading = true

			Equipment.fetchOne(+this.$route.params.id)
				.catch(() => {
					this.$router.push({ name: sections.equipments })
				})
				.finally(() => {
					this.loading = false
				})
		},
		fetchRequestFiles() {
			this.loadingFiles = true
			this.updateFiles([])

			EquipmentFile.fetchAll(+this.$route.params.id)
				.then(({ data }) => {
					this.updateFiles(data.files)
				})
				.finally(() => {
					this.loadingFiles = false
				})
		},
		copy(evt, val) {
			if (!val) {
				return
			}

			copyNode(evt.target)
		},
		openDialog(component, attrs = {}) {
			this.$store.commit('template/OPEN_DIALOG', {
				component,
				attrs: {
					equipment: this.model,
					...attrs
				},
				events: {
					delete: () => {
						this.$router.push({ name: sections.equipments })
					},
					'fetch-files': this.fetchRequestFiles,
					'update-file': (file, index) => {
						const files = this.model.files
						files[index] = file
						this.updateFiles(files)
					},
					'delete-file': (index) => {
						const files = [...this.model.files]
						files.splice(index, 1)
						this.updateFiles(files)
					}
				}
			})
		},
		updateFiles(files) {
			Equipment.sidebar().add({ id: +this.$route.params.id, files })
		},
		onAdd() {
			this.openDialog(FilesUploadDialog)
		},
		onEdit(file, index) {
			this.openDialog(FileEditDialog, { file, index })
		},
		onDelete(file, index) {
			this.openDialog(FileDeleteDialog, { file, index })
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~scss/_colors";

.header__wrap {
	display: flex;
	align-items: center;
	justify-content: space-around;
}

.header-item {
	width: 250px;
}

.header-item__title {
	font-weight: bold;
	margin-bottom: 10px;
	text-align: left;
	user-select: none;
}

.header-item__value {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-wrap: wrap;
	border: 1px solid #e6e6e6;
	background: #fff;
	padding: 10px 20px;
	box-shadow: $lightShadow;
	height: 50px;
	transition: .2s;
	&.has_value {
		cursor: pointer;
	}
	&:hover {
		box-shadow: $basicShadow;
	}
	> span {
		overflow: hidden;
		text-overflow: ellipsis;
	}
}
</style>
