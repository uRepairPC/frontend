<template>
	<basic-delete
		:title="`${equipment.serial_number || '-'} / ${equipment.inventory_number || '-'}`"
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
import sections from '@/data/sections'

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
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			this.$axios.delete(`equipments/${this.equipment.id}`, {
				data: {
					files_delete: this.filesDelete
				}
			})
				.then(() => {
					this.$store.commit('template/REMOVE_SIDEBAR_ITEM', {
						section: sections.equipments,
						id: this.equipment.id
					})
					this.$emit('input', false)
					this.$router.push({ name: sections.equipments })
				})
				.finally(() => {
					this.loading = false
				})
		}
	}
}
</script>
