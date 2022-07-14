<template>
  <div>
    <span @click="handleStartPage()">&lt;&lt;</span>
    <span @click="handlePrePage()">&lt;</span>
    <span v-for="p in pageNum" :key="p" @click="config.currentPage=p">{{p}}</span>
    <span @click="handleNextPage()">&gt;</span>
    <span @click="handleEndPage()">&gt;&gt;</span>
  </div>
</template>

<script>

export default {
    name: 'MyCommonListPageFootInter',
    props:[ 'config'],
    computed: {
        pageNum(){
            return Math.ceil(this.config.view.length/this.config.pageSize)
        },
    },
    methods: {
        handleStartPage(p){
            this.config.currentPage=1;
        },
        handleEndPage(p){
            this.config.currentPage=this.pageNum;
        },
        handlePrePage(p){
            if(this.config.currentPage>1){
                this.config.currentPage--;
            }
        },
        handleNextPage(p){
            if(this.config.currentPage<this.pageNum){
                this.config.currentPage++;
            }
        }
    },
    
}
</script>

<style>

</style>