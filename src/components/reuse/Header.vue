<template>
	<div >
		<div id="header">	
			<div id="company-name">
				{{name}}
			</div>
			<div id="check">
				<p>{{check}}</p>
				<Button type="info">立即审核</Button>
			</div>			
			<div id="icon-box">
				<Tooltip content="退出">
					<Icon type="ios-log-out"  @click="outSystem"/>
				</Tooltip>
			</div>			
		</div>
		
	</div>
</template>

<script>
	export default{		
		data(){
			return{
				name:'Express System',
				check:'今日共有256条记录待审核'
			}			
		},
		 methods: {
    		outSystem() { //退出系统
      		localStorage.setItem("userRole", 'unload')
      		// 跳转到登录页的时候顺便刷新
      		window.location.href = window.location.origin + window.location.pathname
    },
  },
	}
</script>

<style>	
	#header{
		height: 118px;
		width: 100%;
		position: relative ;
		background-color: black;	

		border: 0px solid red;
	}
	#company-name{			
		width: auto;
		height: auto;
		margin: 2% 0% 0% 2%;
		position: absolute;		
		border: 0px solid red;	
		
		color: white;
		font-family: "楷体";	
		font-weight: bold;
		font-size: 4rem;	
		font-size: 40px;
		color: white;
		text-align: left;	
	}	
	#check{
		width: 600px;
		height: auto;
		position: relative;
		top: 40%;
		left: 40%;
				
		border: solid white 0px;
	}
	#check p{		
		width: auto;
		float: left;
		
		color: white;
		font-size: 1.8rem;
		border: solid white 0px;
	}
	#check button{
		width: auto;	
		font-size: 1.2rem;
		margin-left: 3%;
	}
	#icon-box{
		color: white;
		width: auto;
		height: auto;
		font-size: 2rem;
		margin: 0% 0% 0% 94%;

		/*border: solid white 1px;*/
	}
</style>
