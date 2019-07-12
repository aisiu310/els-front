<template>
    <div>
        <Tabs>
            <TabPane label="收款记录" icon="logo-yen">
                <div id="split">
                    <Split v-model="split"> 


                        <div slot="left" id="left">
                            <h1 style="text-align: center">快递员信息</h1><hr>
                            <Scroll :on-reach-bottom="handleReachBottom" height="720" loading-text="人员信息加载ing">                        
                                <Card :bordered="true" v-for="(courier,index) in courier" id="card" @click.native="showlist(courier.courier_name)" :v-bind="name" :key="index">                          
                                    <p slot="title">
                                        {{courier.courier_name}}   
                                        <Badge :count="courier.count" id="hint"></Badge >                            
                                        <Icon type="ios-notifications-outline" style="margin-left:6.5em" size="24"></Icon>                                                                  
                                    </p>  
                                    <p>工号{{courier.courier_id}}，{{courier.count}}条收款记录                               
                                    </p>
                                </Card>                        
                                <Card :bordered="true"  @click.native="showlist('张三')">
                                    <p slot="title" >
                                         张三
                                        <Badge :count="999" id="hint" type="primary"></Badge >                            
                                        <Icon type="ios-notifications-outline" style="margin-left:6.5em" size="24"></Icon>                                                                  
                                    </p>
                                    <p>2019-7-10日，18条收款记录</p>
                                </Card>
                            </Scroll>
                        </div>


                        <div slot="right">
                            <Scroll :on-reach-bottom="handleReachBottom" height="720" loading-text="收款信息加载ing">
                                <Card dis-hover v-for="(receipt, index) in receipt" :key="index" style="margin: 20px 0">
                                    收款日期：{{receipt.payment_time}}
                                    收款快递员：{{receipt.courier_name}}
                                    收款金额：{{receipt.total_fee}}
                                    快递单号：{{receipt.code}}
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
                 <Table stripe border :columns="columns" :data="receipt">         
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
import Bus from '../reuse/bus'
import { connect } from 'net';
export default {
    data(){
        return{
            modal: false,
            split:0.2,
            receipt:[],
            courier:[],
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
               
                editIndex: -1,  // 当前聚焦的输入框的行数
                editDriverId: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
                editProceedTime: '',  // 第二列输入框
                editProceedAmount: '',  // 第三列输入框
                editProceedCourier: '',  // 第四列输入框
                editOrderNumber: '',  // 第五列输入框
                sum: 0
        }
    },
    mounted(){
            this.$axios.get(' http://192.168.2.229/order/getPaymentInfoList', {
                    params: {
                    hallCode:'025000',
                    date:'2019-07-12'
                    }
            }).then((response) => {
                this.receipt = response.data.data[0]
                this.courier = response.data.data[1]
                console.log(this.receipt,this.courier)
            }).catch(function (error) {
                alert('请求超时');
            })          
            var receipt = [
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
                this.sum = receipt.length;
                this.receipt = receipt.splice(0,10);
        },
    methods:{
        showlist(val){
            var list = []
            if(val){
                this.receipt.forEach(Element => {
                    if(Element.courier_name == val){
                        list.push(Element)
                    }
                })
            this.receipt = list
            // console.log(list);
            }else{
                this.$Message.error('错误')
            }      
        },
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
            this.formItem.business = this.getBusiness();
            this.formItem.time = year + "-" + month + "-" + date + "-" + " " + hh + ":" + mm + ":" + ss;
            this.formItem.money = this.caculatemoney();
            this.formItem.name = this.getName();
            this.formItem.number = this.getNumber();
            this.formItem.info = 'this'
        },
        getBusiness(){
            alert('111');
            Bus.$on('setBusiness',content =>{               
                return content;
                console.log(content)              
            })
        },
        getName(){
            Bus.$on('setName',content =>{
                return content
            })
        },
        getNumber(){
            Bus.$on('setNumber',content =>{
                return content
            })
        },
        caculatemoney(){
            var data = this.receiptlist
            var summoney = 0
            if(data.length){
                data.forEach(Element => {
                    summoney +=Element.money
                })
                return summoney
                console.log(summoney)
            }else{
                this.$Message.error('收款记录为空')
            }
        },
        handleReachBottom () {
            return new Promise(resolve => {
                setTimeout(() => {
                    const last = this.courier[this.courier.length - 1];
                    for (let i = 1; i < 11; i++) {
                        this.courier.push(last + i);
                    }
                    resolve();
                }, 2000);
            });
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
                this.receipt.splice(index, 1);
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
                this.receipt = pagedata.slice((Page-1)*10,Page*10);
                console.log((Page-1)*1,Page*10);
            },

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


