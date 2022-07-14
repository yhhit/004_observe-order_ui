<template>
<div>
    <MyCommonListOperatorInter :config="config"></MyCommonListOperatorInter>
    <MyCommonListInter :config="config"></MyCommonListInter>
    <MyCommonListPageFootInter :config="config"></MyCommonListPageFootInter>
</div>

</template>

<script>
import {getCurrentPageView} from './utils.js';
import MyCommonListOperatorInter from './MyCommonListOperatorInter.vue'
import MyCommonListInter from './MyCommonListInter.vue'
import MyCommonListPageFootInter from './MyCommonListPageFootInter.vue'
export default {
    name: 'MyCommonList',
    components: { MyCommonListOperatorInter, MyCommonListInter, MyCommonListPageFootInter },

    watch: {
        'config.checkedAll': {
            handler(val) {
                console.log('MyCommonList.vue config.checkedAll', val)
                
            },
            deep: true
        },
        'config.view':{
            handler(view){
                console.log('MyCommonList.vue config.view', view)
                this.calibrateCkeckedAll()
            },
            deep: true
        },
        'config.currentPage':{
            handler(val){
                console.log('MyCommonList.vue config.currentPage', val)
                this.calibrateCkeckedAll()
            },
            deep: true
        }
    },
    props:["config"],
    methods:{
        //判断是否全选
        isCheckedAll(){
            let view= getCurrentPageView(this.config)
            var count=view.length;
            for(let i=0;i<view.length;i++){
                if(view[i][1].content){
                    count--;
                }
            }
            return count==0;
        },
        //全选或取消全选
        checkedAll(){
            let view=getCurrentPageView(this.config)
            if(this.isCheckedAll()){
                for(let i=0;i<view.length;i++){
                    view[i][1].content=false;
                }
            }else{
                for(let i=0;i<view.length;i++){
                    view[i][1].content=true;
                }
            }
        },
        calibrateCkeckedAll(){
            if(this.isCheckedAll()){
                this.config.checkedAll=true;
            }else{
                this.config.checkedAll=false;
            }
        }
    },
    beforeCreate(){
        this.__proto__.__proto__.$MyCommonListBus = this
    },
    mounted() {
        this.$MyCommonListBus.$on('checkedAll', this.checkedAll)
    },

}
</script>

<style>

</style>