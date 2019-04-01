<template>
	<div class="equipment">
		<div class="equipment__wrap">
			<top-buttons :buttons="buttons" />
			<div
				v-loading="loading"
				class="header max--width"
			>
				<div class="header__wrap">
					<div class="header-item">
						<div class="header-item__title">
							Серійний номер
						</div>
						<div
							:class="['header-item__value', {
								'has_value': !!equipment.serial_number
							}]"
							@click="copy($event, equipment.serial_number)"
						>
							<span>{{ equipment.serial_number }}</span>
						</div>
					</div>
					<div class="header-item">
						<div class="header-item__title">
							Інвертарний номер
						</div>
						<div
							:class="['header-item__value', {
								'has_value': !!equipment.inventory_number
							}]"
							@click="copy($event, equipment.inventory_number)"
						>
							<span>{{ equipment.inventory_number }}</span>
						</div>
					</div>
				</div>
			</div>
			<div
				v-loading="loading"
				class="content max--width"
			>
				<el-table
					:data="tableData"
					style="width: 100%"
				>
					<el-table-column
						prop="name"
						label="Назва"
						width="200"
					/>
					<el-table-column
						prop="value"
						label="Значення"
					/>
				</el-table>
			</div>
			<template v-if="files.length || loadingFiles">
				<div class="max--width divider">
					<span>Файли</span>
				</div>
				<div class="max--width">
					<files-list
						:files="files"
						:loading="loadingFiles"
						:url-download="(file) => `equipments/${$route.params.id}/files/${file.id}`"
					/>
				</div>
			</template>
		</div>
	</div>
</template>

<script>
import FilesUpload from '@/components/equipments/dialogs/FilesUpload'
import DeleteDialog from '@/components/equipments/dialogs/Delete'
import EditDialog from '@/components/equipments/dialogs/Edit'
import TopButtons from '@/components/TopButtons'
import FilesList from '@/components/files/List'
import breadcrumbs from '@/mixins/breadcrumbs'
import { COLUMNS_DATES } from '@/data/columns'
import * as utils from '@/scripts/utils'
import sections from '@/data/sections'
import * as types from '@/enum/types'
import menu from '@/data/menu'
import moment from 'moment'

export default {
	breadcrumbs: [
		{ title: menu[sections.equipments].title, routeName: sections.equipments },
		{ title: route => `ID: ${route.params.id || -1}` }
	],
	components: {
		TopButtons, FilesList
	},
	mixins: [
		breadcrumbs
	],
	data() {
		return {
			loading: false,
			loadingFiles: false,
			files: []
		}
	},
	computed: {
		equipment() {
			const equipments = this.$store.state.template.sidebar[sections.equipments]
			const id = this.$route.params.id

			if (equipments && equipments[id]) {
				return equipments[id]
			}

			return {}
		},
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
					action: () => this.openDialog(FilesUpload)
				},
				{
					title: 'Видалили',
					type: types.DANGER,
					action: () => this.openDialog(DeleteDialog)
				}
			]
		},
		tableData() {
			const displayProps = [
				{ name: 'Тип', key: 'type_name' },
				{ name: 'Виробник', key: 'manufacturer_name' },
				{ name: 'Модель', key: 'model_name' },
				{ name: 'Опис', key: 'description' },
				{ name: 'Створений', key: 'created_at' },
				{ name: 'Останнє оновлення', key: 'updated_at' }
			]

			return displayProps
				.reduce((result, obj) => {
					const value = COLUMNS_DATES.includes(obj.key)
						? moment(this.equipment[obj.key]).format('LLL')
						: this.equipment[obj.key]

					result.push({ ...obj, value })
					return result

				}, [])
		}
	},
	watch: {
		'$route'() {
			this.fetchData()
		}
	},
	created() {
		this.fetchData()
	},
	methods: {
		fetchData() {
			if (!this.equipment.id) {
				this.fetchRequest()
			}
			this.fetchRequestFiles()
		},
		fetchRequest() {
			this.loading = true

			this.$axios.get(`equipments/${this.$route.params.id}`)
				.then(({ data }) => {
					this.$store.dispatch('template/addSidebarItem', {
						section: sections.equipments,
						data: data.equipment
					})
					this.fetchRequestFiles()
				})
				.catch(() => {
					this.$store.commit('template/REMOVE_SIDEBAR_ITEM', {
						section: sections.equipments,
						id: this.$route.params.id
					})
					this.$router.push({ name: sections.equipments })
				})
				.finally(() => {
					this.loading = false
				})
		},
		fetchRequestFiles() {
			this.loadingFiles = true

			this.$axios.get(`equipments/${this.$route.params.id}/files`)
				.then(({ data }) => {
					this.files = data.files
				})
				.finally(() => {
					this.loadingFiles = false
				})
		},
		copy(evt, val) {
			if (!val) {
				return
			}

			utils.selectAll(evt.target)

			if (utils.execCopy()) {
				this.$message('Скопійовано в буфер')
			}
		},
		openDialog(component) {
			this.$store.commit('template/OPEN_DIALOG', {
				component,
				attrs: {
					equipment: this.equipment
				},
				events: {
					'fetch-files': this.fetchRequestFiles
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~scss/_colors";

.equipment__wrap {
	padding-bottom: 50px;
}

.header,
.content {
	margin-top: 20px;
	padding: 20px;
}

.header {
	padding: 30px;
	text-align: center;
}

.content {
	background: #fff;
	border: 1px solid #e6e6e6;
}

.max--width {
	max-width: 900px;
	margin-left: auto;
	margin-right: auto;
}

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
