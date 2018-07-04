/**
 * import { myDOM } from '@/common/js/myutils.js'
 * 使用本对象中的方法时, 使用this. this.hasClass(el, className)
 * 使用本库中其他对象的方法时,直接调用. myNumber.getRandom(0, i)
 */

 export const myDOM = {
   /**
    * 判断是否有该class
    */
   hasClass(el, className) {
     let reg = new RegExp('(^|\\s)'+ className +'(\\s|$)')
     return reg.test(el.className)
   },

   /**
    * 添加class
    */
   addClass(el, className) {
     if (this.hasClass(el, className)) {
       return;
     }
     // 将字符串转化为空格分隔的字符串数组
     let newClass = el.className.split(' ')
     // 将类名添加到数组中
     newClass.push(className)
     // 将数组转化为有空格分隔的字符串
     el.className = newClass.join(' ')
   },
   
 }
