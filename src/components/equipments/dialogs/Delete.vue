<template>
	<basic-delete
		:title="equipmentClass.title"
		:confirm="equipment.id"
		:loading="loading"
		v-bind="$attrs"
		v-on="listeners"
	>
		<el-checkbox
			slot="content-bottom"
			v-model="filesDelete"
		>
			Видалити всі файли
		</el-checkbox>
	</basic-delete>
</template>

<script>
import BasicDelete from '@/components/dialogs/BasicDelete'
import EquipmentClass from '@/classes/Equipment'

export default {
	components: {
		BasicDelete
	},
	inheritAttrs: false,
	props: {
		equipment: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			loading: false,
			filesDelete: true
		}
	},
	computed: {
		listeners() {
			return {
				...this.$listeners,
				submit: this.fetchRequest
			}
		},
		equipmentClass() {
			return new EquipmentClass(this.equipment)
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			EquipmentClass.fetchDelete(this.equipment.id, {
				data: {
					files_delete: this.filesDelete
				}
			})
				.then(() => {
					this.$emit('delete')
					this.$emit('input', false)
				})
				.finally(() => {
					this.loading = false
				})
		}
	}
}
</script>
