<template>
  <div id="header">
    <div id="company-name">{{name}}</div>
    
    <div id="check">
				<p>{{check}}</p>
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
</script>

<style>
#header {
  width: 100%;
  height: 100px;
  position: relative ;
  background-color: black;
}
#company-name {
  width: auto;
	height: auto;
	margin: 2% 0% 0% 2%;
	position: absolute;	
  color: white;
  font-family: "Brush Script Std";
  font-size: 3.5em;
  text-align: center;
  /* border: solid red 1px; */
}
#check {
  width: 600px;
  height: auto;
  position: relative;
  /* border: solid red 1px; */
  top: 40%;
  left: 40%;
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
#icon-box {
  color: white;
  width: auto;
  height: auto;
  font-size: 2rem;
  margin: 0% 0% 0% 94%;
/* 
  border: solid white 1px; */
}
</style>
