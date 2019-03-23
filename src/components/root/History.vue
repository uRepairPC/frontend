<template>
	<div class="history">
		<div class="history-title">
			Відкриті сторінки
		</div>
		<el-collapse v-model="activeNames">
			<el-collapse-item
				v-for="(obj, section) in menuHistory"
				:key="section"
				:name="section"
			>
				<template slot="title">
					<i class="material-icons">{{ obj.icon }}</i>
					{{ obj.title }}
				</template>
				<div
					v-for="(historyItem, j) in sidebar[obj.route.name]"
					:key="j"
					class="history-item"
				>
					<span @click="onClick(historyItem, obj.route.name)">{{ getText(obj, historyItem) }}</span>
					<i
						class="material-icons"
						@click="removeHistoryItem(section, historyItem)"
					>
						clear
					</i>
				</div>
			</el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
import { menu } from '@/data/template'

export default {
	data() {
		return {
			activeNames: []
		}
	},
	computed: {
		menuHistory() {
			const list = {}

			Object.entries(menu).forEach(([key, obj]) => {
				if (obj.history && typeof obj.history === 'object' && obj.history.show) {
					list[key] = obj
				}
			})

			return list
		},
		sidebar() {
			return this.$store.state.template.sidebar
		}
	},
	mounted() {
		this.activeNames = Object.keys(this.menuHistory)
	},
	methods: {
		removeHistoryItem(section, historyItem) {
			const routeId = +this.$route.params.id

			this.$store.commit(`template/REMOVE_SIDEBAR_ITEM`, {
				section,
				data: historyItem
			})

			if (this.$route.name === `${section}-id` && routeId === historyItem.id) {
				this.$router.push({ name: section })
			}
		},
		getText(obj, historyItem) {
			if (obj.history.callback && typeof obj.history.callback === 'function') {
				return obj.history.callback(historyItem)
			}

			return `[${historyItem.id}] ${historyItem.name}` || historyItem.id
		},
		onClick(obj, route) {
			this.$router.push({ name: `${route}-id`, params: { id: obj.id } })
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~scss/_colors";

.history-title {
	text-align: center;
	border: 1px solid #e6e6e6;
	background: #f7f7f7;
	border-left: 0;
	border-right: 0;
	padding: 10px 0;
	margin-bottom: -1px;
	font-weight: bold;
	font-size: .9em;
}

.history-item {
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-bottom: 5px;
	cursor: pointer;
	&:hover {
		> i {
			opacity: 1;
		}
	}
	> i,
	> span {
		padding: 3px 0;
		transition: .2s;
	}
	> span {
		flex: 1 1 auto;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		&:hover {
			color: $primary;
		}
	}
	> i {
		width: 20px;
		text-align: center;
		color: $info;
		opacity: 0;
		&:hover {
			color: $danger;
		}
	}
}

/deep/ .el-collapse-item__header {
	padding: 0 5px 0 15px;
	> i {
		color: #777;
		margin-right: 10px;
	}
}

/deep/ .el-collapse-item__content {
	padding: 0 15px;
}
</style>
