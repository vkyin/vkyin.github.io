### 什么情况下需要跨域请求字体
#### 为什么要请求字体？
1. 视觉稿中需要使用特别的字体，在带宽允许的情况下，都会选择加载**自定义字体**来让页面更美观。
2. **Iconfont**的应用必须加载自定义字体。关于font icon的介绍——[http://fontawesome.io/](http://fontawesome.io/ "http://fontawesome.io/")

#### 为什么会跨域？
1. **CDN加速。**为了减少业务服务器压力和加快页面访问速度，大部分的静态资源都会放在CDN上（包括JS、CSS、字体等）。然而CDN域名往往跟主域名不一致。

#### 为什么要跨域？
额。这个是规范要求的。[https://www.w3.org/TR/css-fonts-3/#font-fetching-requirements](https://www.w3.org/TR/css-fonts-3/#font-fetching-requirements "https://www.w3.org/TR/css-fonts-3/#font-fetching-requirements")

### 解决方案
1. 把字体文件放到自己的服务器上。这样就不存在所谓的跨域问题了。
2. 把字体文件编码成base64，连同CSS文件一起放到CDN上。因为CSS、JS不会受到同源政策的限制，所以可以绕过跨域问题。不过这里有些建议：字体文件太大就不要这么做，因为CSS文件体积会很大，然后加载半天不出来。一般只适合Iconfont去使用。
3. 服务器（CDN）设置。服务器端，在响应头中加入`Access-Control-Allow-Origin: *`即可。CDN的话，一般有跨域访问限制的配置，把自己的业务网站域名配上去即可。
