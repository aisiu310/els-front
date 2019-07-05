<template>
    <div>
        <Table stripe border :columns="columns" :data="data">
            
            <template slot-scope="{row,index}" slot="carnumber">
                <input type="text" v-model="editCarNumber" v-if="editIndex === index"/>
                <span v-else>{{row.carnumber}}</span>
            </template>
            <template slot-scope="{row,index}" slot="businesshallnumber">
                <input type="text" v-model="editBusinessHallNumber" v-if="editIndex === index"/>
                <span v-else>{{row.businesshallnumber}}</span>
            </template>
            <template slot-scope="{row,index}" slot="usetime">
                <input type="text" v-model="editUseTime" v-if="editIndex === index"/>
                <span v-else>{{row.usetime}}</span>
            </template>
            <template slot-scope="{row,index}" slot="carstate">
                <input type="text" v-model="editCatState" v-if="editIndex === index"/>
                <span v-else>{{row.carstate}}</span>
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
                        title: 'CarNumber',
                        slot: 'carnumber',
                        sortable: true
                    },
                    {
                        title: 'BusinessHallNumber',
                        slot: 'businesshallnumber',
                        sortable: true
                    },
                    {
                        title: 'UseTime',
                        slot: 'usetime'
                    },
                    {
                        title: 'CarState',
                        slot: 'carstate',
                        filters:[
                            {
                                label: 'Using',
                                value: 'Using'
                            },
                            {   
                                label: 'Reparing',
                                value: 'Reparing'
                            }
                        ],
                        filterMultiple: true,
                        filterMethod (value, row) {
                            return row.carstate.indexOf(value) > -1;
                        }
                    },  
                    {
                        title: '操作',
                        slot: 'action'
                    }                           
                ],
                data: [],
                editIndex: -1,  // 当前聚焦的输入框的行数
                editCarNumber: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
                editBusinessHallNumber: '',  // 第二列输入框
                editUseTime: '',  // 第三列输入框
                editCatState: '',  // 第四列输入框
                sum: 0
            }
        },
        mounted(){
            var pagedata = [
                    {
                        carnumber: '苏AX8979',                       
                        businesshallnumber: 1,
                        usetime: '2016-10-02',
                        carstate: 'Using',
                    },
                    {
                        carnumber: '苏AX8979',
                        businesshallnumber: 2,
                        usetime: '2016-10-02',
                        carstate: 'Reparing',                       
                    },
                     {
                        carnumber: '苏AX8979',                       
                        businesshallnumber: 3,
                        usetime: '2016-10-02',
                        carstate: 'Using',
                    },
                    {
                        carnumber: '苏AX8979',
                        businesshallnumber: 4,
                        usetime: '2016-10-02',
                        carstate: 'Reparing',                       
                    },
                ];          
                this.sum = pagedata.length;
                this.data = pagedata.splice(0,10);
        },
        methods:{
            handleEdit (row, index) {
                this.editCarNumber = row.carnumber;
                this.editBusinessHallNumber = row.businesshallnumber;
                this.editUseTime = row.usetime;
                this.editCatState = row.carstate;
                this.editIndex = index;
            },
            handleSave (index) {
                this.editCarNumber = row.carnumber;
                this.editBusinessHallNumber = row.businesshallnumber;
                this.editUseTime = row.usetime;
                this.editCatState = row.carstate;
                this.editIndex = -1;
            },
            remove (index) {
                this.data.splice(index, 1);
            },
            changePage(Page) {
                var pagedata = [
                   {
                        carnumber: '苏AX8979',                       
                        businesshallnumber: 1,
                        usetime: '2016-10-02',
                        carstate: 'Using',
                    },
                    {
                        carnumber: '苏AX8979',
                        businesshallnumber: 2,
                        usetime: '2016-10-02',
                        carstate: 'Reparing',                       
                    },
                     {
                        carnumber: '苏AX8979',                       
                        businesshallnumber: 3,
                        usetime: '2016-10-02',
                        carstate: 'Using',
                    },
                    {
                        carnumber: '苏AX8979',
                        businesshallnumber: 4,
                        usetime: '2016-10-02',
                        carstate: 'Reparing',                       
                    },
                ];                   
                this.data = pagedata.slice((Page-1)*10,Page*10);
                console.log((Page-1)*1,Page*10);
            },

           
        }
    }
</script>