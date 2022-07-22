<template>
<div id="app">
    <el-container>
      <el-header>
        <el-menu
          :default-active="activeIndex"
          class="el-menu-demo"
          mode="horizontal"
          @select="handleSelect"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="issue-order">Issue order</el-menu-item>
          <el-menu-item index="get-order">Get order</el-menu-item>
          <el-menu-item index="data-statistics">Data statistics</el-menu-item>
          <el-submenu index="user">
            <template slot="title">Me</template>
            <el-menu-item index="modify-profile">Modify profile</el-menu-item>
            <el-menu-item index="logout">Logout</el-menu-item>
            <!-- <el-submenu index="2-4">
              <template slot="title">选项4</template>
              <el-menu-item index="2-4-1">选项1</el-menu-item>
              <el-menu-item index="2-4-2">选项2</el-menu-item>
              <el-menu-item index="2-4-3">选项3</el-menu-item>
            </el-submenu> -->
          </el-submenu> 
          
          <!-- <el-menu-item index="4"
            ><a href="https://www.ele.me" target="_blank"
              >订单管理</a
            ></el-menu-item> -->
        </el-menu>
      </el-header>
      <el-container>
        <!-- <el-aside width="200px">Aside</el-aside> -->
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>
    <el-footer>
      <div class="footer">
      <!-- <div class="links">
        <span>Feature 1</span>
        <span>Feature 2</span>
        <span>Feature 3</span>
      </div> -->
      <div class="version">Version {{version}}</div>
    </div>
    </el-footer>
  </div>
</template>

<script>
export default {
    name: 'NavigatorFrame',
      data() {
        return {
            //activeIndex: '',//issue-order
            // activeIndex2: "1",
        };
  },
    computed:{
    version: function(){
      return this.$store.state.mConfig.packageJson.version;
    },
    projectName: function(){
      return this.$store.state.mConfig.packageJson[`project-name`];
    },
    activeIndex: function(){
      return this.$store.state.mConfig.navigator.split('/')[1];
    },
  },
    methods: {
        handleSelect(key, keyPath) {
        //console.log(key, keyPath);
        //拼接路由路径
        let path = keyPath.join("/");
            this.$router.push({ path: path });
        }
    }
}
</script>

<style lang="scss" scoped>
    .el-header{
        padding: 0;
    }
.el-main{
    background: white;
}
.footer {
  padding: 20px 20px;
  
  display: flex;
  flex-direction: column;
  align-items: center;
  h1,
  h2,
  h3 {
    color: #f0f4f8;
    padding: 0;
    margin: 0;
  }
  .links {
    display: flex;
    font-family: "Open Sans";
    span {
      padding: 0 10px;
      font-size: 18px;
      border-right: 1px solid #9fb3c8;
      &:last-child {
        border-right: none;
      }
    }
  }
  .version {
    font-family: "Open Sans";
    padding: 0 10px;
    color: #9fb3c8;
    font-size: 12px;
    margin-top: 5px;
  }
}
</style>