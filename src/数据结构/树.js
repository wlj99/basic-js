function Node(val) {
  this.val = val
  this.left = null
  this.right = null
}

function BindaryTree() {
  let node = function (val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
  let root = null;
}

/* 前序遍历 对于二叉树中的任意一个节点，先打印该节点，然后是它的左子树，最后右子树 */

var preOrderTraverseNode = (root) => {
  let result = [];

  let preOrder = node => {
    if (node) {
      result.push(node.val);
      preOrder(node.left);
      preOrder(node.right);
    }
  }

  preOrder(root);

  return result;
}

let preOderIter = (root) => {
  let stack = [];
  let list = [];
  // 当根节点不为空的时候，将根节点入栈
  if (root) stack.push(root);
  while (stack.length) {
    let currentNode = stack.pop();
    // 第一步的时候，先访问的是根节点
    list.push(currentNode.val);
    // 我们先打印左子树，然后右子树
    // 所以先加入栈的是右子树，然后左子树
    if (currentNode.right !== null) {
      stack.push(currentNode.right);
    }
    if (currentNode.left !== null) {
      stack.push(currentNode.left);
    }
  }

  return list;
}

/* 中序遍历二叉树  对于二叉树中的任意一个节点，先打印它的左子树，然后是该节点，最后右子树*/

function middleTree(root) {
  let res = [];
  let middleOder = (node) => {
    if (node) {
      middleOder(node.left);
      res.push(node.val);
      middleOder(node.right);
    }
  }
  middleOder(root);
  return res;
}

function middleTreeStack(root) {
  let res = [];
  let stack = [];
  let node = root;
  while (stack.length || node) {
    if (node) {
      stack.push(node);
      node = node.left;
      continue;
    }
    node = stack.pop();
    list.push(node.val);
    node = node.right;

  }

  return list;
}

function middleTree(root) {
  // 中序遍历
  let list = [],
    stack = [],
    node = root;
  while (node || stack.length) {
    while (node) {
      stack.push(node);
      node = node.left;
    }
    node = stack.pop();
    list.push(node.val);
    node = node.right;
  }
  return list;

}

/* 二叉树的后续遍历  对于二叉树中的任意一个节点，先打印它的左子树，然后是右子树，最后该节点*/

function nextTree(root) {
  let res = [];
  let nextGet = (node) {
    if (node) {
      nextGet(node.left);
      nextGet(node.right);
      res.push(node.val);
    }
  }
  nextGet(root);
  return res;
}

function nextTree(root) {
  let res = [];
  let stack = [];
  if (root) stack.push(root);
  while (stack.length) {
    let temp = stack.pop();
    // 根左右=>右左根
    res.unshift(temp.val);
    // 先进栈左子树后右子树
    // 出栈的顺序就变更为先右后左
    // 右先头插法入list
    // 左再头插法入list
    // 实现右左根=>左右根

    if (node.left !== null) {
      stack.push(node.left)
    }
    if (node.right !== null) {
      stack.push(node.right)
    }
  }
  return res;
}

/* 二叉树的层序遍历  即逐层地，从左到右访问所有节点  


  3
   / \
  9  20
    /  \
   15   7

[
  [3],
  [9,20],
  [15,7]
]
*/

function levelTree(root) {
  if (!root) return [];
  let list = [];
  let stack = [];
  stack.push(root);
  while (stack.length) {
    let curr = [],
      temp = [];
    while (stack.length) {
      let node = stack.shift();
      curr.push(node.val);
      if (node.left) temp.push(node.left);
      if (node.right) temp.push(node.right);
    }
    list.push(curr);
    stack = temp;
  }
  return
}

/* 广度优先遍历 */
function levelBottom(root) {
  if (!root) return [];
  let res = [];
  let queue = [root];
  while (queue.length) {
    let curr = [],
      temp = [];
    while (queue.length) {
      let node = queue.shift();
      curr.push(node.val);
      if (node.left) temp.push(node.left);
      if (node.right) temp.push(node.right);
    }
    res.push(curr);
    queue = temp;
  }
  return res.reverse();
}

/* 深度优先遍历

DFS 是沿着树的深度遍历树的节点，尽可能深地搜索树的分支

DFS 做本题的主要问题是： DFS 不是按照层次遍历的。
为了让递归的过程中同一层的节点放到同一个列表中，在递归时要记录每个节点的深度 depth 。
递归到新节点要把该节点放入 depth 对应列表的末尾。

当遍历到一个新的深度 depth ，而最终结果 res 中还没有创建 depth 对应的列表时，
应该在 res 中新建一个列表用来保存该 depth 的所有节点。
*/
function leverBottom(root) {
  let res = [];
  let dep = function (node, depth) {
    if (!node) return;
    res[depth] = res[depth] || [];
    res[depth].push(node.val);
    dep(node.left, depth + 1);
    dep(node.right, depth + 1);
  }
  dep(root, 0);
  return res.reverse();
}

/* 从前序与中序遍历序列构造二叉树
前序遍历 preorder = [3,9,20,15,7]
中序遍历 inorder = [9,3,15,20,7]

    3
   / \
  9  20
    /  \
   15   7

前序遍历的第一个元素一定是根节点，这里是3
找到根节点之后，根节点在中序遍历中把数组一分为二，即两个数组[9]和[15, 20, 7]，这两个数组分别是根节点3的左子树和右子树的中序遍历。
前序遍历数组去掉根节点之后是[9,20,15,7]，而这个数组的第1项[9]（左子树的大小）和后3项[20, 15, 7]（右子树的大小）又分别是左子树和右子树的前序遍历
到这里已经很明显了，用递归
*/

function TreeNode(val) {
  this.val = val;
  this.left = this.right = null;
}

function buildTree(pre, middle) {
  if (!pre.length) return null;
  let node = new TreeNode(pre[0]);
  let idx = middle.indexOf(pre[0]);
  let midleft = middle.slice(0, idx);
  let midright = middle.slice(idx + 1);
  let preleft = pre.slice(1, idx + 1);
  let preright = pre.slice(idx + 1);

  node.left = buildTree(preleft, midleft)
  node.right = buildTree(preright, midright)
  return node;
}

var buildTree = function (preorder, inorder) {
  if (!preorder.length) return null
  const node = new TreeNode(preorder[0])
  const index = inorder.indexOf(preorder[0])
  const inLeft = inorder.slice(0, index)
  const inRight = inorder.slice(index + 1)
  const preLeft = preorder.slice(1, index + 1)
  const preRight = preorder.slice(index + 1)
  node.left = buildTree(preLeft, inLeft)
  node.right = buildTree(preRight, inRight)
  return node
};

/* 二叉树的深度 */

function maxDepth(node) {
  if (!node) return 0;
  return 1 + Math.max(maxDepth(node.left), maxDepth(node.right));
}

/* 二叉树的最近公共祖先

如果树为空树或 p 、 q 中任一节点为根节点，那么 p 、 q 的最近公共节点为根节点

如果不是，即二叉树不为空树，且 p 、 q 为非根节点，则递归遍历左右子树，获取左右子树的最近公共祖先，

如果 p 、 q 节点在左右子树的最近公共祖先都存在，
说明 p 、 q 节点分布在左右子树的根节点上，此时二叉树的最近公共祖先为 root

若 p 、 q 节点在左子树最近公共祖先为空，
那 p 、q 节点位于左子树上，最终二叉树的最近公共祖先为右子树上 p 、q 节点的最近公共祖先

若 p 、 q 节点在右子树最近公共祖先为空，同左子树 p 、 q 节点的最近公共祖先为空一样的判定逻辑
如果 p 、 q 节点在左右子树的最近公共祖先都为空，则返回 null
*/

function sameParent(root, p, q) {
  if (root === null || root === p || root === q) return root;
  let left = sameParent(root.left, p, q);
  let right = sameParent(root.right, p, q);
  if (left === null) return right;
  if (right === null) return left;
  return root;
}

/* 
给定一个二叉树，判断它是否是高度平衡的二叉树。 
一个二叉树每个节点 的左右两个子树的高度差的绝对值不超过1。
    3
   / \
  9  20
    /  \
   15   7
 true

      1
     / \
    2   2
   / \
  3   3
 / \
4   4

false
 */


/* 路径总和  给定一个二叉树和一个目标和，判断该树中是否存在根节点到叶子节点的路径，这条路径上所有节点值相加等于目标和。 */

function hasPathNum(root, num) {
  if (root === null) return false;
  if (root.left === null && root.right === null) return root.val === sum;
  sum = sum - root.val;
  return hasPathNum(root.left, sum) || hasPathNum(root.right, sum);
}