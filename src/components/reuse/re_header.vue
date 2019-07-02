<template>
    <div class="header">
        <div class="logo">express system</div>
        <div class="search">
             <Input v-model="search_value" placeholder="Enter something..." style="width: 400px" />
             <Button type="primary" shape="circle" icon="ios-search" @click="search(search_value)">Search</Button>
        </div>
        <div class="username">{{username}}
            <Icon type="md-exit" size="20" @click="exit()" />
        </div>
    </div>

</template>

<script>
export default {
    date(){
        return{
           search_value:'' ,
           username:''
        }
    },
    created(){
        this.username = "admin"
    },
    methods:{
        search(){
            // invoke the back-end API
            this.$Message.success("test!")
        },
        exit(){
            this.$router.push("/");
        }
    }
}
</script>

<style scoped>
.header{
    width: 100%;
    height: 118px;
    display: flex;
    background-color: black
}

.logo{
    width: 30%;
    font-family: 'Brush Script Std';
    font-size: 40px;
    margin-top: 28px;
    text-align: center;
    color: white
}

.search{
    width: 50%;
    margin-top: 45px;
}

.username{
    width: 15%;
    margin-left: 5%;
    margin-top: 45px;
    font-size: 20px;
    color: white;
}
</style>
