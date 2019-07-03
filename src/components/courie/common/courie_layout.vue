<template>
	<div id="courie">
		<Head></Head>
	
		<navigat></navigat>
	</div>
</template>

<script>
import Head from '../../reuse/Header';
import navigat from './Navigator';
export default{
  name: 'courie_layout',
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
	#courie{

		height: auto;
		width: 100%;		
		margin:10 px;
	}
</style>