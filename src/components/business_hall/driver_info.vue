<template>
    <div>
        <Tabs>
            <TabPane label="司机信息" icon="ios-car">
                <Table stripe border :columns="columns" :data="data">           
                    <template slot-scope="{row,index}" slot="driverid">
                        <input type="text" v-model="editDriverId" v-if="editIndex === index"/>
                        <span v-else>{{row.driverid}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="businesshallnumber">
                        <input type="text" v-model="editBusinessHallNumber" v-if="editIndex === index"/>
                        <span v-else>{{row.businesshallnumber}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="drivername">
                        <input type="text" v-model="editDriverName" v-if="editIndex === index"/>
                        <span v-else>{{row.drivername}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="driversex">
                        <input type="text" v-model="editDriverSex" v-if="editIndex === index"/>
                        <span v-else>{{row.driversex}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="drivercardid">
                        <input type="text" v-model="editDriverCardId" v-if="editIndex === index"/>
                        <span v-else>{{row.drivercardid}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="phonenumber">
                        <input type="text" v-model="editPhoneNumber" v-if="editIndex === index"/>
                        <span v-else>{{row.phonenumber}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="driverbirthday">
                        <input type="text" v-model="editDriverBirthday" v-if="editIndex === index"/>
                        <span v-else>{{row.driverbirthday}}</span>
                    </template>
                    <template slot-scope="{row,index}" slot="driverlicensedata">
                        <input type="text" v-model="editDriverLicenseData" v-if="editIndex === index"/>
                        <span v-else>{{row.driverlicensedata}}</span>
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
                        title: '营业厅编号',
                        slot: 'businesshallnumber',
                        sortable: true
                    },
                    {
                        title: '姓名',
                        slot: 'drivername'
                    },
                    {
                        title: '性别',
                        slot: 'driversex',
                        filters:[
                            {
                                label: 'man',
                                value: 'man'
                            },
                            {   
                                label: 'woman',
                                value: 'woman'
                            }
                        ],
                        filterMultiple: true,
                        filterMethod (value, row) {
                            return row.driversex.indexOf(value) > -1;
                        }
                    }, 
                    {
                        title: '身份证号码',
                        slot: 'drivercardid',
                        sortable: true
                    },
                    {
                        title: '手机号',
                        slot: 'phonenumber',
                        sortable: true
                    },
                     {
                        title: '出生日期',
                        slot: 'driverbirthday',
                        sortable: true
                    },
                    {
                        title: '行驶证有效期',
                        slot: 'driverlicensedata',
                        sortable: true
                    }, 
                    {
                        title: '操作',
                        slot: 'action'
                    }                           
                ],
                data: [],
                editIndex: -1,  // 当前聚焦的输入框的行数
                editDriverId: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
                editBusinessHallNumber: '',  // 第二列输入框
                editDriverName: '',  // 第三列输入框
                editDriverSex: '',  // 第四列输入框
                editDriverCardId: '',  // 第二列输入框
                editPhoneNumber: '',  // 第三列输入框
                editDriverBirthday: '',  // 第四列输入框
                editDriverLicenseData: '',  // 第二列输入框
                sum: 0
            }
        },
        mounted(){
            var pagedata = [
                    {
                        driverid:'1',
                        businesshallnumber:'123wqer',
                        drivername:'褚岩',
                        driversex:'man',
                        drivercardid:'9879',
                        phonenumber:'80970',
                        driverbirthday:'2016-10-02',
                        driverlicensedata:'2016-10-02',
                    },
                    {
                        driverid:'2',
                        businesshallnumber:'123wqer',
                        drivername:'褚岩',
                        driversex:'man',
                        drivercardid:'9879',
                        phonenumber:'80970',
                        driverbirthday:'2016-10-02',
                        driverlicensedata:'2016-10-02',                       
                    },
                    {
                        driverid:'3',
                        businesshallnumber:'123wqer',
                        drivername:'程心',
                        driversex:'woman',
                        drivercardid:'9879',
                        phonenumber:'80970',
                        driverbirthday:'2016-10-02',
                        driverlicensedata:'2016-10-02',
                    },
                    {
                        driverid:'4',
                        businesshallnumber:'123wqer',
                        drivername:'褚岩',
                        driversex:'man',
                        drivercardid:'9879',
                        phonenumber:'80970',
                        driverbirthday:'2016-10-02',
                        driverlicensedata:'2016-10-02',                       
                    },
                ];          
                this.sum = pagedata.length;
                this.data = pagedata.splice(0,10);
        },
        methods:{
            handleEdit (row, index) {
                this.editDriverId = row.driverid;
                this.editBusinessHallNumber = row.businesshallnumber;
                this.editDriverName = row.drivername;
                this.editDriverSex = row.driversex;
                this.editDriverCardId = row.drivercardid;
                this.editPhoneNumber = row.phonenumber;
                this.editDriverBirthday = row.driverbirthday;
                this.editDriverLicenseData = row.driverlicensedata;
                this.editIndex = index;
            },
            handleSave (index) {
                this.editDriverId = row.driverid;
                this.editBusinessHallNumber = row.businesshallnumber;
                this.editDriverName = row.drivername;
                this.editDriverSex = row.driversex;
                this.editDriverCardId = row.drivercardid;
                this.editPhoneNumber = row.phonenumber;
                this.editDriverBirthday = row.driverbirthday;
                this.editDriverLicenseData = row.driverlicensedata;
                this.editIndex = -1;
            },
            remove (index) {
                this.data.splice(index, 1);
            },
            changePage(Page) {
                var pagedata = [
                    {
                        driverid:'1',
                        businesshallnumber:'123wqer',
                        drivername:'褚岩',
                        driversex:'man',
                        drivercardid:'9879',
                        phonenumber:'80970',
                        driverbirthday:'2016-10-02',
                        driverlicensedata:'2016-10-02',
                    },
                    {
                        driverid:'2',
                        businesshallnumber:'123wqer',
                        drivername:'褚岩',
                        driversex:'man',
                        drivercardid:'9879',
                        phonenumber:'80970',
                        driverbirthday:'2016-10-02',
                        driverlicensedata:'2016-10-02',                       
                    },
                    {
                        driverid:'3',
                        businesshallnumber:'123wqer',
                        drivername:'程心',
                        driversex:'woman',
                        drivercardid:'9879',
                        phonenumber:'80970',
                        driverbirthday:'2016-10-02',
                        driverlicensedata:'2016-10-02',
                    },
                    {
                        driverid:'4',
                        businesshallnumber:'123wqer',
                        drivername:'褚岩',
                        driversex:'man',
                        drivercardid:'9879',
                        phonenumber:'80970',
                        driverbirthday:'2016-10-02',
                        driverlicensedata:'2016-10-02',                       
                    },
                ];                   
                this.data = pagedata.slice((Page-1)*10,Page*10);
                console.log((Page-1)*1,Page*10);
            },          
        }
    }
</script>