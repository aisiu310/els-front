<template>
	<div id="shop">
		<Head></Head>
	
		<navigat></navigat>
	</div>
</template>

<script>
import Head from '../reuse/Header';
import navigat from '../reuse/Navigator';
export default{
  name: 'shop-layout',
  components:{
    Head,
    navigat
  },
  data(){
    return {
//    userRole: 'Topest',
    }
  },
}
</script>

<style>
	#shop{
		border: solid red 1px;	
		height: auto;
		width: 100%;		
		margin:10 px;
	}
</style>