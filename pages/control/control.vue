<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id:null
			}
		},
		onLoad(options,e) {
			this.id=options.id
			console.log(this.id)
			console.log(e)
			console.log(JSON.parse(e.liebiao) )
		},
		// onLoad(e) {
		// 	console.log(e)
		// 	console.log(JSON.parse(e.liebiao) )
		// },
		methods: {
			
		}
	}
</script>

<style>

</style>
