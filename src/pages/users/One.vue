<template>
	<div class="user">
		<div class="user__wrap">
			<div class="actions">
				<el-button
					size="small"
					@click="fetchUser"
				>
					Оновити
				</el-button>
				<el-button
					type="primary"
					size="small"
				>
					Редагувати
				</el-button>
				<el-button
					type="danger"
					size="small"
					@click="dialogDelete = true"
				>
					Вилучити
				</el-button>
			</div>
			<div
				v-loading="loading"
				class="header"
			>
				<div
					class="image"
					:style="userClass.backgroundImage"
				>
					<template v-if="!user.image">
						<i class="material-icons">face</i>
						{{ userClass.initials }}
					</template>
				</div>
				<div class="name">
					{{ userClass.fullName }}
				</div>
			</div>
			<div
				v-loading="loading"
				class="content"
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
					>
						<template slot-scope="scope">
							<span v-if="scope.row.key === 'role' && scope.row.value">
								<el-tag
									:type="COLORS[scope.row.value]"
									size="medium"
								>
									{{ scope.row.value }}
								</el-tag>
							</span>
							<span v-else>{{ scope.row.value }}</span>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>

		<!-- DIALOGS -->
		<template v-if="user.id">
			<delete-dialog
				:id="user.id"
				v-model="dialogDelete"
			/>
		</template>
	</div>
</template>

<script>
import DeleteDialog from '@/components/users/dialogs/Delete'
import UserClass from '@/classes/User'
import { COLORS } from '@/data/role'
import moment from 'moment'

export default {
	breadcrumbs: [
		{ title: 'Користувачі', route: { name: 'users' } },
		{ title: route => `ID: ${route.params.id}` }
	],
	components: {
		DeleteDialog
	},
	data() {
		return {
			COLORS,
			loading: false,
			dialogDelete: false
		}
	},
	computed: {
		user() {
			const users = this.$store.state.template.sidebar.users
			const id = this.$route.params.id

			return users[id] || {}
		},
		userClass() {
			return new UserClass(this.user)
		},
		tableData() {
			const displayProps = [
				{ name: 'Роль', key: 'role' },
				{ name: 'Опис', key: 'description' },
				{ name: 'Телефон', key: 'phone' },
				{ name: 'Створений', key: 'created_at' },
				{ name: 'Останнє оновлення', key: 'updated_at' }
			]

			return displayProps.reduce((result, obj) => {
				const value = ['updated_at', 'created_at'].includes(obj.key)
					? moment(this.user[obj.key]).format('LLL')
					: this.user[obj.key]

				result.push({ ...obj, value })
				return result

			}, [])
		}
	},
	watch: {
		'$route': {
			handler() {
				this.dialogDelete = false

				if (!this.user.id && this.$route.name === 'users-id') {
					this.fetchUser()
				}
			},
			immediate: true
		}
	},
	methods: {
		fetchUser() {
			this.loading = true

			this.$axios.get(`users/${this.$route.params.id}`)
				.then(({ data }) => {
					this.$store.commit('template/ADD_SIDEBAR_USER', data.user)
					this.loading = false
				})
				.catch(() => {
					this.$router.push({ name: 'users' })
					this.loading = false
				})
		}
	}
}
</script>

<style lang="scss" scoped>
.user__wrap {
	max-width: 700px;
	margin: 0 auto;
	> div {
		background: #fff;
		border: 1px solid #e6e6e6;
	}
}

.header,
.content,
.actions {
	margin-top: 20px;
	padding: 20px;
}

.actions {
	margin-top: 30px;
	padding-bottom: 10px;
	> button {
		margin-bottom: 10px;
	}
}

.header {
	padding: 50px;
	text-align: center;
}

.content {
	margin-bottom: 30px;
}

.image {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	font-weight: bold;
	font-size: 2rem;
	width: 150px;
	height: 150px;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
	border-radius: 50%;
	margin: 0 auto;
	color: #000000;
	border: 3px solid;
	> i {
		margin-bottom: 10px;
	}
}

.name {
	margin-top: 40px;
	font-weight: bold;
	font-size: 1.5rem;
}
</style>
