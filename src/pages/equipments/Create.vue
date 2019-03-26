<template>
	<div class="user">
		<div class="wrap">
			<div class="title">
				{{ titlePage }}
			</div>
			<el-form
				ref="form"
				:model="form"
				:rules="rules"
				status-icon
				class="form--full"
				@submit.native.prevent="onSubmit"
			>
				<el-form-item
					prop="equipment"
					label="Тип, Виробник, Модель"
				>
					<equipment-cascader v-model="form.equipment" />
				</el-form-item>
				<el-form-item
					prop="serial_number"
					label="Серійний номер"
				>
					<el-input
						v-model="form.serial_number"
						placeholder="Серійний номер"
					/>
				</el-form-item>
				<el-form-item
					prop="inventory_number"
					label="Інвертарний номер"
				>
					<el-input
						v-model="form.inventory_number"
						placeholder="Інвертарний номер"
					/>
				</el-form-item>
				<div class="btn-wrap">
					<el-button
						type="primary"
						:loading="loading"
						:disabled="loading"
						class="btn"
						@click="onSubmit"
					>
						Створити
					</el-button>
				</div>
			</el-form>
		</div>
	</div>
</template>

<script>
import EquipmentCascader from '@/components/equipments/Cascader'
import breadcrumbs from '@/mixins/breadcrumbs'
import { required } from '@/data/rules'
import sections from '@/data/sections'
import menu from '@/data/menu'

export default {
	breadcrumbs: [
		{ title: menu[sections.equipments].title, routeName: sections.equipments },
		{ title: menu[sections.equipments].children.add.title }
	],
	components: {
		EquipmentCascader
	},
	mixins: [
		breadcrumbs
	],
	data() {
		return {
			loading: false,
			form: {},
			rules: {
				equipment: required
			}
		}
	},
	computed: {
		titlePage() {
			return menu[sections.equipments].children.add.title
		},
		profile() {
			return this.$store.state.profile.user
		}
	},
	methods: {
		fetchRequest() {
			this.loading = true

			this.$axios.post('equipments', {
				inventory_number: this.form.inventory_number,
				serial_number: this.form.serial_number,
				type_id: this.form.equipment[0],
				manufacturer_id: this.form.equipment[1],
				model_id: this.form.equipment[2]
			})
				.then(({ data }) => {
					this.$store.dispatch('template/addSidebarItem', {
						section: sections.equipments,
						data: data.equipment
					})
					this.$router.push({ name: `${sections.equipments}-id`, params: { id: data.equipment.id } })
				})
				.catch(() => {
					this.loading = false
				})
		},
		onSubmit() {
			this.$refs.form.validate((valid) => {
				if (!valid) {
					return
				}

				this.fetchRequest()
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.wrap {
	padding: 10px 20px 40px;
	max-width: 550px;
	margin: 0 auto;
}

.title {
	text-align: center;
	font-size: 1.5rem;
	font-weight: bold;
	margin: 25px 15px;
}

.el-select {
	width: 100%;
}

.btn-wrap {
	text-align: center;
	button {
		max-width: 200px;
		width: 100%;
	}
}

/deep/ .el-form-item__label {
	float: none;
}
</style>
