<template>
	<div id="manager">
		<Head></Head>
	
		<navigat></navigat>
	</div>
</template>

<script>
import Head from '../../reuse/Header';
import navigat from './Navigator';
export default{
  name: 'manager_layout',
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
	#manager{

		height: auto;
		width: 100%;		
		margin:10 px;
	}
</style>