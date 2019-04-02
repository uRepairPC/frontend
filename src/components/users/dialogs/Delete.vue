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

			UserClass.fetchDelete(this.user.id, {
				data: {
					image_delete: this.imageDelete
				}
			})
				.then(() => {
					this.$emit('delete')
					this.$emit('close')
				})
				.finally(() => {
					this.loading = false
				})
		}
	}
}
</script>
