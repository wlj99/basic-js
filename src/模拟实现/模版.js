function myTemplate(str) {
  let fn, match, code = ['let r= [];'],
    re = /\{\s*(a-zA-z\.\_0-9()]+)\s*)/m;
  let addLine = function (text) {
    code.push('r.push(\'' + text.replace(/\'/g, '\\\'').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '\');');
  }

  while (match = re.exec(str)) {
    if (match.index > 0) {
      addLine(str.slice(0, match.index));
    }
    code.push('r.push(this.' + math[1] + ');');
    str = str.substring(math.index + match[0].length);
  }
  addLine(str);
  code.push('return r.join(\'\;);');

  fn = new Function(code.join('\n'));
  this.render = function (model) {
    return fn.apply(model);
  }
}

function Template(tpl) {
  var
    fn,
    match,
    code = ['var r=[];'],
    re = /\{\s*([a-zA-Z\.\_0-9()]+)\s*\}/m,
    addLine = function (text) {
      code.push('r.push(\'' + text.replace(/\'/g, '\\\'').replace(/\n/g, '\\n').replace(/\r/g, '\\r') + '\');');
    };
  while (match = re.exec(tpl)) {
    if (match.index > 0) {
      addLine(tpl.slice(0, match.index));
    }
    code.push('r.push(this.' + match[1] + ');');
    tpl = tpl.substring(match.index + match[0].length);
  }
  addLine(tpl);
  code.push('return r.join(\'\');');
  // 创建函数:
  fn = new Function(code.join('\n'));
  // 用render()调用函数并绑定this参数：
  this.render = function (model) {
    return fn.apply(model);
  };
}


function Parent() {
  this.name = '1223';
}

function Child() {
  Parent.call(this);
  this.age = 12;
}