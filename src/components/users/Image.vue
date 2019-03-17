<template>
	<div class="user-image">
		<div
			:class="['image', {
				'image_has': !!user.image
			}]"
			:style="userClass.backgroundImage"
		>
			<template v-if="!user.image">
				<i class="material-icons">face</i>
				{{ userClass.initials }}
			</template>
		</div>
		<div class="name">
			{{ userClass.fullName }}
		</div>
	</div>
</template>

<script>
import UserClass from '@/classes/User'

export default {
	props: {
		user: {
			type: Object,
			required: true
		}
	},
	computed: {
		userClass() {
			return new UserClass(this.user)
		}
	}
}
</script>

<style lang="scss" scoped>
.image {
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	font-weight: bold;
	font-size: 2rem;
	width: 150px;
	height: 150px;
	background-repeat: no-repeat;
	background-size: cover;
	background-position: 50% 50%;
	border-radius: 50%;
	margin: 0 auto;
	color: #000;
	border: 3px solid;
	> i {
		margin-bottom: 10px;
	}
	&.image_has {
		border: 0;
	}
}

.name {
	margin-top: 30px;
	font-weight: bold;
	font-size: 1.5rem;
}
</style>
