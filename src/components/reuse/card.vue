<template>
  <div>
    <Row style="background:#eee;padding:20px">
      <Col span="11" style="width:24%">
        <Card :bordered="false" shadow>
          <p slot="title">左侧表格</p>
          <Table :columns="columns1" @on-selection-change></Table>
          <!-- @click.native  vue1.0，同时触发两个事件 1.生成XX单 2.显示生成的form表格  -->
          <Button type="primary" id @click.native="createloadCarlist();modal = true"></Button>
        </Card>
      </Col>
      <Col span="11" offset="2" style="width:66%">
        <Card shadow>
          <p slot="title">右侧表格</p>
          <Table :columns="columns2"></Table>
        </Card>
      </Col>
    </Row>
  </div>
</template>
