<template>
	<el-popover
		ref="popover"
		placement="top-start"
		trigger="click"
		popper-class="popover-role"
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
		<div class="content">
			<div class="title">Доступи</div>
			<div
				v-if="hasRolePermissions"
				class="sections"
			>
				<div
					v-for="(section, key) in roleStore.permissions_grouped"
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
			<div
				class="loading"
				v-loading="true"
				v-else
			/>
		</div>
	</el-popover>
</template>

<script>
import Role from '@/classes/Role'

export default {
	inheritAttrs: false,
	props: {
		role: {
			type: Object,
			required: true
		}
	},
	computed: {
		roleStore() {
			return Role.sidebar().get(this.role.id)
		},
		hasRolePermissions() {
			return !!this.roleStore && !!this.roleStore.permissions_grouped
		}
	},
	methods: {
		onPopoverShow() {
			if (!this.hasRolePermissions) {
				Role.fetchOne(this.role.id)
					.then(() => {
						this.$refs.popover.updatePopper()
					})
			}
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~scss/_colors";

.role-tag {
	margin: 2px 5px 2px 0;
	user-select: none;
	cursor: pointer;
}

.title {
	text-align: center;
	font-weight: bold;
	padding: 5px;
	border-bottom: 1px solid $baseBorder;
	box-shadow: $lightShadow;
}

.sections {
	padding: 12px;
	max-height: 300px;
	overflow: auto;
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

.loading {
	height: 100px;
}
</style>
