<template>
  <div class="el-table el-table--fit el-table--striped el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%;">
    <div class="el-table__body-wrapper">
        <table class="el-table__body" cellpadding="0" cellspacing="0" style="text-align:center;border-spacing: 0px; border: 0px; width: 759px;">
            <thead>
                <tr>
                    <th style="border-spacing: 0px; border: 0px; width: 30px;" ></th>
                    <th  v-for="h,index in config.header" :key="index" v-text="h.title"></th>
                </tr>
            </thead>
            <tbody >
                <tr style="height:60px" v-for="item,index in getCurrentPageView(config) " :key="item[0].content" class="el-table__row" :class="index%2==1?'el-table__row--striped':''">
                    <td>
                        <input type="checkbox" v-model="item[1].content" :value="item[0].content">
                    </td>
                    <td v-for="i in item" v-show="i.title!='id'&&i.title!='checked'" :key="i.title">{{i.content}}</td>
                    <td style="width:fit-content">
                        <el-button style="width:fit-content"  type="primary" size="mini" v-for="b  in config.lIButton" :key="b.title" @click="handleLIButton(b.title,item[0].content)">{{b.title}}</el-button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  </div>
</template>

<script>
import {getCurrentPageView} from './utils.js';
import { mapState } from 'vuex';
export default {
    name: 'MyCommonListInter',
    methods: {
        handleLIButton(title,id){
            this.config.handleLIButton(title,id);
        },
        getCurrentPageView(config){
            return getCurrentPageView(config);
        }
    },
    computed:{
        ...mapState('mList',['config']),
    },
    
}
</script>

<style>

</style>