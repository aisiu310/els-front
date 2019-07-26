<template>
  <div>
    <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
      <template slot-scope="{row,index}" hidden slot="date">
        <span>{{row.id}}</span>
      </template>
      <template slot-scope="{row,index}" slot="code">
        <input type="text" v-model="editItem.code" v-if="editIndex === index" />
        <span v-else>{{row.code}}</span>
      </template>
      <template slot-scope="{row,index}" slot="arriveDate">
        <input type="text" v-model="editItem.arriveDate" v-if="editIndex === index" />
        <span v-else>{{row.arriveDate}}</span>
      </template>
      <template slot-scope="{row,index}" slot="transferId">
        <input type="text" v-model="editItem.transferId" v-if="editIndex === index" />
        <span v-else>{{row.transferId}}</span>
      </template>
      <template slot-scope="{row,index}" slot="placeOfDeparture">
        <input type="text" v-model="editItem.placeOfDeparture" v-if="editIndex === index" />
        <span v-else>{{row.placeOfDeparture}}</span>
      </template>
      <template slot-scope="{row,index}" slot="goodsState">
        <input type="text" v-model="editItem.goodsState" v-if="editIndex === index" />
        <span v-else>{{row.goodsState}}</span>
      </template>
      <template slot-scope="{row,index}" slot="state">
        <span>{{row.state}}</span>
      </template>
      <template slot-scope="{ row }" slot="date">
        <strong>{{ row.date }}</strong>
      </template>
      <template slot-scope="{row,index}" slot="action">
        <div v-if="editIndex === index">
          <Button v-bind="editItem" @click="handleSave(index,editItem)">保存</Button>
          <Button @click="editIndex = -1">取消</Button>
        </div>
        <div v-else>
          <Button @click="handleEdit(row,index)">修改</Button>
        </div>
      </template>
    </Table>
    <!-- 页码 -->
    <div style="margin: 10px;overflow: hidden">
      <div style="float: right;">
        <Page
          :total="sum"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
          show-sizer
          :courent="currentPage"
          :page-size="pageSize"
          show-elevator
          show-total
        ></Page>
      </div>
    </div>
  </div>
</template>
<script>
import { api } from "../api";
export default {
  data() {
    return {
      currentPage: 1,
      pageSize: 10,
      sum: 0,
      data: [],
      businessHallCode: sessionStorage.getItem("businessHallCode"),
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "营业厅编号",
          slot: "code"
        },
        {
          title: "到达日期",
          slot: "arriveDate",
          sortable: true
        },
        {
          title: "中转单编号",
          slot: "transferId"
        },
        {
          title: "出发地",
          slot: "placeOfDeparture"
        },
        {
          title: "货物状态（损坏、完整、丢失）",
          slot: "goodsState"
        },
        {
          title: "审核状态",
          slot: "state"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      editIndex: -1, // 当前聚焦的输入框的行数
      editItem: {
        id: "",
        code: "",
        arriveDate: "",
        transferId: "",
        placeOfDeparture: "",
        goodsState: ""
      }
    };
  },
  mounted() {
    this.getArriveList(this.currentPage, this.pageSize);
  },
  watch: {
    "$store.state.businessHall.monitOption": function() {
      this.getArriveList(this.currentPage, this.pageSize);
    }
  },
  methods: {
    getArriveList(currentPage, pageSize) {
      const self = this;
      api
        .getArriveList(currentPage, pageSize)
        .then(response => {
          console.log(response);
          if (response.data.status === 200) {
            self.data = response.data.data.list;
            self.sum = response.data.data.total;
          }
        })
        .catch(function(error) {
          self.$Message.error("请求超时,加载本地数据");
        });
    },
    handleEdit(row, index) {
      this.editItem.id = row.id;
      this.editItem.code = row.code;
      this.editItem.arriveDate = row.arriveDate;
      this.editItem.transferId = row.transferId;
      this.editItem.placeOfDeparture = row.placeOfDeparture;
      this.editItem.goodsState = row.goodsState;
      this.editIndex = index;
    },
    handleSave(index, editItem) {
      const self = this;
      api
        .arriveListSave(editItem)
        .then(response => {
          console.log(response);
          if (response.data) {
            this.getArriveList(this.currentPage, this.pageSize);
            this.$Message.success("修改成功");
          } else {
            this.$Message.error("没有获取到数据");
          }
        })
        .catch(error => {
          self.$Message.error(response.date.msg);
        });
      this.editIndex = -1;
    },
    select(selection, row) {
      this.$store.commit("setSelectInfo", selection);
    },
    changePage(page) {
      this.getArriveList(page, this.pageSize);
    },
    changePageSize(pageSize) {
      this.getArriveList(this.currentPage, pageSize);
    }
  }
};
</script>

