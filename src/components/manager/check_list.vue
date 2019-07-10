<template>
    <div>
        <div id="search">
            <Input search enter-button placeholder="请输入订单号" @/>
        </div>
        <Table stripe border :columns="columns" :data="data" @on-selection-change="select">
            <template slot-scope="{row,index}" slot="number">
                <input type="text" v-model="editNumber" v-if="editIndex === index"/>
                <span v-else>{{row.number}}</span>
            </template>
            <template slot-scope="{row,index}" slot="type">
                <input type="text" v-model="editType" v-if="editIndex === index"/>
                <span v-else>{{row.type}}</span>
            </template> 
            <template slot-scope="{row,index}" slot="people">
                <input type="text" v-model="editPeople" v-if="editIndex === index"/>
                <span v-else>{{row.people}}</span>
            </template>
            <template slot-scope="{row,index}" slot="date">
                <input type="text" v-model="editDate" v-if="editIndex === index"/>
                <span v-else>{{row.date}}</span>
            </template>                      
            <template slot-scope="{ row }" slot="date">
                <strong>{{ row.date }}</strong>
            </template>

            <template slot-scope="{row,index}" slot="action">               
                <div v-if="editIndex === index">
                    <Button @click="handleSave(index)">save</Button>
                    <Button @click="editIndex = -1">cancel</Button>
                </div>
                <div v-else>
                    <Button @click="handleEdit(row,index)">操作</Button>
                    <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">View</Button>
                    <Button type="error" size="small" @click="remove(index)">Delete</Button>
                    <Button type="success">审核</Button>
                </div>
            </template>
        </Table>
        <Button type="success" id="check_button" :v-bind="sel"  @click="checkAll(sel)">一键审核</Button>
        <div id="arrive_list_add">
            <!-- <AB></AB> -->
        </div>
        <div style="margin: 10px;overflow: hidden">
            <div style="float: right;">
                <Page :total="sum" @on-change="changePage"  show-elevator show-total></Page>
            </div>
        </div>
    </div>

</template>
<script>
// import AB from './arrive_list_add'
export default {
    // components:{
    //     AB 
    // },
    data(){
        return {
            sel:[],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: '订单号',
                    slot: 'number',
                    sortable: true
                },
                {
                    title: '订单种类',
                    slot: 'type',
                    sortable: true
                },
                {
                    title: '责任人',
                    slot: 'people'
                },
                {
                    title: '申报时间',
                    slot: 'date',
                },  
                {
                    title: '操作',
                    slot: 'action'
                }                           
            ],
            data: [],
            editIndex: -1,  // 当前聚焦的输入框的行数          
            editNumber: '',  // 第二列输入框
            editType: '',  // 第三列输入框
            editPeople: '',  // 第四列输入框
            editDate: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
            sum: 0
        }
    },
    created(){
        this.$axios({
            // method:'post',
            // url:'api',
            // data:this.qs.string({    //这里是发送给后台的数据
            //         userId:this.userId,
            //         token:this.token,
            // })
        }).then((response) =>{          //这里使用了ES6的语法
            console.log(response)       //请求成功返回的数据
        }).catch((error) =>{
            console.log(error)       //请求失败返回的数据
        }),
        console.log(this.sel);
    },
    mounted(){
        var pagedata = [
                {
                    date: '2016-10-03',                       
                    number: 1,
                    type: 'New York No. 1 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-01',
                    number: 2,
                    type: 'London No. 1 Lake Park',
                    people: 'transfer',                       
                },
                {                        
                    date: '2016-10-02',
                    number: 3,
                    type: 'Sydney No. 1 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 4,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 5,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 6,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 7,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 8,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 9,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 10,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 11,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 12,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 13,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 14,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 15,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 16,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 17,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 18,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 19,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 20,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 21,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 22,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 23,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 24,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 25,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                }
            ];        
            this.sum = pagedata.length;
            this.data = pagedata.splice(0,10);
    },
    methods:{
        select(selection,row){                 
            console.log(selection);
            this.sel = selection;
        },
        checkAll(sel){
            console.log(1,sel)
            if(sel.length !=0){
                alert("审核成功")
                Alert("test")
            }else{
                alert("你还没有选择")
            }
        },
        handleEdit (row, index) {
            this.editNumber = row.number;
            this.editType = row.type;
            this.editPeople = row.people;
            this.editDate = row.date;
            this.editIndex = index;
        },
        handleSave (index) {
            this.data[index].number = this.editNumber;
            this.data[index].type = this.editType;
            this.data[index].people = this.editPeople;
            this.data[index].date = this.editDate;
            this.editIndex = -1;
        },
        show (index) {
            this.$Modal.info({
                title: 'Arrive Date',
                content: `Date：${this.data[index].date}<br>ListNumber：${this.data[index].number}<br>Address：${this.data[index].address}<br>State:${this.data[index].state}`
            })
        },
        remove (index) {
            this.data.splice(index, 1);
        },
        changePage(Page) {
            var pagedata = [
                    {
                    date: '2016-10-03',                       
                    number: 1,
                    type: 'New York No. 1 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-01',
                    number: 2,
                    type: 'London No. 1 Lake Park',
                    people: 'transfer',                       
                },
                {                        
                    date: '2016-10-02',
                    number: 3,
                    type: 'Sydney No. 1 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 4,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 5,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 6,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 7,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 8,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 9,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 10,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 11,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 12,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 13,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 14,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 15,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 16,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 17,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 18,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 19,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 20,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 21,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 22,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 23,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 24,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                },
                {
                    date: '2016-10-04',                       
                    number: 25,
                    type: 'Ottawa No. 2 Lake Park',
                    people: 'arrive',
                }
            ];                   

            this.data = pagedata.slice((Page-1)*10,Page*10);
            console.log((Page-1)*1,Page*10);
        },      
    }
}
</script>
<style>
  #search{
    margin: 10px;
    width: 25%
  }
  #check_button{
      margin: 10px;
      float:left;
  }
  #arrive_list_add{
      border: 0px solid rebeccapurple;
      margin: 10px;
      width: auto;
      height: auto;
      float:left;
  }
</style>
