<template>
  <div>
    <template>
      <el-table
        ref="multipleTable"
        :data="listData.ordersData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column
          prop="title"
          label="Title"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="issuer"
          label="Issuer"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="toWhom"
          label="To Whom"
          width="120"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="Start And End Date Time" width="310">
          <template slot-scope="scope">
            {{ getLocalTime(scope.row.startAndEndDateTime[0]) }} to
            {{ getLocalTime(scope.row.startAndEndDateTime[1]) }}
          </template>
        </el-table-column>
        <el-table-column label="Cycle" width="240" show-overflow-tooltip>
          <template slot-scope="scope">{{
            convertCycleArrToText(scope.row.cycle)
          }}</template>
        </el-table-column>
        <el-table-column
          type="expand"
          prop="content"
          label=""
          width="55"
          show-overflow-tooltip>
          <template slot-scope="props">
            <el-form label-position="left" inline class="table-expand">
              <el-form-item label="content">
                <span>{{ props.row.content }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          prop="content"
          label="Content"
          width="240"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="Successful" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch
              v-bind:value="scope.row.successful"
              disabled
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="Executed" width="100" show-overflow-tooltip>
          <template slot-scope="scope">
            <el-switch
              v-bind:value="scope.row.done"
              disabled
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column
          prop="operation"
          label="Operation"
          width="300"
          show-overflow-tooltip>
          <template slot-scope="scope">
            <!-- <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
            <el-button
              size="mini"
              type="danger"
              @click="handleSuccess(scope.$index, scope.row)">Success</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDefeat(scope.$index, scope.row)"
              >Defeat</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
      <p></p>
      <div class="block">
        <el-button type="primary" size="mini" @click="onSuccess()">Success</el-button>
        <el-button type="primary" size="mini" @click="onDefeat()">Defeat</el-button>
        <el-button type="danger" size="mini" @click="onDelete">Delete selected</el-button>

        <el-pagination
          style="display: inline-block"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="listData.currentPage"
          :page-sizes="[5, 10, 50, 100]"
          :page-size="listData.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="listData.total">
        </el-pagination>
      </div>
      <!-- <div style="margin-top: 20px">
            <el-button @click="toggleSelection()">取消选择</el-button>
        </div> -->
    </template>
  </div>
</template>

<script>
import axios from "axios";
import Url from "url";
import { getLocalTime } from "../utils";
import {
  orderListUrl,
  deleteOrdersUrl,
  orderToSuccessfulUrl,
  orderToDefeatUrl,
} from "../const/api";
export default {
  name: "GetOrder",
  data() {
    return {
      listData: {
        ordersData: [],
        multipleSelection: [],
        total: 0,
        currentPage: 1,
        pageSize: 5,
      },
    };
  },
  mounted() {
    this.getOrderList();
  },
  computed: {},
  methods: {
    // toggleSelection(rows) {
    //   if (rows) {
    //     rows.forEach(row => {
    //       this.$refs.multipleTable.toggleRowSelection(row);
    //     });
    //   } else {
    //     this.$refs.multipleTable.clearSelection();
    //   }
    // },
    handleDelete(index, row) {
      console.log(index, row);
      this.deleteItem([row]);
    },
    handleDefeat(index, row) {
      console.log(index, row);
      this.defeatItem([row]);
    },
    handleSuccess(index, row) {
      console.log(index, row);
      this.successItem([row]);
    },
    async successItem(rows) {
      //从rows中取出id组成一个新数组
      let ids = [];
      rows.forEach((row) => {
        ids.push(row.id);
      });
      try {
        let res = await axios.put(orderToSuccessfulUrl, {
          data: ids,
        });

        if (res.data.code == 0) {
          this.$message({
            message: "Successful",
            type: "success",
          });
        } else {
          this.$message({
            message: "Failed",
            type: "error",
          });
        }
        this.getOrderList();
        this.$refs.multipleTable.clearSelection();
      } catch (err) {
        this.$message({
          message: "Failed",
          type: "error",
        });
      }
    },
    async defeatItem(rows,status) {
      //从rows中取出id组成一个新数组
      let ids = [];
      rows.forEach((row) => {
        ids.push(row.id);
      });
      try {
        if(status==undefined)
          throw new Error("status is null")
        const url=Url.parse(orderToDefeatUrl).resolve(`${status}`)
        let res = await axios.put(url, {
          data: ids,
        });
        if (res.data.code == 0) {
          this.$message({
            message: "Successful",
            type: "success",
          });
        } else {
          this.$message({
            message: "Failed",
            type: "error",
          });
        }
        this.getOrderList();
        this.$refs.multipleTable.clearSelection();
      } catch (err) {
        console.log(err);
        this.$message({
          message: "Failed",
          type: "error",
        });
      }
    },
    async deleteItem(rows) {
      //从rows中取出id组成一个新数组
      let ids = [];
      rows.forEach((row) => {
        ids.push(row.id);
      });
      try {
        let res = await axios.delete(deleteOrdersUrl, {
          data: ids,
        });
        if (res.data.code == 0) {
          this.$message({
            message: "Delete Success",
            type: "success",
          });
        } else {
          this.$message({
            message: "Delete Failed",
            type: "error",
          });
        }
        this.getOrderList();
        //this.$refs.multipleTable.clearSelection();
      } catch (err) {
        console.log(err);
        this.$message({
          message: "Delete Failed",
          type: "error",
        });
      }
    },
    async checkSelectAndConfirm(tip, callback) {
      if (this.listData.multipleSelection.length == 0) {
        this.$message({
          message: "Please select the order",
          type: "error",
        });
        throw new Error("Please select the order");
      }
      try {
        await this.$confirm(tip, "Confirm", {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning",
        });
        if (callback) callback();
        else return Promise.resolve();
      } catch {
        this.$message({
          type: "info",
          message: "Cancel",
        });
        throw new Error()
      }
    },
    async onDelete() {
      await this.checkSelectAndConfirm(
        "Are you sure to delete the selected order?"
      );
      this.deleteItem(this.listData.multipleSelection);
    },
    async onDefeat() {
      await this.checkSelectAndConfirm(
        "Are you sure to set the selected order to failure?"
      );
      this.defeatItem(this.listData.multipleSelection);
    },
    async onSuccess() {
      await this.checkSelectAndConfirm(
        "Are you sure to set the selected order to successful?"
      );
      this.successItem(this.listData.multipleSelection);
    },
    handleSelectionChange(val) {
      this.listData.multipleSelection = val;
    },
    handleSizeChange(val) {
      this.listData.pageSize=val;
      this.getOrderList()
    },
    handleCurrentChange(val) {
      this.listData.currentPage=val,
      this.getOrderList()
    },
    async getOrderList() {
      try {
        let res = await axios.get(orderListUrl, {
          params: {
            currentPage: this.listData.currentPage,
            pageSize: this.listData.pageSize,
          },
        });
        if (res.data.code === 0) {
          this.listData.total=res.data.data.total;
          this.listData.ordersData = res.data.data.ordersData;
        } else {
          this.$message.error(res.data.msg);
        }
      } catch (error) {
        this.$message.error("Failed to get order list");
      }
    },
    getLocalTime(time) {
      return getLocalTime(time);
    },
    convertCycleArrToText(cycle) {
      return cycle.join(" ");
    },
  },
};
</script>

<style>
.table-expand {
  font-size: 0;
}
.table-expand label {
  width: 90px;
  color: #99a9bf;
}
.table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>