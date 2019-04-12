<template>
	<div class="role">
		<div class="role__wrap">
			<top-buttons
				:buttons="buttons"
				:disabled="loading"
			/>
			<div class="header max--width">
				<div class="header__wrap">
					<div class="title">
						{{ role.display_name }}
					</div>
					<div
						v-if="role.color"
						class="color"
						:style="{ 'background-color': role.color }"
					/>
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
		</div>
	</div>
</template>

<script>
import TopButtons from '@/components/TopButtons'
import { COLUMNS_DATES } from '@/data/columns'
import breadcrumbs from '@/mixins/breadcrumbs'
import sections from '@/data/sections'
import * as types from '@/enum/types'
import Role from '@/classes/Role'
import menu from '@/data/menu'
import moment from 'moment'

// TODO Permissions data

export default {
	breadcrumbs: [
		{ title: menu[sections.roles].title, routeName: sections.roles },
		{ title: route => `ID: ${route.params.id || -1}` }
	],
	components: {
		TopButtons
	},
	mixins: [
		breadcrumbs
	],
	data() {
		return {
			loading: false
		}
	},
	computed: {
		role() {
			const roles = this.$store.state.template.sidebar[sections.roles]
			const id = this.$route.params.id

			if (roles && roles[id]) {
				return roles[id]
			}

			return {}
		},
		buttons() {
			return [
				{
					title: 'Оновити',
					type: types.SUCCESS,
					action: this.fetchRequest,
					disabled: this.loading
				}
			]
		},
		tableData() {
			const displayProps = [
				{ name: 'Ім\'я', key: 'name' },
				{ name: 'Колір', key: 'color' },
				{ name: 'За замовчуванням', key: 'default' },
				{ name: 'Створений', key: 'created_at' },
				{ name: 'Останнє оновлення', key: 'updated_at' }
			]

			return displayProps
				.reduce((result, obj) => {
					let value = COLUMNS_DATES.includes(obj.key)
						? moment(this.role[obj.key]).format('LLL')
						: this.role[obj.key]

					if (obj.key === 'default') {
						value = this.role[obj.key] ? 'Так' : 'Ні'
					}

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
			if (!this.role.id) {
				this.fetchRequest()
			}
		},
		fetchRequest() {
			this.loading = true

			Role.fetchOne(+this.$route.params.id)
				.catch(() => {
					this.$router.push({ name: sections.roles })
				})
				.finally(() => {
					this.loading = false
				})
		},
		openDialog(component, attrs = {}) {
			this.$store.commit('template/OPEN_DIALOG', {
				component,
				attrs: {
					role: this.role,
					...attrs
				}
			})
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~scss/_colors";

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

.title {
	font-size: 1.5rem;
	font-weight: bold;
}

.color {
	width: 100px;
	height: 5px;
	margin: 15px auto 0;
}

.max--width {
	max-width: 900px;
	margin-left: auto;
	margin-right: auto;
}
</style>
