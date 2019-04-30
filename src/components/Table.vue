<template>
	<el-table
		ref="table"
		v-loading="loading"
		:data="list.data || []"
		stripe
		height="100%"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<el-table-column
			v-for="(column, index) in columns"
			:key="index"
			v-bind="column"
		>
			<template slot-scope="{ row }">
				<column-data
					:column="column"
					:value="row[column.prop]"
				>
					<slot
						:column="column"
						:row="row[column.prop]"
					>
						{{ isEmpty(row[column.prop]) ? null : row[column.prop] }}
					</slot>
				</column-data>
			</template>
		</el-table-column>
	</el-table>
</template>

<script>
import { isEmpty } from '@/scripts/helpers'

/** @var {number} - px */
const OFFSET_BOTTOM = 300

/** @var {number} - milliseconds */
const WAIT_TIMEOUT = 150

export default {
	components: {
		ColumnData: () => import('@/components/ColumnData')
	},
	props: {
		list: {
			type: Object,
			required: true
		},
		columns: {
			type: Array,
			required: true
		},
		loading: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			wrapperEl: null
		}
	},
	mounted() {
		/*
		 * Desktop - scroll on element
		 * Mobile - scroll on window
		 */
		this.wrapperEl = this.$refs.table.$el.querySelector('.el-table__body-wrapper')

		this.wrapperEl.addEventListener('scroll', this.onElementScroll)
		window.addEventListener('scroll', this.onWindowScroll)
	},
	activated() {
		window.addEventListener('scroll', this.onWindowScroll)
	},
	deactivated() {
		window.removeEventListener('scroll', this.onWindowScroll)
	},
	beforeDestroy() {
		window.removeEventListener('scroll', this.onWindowScroll)
	},
	methods: {
		isEmpty,
		emitFetch() {
			if (!this.loading && this.list.current_page < this.list.last_page) {
				this.$emit('fetch', this.list.current_page + 1)
			}
		},
		wrapperElDisplayed() {
			return this.wrapperEl.scrollHeight === 0
		},
		onWindowScroll() {
			clearTimeout(this._timeoutWindowScroll)

			this._timeoutWindowScroll = setTimeout(() => {
				if (this.wrapperElDisplayed()) {
					return
				}

				if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - OFFSET_BOTTOM) {
					this.emitFetch()
				}
			}, WAIT_TIMEOUT)
		},
		onElementScroll() {
			clearTimeout(this._timeoutElementScroll)

			this._timeoutElementScroll = setTimeout(() => {
				if (this.wrapperElDisplayed() || this.wrapperEl.scrollTop <= 0) {
					return
				}

				if (this.wrapperEl.scrollTop + this.wrapperEl.offsetHeight >= this.wrapperEl.scrollHeight - OFFSET_BOTTOM) {
					this.emitFetch()
				}
			}, WAIT_TIMEOUT)
		}
	}
}
</script>

<style lang="scss" scoped>
@import "~scss/mobile/_sizes";
@import "~scss/keyframes";

.loading {
	/deep/ .el-table__row {
		height: 48px;
	}
	/deep/ tbody tr:nth-last-child(-n + 10) .cell {
		width: 80%;
		height: 10px;
		margin: 0 auto;
		@include contentLoader;
	}
}

/deep/ .el-table__row {
	cursor: pointer;
}

/deep/ th .cell {
	white-space: nowrap;
}

@media only screen and (max-width: $laptop) {
	/deep/ .el-table__body-wrapper {
		height: auto !important;
	}
}
</style>
