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
问题三：vue-lazy-load vue懒加载插件
问题四：
 总结：
  1. 总结了一套Vue通用组件,可以在其他项目中复用的10+个基础组件，15+个业务组件
  2. 总结了一套常用的SCSS mixin 库
  3. 总结了一套常用的JS工具函数库
  4. 体会到组件化，模块化带来的便捷
  5. 体会到将对象封装成类(es6)的便捷性，以及利用工厂方式初始化类实例
  6. 学会利用js编写过渡效果即动画效果制作良好的用户交互体验。
问题五：
  图片的懒加载使用vue-lazyload，优化页面加载速度
问题六：
  1. 物理像素又被称为设备像素
  2. 设备独立像素 也被成为密度无关像素，可以认为是计算坐标系统中的一个点，这个点代表一个可以由程序使用的虚拟像素(比如说CSS像素), 然后由相关系统转换为物理像素。
  3. css像素 css像素是一个抽象的单位，主要使用在浏览器上，用来精确度量Web页面上的内容， 一般情况下，css像素称为与设备无关的像素(device-independent pixel), 简称DIPs。
  4. 屏幕密度 屏幕密度是指一个设备表面上存在的像素数量，他通常以每英寸有多少像素来计算(PPI)
  5. 设备像素比(device pixel ratio)
     设备像素比简称为dpr， 其定义了物理像素和设备独立像素的对应关系，他的值可以按下面的公式计算得到：
     设备像素比 = 物理像素 / 设备独立像素
     在javascript中，可以通过window.devicePixelRatio获得到当前的设备的dpr. 而在css中，可以通过-webkit-device-pixel-ratio, -webkit-min-device-pixel-ratio和-webkit-max-device-pixel-ratio进行媒体查询，对不同的dpr的设备，做一些样式适配的(智力只针对webkit内核和webview)
  6. meta标签 
     viewport的meta标签，其主要的作用来告诉浏览器如何规范的渲染web页面，而你则需要告诉他视窗有多大。
  7. vm, vw, wh中的可视区的宽度，高度，中的可视区指的是window.innerHeight,window.innerWidth,大小，不包含任务栏标题栏以及底部工具栏的浏览器区域的大小。
  为了避免chrome的最小的字体是10px的限制，所以在font-size中设置625%;
  8. flexible适配：
  在不同的屏幕上，CSS像素上所呈现的物理尺寸是一致的，而不同的css像素所对应的物理像素数是不一致的。在普通的屏幕上1个css像素对应的1个物理像素，而在Retina屏幕下，1个css像素对应的却是4个物理像素。
  在不同的retina屏下的字体的适配的sass函数：
  ```
  @mixin font-dpr($font-size) {
    font-size: $font-size;
    [data-dpr='2'] & {
      font-size: $font-size * 2;
    }

    [data-dpr='3'] & {
      font-size: $font-size * 3;
    }
  }
  ```
   9. px转化为rem的实战转化scss:
   ```
   <!-- 简单版本 -->
   @function px2em($px, $base-font-size: 16px) {
     @if (unitless($px)) {
       @warn 'Assuming #{$px} to be in pixels, attempting to convert it into pixels for you';
       @return px2em($px + 0px); // that may fail
     } @else if (unit($px) == em) {
       @return $px;
     }
     @return ($px / $base-font-size) * 1em;      
   }

   <!-- 复杂宏 -->
   @mixin px2rem($property, $px-values, $baseline-px: 16px, $support-for-ie: false) {
     // Conver the baseline into rems
     $baseline-rem: $baseline-px / 1rem * 1;
     // print the first line in pixel values
     @if $support-for-ie {
       #{$property}: $px-values;
     }
     // if there is only one (numeric) value ,return the property /value line for it;
     @if type-of ($px-values) == 'number' {
       #{property}: $px-values / $baseline-rem;
     }
     @else {
       // create an empty list that we can dump values into 
       $rem-values: ();
       @each $value in $px-values {
         // If the value is zero or not a number, return it ;
         @if $value == 0 or type-of($value) != 'number' {
           $rem-values: append($rem-values, $value / $baseline-rem);
         }
       }
       // return the property and its list of converted values 
       #{$property}: $rem-values;
     }
   }
   ```
 10. 基于vm， vh , vw的实现的适配：
 ```
 https://www.w3cplus.com/mobile/vw-layout-in-vue.html
  `html {
      font-size: 16px;
  }

  @media screen and (min-width: 375px) {
      html {
          /* iPhone6的375px尺寸作为16px基准，414px正好18px大小, 600 20px */
          font-size: calc(100% + 2 * (100vw - 375px) / 39);
          font-size: calc(16px + 2 * (100vw - 375px) / 39);
      }
  }
  @media screen and (min-width: 414px) {
      html {
          /* 414px-1000px每100像素宽字体增加1px(18px-22px) */
          font-size: calc(112.5% + 4 * (100vw - 414px) / 586);
          font-size: calc(18px + 4 * (100vw - 414px) / 586);
      }
  }
  @media screen and (min-width: 600px) {
      html {
          /* 600px-1000px每100像素宽字体增加1px(20px-24px) */
          font-size: calc(125% + 4 * (100vw - 600px) / 400);
          font-size: calc(20px + 4 * (100vw - 600px) / 400);
      }
  }
  @media screen and (min-width: 1000px) {
      html {
          /* 1000px往后是每100像素0.5px增加 */
          font-size: calc(137.5% + 6 * (100vw - 1000px) / 1000);
          font-size: calc(22px + 6 * (100vw - 1000px) / 1000);
      }
  }
 ```
11. 

































