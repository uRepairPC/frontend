<template>
	<el-popover
		ref="popover"
		placement="top-start"
		trigger="hover"
		:open-delay="500"
		v-bind="$attrs"
		v-on="$listeners"
		@show="onPopoverShow"
	>
		<el-tag
			slot="reference"
			class="role-tag"
			size="medium"
			:style="{
				'background-color': role.color + '10',
				'border-color': role.color + '20',
				color: role.color
			}"
		>
			{{ role.display_name }}
		</el-tag>
		<!--Content-->
		<div v-if="loading">Завантаження..</div>
		<div class="sections">
			<div
				v-for="(section, key) in permissions"
				:key="key"
				class="section"
			>
				<div class="section-title">{{ key }}</div>
				<div
					v-for="(item, index) in section"
					:key="index"
					class="section-list"
				>
					{{ item.display_name }}
				</div>
			</div>
		</div>
	</el-popover>
</template>

<script>
export default {
	inheritAttrs: false,
	props: {
		role: {
			type: Object,
			required: true
		}
	},
	computed: {
		permissions() {
			return this.$store.state.roles.popover[this.role.id]
		},
		loading() {
			return !this.permissions
		}
	},
	methods: {
		async onPopoverShow() {
			if (!this.permissions) {
				await this.$store.dispatch('roles/fetchPopover', this.role.id)
				this.$refs.popover.updatePopper()
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.role-tag {
	margin: 2px 5px 2px 0;
}

.section {
	margin-bottom: 10px;
	&:last-child {
		margin-bottom: 0;
	}
}

.section-title {
	font-weight: bold;
}

.section-list {
	margin-left: 10px;
}
</style>
