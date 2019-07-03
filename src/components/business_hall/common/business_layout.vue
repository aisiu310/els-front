<template>
	<div id="business">
		<Head></Head>
	
		<navigat></navigat>
	</div>
</template>

<script>
import Head from '../../reuse/Header';
import navigat from './Navigator';
export default{
  name: 'business_layout',
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
	#business{

		height: auto;
		width: 100%;		
		margin:10 px;
	}
</style>