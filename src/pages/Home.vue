<template>
	<div class="home">
		<div class="items">
			<div
				v-for="(item, index) in filterMenu"
				:key="index"
				class="item"
			>
				<div
					class="item-header"
					@click="onClickHeader(item)"
				>
					<div class="item-header__left">
						<i class="material-icons">
							{{ item.icon }}
						</i>
					</div>
					<div class="item-header__right">
						<div class="item--title">
							{{ item.title }}
						</div>
						<div class="item--route">
							{{ item.route.name }}
						</div>
					</div>
					<div class="item-header__icon">
						<i class="material-icons">
							chevron_right
						</i>
					</div>
				</div>
				<div
					v-if="item.actions"
					class="item-actions-list"
				>
					<div
						v-for="(action, key) in item.actions"
						:key="key"
						class="item-action"
						@click="action.action"
					>
						<div class="item-action-wrap">
							<i class="item-action--icon material-icons">
								{{ action.icon }}
							</i>
							<div class="item-action--title">
								{{ action.text }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import sections from '@/data/sections'
import { mapGetters } from 'vuex'

export default {
	name: 'Home',
	computed: {
		...mapGetters({
			menu: 'template/menu'
		}),
		filterMenu() {
			const list = {}

			Object.entries(this.menu).filter(([key, val]) => {
				if (key !== sections.home) {
					list[key] = val
				}
			})

			return list
		}
	},
	methods: {
		onClickHeader(item) {
			this.$router.push(item.route)
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~scss/_colors";

.home {
	padding: 20px;
}

.items {
	display: flex;
	flex-wrap: wrap;
	user-select: none;
}

.item {
	width: 280px;
	padding: 10px;
	margin: 10px;
}

.item-header {
	display: flex;
	align-items: center;
	padding: 15px 20px;
	box-shadow: $basicShadow;
	background: #fff;
	cursor: pointer;
	&:hover .item-header__icon {
		opacity: 1;
		transform: translateX(0);
	}
}

.item-header__left {
	width: 30px;
	text-align: center;
	margin-right: 20px;
	font-size: 1.3rem;
	line-height: 0;
}

.item-header__right {
	flex: 1 1 auto;
}

.item-header__icon {
	line-height: 0;
	transform: translateX(-10px);
	font-size: 1.2rem;
	transition: .2s;
	opacity: 0;
}

.item--title {
	font-weight: bold;
	font-size: 1.1rem;
}

.item--route {
	color: $info;
	font-size: .8rem;
}

.item-action {
	position: relative;
	margin-top: 15px;
	padding: 5px 10px 5px 0;
	color: #606266; // TODO colors
	transition: color .2s;
	cursor: pointer;
	&:hover {
		color: #000;
	}
}

.item-action-wrap {
	display: flex;
	align-items: center;
}

.item-action--icon {
	width: 30px;
	text-align: center;
	margin-right: 5px;
}
</style>
