<template>
  <!-- <div id="app">
    <MyCommonList/>
  </div> -->
  <div id="app">
    <router-view name="fullPage"/>
    <router-view name="navigator"/>
  </div>
  
  
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "App",
  components: {},

  methods: {
    ...mapMutations("mList", ["SET_CONFIG"]),
  },
  created() {
    this.SET_CONFIG({
      checkbox: [],
      checkedAll: false,
      header: [
        {
          title: "name",
        },
        {
          title: "age",
        },
        {
          title: "operation",
        },
      ],
      //v-bind
      view: [
        [
          {
            title: "id",
            content: 1,
            type: "String",
          }, //id required
          {
            title: "checked",
            content: false,
            type: "Boolean",
          }, //checked required
          {
            title: "name",
            content: "yhh1",
            type: "String",
          },
          {
            title: "age",
            content: 22,
            type: "Number",
          },
        ],
        [
          {
            title: "id",
            content: 2,
            type: "String",
          }, //id required
          {
            title: "checked",
            content: false,
            type: "Boolean",
          }, //checked required
          {
            title: "name",
            content: "yhh2",
            type: "String",
          },
          {
            title: "age",
            content: 22,
            type: "Number",
          },
        ],
        [
          {
            title: "id",
            content: 3,
            type: "String",
          }, //id required
          {
            title: "checked",
            content: false,
            type: "Boolean",
          }, //checked required
          {
            title: "name",
            content: "yhh3",
            type: "String",
          },
          {
            title: "age",
            content: 22,
            type: "Number",
          },
        ],
        [
          {
            title: "id",
            content: 4,
            type: "String",
          }, //id required
          {
            title: "checked",
            content: false,
            type: "Boolean",
          }, //checked required
          {
            title: "name",
            content: "ww",
            type: "String",
          },
          {
            title: "age",
            content: 21,
            type: "Number",
          },
        ],
      ],
      lIButton: [
        {
          title: "edit",
        },
        {
          title: "delete",
        },
      ],
      lPButton: [
        {
          title: "add",
        },
        {
          title: "delete",
        },
      ],
      pageSize: 2,
      currentPage: 1,
      handleLIButton: function (title, id) {
        console.log(id, title);
      },
      handlelPButton: function (ids, title) {
        console.log(ids, title);
      },
    });
  },
};
</script>
<style>
body {
  margin: 0;

  background: #1a3d5f;;

}
</style>
