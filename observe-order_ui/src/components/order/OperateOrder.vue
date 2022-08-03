<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="80px">
    <el-form-item label="Title" prop="title">
      <el-input v-model="form.title"  :disabled="type==='read'"></el-input>
    </el-form-item>
    <el-form-item label="To whom" prop="toWhom">
      <el-select filterable v-model="form.toWhom" multiple placeholder="Please select" :disabled="type==='read'">
        <el-option
          v-for="item in form.toWhomOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Start time" prop="startAndEndDateTime">
      <el-col :span="11">
        <el-date-picker
          v-model="form.startAndEndDateTime"
          :disabled="type==='read'"
          type="datetimerange"
          align="right"
          start-placeholder="Start DateTime"
          end-placeholder="End DateTime"
          :default-time="['12:00:00', '08:00:00']">
        </el-date-picker>
      </el-col>

    </el-form-item>

    <el-form-item label="Cycle" prop="cycle">
      <el-checkbox-group v-model="form.cycle" :disabled="type==='read'">
        <div>
          <el-button type="info" size="mini" round @click='form.cycle=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]' v-if="type!=='read'">all week</el-button>
          <el-button type="info" size="mini" round @click='form.cycle=["Mon","Tue","Wed","Thu","Fri"]' v-if="type!=='read'">weekday</el-button>
          <el-button type="info" size="mini" round @click='form.cycle=["Sat","Sun"]' v-if="type!=='read'">weekend</el-button>
          <el-button type="danger" size="mini" round @click='form.cycle=[]' v-if="type!=='read'">clear</el-button>
        </div>
        <div>
          <el-checkbox label="Mon" name="cycle"></el-checkbox>
          <el-checkbox label="Tue" name="cycle"></el-checkbox>
          <el-checkbox label="Wed" name="cycle"></el-checkbox>
          <el-checkbox label="Thu" name="cycle"></el-checkbox>
          <el-checkbox label="Fri" name="cycle"></el-checkbox>
          <el-checkbox label="Sat" name="cycle"></el-checkbox>
          <el-checkbox label="Sun" name="cycle"></el-checkbox>
        </div>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="Content" prop="content">
      <el-input type="textarea" v-model="form.content" :disabled="type==='read'"></el-input>
    </el-form-item>
    <el-form-item label="Done">
      <el-switch v-model="form.done" :disabled="type==='read'"></el-switch>
    </el-form-item>
    <el-form-item label="Successful">
      <el-switch v-model="form.successful" :disabled="type==='read'"></el-switch>
    </el-form-item>
    <!-- <el-form-item label="特殊资源">
    <el-radio-group v-model="form.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item> -->
    <el-form-item style="margin:auto;width: fit-content;">
      <el-button type="primary" @click="onSubmit" v-if="type!=='read'">Issue</el-button>
      <el-button @click="onClear" v-if="type!=='read'">Clear</el-button>
    </el-form-item>

    
  </el-form>
</template>

<script>
import axios from 'axios';
import qs from "qs";
import { issueOrderUrl, toWhomOptionsUrl } from '../const/api';
export default {
  name: "OperateOrder",
  data() {
    return {
      form: {
        title: "",
        toWhom: [],
        toWhomOptions: [
          // {
          //   value: "选项1",
          //   label: "黄金糕",
          // },
          // {
          //   value: "选项2",
          //   label: "双皮奶",
          // },
        ],
        startAndEndDateTime: "",
        cycle: [],
        content: "",
        done: false,
        successful: false,
        // resource: '',
      },
      rules: {
        title: [
          { required: true, message: "Please input title", trigger: "blur" },
          { min: 3, max: 30, message: "The length of title must between 3 and 30", trigger: "blur" },
        ],
        toWhom: [
          { required: true, message: "Please select to whom", trigger: "change" },
        ],
        startAndEndDateTime: [
          { required: true, message: "Please select start date", trigger: "change" },
        ],
        cycle: [
          { required: true, message: "Please select cycle", trigger: "blur" },
        ],
        content: [
          { required: true, message: "Please input content", trigger: "blur" },
        ],
      },
      
    };
  },
  mounted() {
    axios.get(toWhomOptionsUrl).then((res) => {
      if(res.data.code === 0) {
        this.form.toWhomOptions = res.data.data;
      }else{
        this.$message.error(res.data.err);
      }
    }).catch((err) => {
      this.$message.error(err);
    });
  },
  //type: 'create' 'update' or 'read', id: order id
  computed: {
    type(){
        return this.$route.meta.type;
    },
  },
  props: ['id'],
  methods: {
    onSubmit() {
      console.log("submit!");
      this.$refs.form.validate((valid) => {
        if (!valid) {
          return;
        } else if (this.type === "create") {
          this.issueOrder();
        } else if (this.type === "update") {
          this.modifyOrder();
        }
      });
    },
    issueOrder() {
      // this.form.startAndEndDateTime[0] = this.form.startAndEndDateTime[0].toString()
      // this.form.startAndEndDateTime[1] = this.form.startAndEndDateTime[1].toString()
      axios({
        method: "post",
        changeOrigin: "true",
        url: issueOrderUrl,
        transformRequest: [
          function (data) {
            // 对 data 进行任意转换处理
            return qs.stringify(data);
          },
        ],
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: this.form,
      })
        .then((res) => {
          console.log(res);
          if (res.data.code === 0) {
            this.$message({
              message: "Issue Successfully!",
              type: "success",
            });
            this.$router.go(0);
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
            message: "Issue Failed!",
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
        this.$confirm('Are you sure clear all forms？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      }
    
  },
};
</script>

<style>
</style>