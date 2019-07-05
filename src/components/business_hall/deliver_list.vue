<template>
    <div>
        <Table stripe border :columns="columns" :data="data">
            
            <template slot-scope="{row,index}" slot="date">
                <input type="text" v-model="editDate" v-if="editIndex === index"/>
                <span v-else>{{row.date}}</span>
            </template>
            <template slot-scope="{row,index}" slot="number">
                <input type="text" v-model="editNumber" v-if="editIndex === index"/>
                <span v-else>{{row.number}}</span>
            </template>
            <template slot-scope="{row,index}" slot="deliver">
                <input type="text" v-model="editDeliver" v-if="editIndex === index"/>
                <span v-else>{{row.deliver}}</span>
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
                        title: 'Deliver',
                        slot: 'deliver'
                    },
                    {
                        title: '操作',
                        slot: 'action'
                    }                           
                ],
                data: [],
                editIndex: -1,  // 当前聚焦的输入框的行数
                editDate: '',  // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
                editNumber: '',  // 第二列输入框
                editDeliver: '',  // 第三列输入框
                sum: 0
            }
        },
        mounted(){
            var pagedata = [
                    {
                        date: '2016-10-03',                       
                        number: 1,
                        deliver: 'New York No. 1 Lake Park',
                    },
                    {
                        date: '2016-10-01',
                        number: 2,
                        deliver: 'London No. 1 Lake Park',                    
                    },
                    {                        
                        date: '2016-10-02',
                        number: 3,
                        deliver: 'Sydney No. 1 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 4,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 5,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 6,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 7,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 8,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 9,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 10,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 11,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 12,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 13,
                        deliver: 'Ottawa No. 2 Lake Park',
                    }
                ];
  
            
                this.sum = pagedata.length;
                this.data = pagedata.splice(0,10);
        },
        methods:{
            handleEdit (row, index) {
                this.editDate = row.date;
                this.editNumber = row.number;
                this.editDeliver = row.deliver;
                this.editIndex = index;
            },
            handleSave (index) {
                this.data[index].date = this.editDate;
                this.data[index].number = this.editNumber;
                this.data[index].deliver = this.editDeliver;
                this.editIndex = -1;
            },
            remove (index) {
                this.data.splice(index, 1);
            },
            changePage(Page) {
                var pagedata = [
                    {
                        date: '2016-10-03',                       
                        number: 1,
                        deliver: 'New York No. 1 Lake Park',
                    },
                    {
                        date: '2016-10-01',
                        number: 2,
                        deliver: 'London No. 1 Lake Park',                    
                    },
                    {                        
                        date: '2016-10-02',
                        number: 3,
                        deliver: 'Sydney No. 1 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 4,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 5,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 6,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 7,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 8,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 9,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 10,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 11,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 12,
                        deliver: 'Ottawa No. 2 Lake Park',
                    },
                    {
                        date: '2016-10-04',                       
                        number: 13,
                        deliver: 'Ottawa No. 2 Lake Park',
                    }
                ];                   

                this.data = pagedata.slice((Page-1)*10,Page*10);
                console.log((Page-1)*1,Page*10);
            },

           
        }
    }
</script>