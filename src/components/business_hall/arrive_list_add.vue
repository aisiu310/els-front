<template>
<div>
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
</template>
<script>
    export default {
        data(){
            return{
                modal:false,
                 formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                }
            }
        },
        methods:{
            ok(){
                this.$Message.info('点击');
            }
            ,
            cancle(){
                this.$Message.info('取消');
            }
        }
    }
</script>
