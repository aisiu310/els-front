<template>
    <Table stripe border :columns="columns1" :data="data1">
        <template slot-scope="{row,index}" slot="date">
            <input type="text" v-model="editDate" v-if="editIndex === index">
            <span v-else>{{row.date}}</span>
        </template>
        <template slot-scope="{row,index}" slot="number">
            <input type="text" v-model="editNumber" v-if="editIndex === index">
            <span v-else>{{row.number}}</span>
        </template>
        <template slot-scope="{row,index}" slot="address">
            <input type="text" v-model="editAddress" v-if="editIndex === index">
            <span v-else>{{row.address}}</span>
        </template>
        <template slot-scope="{row,index}" slot="state">
            <input type="text" v-model="editState" v-if="editIndex === index">
            <span v-else>{{row.state}}</span>
        </template>

        <template slot-scope="{row,index}" slot="action">
            <div v-if="editIndex === index">
                <Button @click="handleSave(index)">save</Button>
                <Button @click="editIndex = -1">cancel</Button>
            </div>
            <div v-else>
                <Button @click="handleEdit(row,index)">操作</Button>
            </div>
        </template>
    </Table>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    // {
                    //     type: 'selection',
                    //     width: 60,
                    //     align: 'center'
                    // },
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
                                lable: 'arrive',
                                value:1
                            },
                            {   
                                lable: 'transfer',
                                value:2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.state == 'arrive';
                            } else if (value === 2) {
                                return row.state == 'transfer';
                            }
                        }
                    },                             
                ],
                data1: [
                    {
                        date: '2016-10-03',                       
                        number: 18,
                        address: 'New York No. 1 Lake Park',
                        state: 'arrive',
                    },
                    {
                        date: '2016-10-01',
                        number: 24,
                        address: 'London No. 1 Lake Park',
                        state: 'transfer',                       
                    },
                    {                        
                        date: '2016-10-02',
                        number: 30,
                        address: 'Sydney No. 1 Lake Park',
                        state: 'arrive',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        state: 'arrive',
                    }
                ],
                editIndex: -1,  // 当前聚焦的输入框的行数
                editDate: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
                editNumber: '',  // 第二列输入框
                editAddress: '',  // 第三列输入框
                editState: '',  // 第四列输入框
            }
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
                this.data[index].editState = this.editState;
                this.editIndex = -1;
            },
        }
    }
</script>