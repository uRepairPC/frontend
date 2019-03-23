<template>
	<transition name="search-anim">
		<div
			v-if="openSearch"
			class="root"
		>
			<div class="wrap">
				<div class="input">
					<el-input
						ref="input"
						v-model="input"
						placeholder="Введіть щось"
						prefix-icon="el-icon-search"
						clearable
					/>
				</div>
				{{ input }}
			</div>
		</div>
	</transition>
</template>

<script>
export default {
	data() {
		return {
			input: ''
		}
	},
	computed: {
		openSearch() {
			return this.$store.state.template.openSearch
		}
	},
	watch: {
		openSearch(val) {
			if (val) {
				this.$nextTick(() => this.$refs.input.focus())
				this.addEvent()
			} else {
				this.removeEvent()
			}
		}
	},
	methods: {
		onKeyDown(evt) {
			if (evt.key === 'Escape') {
				this.$store.commit('template/CLOSE_SEARCH')
			}
		},
		addEvent() {
			document.addEventListener('keydown', this.onKeyDown)
		},
		removeEvent() {
			document.removeEventListener('keydown', this.onKeyDown)
		}
	}
}
</script>

<style lang="scss" scoped>
.root {
	position: absolute;
	top: 60px;
	height: calc(100% - 60px);
	width: 100%;
	background: rgba(255, 255, 255, .8);
	overflow: auto;
}

.wrap {
	padding: 30px 20px;
}

.input {
	max-width: 600px;
	margin: 0 auto;
}

// <animation>
.search-anim-enter-active {
	transition: .2s;
	opacity: 0;
	.input {
		transition: .2s;
		opacity: 0;
		transform: translateY(-20px);
	}
}

.search-anim-enter-to {
	opacity: 1;
	.input {
		opacity: 1;
		transform: translateY(0);
	}
}

.search-anim-leave-active {
	transition: .2s;
	.input {
		transition: .2s;
	}
}

.search-anim-leave-to {
	opacity: 0;
	.input {
		transform: translateY(-30px);
	}
}
</style>
