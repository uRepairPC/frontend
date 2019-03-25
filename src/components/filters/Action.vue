<template>
	<filter-basic
		v-if="hasActions"
		title="Дії"
		class="filter-action"
	>
		<el-button
			v-for="(action, key) in actions"
			:key="key"
			size="small"
			:type="action.type"
			@click="action.action"
		>
			<i class="material-icons">
				{{ action.icon }}
			</i>
			<span>{{ action.title }}</span>
		</el-button>
	</filter-basic>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'FilterAction',
	inheritAttrs: false,
	props: {
		section: {
			type: String,
			required: true
		}
	},
	computed: {
		...mapGetters({
			menu: 'template/menu'
		}),
		menuSection() {
			return this.menu[this.section]
		},
		hasActions() {
			return !!Object.keys(this.menuSection.actions).length
		},
		actions() {
			if (!this.hasActions) {
				return []
			}

			return this.menuSection.actions
		}
	}
}
</script>
