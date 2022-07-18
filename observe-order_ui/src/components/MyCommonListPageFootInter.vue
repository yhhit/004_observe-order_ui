<template>
  <div>
    <el-button-group>
        <el-button type="primary" icon="el-icon-d-arrow-left" @click="handleStartPage()"></el-button>
        <el-button type="primary" icon="el-icon-arrow-left" @click="handlePrePage()">上一页</el-button>
        <el-button type="primary" v-for="p in pageNum" :key="p" @click="config.currentPage=p">{{p}}</el-button>
        <el-button type="primary" @click="handleNextPage()">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
        <el-button type="primary" @click="handleEndPage()"><i class="el-icon-d-arrow-right"></i></el-button>
    </el-button-group>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    name: 'MyCommonListPageFootInter',
    computed: {
        ...mapState('mList',['config']),
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