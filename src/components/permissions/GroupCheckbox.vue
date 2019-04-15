<template>
	<div class="permission-group">
		<el-checkbox
			v-model="checkAll"
			:indeterminate="isIndeterminate"
			class="title"
			@change="handleCheckAllChange"
		>
			<strong>{{ name }}</strong> - Обрати всі
		</el-checkbox>
		<el-checkbox-group :value="checked">
			<el-checkbox
				v-for="(item, index) in items"
				:label="item.name"
				:key="index"
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
			this.$emit('input', val ? this.items : [])
			this.isIndeterminate = false
		},
		onChange(val, name, index) {
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
.permission-group {
	margin-bottom: 15px;
	padding-bottom: 15px;
	border-bottom: 1px solid #e6e6e6;
	&:last-child {
		border-bottom: 0;
		margin-bottom: 0;
		padding-bottom: 0;
	}
}

.title {
	margin-bottom: 10px;
}

.el-checkbox-group {
	margin-left: 15px;
}
</style>
