<template>
	<transition
		name="anim"
		appear
	>
		<div class="template template-page">
			<div class="left-column">
				<slot name="left-column" />
			</div>
			<div class="right-column">
				<slot name="right-column" />
			</div>
		</div>
	</transition>
</template>

<style lang="scss" scoped>
@import "~scss/mobile/_sizes";
@import "~scss/_colors";

.anim-enter-active {
	transition: .25s opacity;
	opacity: 0;
}

.anim-enter-to {
	opacity: 1;
}

.anim-leave-active,
.anim-leave-to {
	display: none;
}

@media only screen and (max-width: $laptop) {
	.template-page {
		flex-direction: column-reverse;
		> .right-column {
			background: #fbfbfb;
			width: 100%;
			min-width: auto;
			border-left: 0;
			border-bottom: 1px solid $defaultBorder;
			padding: 15px;
		}
	}
}
</style>
