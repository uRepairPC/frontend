<template>
	<filter-basic
		title="Пошук"
		class="filter-search"
	>
		<el-alert
			title="Пошук відбувається по всім колонках, які відображені в таблиці."
			type="info"
		/>
		<el-input
			size="small"
			placeholder="Пошук по таблиці"
		/>
	</filter-basic>
</template>

<script>
export default {
	name: 'FilterSearch'
}
</script>
