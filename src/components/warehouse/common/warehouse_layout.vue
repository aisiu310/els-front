<template>
	<div id="shop">
		<Head></Head>
	
		<navigat></navigat>
	</div>
</template>

<script>
import Head from '../../reuse/Header';
import navigat from './Navigator';
export default{
  name: 'warehouse_layout',
  components:{
    Head,
    navigat
  },
  data(){
    return {

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