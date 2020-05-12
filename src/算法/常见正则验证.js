// 实现千分为符
function parseToMoney(num) {
  num = parseFloat(num.toFixed(3));
  let [integer, decimal] = String.prototype.split.call(num, '.');
  integer = integer.replace(/\d(?=(\d{3})+$)/g, '$&,');
  return integer + '.' + (decimal ? decimal : '');
}

parseToMoney(1234.56); // return '1,234.56'
parseToMoney(123456789); // return '123,456,789'
parseToMoney(1087654.321); // return '1,087,654.321'

//　电话号码
function isPhone(tel) {
  var regx = /^1[34578]\d{9}$/;
  return regx.test(tel);
}

// 邮箱
function isEmail(email) {
  var regx = /^([a-zA-Z0-9_\-])+@([a-zA-Z0-9_\-])+(\.[a-zA-Z0-9_\-]+){1,2}$/;
  return regx.test(email);
}