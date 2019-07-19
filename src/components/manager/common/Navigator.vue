<template>
  <div>
    <div id="navigator">
      <div id="navigator-bar">
        <div id="navigator-bar-item">
          <ul>
            <li>
              <router-link to="/manager/check_list">
                <div @click="Input('单据审批')">单据审批</div>
              </router-link>
            </li>
            <li>
              <router-link to="/manager/adjust_people">
                <div @click="Input('人员调整')">人员调整</div>
              </router-link>
            </li>
            <li>
              <router-link to="/manager/adjust_organ">
                <div @click="Input('机构调整')">机构调整</div>
              </router-link>
            </li>
            <li>
              <router-link to="/manager/adjust_salary">
                <div @click="Input('薪水策略')">薪水策略</div>
              </router-link>
            </li>
            <li>
              <router-link to="/manager/adjust_charge">
                <div @click="Input('邮递收费策略')">邮递收费策略</div>
              </router-link>
            </li>
            <li>
              <router-link to="/manager/examine_log">
                <div @click="Input('日志')">日志</div>
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
      <p>{{name}}</p>
      <hr />
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
      job: "快递员",
      ename: "楚岩",
      date: "2019-7-9",
      depart: "营业厅",
      name: "寄件"
    };
  },
  methods: {
    Input(val) {
      this.name = val;
    }
  }
};
</script>

<style>
#main {
  border: 4px solid red;
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