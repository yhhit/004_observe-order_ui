<template>
  <div>
    <!-- select all checkbox -->
    <span class="checkbox">
      <label>
        <input type="checkbox" @click="$MyCommonListBus.$emit('checkedAll')" v-model="config.checkedAll"/>
        select all
      </label>
    </span>
    <!-- add button and delete button-->
    <span class="form-group">
      <el-button type="primary" size="mini" v-for="b,index in config.lPButton" :key="index" @click="handleButton(b.title)">{{b.title}}</el-button>
    </span>
  </div>
</template>

<script>
import {getCurrentPageView} from './utils.js';
export default {
    name: 'MyCommonListOperatorInter',
    methods: {
        handleButton(title){
            //查询全部被勾选项目的id
            var checkedIds = getCurrentPageView(this.config).filter(function(item){
                return item[1].content;
            }).map(function(item){
                return item[0].content;
            });
            
            this.config.handlelPButton(checkedIds,title);
        }
    },
    
    props:["config"],
    
}
</script>

<style>

</style>