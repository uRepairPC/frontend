<template>
	<div class="history">
		<div class="history-title">
			Швидкий перехід
		</div>
		<el-collapse v-model="activeName">
			<el-collapse-item
				v-for="(item, index) in menuHistory"
				:key="index"
				:name="item.route.name"
			>
				<template slot="title">
					<i class="material-icons">{{ item.icon }}</i>
					{{ item.title }}
				</template>
				<div
					v-for="(historyItem, j) in sidebar[item.route.name]"
					:key="j"
					class="history-item"
				>
					<span @click="onClick(historyItem, item.route.name)">{{ getText(item, historyItem) }}</span>
					<i
						class="material-icons"
						@click="removeHistoryItem(item, historyItem)"
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
			activeName: ''
		}
	},
	computed: {
		menuHistory() {
			return menu.filter(m => !!m.history)
		},
		sidebar() {
			return this.$store.state.template.sidebar
		}
	},
	methods: {
		removeHistoryItem(item, historyItem) {
			this.$store.commit(`template/${item.historyRemove}`, historyItem.id)
		},
		getText(item, historyItem) {
			if (item.historyCb && typeof item.historyCb === 'function') {
				return item.historyCb(historyItem)
			}

			return `[${historyItem.id}] ${historyItem.name}` || historyItem.id
		},
		onClick(item, route) {
			this.$router.push({ name: `${route}-id`, params: { id: item.id } })
		}
	}
}
</script>

<style lang="scss" scoped>
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
			color: #409eff;
		}
	}
	> i {
		width: 20px;
		text-align: center;
		color: #909399;
		opacity: 0;
		&:hover {
			color: #f56c6c;
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
