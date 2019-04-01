<template>
	<basic-delete
		:title="userClass.fullName"
		:confirm="user.id"
		:loading="loading"
		v-bind="$attrs"
		v-on="listeners"
	>
		<el-checkbox
			slot="content-bottom"
			v-model="imageDelete"
		>
			Видалити зображення
		</el-checkbox>
	</basic-delete>
</template>

<script>
import BasicDelete from '@/components/dialogs/BasicDelete'
import sections from '@/data/sections'
import UserClass from '@/classes/User'

export default {
	components: {
		BasicDelete
	},
	inheritAttrs: false,
	props: {
		user: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			loading: false,
			imageDelete: true
		}
	},
	computed: {
		listeners() {
			return {
				...this.$listeners,
				submit: this.fetchRequest
			}
		},
		userClass() {
			return new UserClass(this.user)
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			this.$axios.delete(`users/${this.user.id}`, {
				data: {
					image_delete: this.image_delete
				}
			})
				.then(() => {
					this.$store.commit('template/REMOVE_SIDEBAR_ITEM', {
						section: sections.users,
						id: this.user.id
					})
					this.$emit('close')
					this.$router.push({ name: sections.users })
				})
				.finally(() => {
					this.loading = false
				})
		}
	}
}
</script>
