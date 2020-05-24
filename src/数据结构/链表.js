/* 链表反转 */

function reverse(root) {
  if (!root || !root.next) return root;
  let prev = null,
    current = root;
  while (current) {
    let next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}

/* 求链表的中间节点 */

var middleNode = function (head) {
  let fast = head,
    slow = head;
  while (fast && fast.next) {
    slow = slow.next
    fast = fast.next.next
  }
  return slow
};

/* 合并两个有序链表 */
function mergeNode(l1, l2) {
  if (l1 === null) {
    return l2;
  }
  if (l2 === null) {
    return l1;
  }

  if (l1.val <= l2.val) {
    l1.next = mergeNode(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeNode(l2.next, l1);
    return l2;
  }

}

/* 给定一个链表，判断链表中是否有环。 */

function isCircle(head) {
  while (head) {
    if (head.flag) return true;
    head.flag = true;
    head = head.next;
  }
  return false;
}

function isCirleList(head) {
  if (!head || !head.next) return false;
  let fast = head.next.next;
  let slow = head;
  while (fast !== slow) {
    if (!fast || !fast.next) return false;
    fast = fast.next.next;
    slow = slow.next;
  }
  return true;
}

/* 删除链表倒数第 n 个结点 */

function ListNode(val) {
  this.val = val;
  this.next = null;
}

function removeNode(node, n) {
  let pre = new ListNode(0);
  let pre.next = node;
  let fast = slow = pre;
  while (n--) {
    fast = fast.next;
  }

  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;
  return pre.next;

}

function removeNode(head, n) {
  let fast = slow = head;
  while (--n) {
    fast = fast.next;
  }

  if (!fast.next) return head.next;
  fast = fast.next;

  while (fast && fast.next) {
    fast = fast.next;
    slow = slow.next;
  }

  slow.next = slow.next.next;
  return head;
}

/* 相交链表 */

function diffNode(l1, l2) {
  while (l1) {
    l1.flag = true;
    l1 = l1.next;
  }

  while (l2) {
    if (l2.flag) return l2;
    l2 = l2.next;
  }
  return null;
}

function diffNode(l1, l2) {

  let pA = l1,
    pB = l2;
  while (pA || pB) {
    if (pA === pB) return pA;
    pA = pA === null ? pB : pA.next;
    pB = pB === null ? pA : pB.next;
  }

  return null;

}