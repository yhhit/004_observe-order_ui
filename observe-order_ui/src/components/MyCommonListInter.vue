<template>
  <div>
    <table>
        <thead>
            <tr>
                <th v-for="h,index in config.header" :key="index" v-text="h.title"></th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in getCurrentPageView(config) " :key="item[0].content" >
                <td>
                    <input type="checkbox" v-model="item[1].content" :value="item[0].content">
                </td>
                <td v-for="i in item" v-show="i.title!='id'&&i.title!='checked'" :key="i.title">{{i.content}}</td>
                <td>
                    <button v-for="b in config.lIButton" :key="b.title" @click="handleLIButton(b.title,item[0].content)">{{b.title}}</button>
                </td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import {getCurrentPageView} from './utils.js';
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

    props:["config"],
    
}
</script>

<style>

</style>