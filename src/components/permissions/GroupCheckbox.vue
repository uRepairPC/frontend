<template>
	<div
		:class="['permission-group', {
			'only-view': onlyView
		}]"
	>
		<el-checkbox
			v-model="checkAll"
			:indeterminate="isIndeterminate"
			class="title"
			:disabled="onlyView"
			@change="handleCheckAllChange"
		>
			<strong>{{ name }}</strong>{{ onlyView ? '' : ' - Обрати всі' }}
		</el-checkbox>
		<el-checkbox-group :value="checked">
			<el-checkbox
				v-for="(item, index) in items"
				:key="index"
				:label="item.name"
				:disabled="onlyView"
				@change="onChange($event, item.name, index)"
			>
				{{ item.display_name }}
			</el-checkbox>
		</el-checkbox-group>
	</div>
</template>

<script>
export default {
	props: {
		value: {
			type: Array,
			default: () => []
		},
		name: {
			type: String,
			default: ''
		},
		items: {
			type: Array,
			default: () => []
		},
		onlyView: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			checkAll: false,
			isIndeterminate: false
		}
	},
	computed: {
		checked() {
			return this.value.map(i => i.name)
		}
	},
	watch: {
		value: {
			handler() {
				const checkedCount = this.checked.length
				this.checkAll = checkedCount === this.items.length
				this.isIndeterminate = checkedCount > 0 && checkedCount < this.items.length
			},
			immediate: true
		}
	},
	methods: {
		handleCheckAllChange(val) {
			if (this.onlyView) {
				return
			}

			this.$emit('input', val ? this.items : [])
			this.isIndeterminate = false
		},
		onChange(val, name, index) {
			if (this.onlyView) {
				return
			}

			let items = [...this.value]

			if (val) {
				items.push(this.items[index])
			} else {
				const index = items.findIndex(obj => obj.name === name)
				if (~index) {
					items.splice(index, 1)
				}
			}

			this.$emit('input', items)
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~scss/_colors";

.permission-group {
	margin-bottom: 15px;
	padding-bottom: 15px;
	border-bottom: 1px solid $defaultBorder;
	&:last-child {
		border-bottom: 0;
		margin-bottom: 0;
		padding-bottom: 0;
	}
	&.only-view {
		.el-checkbox {
			user-select: auto;
		}
		.el-checkbox,
		/deep/ .el-checkbox__input,
		/deep/ .el-checkbox__label,
		/deep/ .el-checkbox__inner {
			color: inherit;
			cursor: auto;
		}
		/deep/ .el-checkbox__input {
			&.is-checked {
				.el-checkbox__inner {
					background-color: $primary;
					border-color: $primary;
				}
			}
			.el-checkbox__inner {
				&:after {
					border-color: #fff;
					cursor: context-menu;
				}
			}
		}
	}
}

.title {
	margin-bottom: 10px;
}

.el-checkbox-group {
	margin-left: 15px;
}
</style>
