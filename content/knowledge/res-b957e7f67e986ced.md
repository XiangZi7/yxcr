1. 在 ajax 发送请求前加上

   ```javascript
   anyAjaxObj.setRequestHeader("If-Modified-Since","0") 
   ```

2. 在 ajax 发送请求前加上

   ```javascript
   anyAjaxObj.setRequestHeader("Cache-Control","no-cache")
   ```

3. 在 URL 后面加上一个随机数

   ```javascript
   "fresh=" + Math.random();
   ```

4. 在 URL 后面加上时间戳

   ```javascript
    "nowtime=" + new Date().getTime();
   ```
