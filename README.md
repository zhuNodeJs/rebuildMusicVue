##### rebuildMusicVue
这是一个vue重建的关于音乐的项目
1. 问题一：如何加载获取json数据，本文中是使用node express 4.x框架和qq的服务器进行通信，获取数据。以前的版本为是在dev.serve.js中进行启动，但本版本中的package.json启动命令为：'"dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",', 启动的文件在build文件下的webpack.dev.conf.js中，因此获取数据在此文件中完成：
```
// start: 请求数据
const express = require('express')
const axios = require('axios')
const app = express()
const apiRoutes = express.Router()
app.use('/api', apiRoutes)

// end: 请求数据

....
<!-- 在devWebpackConfig函数中devServer对象中添加一对键值 -->
 before(app){
      app.get('/api/getList', function (req, res) {
        var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg'

        axios.get(url, {
            headers: {
              referer: 'https://c.y.qq.com/',
              host: 'c.y.qq.com'
            },
            params: req.query
          })
          .then(function (response) {
            res.json(response.data)
          })
          .catch(function (error) {
            console.log(error)
          })
      })
    },
```
问题二： 当使用vue init webpack 项目名, 随后想使用scss进行css预编译时，可以进行的配置的步骤：
```
a. 
  # cnpm install --save-dev node-sass
  # cnpm install --save-dev sass-loader
即可，在vue文件中，添加
<style scoped lang='scss'>
b. 因为在build 文件中的utils.js文件中的generateLoaders函数已经自动为本项目配置了scss的预编译。
```
问题三：