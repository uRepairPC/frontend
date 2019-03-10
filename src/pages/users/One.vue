<template>
	<div
		v-loading="loading"
		class="user"
	>
		<div>
			<div class="top">
				<div
					class="image"
					:style="userClass.backgroundImage"
				>
					<template v-if="!user.image">
						<i class="material-icons">face</i>
						{{ userClass.initials }}
					</template>
				</div>
				<div class="name">{{ userClass.fullName }}</div>
			</div>
			<div class="center">
				<el-table
					:data="tableData"
					style="width: 100%">
					<el-table-column
						prop="name"
						label="Назва"
						width="200" />
					<el-table-column
						prop="value"
						label="Значення">
						<template slot-scope="scope">
							<span v-if="scope.row.key === 'role'">
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
			<div class="bottom">
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
				>
					Вилучити
				</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import UserClass from '@/classes/User'
import { COLORS } from '@/data/role'
import moment from 'moment'

export default {
	breadcrumbs: [
		{ title: 'Користувачі', route: { name: 'users' } },
		{ title: route => `ID: ${route.params.id}` }
	],
	data() {
		return {
			COLORS,
			loading: false
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
	activated() {
		if (!this.user.id) {
			this.fetchUser()
		}
	},
	methods: {
		// TODO User not found -> move to 404 page?
		fetchUser() {
			this.loading = true

			this.$axios.get(`users/${this.$route.params.id}`)
				.then(({ data }) => {
					this.$store.commit('template/ADD_SIDEBAR_USER', data.user)
					this.loading = false
				})
				.catch(() => {
					this.loading = false
				})
		}
	}
}
</script>

<style lang="scss" scoped>
.user {
	> div {
		max-width: 700px;
		margin: 0 auto;
	}
}

.top,
.bottom,
.center {
	background: #fff;
	border: 1px solid #e6e6e6;
}

.top {
	margin-top: 30px;
	padding: 50px;
	text-align: center;
}

.bottom,
.center {
	margin-top: 20px;
	padding: 20px;
}

.bottom {
	margin-bottom: 30px;
	padding-bottom: 10px;
	> button {
		margin-bottom: 10px;
	}
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
