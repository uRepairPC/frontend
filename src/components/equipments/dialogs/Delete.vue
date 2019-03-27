<template>
	<basic-delete
		:title="`${equipment.serial_number} / ${equipment.inventory_number}`"
		:confirm="equipment.id"
		:loading="loading"
		v-on="listeners"
		v-bind="$attrs"
	/>
</template>

<script>
import BasicDelete from '@/components/dialogs/BasicDelete'
import sections from '@/data/sections'

export default {
	inheritAttrs: false,
	components: {
		BasicDelete
	},
	props: {
		equipment: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			loading: false
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

			this.$axios.delete(`equipments/${this.equipment.id}`)
				.then(() => {
					this.$store.commit('template/REMOVE_SIDEBAR_ITEM', {
						section: sections.equipments,
						id: this.equipment.id
					})
					this.loading = false
					this.$emit('input', false)
					this.$router.push({ name: sections.equipments })
				})
				.catch(() => {
					this.loading = false
				})
		}
	}
}
</script>
