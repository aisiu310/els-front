<template>
  <div>
    <div id="navigator">
      <div id="navigator-bar">
        <div id="navigator-bar-item">
          <ul>
            <li>
              <router-link to="/courie/sender_list">
                <div @click="Input('寄件')">寄件</div>
              </router-link>
            </li>
            <li>
              <router-link to="/courie/receive_list">
                <div @click="Input('确认收件')">确认收件</div>
              </router-link>
            </li>
            <li>
              <router-link to="/courie/retreat_list">
                <div @click="Input('退款')">退款</div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div id="employee-info">
        <div id="employee-photo">
          <img src="../../../assets/employee.png" />
        </div>
        <div id="employee-textinfo">
          <ul>
            <li>{{info}}</li>
            <li>{{job}}</li>
            <li>{{ename}}</li>
            <li>{{date}}</li>
            <li>{{depart}}</li>
          </ul>
        </div>
      </div>
    </div>
    <div id="main">
      <!-- <p>{{name}}</p>
      <hr />-->
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: "test",
      name: "👕",
      job: "业务员",
      ename: "楚岩",
      date: "2019-7-9",
      depart: "快递员",
      name: "基建"
    };
  },
  methods: {
    Input(val) {
      this.name = val;
    },
    mounted() {
      this.$root.Bus.$on("change", val => {
        this.name = val;
      });
    }
  }
};
</script>

<style>
#main {
  /* border: 4px solid red; */
  margin-left: 16%;
  width: 84%;
  padding: 1% 1% 0% 1%;
}
#main p {
  font-size: 2em;
}
#main hr {
  /*内嵌水平线*/
  width: 100%;
  margin: 0% 0% 1% 0%;

  border-top: 3px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}
#navigator {
  /*width: 238px;
		height: 780px;*/

  width: 16%;
  height: auto;
  /*border: 1px solid red;*/
  margin-top: 0px;
  background-color: black;
}
#navigator-bar {
  padding: 6% 0% 0% 0%;
  width: 100%;
  border: 0px solid green;
}
#navigator-bar-item {
  color: white;
  font-size: 1.6rem;
  text-align: center;
}
#navigator-bar-item li {
  padding: 4% 0% 4% 0%;
  /*border: solid 1px green;*/
}
#navigator-bar-item li:hover {
  color: black;
  background-color: white;

  -webkit-transition: all 0.4s;
  -moz-transition: all 0.4s;
  -ms-transition: all 0.4s;
  -o-transition: all 0.4s;
  transition: all 0.4s;
}

#employee-info {
  width: 100%;
  height: auto;
  padding: 30% 0% 0% 0%;

  border: 0px solid blueviolet;
}
#employee-photo {
  color: white;

  width: 100%;
  height: auto;
  text-align: center;
  /*padding: 0% 25% 0% 25%;*/

  border: 0px solid red;
}
#employee-textinfo {
  color: white;
  text-align: center;
  font-size: 20px;
}
#employee-textinfo ul {
  padding: 0% 0% 0% 0%;
}
#employee-textinfo li {
  padding: 2% 0% 4% 0%;
}
</style>