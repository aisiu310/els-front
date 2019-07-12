<template>
    <div>
        <Tabs>
            <TabPane label="接收管理" icon="md-clipboard">
                <Table stripe border :columns="columns" :data="data" @on-selection-change="select">          
                    <template slot-scope="{row,index}" slot="date">
                        <input type="text" v-model="editDate" v-if="editIndex === index"/>
                        <span v-else>{{row.date}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="number">
                        <input type="text" v-model="editNumber" v-if="editIndex === index"/>
                        <span v-else>{{row.number}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="address">
                        <input type="text" v-model="editAddress" v-if="editIndex === index"/>
                        <span v-else>{{row.address}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="state">
                        <input type="text" v-model="editState" v-if="editIndex === index"/>
                        <span v-else>{{row.state}}</span>
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
                        </div>
                    </template>
                </Table>
                <Button type="error" id="delete_button" :v-bind="sel"  @click="deleteAll(sel)">删除</Button>
                <div id="arrive_list_add">
                    <Button type="primary" @click="modal = true">添加</Button>
                    <Modal 
                        v-model="modal" 
                        title="添加" 
                        @on-click="ok" 
                        @on-cancle="cancle">
                        <Form :model="formItem" :label-width="80">
                            <FormItem label="DatePicker">
                                <Row>
                                    <Col span="11">
                                        <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
                                    </Col>
                                    <Col span="2" style="text-align: center">-</Col>
                                    <Col span="11">
                                        <TimePicker type="time" placeholder="Select time" v-model="formItem.time"></TimePicker>
                                    </Col>
                                </Row>
                            </FormItem>

                            <FormItem label="Address">
                                <Input v-model="formItem.input" placeholder="Enter something..."></Input>
                            </FormItem>
                            <FormItem label="State">
                                <Select v-model="formItem.select">
                                <Option value="arrive">arrive</Option>
                                <Option value="transfer">transfer</Option>
                                </Select>
                            </FormItem>
                        </Form>
                    </Modal>
                </div>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="sum" @on-change="changePage"  show-elevator show-total></Page>
                    </div>
                </div>
            </TabPane>
            <TabPane label="历史记录" icon="ios-clock-outline"></TabPane>
        </Tabs>
    </div>

</template>
<script>
export default {   
    data(){
        return {
            formItem: {
                input: '',
                select: '',             
                date: '',
                time: '',
            },
            modal:false,
            sel:[],
            columns: [
                {
                    type: 'selection',
                    width: 60,
                    align: 'center'
                },
                {
                    title: 'ArriveDate',
                    slot: 'date',
                    sortable: true
                },
                {
                    title: 'Number',
                    slot: 'number',
                    sortable: true
                },
                {
                    title: 'Address',
                    slot: 'address'
                },
                {
                    title: 'State',
                    slot: 'state',
                    filters:[
                        {
                            label: 'arrive',
                            value: 'arrive'
                        },
                        {   
                            label: 'transfer',
                            value: 'transfer'
                        }
                    ],
                    filterMultiple: true,
                    filterMethod (value, row) {
                        return row.state.indexOf(value) > -1;
                        // if (value === 1) {
                        //     return row.state = 'arrive';
                        // } else if (value === 2) {
                        //     return row.state = 'transfer';
                        // }
                    }
                },  
                {
                    title: '操作',
                    slot: 'action'
                }                           
            ],
            data: [],
            pagedata:[],
            editIndex: -1,  // 当前聚焦的输入框的行数
            editDate: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
            editNumber: '',  // 第二列输入框
            editAddress: '',  // 第三列输入框
            editState: '',  // 第四列输入框
            sum: 0
        }
    },
    created(){
        var pagedata = [
            {
                date: '2016-10-03',                       
                number: 1,
                address: 'New York No. 1 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-01',
                number: 2,
                address: 'London No. 1 Lake Park',
                state: 'transfer',                       
            },
            {                        
                date: '2016-10-02',
                number: 3,
                address: 'Sydney No. 1 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 4,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 5,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 6,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 7,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 8,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 9,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 10,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 11,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 12,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 13,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 14,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 15,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 16,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 17,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 18,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 19,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 20,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 21,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 22,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 23,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 24,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            },
            {
                date: '2016-10-04',                       
                number: 25,
                address: 'Ottawa No. 2 Lake Park',
                state: 'arrive',
            }
        ];  
        this.sum = pagedata.length;
        this.pagedata = pagedata;
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
        });
    },
    mounted(){        
        this.data = this.pagedata.slice(0,10);          
    },
    methods:{
        ok(){
            alert('我被调用了');
            if(this.formItem.input||this.formItem.date||this.formItem.time||this.formItem.select){
                this.$Message.error('输入为空')
            }else{
                // Vue.axios.get(api).then((response) => {
                //     console.log(response.data)
                // })
                update();
                this.$Message.success('添加成功');
            }
        },
        update(){
            alert('更新数据');
        },
        cancle(){
            this.$Message.info('取消');
        },
        select(selection,row){                 
            console.log(selection);
            this.sel = selection;
        },
        deleteAll(sel){
            console.log('delete',sel);
            if(sel.length){
                sel.forEach(element => {
                    console.log(element.number)
                    this.data.splice(element.number,1)
                    this.sum = this.data.length
                });
                alert("删除成功")
            }else{
                alert("你还没有选择")
            }
        },
        handleEdit (row, index) {
            this.editDate = row.date;
            this.editNumber = row.number;
            this.editAddress = row.address;
            this.editState = row.state;
            this.editIndex = index;
        },
        handleSave (index) {
            this.data[index].date = this.editDate;
            this.data[index].number = this.editNumber;
            this.data[index].address = this.editAddress;
            this.data[index].state = this.editState;
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
            console.log(this.pagedata);
            this.data = this.pagedata.slice((Page-1)*10,Page*10);          
        },        
    }
}
</script>
<style >
  #delete_button{
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
