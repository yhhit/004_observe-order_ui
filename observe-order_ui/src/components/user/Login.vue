<template>
  <div id="app">
    <div class="header">
      <img width="70px" src="/res/img/logo.png" alt="logo"/><h2 class="logo">WELECOME TO {{projectName.toUpperCase()}}</h2>
    </div>
    <div class="login">
    <el-card>
      <h2>Login</h2>
      <el-form
        class="login-form"
        :model="model"
        :rules="rules"
        ref="form"
        @submit.native.prevent="login"
      >
        <el-form-item prop="username">
          <el-input v-model="model.username" placeholder="Username" prefix-icon="fas fa-user"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="model.password"
            placeholder="Password"
            type="password"
            prefix-icon="fas fa-lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            class="login-button"
            type="primary"
            native-type="submit"
            block
          >Login</el-button>
        </el-form-item>
        <!-- <a class="forgot-password" href="/">Forgot password ?</a> -->
        <router-link class="forgot-password" to="/users/post">Register</router-link>
      </el-form>
    </el-card>
  </div>

    <div class="footer">
      <!-- <div class="links">
        <span>Feature 1</span>
        <span>Feature 2</span>
        <span>Feature 3</span>
      </div> -->
      <div class="version">Version {{version}}</div>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';
import {loginUrl} from "../const/api.js"
export default {
  name: "Login-component",
  mounted: function() {
  },
  data() {
    return {
      // validCredentials: {
      //   username: "lightscope",
      //   password: "lightscope",
      // },
      model: {
        username: "",
        password: "",
      },
      loading: false,
      rules: {
        username: [
          {
            required: true,
            message: "Username is required",
            trigger: "blur",
          },
          {
            min: 5,
            message: "Username length should be at least 5 characters",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            min: 10,
            message: "Password length should be at least 10 characters",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed:{
    version: function(){
      return this.$store.state.mConfig.packageJson.version;
    },
    projectName: function(){
      return this.$store.state.mConfig.packageJson[`project-name`];
    }
  },
  methods: {
    
    handleLogin() {
      let self = this;
      this.loading = true;
      console.log(this.model)
      return axios.post(loginUrl,this.model).then(res => {
          if( res.data.code===0){
            this.$store.dispatch('mConfig/setUserSession', res.data.data);
            this.$message.success("Login successfull");
            setTimeout(() => {
              this.$router.push('/');
            }, 1000);
          }else{
            this.$message.error("Login failed, "+(res.data.err||"network error!"));
          }
          
        }).catch(function (error) {
          // handle error
          console.log(error);
          self.$message.error("Login failed:"+error);
        })
        .then(function () {
          // always executed
          self.loading = false;
        });
    },
    async login() {
      let valid = await this.$refs.form.validate();
      if (!valid) {
        return;
      }
      this.handleLogin().catch(err => {
        console.log(err);
      });
      
    },
  },
};
</script>
<style lang="scss" scoped>
#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #2c3e50;
  margin: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
body {
  margin: 0;
  padding: 0;
  background: #102a43;
  background-image: url("../../assets/img/LVs7-dots.png");
  background-size: contain;
}
.footer,
.header {
  padding: 20px 20px;
  color: #f0f4f8;
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
.header {
  padding: 10px 20px;
  .logo {
    font-family: "Open Sans";
    letter-spacing: 3px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .logo .part-2 {
    color: #d64545;
  }
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.login {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-button {
  width: 100%;
  margin-top: 40px;
}
.login-form {
  width: 290px;
}
.forgot-password {
  margin-top: 10px;
}
</style>
<style lang="scss">
$teal: rgb(0, 124, 137);
.el-button--primary {
  background: $teal;
  border-color: $teal;

  &:hover,
  &.active,
  &:focus {
    background: lighten($teal, 7);
    border-color: lighten($teal, 7);
  }
}
.login .el-input__inner:hover {
  border-color: $teal;
}
.login .el-input__prefix {
  background: rgb(238, 237, 234);
  left: 0;
  height: calc(100% - 2px);
  left: 1px;
  top: 1px;
  border-radius: 3px;
  .el-input__icon {
    width: 30px;
  }
}
.login .el-input input {
  padding-left: 35px;
}
.login .el-card {
  padding-top: 0;
  padding-bottom: 30px;
}
h2 {
  font-family: "Open Sans";
  letter-spacing: 1px;
  font-family: Roboto, sans-serif;
  padding-bottom: 20px;
}
a {
  color: $teal;
  text-decoration: none;
  &:hover,
  &:active,
  &:focus {
    color: lighten($teal, 7);
  }
}
.login .el-card {
  width: 340px;
  display: flex;
  justify-content: center;
}
</style>
