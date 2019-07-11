<template>
    <div>
        <Tabs>
            <TabPane label="装车单" icon="ios-paper-plane">
                <Table stripe border :columns="columns" :data="data">            
                    <template slot-scope="{row,index}" slot="loadcardate">
                        <input type="text" v-model="editLoadCarDate" v-if="editIndex === index"/>
                        <span v-else>{{row.loadcardate}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="carnumber">
                        <input type="text" v-model="editCarNumber" v-if="editIndex === index"/>
                        <span v-else>{{row.carnumber}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="startaddress">
                        <input type="text" v-model="editStartAddress" v-if="editIndex === index"/>
                        <span v-else>{{row.startaddress}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="arrivraddress">
                        <input type="text" v-model="editArriveAddress" v-if="editIndex === index"/>
                        <span v-else>{{row.arrivraddress}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="checkloadpeer">
                        <input type="text" v-model="editCheckLoadPeer" v-if="editIndex === index"/>
                        <span v-else>{{row.checkloadpeer}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="transitpeer">
                        <input type="text" v-model="editTransitPeer" v-if="editIndex === index"/>
                        <span v-else>{{row.transitpeer}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="transitnumber">
                        <input type="text" v-model="editTransitNumber" v-if="editIndex === index"/>
                        <span v-else>{{row.transitnumber}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="transitfee">
                        <input type="text" v-model="editTransitFee" v-if="editIndex === index"/>
                        <span v-else>{{row.transitfee}}</span>
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
            <TabPane label="历史记录" icon="ios-clock-outline">
                <p>等待程序员小哥开发</p>
            </TabPane>
        </Tabs>
        
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
                        title: 'LoadCarDate',
                        slot: 'loadcardate',
                        sortable: true
                    },
                    {
                        title: 'CarNumber',
                        slot: 'carnumber',
                        sortable: true
                    },
                    {
                        title: 'StartAddress',
                        slot: 'startaddress'
                    },
                    {
                        title: 'ArriveAddress',
                        slot: 'arrivraddress'
                    },
                    {
                        title: 'CheckLoadPeer',
                        slot: 'checkloadpeer'
                    },
                    {
                        title: 'TransitPeer',
                        slot: 'transitpeer'
                    },
                    {
                        title: 'TransitNumber',
                        slot: 'transitnumber'
                    },
                    {
                        title: 'TransitFee',
                        slot: 'transitfee',
                    },  
                    {
                        title: '操作',
                        slot: 'action'
                    }                           
                ],
                data: [],
                editIndex: -1,  // 当前聚焦的输入框的行数
                editLoadCarDate: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
                editCarNumber: '',  // 第二列输入框
                editStartAddress: '',  // 第三列输入框
                editArriveAddress: '',  // 第四列输入框
                editCheckLoadPeer: '',  // 第5列输入框
                editTransitPeer: '',  // 第6列输入框
                editTransitNumber: '',  // 第7列输入框
                editTransitFee: '',  // 第8列输入框              
                sum: 0
            }
        },

        mounted(){
            var pagedata = [
                    {
                        loadcardate: '2016-10-01',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-02',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-03',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-04',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-05',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-06',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-07',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-08',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-09',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-10',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-11',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-12',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    }
                ];
  
            
                this.sum = pagedata.length;
                this.data = pagedata.splice(0,10);
        },
        methods:{
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
            remove (index) {
                this.data.splice(index, 1);
            },
            changePage(Page) {
                var pagedata = [
                   {
                        loadcardate: '2016-10-01',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-02',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-03',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-04',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-05',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-06',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-07',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-08',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-09',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-10',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-11',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    },
                    {
                        loadcardate: '2016-10-12',                       
                        carnumber: 1709870,
                        startaddress: 'New York No. 1 Lake Park',
                        arrivraddress: 'naning',
                        checkloadpeer: '李二狗',                       
                        transitpeer: '张全蛋',
                        transitnumber: '786098780-098',
                        transitfee: 'Y2000',
                    }
                ];                   

                this.data = pagedata.slice((Page-1)*10,Page*10);
                console.log((Page-1)*1,Page*10);
            },
        }
    }
</script>