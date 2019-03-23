<template>
	<div>
		<top-buttons :buttons="buttons" />
		<div
			v-for="(group, key) in list"
			:key="key"
			v-loading="loading"
			class="section"
		>
			<div class="title">
				<div :class="['title__before', `${listRoles[key].color}--background`]" />
				<span>{{ listRoles[key].nameMultiple }}</span>
			</div>
			<div class="list">
				<user-block
					v-for="(user, index) in group"
					:key="index"
					:user="user"
				>
					<div class="content">
						<!--TODO wait backend data-->
						<ul>
							<li>Point 1</li>
							<li>Point 2</li>
							<li>Point 3</li>
							<li>Point 4</li>
						</ul>
					</div>
				</user-block>
			</div>
		</div>
	</div>
</template>

<script>
import TopButtons from '@/components/TopButtons'
import UserBlock from '@/components/users/Block'
import { list as listRoles} from '@/data/roles'
import { SUCCESS } from '@/enum/types'

export default {
	name: 'Workers',
	breadcrumbs: [
		{ title: 'Працівники' }
	],
	components: {
		UserBlock, TopButtons
	},
	data() {
		return {
			listRoles
		}
	},
	computed: {
		profile() {
			return this.$store.state.profile.user
		},
		list() {
			return this.$store.state.workers.list
		},
		loading() {
			return this.$store.state.workers.loading
		},
		buttons() {
			return [
				{
					text: 'Оновити',
					type: SUCCESS,
					action: this.fetchList,
					disabled: this.loading
				}
			]
		}
	},
	mounted() {
		this.fetchList()
	},
	methods: {
		fetchList() {
			this.$store.dispatch('workers/fetchList')
		}
	}
}
</script>

<style lang="scss" scoped>
.section {
	margin: 20px;
}

.title {
	display: flex;
	align-items: center;
	font-weight: bold;
	padding: 0 20px 20px;
	font-size: 1.2rem;
	> span {
		margin-left: 15px;
	}
	.title__before {
		width: 8px;
		height: 8px;
		border-radius: 50%;
	}
}

.list {
	display: flex;
	flex-wrap: wrap;
}

.content {
	border-top: 1px solid #e6e6e6;
	padding: 20px 0;
	ul {
		margin: 0;
		padding: 0 0 0 40px;
	}
}
</style>
