<template>
<diV>
  <div class="navi">
    <!-- <Menu :mode="horizontal" :theme="dark">
      <MenuItem key="1">
        <router-link to="/business_hall/business_loadcar_list">
          <div>装车管理</div>
        </router-link>
      </MenuItem>
      <MenuItem>
        <router-link to="/business_hall/business_arrive_list">
          <div>接收管理</div>
        </router-link>
      </MenuItem>
      <MenuItem>
        <router-link to="/business_hall/business_deliver_list">
          <div>派件管理</div>
        </router-link>
      </MenuItem>
      <MenuItem>
        <router-link to="/business_hall/business_car_info">
          <div>车辆管理</div>
        </router-link>
      </MenuItem>
      <MenuItem>
        <router-link to="/business_hall/business_driver_info">
          <div>司机管理</div>
        </router-link>
      </MenuItem>
      <MenuItem>
        <router-link to="/business_hall/business_receipt_list_test">
          <div>收款管理</div>
        </router-link>
      </MenuItem>
    </Menu> -->
    <div id="navigator">
      <div id="navigator-bar">
        <div id="navigator-bar-item">
          

          <ul>
            <li>
              <router-link to="/business_hall/business_loadcar_list">
                <div>装车管理</div>
              </router-link>
            </li>
            <li>
              <router-link to="/business_hall/business_arrive_list">
                <div>接收管理</div>
              </router-link>
            </li>
            <li>
              <router-link to="/business_hall/business_deliver_list">
                <div>派件管理</div>
              </router-link>
            </li>
            <li>
              <router-link to="/business_hall/business_car_info">
                <div>车辆管理</div>
              </router-link>
            </li>
            <li>
              <router-link to="/business_hall/business_driver_info">
                <div>司机管理</div>
              </router-link>
            </li>
            <li>
              <router-link to="/business_hall/business_receipt_record">
                <div>收款管理</div>
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
  </div>
  <div id="main">
    <!-- <p>{{name}}</p>
    <hr />-->
    <router-view></router-view>
  </div>
  </div>
</template>

<script>
import Bus from "../../reuse/bus";
export default {
  data() {
    return {
      info: "test",
      job: "业务员",
      ename: "楚岩",
      date: "2019-7-9",
      depart: "营业厅",
      name: "车辆装车"
    };
  },
  created() {
    // Bus.$emit('setBusiness','雨花台');
    sessionStorage.setItem("business", "雨花台营业厅");
  },
  methods: {
    // Input(val) {
    //   this.name = val;
    // },
    test() {
      Bus.$on("setBusiness", content => {
        alert(content);
      });
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
/* .navi{
  float: left;
} */
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
  /* border: 1px solid red; */
  margin-top: 0px;
  background-color: black;

  float: left;
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
