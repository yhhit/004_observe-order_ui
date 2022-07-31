<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-form-item label="Nick name" prop="nickName">
        <el-input
          v-model="form.nickName"
          :disabled="type === 'read'"
        ></el-input>
      </el-form-item>
      <el-form-item label="User name" prop="userName">
        <el-input
          v-model="form.userName"
          :disabled="type === 'read'"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          v-model="form.password"
          :disabled="type === 'read'"
          type="password"
        ></el-input>
        <el-button
          type="primary"
          @click="
            handleClearModifyPassword();
            formForPassword.dialogFormVisible = true;
          "
          v-if="type === 'read'"
          size="mini"
          >Modify</el-button
        >
      </el-form-item>
      <el-form-item
        label="Re-password"
        prop="repeatPassword"
        v-if="type === 'create'"
      >
        <el-input v-model="form.repeatPassword" type="password"></el-input>
      </el-form-item>
      <!-- <el-form-item label="Authority" prop="authority">
        <el-select
          filterable
          v-model="form.authority"
          multiple
          placeholder="Please select"
          :disabled="type === 'read'"
        >
          <el-option
            v-for="item in form.authorityOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item> -->
      <!-- style="margin:auto;width: fit-content;" -->
      <el-form-item>
        <el-button type="primary" @click="onSubmit" v-if="type === 'create'"
          >Register</el-button
        >
        <el-button type="primary" @click="onSubmit" v-if="type === 'update'"
          >Confirm</el-button
        >
        <el-button @click="onClear" v-if="type === 'create'">Clear</el-button>
        <el-button @click="$router.go(-1)" v-if="type === 'update'"
          >Cancel</el-button
        >
        <el-button
          type="primary"
          @click="$router.push('/users/profiles/put')"
          v-if="type === 'read'"
          >Modify</el-button
        >
        <el-button
          type="primary"
          @click="handleDeleteAccount()"
          v-if="type === 'read'"
          >Delete this account</el-button
        >
      </el-form-item>
    </el-form>
    <el-dialog
      title="Modify password"
      :visible.sync="formForPassword.dialogFormVisible"
    >
      <el-form
        :model="formForPassword"
        :rules="rulesForPassword"
        ref="formForPassword"
      >
        <el-form-item
          label="Old password"
          :label-width="formForPassword.formLabelWidth"
          prop="oldPassword"
        >
          <el-input v-model="formForPassword.oldPassword"></el-input>
        </el-form-item>
        <el-form-item
          label="New password"
          :label-width="formForPassword.formLabelWidth"
          prop="newPassword"
        >
          <el-input v-model="formForPassword.newPassword"></el-input>
        </el-form-item>
        <el-form-item
          label="Repeat password"
          :label-width="formForPassword.formLabelWidth"
          prop="repeatPasswordForModify"
        >
          <el-input
            v-model="formForPassword.repeatPasswordForModify"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formForPassword.dialogFormVisible = false"
          >Cancel</el-button
        >
        <el-button type="primary" @click="onSubmitForPassword()"
          >Confirm</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import {
  registerUrl,
  modifyProfileUrl,
  modifyPasswordUrl,
  userProfileUrl,
  deleteAccountUrl
} from "../const/api";
export default {
  name: "OperateProfile",
  mounted() {
    console.log("OperateProfile mounted");
    if(this.$route.meta.type!=="create")
      this.getProfile();
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input your password!"));
      } else if (value.length < 10 || value.length > 20) {
        callback(new Error("Password length must be between 10 and 20!"));
      } else {
        if (this.form.password !== "") {
          this.$refs.form.validateField("repeatPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please repeat your password!"));
      } else if (value !== this.form.password) {
        callback(new Error("Two passwords are inconsistent!"));
      } else if (value.length < 10 || value.length > 20) {
        callback(new Error("Password length must be between 10 and 20!"));
      } else {
        callback();
      }
    };
    var validateForModifyPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please input your password!"));
      } else if (value.length < 10 || value.length > 20) {
        callback(new Error("Password length must be between 10 and 20!"));
      } else {
        if (this.formForPassword.newPassword !== "") {
          this.$refs.formForPassword.validateField("repeatPasswordForModify");
        }
        callback();
      }
    };
    var validateForModifyPassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("Please repeat your password!"));
      } else if (value !== this.formForPassword.newPassword) {
        callback(new Error("Two passwords are inconsistent!"));
      } else if (value.length < 10 || value.length > 20) {
        callback(new Error("Password length must be between 10 and 20!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        nickName: "",
        userName: "",
        password: "",
        repeatPassword: "",
        // authority: "",
        // authorityOptions: [
        //   {
        //     value: 1,
        //     label: "Issuer",
        //   },
        //   {
        //     value: 2,
        //     label: "executor",
        //   },
        // ],
      },
      formForPassword: {
        dialogFormVisible: false,
        oldPassword: "",
        newPassword: "",
        repeatPasswordForModify: "",
        formLabelWidth: "120px",
      },
      rules: {
        nickName: [
          {
            required: true,
            message: "Please input your nick name",
            trigger: "blur",
          },
          {
            min: 3,
            max: 10,
            message: "The length of nick name must between 3 and 10",
            trigger: "blur",
          },
        ],
        userName: [
          {
            required: true,
            message: "User name is required",
            trigger: "blur",
          },
          {
            min: 5,
            max: 10,
            message: "The length of user name must between 5 and 10",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "Password is required", trigger: "blur" },
          {
            validator: validatePass,
            trigger: "blur",
          },
        ],
        repeatPassword: [
          {
            required: true,
            message: "Please input your password again",
            trigger: "blur",
          },
          {
            validator: validatePass2,
            trigger: "blur",
          },
        ],
        // authority: [
        //   {
        //     required: true,
        //     message: "Authority is required",
        //     trigger: "change",
        //   },
        // ],
      },
      rulesForPassword: {
        oldPassword: [
          {
            required: true,
            message: "Please input your password!",
            trigger: "blur",
          },
        ],
        newPassword: [
          {
            required: true,
            message: "Please input your password!",
            trigger: "blur",
          },
          {
            validator: validateForModifyPassword,
            trigger: "blur",
          },
        ],
        repeatPasswordForModify: [
          {
            required: true,
            message: "Please input your password again!",
            trigger: "blur",
          },
          {
            validator: validateForModifyPassword2,
            trigger: "blur",
          },
        ],
      },
    };
  },
  //type: 'create' 'update' or 'read', id: order id
  computed: {
    type() {
      return this.$route.meta.type;
    },
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        } else if (this.type === "create") {
          this.createUser();
        } else if (this.type === "update") {
          this.updateUser();
        }
      });
    },
    onSubmitForPassword() {
      console.log("submit!");
      this.$refs.formForPassword.validate((valid) => {
        if (!valid) {
          return;
        } else {
          this.modifyPassword();
        }
      });
    },
    modifyPassword() {
      axios
        .put(modifyPasswordUrl, {
          oldPassword: this.formForPassword.oldPassword,
          newPassword: this.formForPassword.newPassword,
        })
        .then((res) => {
          if (res.data.code === 0) {
            debugger;
            this.$store.dispatch("mConfig/setUserSession", res.data.data);
            this.$message({
              message: "Modify password successfully!",
              type: "success",
            });
            this.formForPassword.dialogFormVisible = false;
          } else {
            this.$message({
              message: "Modify password failed!",
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: "Modify password failed!",
            type: "error",
          });
        })
        .then(() => {
          this.formForPassword.oldPassword = "";
          this.formForPassword.newPassword = "";
          this.formForPassword.repeatPassword = "";
          this.formForPassword.dialogFormVisible = false;
        });
    },
    createUser() {
      axios
        .post(registerUrl, this.form)
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              message: "Register successfully!",
              type: "success",
            });

            //询问是否立即直接登陆
            this.$confirm("Do you want to login directly?", "Login", {
              confirmButtonText: "Login directly",
              cancelButtonText: "Cancel",
              type: "warning",
            })
              .then(() => {
                console.log(this);
                this.$store.dispatch("mConfig/setUserSession", res.data.data);
                this.$router.push("/");
              })
              .catch(() => {
                this.$router.push("/users/login");
              });
          } else {
            this.$message({
              message: res.data.err,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            message: "Register failed!",
            type: "error",
          });
        });
    },
    updateUser() {
      axios
        .post(modifyProfileUrl, this.form)
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.$store.dispatch("mConfig/setUserSession", res.data.data);
            this.$message({
              message: "Modify success!",
              type: "success",
            });
            this.$router.go(-1);
          } else {
            this.$message({
              message: res.data.err,
              type: "error",
            });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            message: "Modify failed",
            type: "error",
          });
        });
    },
    onClear() {
      this.handleClose(() => {
        this.form = {
          title: "",
          toWhom: [],
          startAndEndDateTime: "",
          cycle: [],
          content: "",
          done: false,
          successful: false,
          // resource: '',
        };
      });
    },
    handleClose(done) {
      this.$confirm("Are you sure clear all forms？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
    },
    handleClearModifyPassword() {
      this.formForPassword = {
        dialogFormVisible: false,
        oldPassword: "",
        newPassword: "",
        repeatPassword: "",
        formLabelWidth: "120px",
      };
    },
    getProfile() {
      axios
        .post(userProfileUrl)
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.form = res.data.data.userInfo;
          } else {
            this.$message({
              message: "Get profile failed" + (res.data.err || ""),
              type: "error",
            });
          }
        })
        .catch((err) => {
          this.$message({
            message: "Get profile failed",
            type: "error",
          });
        });
    },
    handleDeleteAccount() {
      this.$confirm("Are you sure delete account？This action cannot be undone, your account will be deleted permanently!")
        .then((_) => {
          axios
            .delete(deleteAccountUrl)
            .then((res) => {
              console.log(res);
              if (res.data.code === 0) {
                this.$store.dispatch("mConfig/clearUserSession", {});
                this.$message({
                  message: "Delete account successfully!",
                  type: "success",
                });
                this.$router.push("/users/login");
              } else {
                this.$message({
                  message: "Delete account failed!",
                  type: "error",
                });
              }
            })
            .catch((err) => {
              this.$message({
                message: "Delete account failed!",
                type: "error",
              });
            });
        })
        .catch((_) => {});
    },
    },
};
</script>

<style scpoed>
</style>