<template>
<<<<<<< HEAD
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
=======
  <div id="header">
    <div id="company-name">{{name}}</div>
    
    <div class="check">
      {{check}}
      <Button type="info">立即审核</Button>
    </div>

    <div id="icon-box">
      <Tooltip content="退出">
        {{username}}
        <Icon type="ios-log-out" @click="exit()" />
      </Tooltip>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "Express System",
      username: "",
      check: "今日共有256条记录待审核",
      search_value: ""
    };
  },
  created() {
    this.username = this.$route.params.user;
  },
  methods: {
    search(search_value) {
      alert(search_value);
    },
    exit() {
      this.$router.push({ path: "/" });
    }
  }
};
>>>>>>> 90884f4a84c407d4104efb4b91924d745339eb48
</script>

<style>
#header {
  width: 100%;
  height: 100px;
  background-color: black;
  display: flex;
}
#company-name {
  width: 30%;
  height: 60px;
  margin-top: 20px;
  color: white;
  font-family: "Brush Script Std";
  font-size: 40px;
  text-align: center;
}
.check {
  width: 60%;
  height: 60px;
  font-size: 20px;
  background-color: #fff;
}

#icon-box {
  color: white;
  width: auto;
  height: auto;
  font-size: 2rem;
  margin: 0% 0% 0% 94%;

  /*border: solid white 1px;*/
}
</style>
