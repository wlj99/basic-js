/* 深度优先遍历

深度优先遍历DFS 与树的先序遍历比较类似。
假设初始状态是图中所有顶点均未被访问，则从某个顶点v出发，
首先访问该顶点然后依次从它的各个未被访问的邻接点出发深度优先搜索遍历图，
直至图中所有和v有路径相通的顶点都被访问到。
若此时尚有其他顶点未被访问到，
则另选一个未被访问的顶点作起始点，重复上述过程，直至图中所有顶点都被访问到为止。

*/

/*深度优先遍历三种方式*/
let deepTraversal1 = (node, nodeList = []) => {
  if (node !== null) {
    nodeList.push(node)
    let children = node.children
    for (let i = 0; i < children.length; i++) {
      deepTraversal1(children[i], nodeList)
    }
  }
  return nodeList
}
let deepTraversal2 = (node) => {
  let nodes = []
  if (node !== null) {
    nodes.push(node)
    let children = node.children
    for (let i = 0; i < children.length; i++) {
      nodes = nodes.concat(deepTraversal2(children[i]))
    }
  }
  return nodes
}
// 非递归
let deepTraversal3 = (node) => {
  let stack = []
  let nodes = []
  if (node) {
    // 推入当前处理的node
    stack.push(node)
    while (stack.length) {
      let item = stack.pop()
      let children = item.children
      nodes.push(item)
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i])
      }
    }
  }
  return nodes
}

/* 

广度优先遍历 BFS
从图中某顶点v出发，在访问了v之后依次访问v的各个未曾访问过的邻接点，
然后分别从这些邻接点出发依次访问它们的邻接点，
并使得“先被访问的顶点的邻接点先于后被访问的顶点的邻接点被访问，
直至图中所有已被访问的顶点的邻接点都被访问到。 
如果此时图中尚有顶点未被访问，则需要另选一个未曾被访问过的顶点作为新的起始点，重复上述过程，直至图中所有顶点都被访问到为止。

*/


let widthTraversal2 = (node) => {
  let nodes = []
  let stack = []
  if (node) {
    stack.push(node)
    while (stack.length) {
      let item = stack.shift()
      let children = item.children
      nodes.push(item)
      // 队列，先进先出
      // nodes = [] stack = [parent]
      // nodes = [parent] stack = [child1,child2,child3]
      // nodes = [parent, child1] stack = [child2,child3,child1-1,child1-2]
      // nodes = [parent,child1,child2]
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i])
      }
    }
  }
  return nodes
}

/* 图

邻接矩阵：使用二维数组来表示点与点之间是否有边，
如 arr[i][j] = 1表示节点 i 与节点 j 之间有边，arr[i][j] = 0表示节点 i 与节点 j 之间没有边
邻接表：邻接表是图的一种链式储存结构，这种结构类似树的子链表，
对于图中的每一个顶点Vi，把所有邻接于Vi的顶点Vj链成一个单链表，这个单链表就是顶点Vi的邻接表，
单链表一般由数组或字典结构表示。

*/
function Graph() {
  this.vertices = [] // 顶点集合
  this.edges = new Map() // 边集合
}
Graph.prototype.addVertex = function (v) { // 添加顶点方法
  this.vertices.push(v)
  this.edges.set(v, [])
}
Graph.prototype.addEdge = function (v, w) { // 添加边方法
  let vEdge = this.edges.get(v)
  vEdge.push(w)
  let wEdge = this.edges.get(w)
  wEdge.push(v)
  this.edges.set(v, vEdge)
  this.edges.set(w, wEdge)
}
Graph.prototype.toString = function () {
  var s = ''
  for (var i = 0; i < this.vertices.length; i++) {
    s += this.vertices[i] + ' -> '
    var neighors = this.edges.get(this.vertices[i])
    for (var j = 0; j < neighors.length; j++) {
      s += neighors[j] + ' '
    }
    s += '\n'
  }
  return s
}

Graph.prototype.dfs = function () {
  var marked = []
  for (var i = 0; i < this.vertices.length; i++) {
    if (!marked[this.vertices[i]]) {
      dfsVisit(this.vertices[i])
    }
  }

  function dfsVisit(u) {
    let edges = this.edges
    marked[u] = true
    console.log(u)
    var neighbors = edges.get(u)
    for (var i = 0; i < neighbors.length; i++) {
      var w = neighbors[i]
      if (!marked[w]) {
        dfsVisit(w)
      }
    }
  }
}