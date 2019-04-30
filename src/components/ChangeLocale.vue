<template>
	<el-select v-model="locale">
		<el-option
			v-for="(name, key) in list"
			:key="key"
			:label="name"
			:value="key">
			<span>{{ name }}</span>
		</el-option>
	</el-select>
</template>

<script>
import Lang from '@/classes/Lang'

export default {
	data() {
		return {
			list: {
				en: 'English',
				ru: 'Русский',
				uk: 'Українська'
			}
		}
	},
	computed: {
		locale: {
			get() {
				return this.$i18n.locale
			},
			set(value) {
				Lang.setLocale(value)
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.change-locale {
	position: absolute;
}
</style>
