const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭语法检查
  lintOnSave: false,
  devServer: {
    // 配置多个代理
    proxy: {
      "/api/sso": {
        target: "http://localhost:3000",// 要访问的接口域名
        ws: false,// 是否启用websockets
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
            '^/api/sso': '/api' //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
          }
      },
      "/api/backend": {
        target: "http://localhost:9090",// 要访问的接口域名
        ws: false,// 是否启用websockets
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
            '^/api/backend': '/api' //这里理解成用'/api'代替target里面的地址,比如我要调用'http://40.00.100.100:3002/user/add'，直接写'/api/user/add'即可
          }
      }
    }
  }
  // dev: {
  //   // Paths
  //   // assetsSubDirectory: 'static',
  //   assetsPublicPath: '/',
  //   proxyTable: {
  //     '/api/sso':{         //这里最好有一个 /
  //       target:'http://localhost:3000',  //后台接口域名
  //       changeOrigin:true,    //是否跨域
  //       // ws:true,             //如果要代理 websockets，配置这个参数
  //       secure:false,       // 如果是https接口，需要配置这个参数
  //       pathRewrite:{       //重写请求路径
  //         '/api/sso' : '/api' 
  //       },
  //     },
  //     '/api/backend':{
  //       target:'http://localhost:9090',
  //       changeOrigin:true,
  //       secure:false,
  //       pathRewrite:{
  //         '/api/backend' : '/api'
  //       }
  //     }
    
  //   }
  // }
})
