<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="Title">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="To whom">
      <el-select filterable v-model="form.toWhom" multiple placeholder="请选择">
        <el-option
          v-for="item in form.toWhomOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Start time">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="Select date"
          v-model="form.startDate"
          style="width: 100%"
        ></el-date-picker>
      </el-col>
      <el-col class="line" style="text-align: center" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker
          placeholder="Select time"
          v-model="form.startTime"
          style="width: 100%"
        ></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="End time">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="Select date"
          v-model="form.endDate"
          style="width: 100%"
        ></el-date-picker>
      </el-col>
      <el-col class="line" style="text-align: center" :span="2">-</el-col>
      <el-col :span="11">
        <el-time-picker
          placeholder="Select time"
          v-model="form.endTime"
          style="width: 100%"
        ></el-time-picker>
      </el-col>
    </el-form-item>

    <el-form-item label="Cycle">
      <el-checkbox-group v-model="form.cycle">
        <el-checkbox label="Mon" name="cycle"></el-checkbox>
        <el-checkbox label="Tue" name="cycle"></el-checkbox>
        <el-checkbox label="Wed" name="cycle"></el-checkbox>
        <el-checkbox label="Thu" name="cycle"></el-checkbox>
        <el-checkbox label="Fri" name="cycle"></el-checkbox>
        <el-checkbox label="Sat" name="cycle"></el-checkbox>
        <el-checkbox label="Sun" name="cycle"></el-checkbox>
      </el-checkbox-group>
    </el-form-item>

    <el-form-item label="Content">
      <el-input type="textarea" v-model="form.content"></el-input>
    </el-form-item>
    <el-form-item label="Done">
      <el-switch v-model="form.done"></el-switch>
    </el-form-item>
    <el-form-item label="Successful">
      <el-switch v-model="form.successful"></el-switch>
    </el-form-item>
    <!-- <el-form-item label="特殊资源">
    <el-radio-group v-model="form.resource">
      <el-radio label="线上品牌商赞助"></el-radio>
      <el-radio label="线下场地免费"></el-radio>
    </el-radio-group>
  </el-form-item> -->
    <el-form-item style="margin:auto;width: fit-content;">
      <el-button type="primary" @click="onSubmit">Issue</el-button>
      <el-button @click="onClear">Clear</el-button>
    </el-form-item>

    
  </el-form>
</template>

<script>
export default {
  name: "IssueOrder",
  data() {
    return {
      form: {
        title: "",
        toWhom: [],
        toWhomOptions: [
          {
            value: "选项1",
            label: "黄金糕",
          },
          {
            value: "选项2",
            label: "双皮奶",
          },
        ],
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        cycle: [],
        content: "",
        done: false,
        successful: false,
        // resource: '',
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
    onClear() {
      this.handleClose(() => {
        this.form = {
          title: "",
          toWhom: [],
          startDate: "",
          startTime: "",
          endDate: "",
          endTime: "",
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