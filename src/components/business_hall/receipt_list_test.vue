<template>
    <div>
        <Tabs>
            <TabPane label="收款记录" icon="logo-yen">
                <div id="split">
                    <Split v-model="split">               
                        <div slot="left" id="left">
                            <h1 style="text-align: center">快递员信息</h1><hr>
                            <Scroll :on-reach-bottom="handleReachBottom" height="720" loading-text="人员信息加载ing">                        
                                <Card :bordered="true" v-for="(item,index) in list1" id="card" @click.native="showlist('褚岩')" :v-bind="name" :key="index">                          
                                    <p slot="title">
                                        褚岩   
                                        <Badge :count="10" id="hint"></Badge >                            
                                        <Icon type="ios-notifications-outline" style="margin-left:6.5em" size="24"></Icon>                                                                  
                                    </p>  
                                    <p>2019-7-10日，{{item}}条收款记录                               
                                    </p>
                                </Card>                        
                                <Card :bordered="true"  @click.native="showlist('逻辑')">
                                    <p slot="title" >
                                        罗辑
                                        <Badge :count="999" id="hint" type="primary"></Badge >                            
                                        <Icon type="ios-notifications-outline" style="margin-left:6.5em" size="24"></Icon>                                                                  
                                    </p>
                                    <p>2019-7-10日，18条收款记录</p>
                                </Card>
                            </Scroll>
                        </div>
                        <div slot="right">
                            <Scroll :on-reach-bottom="handleReachBottom" height="720" loading-text="收款信息加载ing">
                                <Card dis-hover v-for="(item, index) in receiptlist" :key="index" style="margin: 20px 0">
                                    日期：{{item.time}}
                                    快递员：{{item.name}}
                                    收款：{{item.receipt}}
                                    快递单号：{{item.number}}
                                </Card>
                                <Button @click.native="createlist();modal = true" type="primary" style="float:right">建立收款单</Button>
                            </Scroll>
                        </div>
                    </Split> 
                </div>
                <Modal
                    width=40
                    v-model="modal"
                    title="建立收款单"
                    @on-ok="ok"
                    @on-cancel="cancel">
                    <Form :model="formItem" :label-width="120">
                        <FormItem label="营业厅">
                            <Input disabled v-model="formItem.business"/>                    
                        </FormItem>
                        <FormItem label="收款时间">
                            <Input disabled v-model="formItem.time"/>                    
                        </FormItem>
                        <FormItem label="收款金额">
                            <Input disabled v-model="formItem.money"/>                    
                        </FormItem>
                        <FormItem label="快递员工号">
                            <Input disabled v-model="formItem.number"/>                    
                        </FormItem>
                        <FormItem label="快递员姓名">
                            <Input disabled v-model="formItem.name"/>                    
                        </FormItem>
                        <FormItem label="快递单号">
                            <Input disabled type="textarea"  v-model="formItem.info"/>                    
                        </FormItem>
                    </Form>
                </Modal>
            </TabPane>
            <TabPane label="收款单" icon="ios-paper">
                 <Table stripe border :columns="columns" :data="data">         
                    <template slot-scope="{row,index}" slot="driverid">
                        <input type="text" v-model="editDriverId" v-if="editIndex === index"/>
                        <span v-else>{{row.driverid}}</span>
                    </template>           
                    <template slot-scope="{row,index}" slot="proceedtime">
                        <input type="text" v-model="editProceedTime" v-if="editIndex === index"/>
                        <span v-else>{{row.proceedtime}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="proceedamount">
                        <input type="text" v-model="editProceedAmount" v-if="editIndex === index"/>
                        <span v-else>{{row.proceedamount}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="proceedcourier">
                        <input type="text" v-model="editProceedCourier" v-if="editIndex === index"/>
                        <span v-else>{{row.proceedcourier}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="ordernumber">
                        <input type="text" v-model="editOrderNumber" v-if="editIndex === index"/>
                        <span v-else>{{row.ordernumber}}</span>
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
                            <Button type="error" size="small" @click="remove(index)">Delete</Button>
                        </div>
                    </template>
                </Table>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="sum" @on-change="changePage"  show-elevator show-total></Page>
                    </div>
                </div>
            </TabPane>
        </Tabs>
        
    </div>
</template>
<script>

export default {
    data(){
        return{
            modal: false,
            split:0.2,
            list1: [1, 2, 3],
            name:[],
            receiptlist:[],
            formItem:{
                business:'',
                time:'',
                money:1213,
                number:'',
                name:'',
                info:''
            },

             columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '司机编号',                                                                                                                               
                        slot: 'driverid',
                        sortable: true
                    },
                    {
                        title: '收款日期',
                        slot: 'proceedtime',
                        sortable: true
                    },
                    {
                        title: '收款金额',
                        slot: 'proceedamount',
                        sortable: true,
                        filters:[
                            {
                                label: '>100',
                                value: ''
                            },
                            {   
                                label: '<100',
                                value: ''
                            }
                        ],
                        filterMultiple: true,
                        filterMethod (value, row) {
                            return row.proceedamount.indexOf(value) > -1;
                        }
                    },
                    {
                        title: '收款快递员',
                        slot: 'proceedcourier',
                    },
                    {
                        title: '订单编号',
                        slot: 'ordernumber',
                    },  
                    {
                        title: '操作',
                        slot: 'action'
                    }                           
                ],                                
                data: [],
                editIndex: -1,  // 当前聚焦的输入框的行数
                editDriverId: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
                editProceedTime: '',  // 第二列输入框
                editProceedAmount: '',  // 第三列输入框
                editProceedCourier: '',  // 第四列输入框
                editOrderNumber: '',  // 第五列输入框
                sum: 0
        }
    },
    methods:{
        ok(){
            this.$Message.info('Clicked ok');

        },
        cancel(){
            this.$Message.info('Clicked cancel');
        },
        createlist(){
            var myDate = new Date();//获取当前年
            var year = myDate.getFullYear();//获取当前月
            var month = myDate.getMonth() + 1;//获取当前日
            var date = myDate.getDate();
            var hh = myDate.getHours();       //获取当前小时数(0-23)
            var mm = myDate.getMinutes();     //获取当前分钟数(0-59)
            if (mm < 10) mm = '0' + mm;
            var ss = myDate.getSeconds();
            if (ss < 10) ss = '0' + ss;
            this.formItem.time = year + "-" + month + "-" + date + "-" + " " + hh + ":" + mm + ":" + ss;
        },
        handleReachBottom () {
            return new Promise(resolve => {
                setTimeout(() => {
                    const last = this.list1[this.list1.length - 1];
                    for (let i = 1; i < 11; i++) {
                        this.list1.push(last + i);
                    }
                    resolve();
                }, 2000);
            });
        },
        requestEmployName(){

        },
        showlist(val){
            // alert(val);
            // alert('这里根据员工姓名对数据库请求收款记录')
            if(val == '褚岩'){
                // alert('success')
                this.receiptlist=[
                    {
                        time :'2019年07月11日',
                        name:'褚岩',
                        receipt:'$300',
                        number:'Xh9070909-9867',
                    },{
                        time :'2019年07月11日',
                        name:'章北海',
                        receipt:'$300',
                        number:'Xh9070909-9867',
                    },{
                        time :'2019年07月11日',
                        name:'惠子',
                        receipt:'$300',
                        number:'Xh9070909-9867',
                    }
                ]
            }else{
                    this.receiptlist=[
                    {
                        time :'2019年07月11日',
                        name:'程心',
                        receipt:'$300',
                        number:'Xh9070909-9867',
                    }
                ]
            }               
        },
         handleEdit (row, index) {
                this.editDriverId = row.driverid;
                this.editProceedTime = row.proceedtime;
                this.editProceedAmount = row.editProceedAmount;
                this.editProceedCourier = row.proceedcourier;
                this.editOrderNumber = row.ordernumber;
                this.editIndex = index;
            },
            handleSave (index) {
               this.editDriverId = row.driverid;
                this.editProceedTime = row.proceedtime;
                this.editProceedAmount = row.editProceedAmount;
                this.editProceedCourier = row.proceedcourier;
                this.editOrderNumber = row.ordernumber;
                this.editIndex = -1;
            },
            remove (index) {
                this.data.splice(index, 1);
            },
            changePage(Page) {
                var pagedata = [
                   {
                        driverid: '1',                       
                        proceedtime: '2016-10-02',
                        proceedamount: 25,
                        proceedcourier: '褚岩',
                        ordernumber:'23452634365453'
                    },
                    {
                        driverid: '2',                       
                        proceedtime: '2016-10-02',
                        proceedamount: 25,
                        proceedcourier: '褚岩',
                        ordernumber:'23452634365453'                   
                    }
                ];                   
                this.data = pagedata.slice((Page-1)*10,Page*10);
                console.log((Page-1)*1,Page*10);
            },

    },
     mounted(){
            var pagedata = [
                    {
                        driverid: '1',                       
                        proceedtime: '2016-10-02',
                        proceedamount: 25,
                        proceedcourier: '褚岩',
                        ordernumber:'23452634365453'
                    },
                    {
                        driverid: '2',                       
                        proceedtime: '2016-10-02',
                        proceedamount: 25,
                        proceedcourier: '褚岩',
                        ordernumber:'23452634365453'                   
                    }
                ];          
                this.sum = pagedata.length;
                this.data = pagedata.splice(0,10);
        },
}
</script>
<style>
    
    #card{
        margin-bottom: 1em
    }
    #hint{
        float: right
    }
    #split{
        height: 65em;
        /* border: solid 1px rebeccapurple; */
    }
    #left{
        background:#eee;
        padding: 5px
    }
    #left p{
        font-size: 1.2em;
        
    }
</style>


