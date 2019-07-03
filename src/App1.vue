<template>
  <div id="app">
    <!-- <h></h>
    <n></n> -->
	<router-view></router-view>
  </div>
</template>

<script>
// import h from './components/reuse/Header';
// import n from './components/reuse/Navigator'
export default {
  name: 'App'
//   components:{
//     h,n
//   }
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
