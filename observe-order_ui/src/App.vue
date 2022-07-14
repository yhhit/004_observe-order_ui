<template>
  <div id="app">
    <MyCommonList :config="MyCommonListConfig"/>
  </div>
</template>

<script>
import MyCommonList from './components/MyCommonList.vue'


export default {
  name: 'App',
  data(){
    return {
      MyCommonListConfig:{
          checkbox:[],
          checkedAll: false,
          header:[
              {
                  title:"name"
              },
              {
                  title:"age"
              },
              {
                  title:"operation"
              }
          ],
          //v-bind
          view:[
              [
                  {
                      title:"id",
                      content:1,
                      type:"String"

                  },//id required
                  {
                    title:"checked",
                    content:false,
                    type:"Boolean"
                  },//checked required
                  {
                      title:"name",
                      content:"yhh",
                      type:"String"
                  },
                  {
                      title:"age",
                      content:22,
                      type:"Number"
                  },
              ]
              ,
              [
                  {
                      title:"id",
                      content:2,
                      type:"String"

                  },//id required
                  {
                    title:"checked",
                    content:false,
                    type:"Boolean"
                  },//checked required
                  {
                      title:"name",
                      content:"ww",
                      type:"String"
                  },
                  {
                      title:"age",
                      content:21,
                      type:"Number"
                  },
              ]
          ],
          lIButton:[
              {
                  title:"edit"
              },
              {
                  title:"delete"
              }
          ],
          lPButton:[
              {
                  title:"add"
              },
              {
                  title:"delete"
              }
          ],
          pageSize:1,
          currentPage:1,
          handleLIButton:function(title,id){
              console.log(id,title);
          },
          handlelPButton:function(ids,title){
              console.log(ids,title);
          }
        
        }
      }
            
    },
  components: {
    MyCommonList
  }
}
</script>

<style>

</style>
