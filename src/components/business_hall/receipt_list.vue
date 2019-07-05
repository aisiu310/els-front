<template>
    <div>
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
    </div>

</template>
<script>
    export default {
        data(){
            return {
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
        methods:{
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

           
        }
    }
</script>