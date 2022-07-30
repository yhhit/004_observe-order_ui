<template>
<div id="main" style="width:100%;height:600px">
</div>
</template>

<script>
import * as echarts from "echarts";
import axios from 'axios';
import { dataStatisticsUrl } from './const/api';
export default {
  name: "DataStatistics",
  data(){
    return {
        yAxis:{
            CS_AKS:[],
            DFT_ON_PRIMISE:[],
        }
    }
  },
  mounted() {
    axios.get(dataStatisticsUrl).then((res)=>{
        console.log(res)
        if(res.data.code===0){
            this.yAxis.CS_AKS = res.data.data.CS_AKS;
            this.yAxis.DFT_ON_PRIMISE = res.data.data.DFT_ON_PRIMISE;
            this.draw()
        }else{
            this.$message.error(res.data.err||"Get data error");
        }
    }).catch((err)=>{
        this.$message.error(err);
    });



  },
  methods:{
    draw(){
    var chartDom = document.getElementById("main");
    var myChart = echarts.init(chartDom);
    var option;
    option = {
      title: {
        text: "Hourly Statistic",
      },
      tooltip: {
        trigger: "axis",
      },
      legend: {
        data: ["DFT_ON_PRIMISE", "CS_AKS"],
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "3%",
        containLabel: true,
      },
      toolbox: {
        feature: {
          saveAsImage: {},
        },
      },
      xAxis: {
        type: "time",
        boundaryGap: false,
        minInterval: 3600 * 1000*1000,
        axisLabel: {
            show:true,
            showMaxLabel:true,
            showMinLabel:true,
            formatter:'{MM}/{dd} {hh}:{mm}',
        },
        // splitLine: {
        //     show: false
        // }
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          name: "DFT_ON_PRIMISE",
          type: "line",
          stack: "Total",
          smooth: true,
          data: this.yAxis.DFT_ON_PRIMISE
        },
        {
          name: "CS_AKS",
          type: "line",
          stack: "Total",
          smooth: true,
          data: this.yAxis.CS_AKS
        },
      ],
    };

    option && myChart.setOption(option);
    }
  }
};
</script>

<style>
</style>