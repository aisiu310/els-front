<template>
	<div id="transit">
		<Head></Head>
		<navigat></navigat>   
	</div>
</template>

<script>
import Head from '../../reuse/Header';
import navigat from './Navigator';
// import arrive_list from '../arrive_list'

export default{
  name: 'transit_layout',
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
	#transit{

		height: auto;
		width: 100%;		
		margin:10 px;
	}
</style>