<template>
	<div id="navigator">	
		<div id="navigator-bar">
			<div id="navigator-bar-item">
				<ul>
					<li>单据审批</li>
					<li>人员调整</li>
					<li>机构调整</li>
					<li>薪水策略</li>
					<li>邮递收费策略</li>
					<li>日志</li>
				</ul>

			</div>
		</div>
		<div id="employee-info">
			<div id="employee-photo">
				<img src="../../../assets/employee.png" />
			</div>
			<div id="employee-textinfo">
				<ul>
					<li>这里是个人信息{{}}</li>
					<li>这里是职位{{}}</li>
					<li>这里是姓名{{}}</li>
					<li>这里是日期{{}}</li>
					<li>这里是部门{{}}</li>
				</ul>
			</div>		
    	</div>
	</div>
</template>

<script>
	export default{				
		
	}
</script>

<style>
	#navigator{
		/*width: 238px;
		height: 780px;*/
		
		width: 16%;
        height: auto;
		/*border: 1px solid red;*/
		margin-top: 0px;
		background-color: black;
	}
	#navigator-bar{
		padding: 6% 0% 0% 0%;
		width: 100%;
		border: 0px solid green;
	}
	#navigator-bar-item {
		color: white;
		font-size: 1.6rem;
		text-align: center;
	}
	#navigator-bar-item li{
		padding: 4% 0% 4% 0%;
		/*border: solid 1px green;*/		
	}
	#navigator-bar-item li:hover{
		color: black;
		background-color: white;
		
		-webkit-transition: all .4s; 
        -moz-transition: all .4s; 
        -ms-transition: all .4s; 
        -o-transition: all .4s; 
        transition: all .4s;				
	}
	
	#employee-info{
				
		width: 100%;
		height: auto;
		padding:30% 0% 0% 0%;
		
		border: 0px solid blueviolet;
	}
	#employee-photo{
		color: white;
			
		width: 100%;
		height: auto;
		text-align: center;
		/*padding: 0% 25% 0% 25%;*/
		
		border: 0px solid red;
	}
	#employee-textinfo{
		color: white;
		text-align: center;
		font-size: 20px;
	}
	#employee-textinfo ul{
		padding: 0% 0% 0% 0%;
	}
	#employee-textinfo li{
		padding: 2% 0% 4% 0%;
	}
</style>