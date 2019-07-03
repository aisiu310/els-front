<template>
  <div id="app">
	<router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App'

}
</script>

<style>
	#app {
		border: solid red 0px;	
		height: auto;
		width: 100%;		
		margin:10 px;

		
		/*background-image: url(assets/background/wl.jpg);*/
		
	  background-size:cover;
	  /*max-width:100%;/*限制图片的宽度不超过其父元素*/
	}

</style>
