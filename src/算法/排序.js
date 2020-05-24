/*  冒泡排序 */

function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 1; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

function bubbleSort2(arr) {
  for (let i = 0; i < arr.length; i++) {
    let flag = true;
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        flag = false;
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
    if (flag) break; // 如果某次循环中没有交换过元素，那么意味着排序已经完成
  }
  return arr;
}

/* 
快排 
  选取基准元素
  比基准元素小的元素放到左边，大的放右边
  在左右子数组中重复步骤一二，直到数组只剩下一个元素
  向上逐级合并数组
*/
function quickSort(arr) {
  let len = arr.length;
  if (len <= 1) return arr;
  let basic = len / 2 | 0;
  const basicValue = arr.splice(basic, 1)[0];
  let left = [];
  let right = [];
  arr.forEach(item => {
    item > basicValue ? right.push(item) : left.push(item);
  });

  return [...quickSort(left), basicValue, ...quickSort(right)];
}

function quickSort2(arr, left, right) { //这个left和right代表分区后“新数组”的区间下标，因为这里没有新开数组，所以需要left/right来确认新数组的位置
  if (left < right) {
    let pos = left - 1 //pos即“被置换的位置”，第一趟为-1
    for (let i = left; i <= right; i++) { //循环遍历数组，置换元素
      let pivot = arr[right] //选取数组最后一位作为基准数，
      if (arr[i] <= pivot) { //若小于等于基准数，pos++，并置换元素, 这里使用小于等于而不是小于, 其实是为了避免因为重复数据而进入死循环
        pos++
        let temp = arr[pos]
        arr[pos] = arr[i]
        arr[i] = temp
      }
    }
    //一趟排序完成后，pos位置即基准数的位置，以pos的位置分割数组
    quickSort(arr, left, pos - 1)
    quickSort(arr, pos + 1, right)
  }
  return arr //数组只包含1或0个元素时(即left>=right)，递归终止
}

/* 
归并排序 
归并排序和快排的思路类似，都是递归分治，区别在于快排边分区边排序，而归并在分区完成后才会排序
*/
function mergeSort(arr) {
  if (arr.length <= 1) return arr //数组元素被划分到剩1个时，递归终止
  const midIndex = arr.length / 2 | 0
  const leftArr = arr.slice(0, midIndex)
  const rightArr = arr.slice(midIndex, arr.length)
  console.log(leftArr, rightArr, 'left right');
  return merge(mergeSort(leftArr), mergeSort(rightArr)) //先划分，后合并
}

function merge(leftArr, rightArr) {
  console.log(leftArr, rightArr, 'merge left right')
  const result = []
  while (leftArr.length && rightArr.length) {
    leftArr[0] <= rightArr[0] ? result.push(leftArr.shift()) : result.push(rightArr.shift())
  }
  while (leftArr.length) result.push(leftArr.shift())
  while (rightArr.length) result.push(rightArr.shift())
  console.log(result, 'res');
  return result
}

let arr = [1, 4, 5, 4, 7, 9, 3, 5, 2];
console.log(mergeSort(arr));

/* 
堆是一棵特殊的树, 只要满足这棵树是完全二叉树和堆中每一个节点的值都大于或小于其左右孩子节点这两个条件, 
那么就是一个堆, 根据堆中每一个节点的值都大于或小于其左右孩子节点, 又分为大根堆和小根堆 

初始化大(小)根堆，此时根节点为最大(小)值，将根节点与最后一个节点(数组最后一个元素)交换
除开最后一个节点，重新调整大(小)根堆，使根节点为最大(小)值
重复步骤二，直到堆中元素剩一个，排序完成
*/