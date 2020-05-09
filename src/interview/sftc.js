/* 
1. 雪碧图 和引入svg的区别
2. 使用 图片配置 iconfont 
3. vuex的数据是如何实现数据共享的
4. 图片base64配置 webpack
5.根据概率抽奖 ：一等奖 10%   二等奖 15%  三等奖 25%  四等奖 50%
6. 原数组 const arr = ['a', '-', 1, 3.1, 'bb', '*', 33, 100, 0, '**'];  求返回值 const result = [1, 3.1, 33, 100, 0, 'a', '-', 'bb', '*', '**']；
 */


/*① 使用file-loader或url-loader可对图片进行打包操作
② url-loader可将图片转成base64格式 */

let module: {
  rules: [{
    test: /\.(gif|png|jpg|woff|svg|ttf|eot)$/,
    use: [{
      loader: 'url-loader',
      options: {
        limit: 500,
        outputPath: 'images/',
        name: '[hash:8].[name].[ext]'
      }
    }]
  }]
}

// vue-cli3
let chainWebpack: config => {
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif)(\?.*)?$/)
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, {
        limit: 5000
      }));
  },


  /* 
      原数组 const arr = ['a', '-', 1, 3.1, 'bb', '*', 33, 100, 0, '**'];  
      求返回值 const result = [1, 3.1, 33, 100, 0, 'a', '-', 'bb', '*', '**']； */

  function setArr1(arr) {
    let res = [],
      end = [];
    arr.filter((item, idx) => {
      let temp = typeof item === 'number' ? arr.splice(idx, 1) : null;
      if (temp) {
        res.push(temp);
      } else {
        end.push(item);
      }

    })
    return [...res, ...end]
  }

// 实际输出结果是 [ [1], [3.1], [33], [100], [0], 'a', '-', 'bb', '*', '**']；arr.splice(idx,many)返回的是数组

function setArr(arr) {
  let res = [],
    end = [];
  arr.filter((item, idx) => {
    typeof item === 'number' ? res.push(item) : end.push(item);
  })
  return [...res, ...end]
}

let a = ['a'];
a.push(...['b', 'c', 'd']);
a.splice(1, 1);
console.log(a);
// 实际结果是 a,c,d  但我说的是b c d arr.push(ele1,ele2,...,elen) 而自己以为只能push一个元素