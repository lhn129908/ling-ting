<template>
	<button type="default" v-on:click="aaaa">qweqw</button>
</template>
<script>
	export default {
		data() {
			return {
				liebiao:[
					{
						id:33894312,
						name:"33",
						zuoze:"12"
					},
					{
						id:33894313,
						name:"33",
						zuoze:"13"
					},
					{
						id:33894314,
						name:"33",
						zuoze:"14"
					},
					{
						id:33894315,
						name:"33",
						zuoze:"15"
					}
				]
			}
		},
		onLoad() {
		},
		methods: {
			aaaa(){
				uni.navigateTo({
					url:"/pages/control/control?id=33894312&i=3"
				});
			}
		}
	}
</script>

<style>

</style>
