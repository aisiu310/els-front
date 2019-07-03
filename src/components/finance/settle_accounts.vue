<template>
  <div>

    <div class="header">
      <div class="word">成本结算（付款单）</div>
      <div class="search">
        <Input
          search
          v-model="payee_value"
          @on-search="payee_search(payee_value)"
          placeholder="收款单查询"
          :maxlength="32"
        />
      </div>

      <div class="divide"></div>

      <div class="button">
        <Button type="success" shape="circle" @click="add_payee()">新建收款单</Button>
      </div>
    </div>

    <div class="payee_table"></div>

  </div>
</template>


<script>
export default {
    data(){
        return {
            payee_value: ''
        }
    },
    methods:{
        // search payee
        payee_search(payee_value){
            // invoke the back-end search payee API
        },
        // add payee modal
        add_payee(){
            
        }
    }
};
</script>


<style scoped>
.header{
    width: 100%;
    height: auto;
    display: flex
}


.word {
  width: 30%;
  height: auto;
  font-size: 16px;
  color: black;
  text-align: center;
}
.search{
    width: 30%;
    height: auto;
}

.divide{
    width: 25%;
    height: auto;
}

.button{
    width: 15%;
    height: auto;
}


</style>
