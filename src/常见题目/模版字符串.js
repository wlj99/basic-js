// 第一版
function tmpl(str, data) {
  var str = document.getElementById(str).innerHTML;

  var string = "var p = []; p.push('" +
    str
    .replace(/[\r\t\n]/g, "")
    .replace(/<%=(.*?)%>/g, "');p.push($1);p.push('")
    .replace(/<%/g, "');")
    .replace(/%>/g, "p.push('") +
    "');"

  eval(string)

  return p.join('');
};