//  全排列

function permutate(str) {
  var array = str.split('');

  function loop(array, pre = []) {
    if (array.length == 1) {
      return [pre.concat(array).join('')];
    }
    let res = [];
    for (let index = 0; index < array.length; index++) {
      var first = array.pop();
      res = res.concat(loop(array, [...pre, first]));
      array.unshift(first);
    }
    return res;
  }
  return Array.from(new Set(loop(array)))
}

let str = '312212424242424';
console.log(permutate(str));

//二分搜索


function BinarySearch1(arr, target) {
  return search(arr, target, 0, arr.length - 1)

  function search(arr, target, from, to) {
    if (from > to) {
      return -1
    }
    const mid = Math.floor((from + to) / 2)
    if (arr[mid] > target) {
      return search(arr, target, from, mid - 1)
    } else if (arr[mid] < target) {
      return search(arr, target, mid + 1, to)
    } else {
      return mid
    }
  }
}


function BinarySearch2(arr, target) {
  let from = 0
  let to = arr.length - 1
  let mid = Math.floor((from + to) / 2)
  while (from <= to) {
    mid = Math.floor((from + to) / 2)
    if (arr[mid] > target) {
      to = mid - 1
    } else if (arr[mid] < target) {
      from = mid + 1
    } else {
      return mid
    }
  }

  return -1
}

let arr = [1, 2, 3, 4, 6, 3, 4]
let target = 10;
console.log(BinarySearch1(arr, target));


// 冒泡排序
/*
第1次循环确定最大的
第n次循环确定第n大的
 */
function BubbleSort(arr) {
  const length = arr.length

  for (let i = 0; i < length; i++) {
    for (let j = 1; j < length - i; j++) {
      if (arr[j] < arr[j - 1]) {
        const temp = arr[j]
        arr[j] = arr[j - 1]
        arr[j - 1] = temp
      }
    }
  }

  return arr
}

//快速排序

/*
在左边找大数，在右边找小数
交换

选择一个元素作为"基准"
小于"基准"的元素，都移到"基准"的左边；大于"基准"的元素，都移到"基准"的右边。
对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。
 */
function QuickSort(arr, low, high) {
  let left = low
  let right = high
  let basic = arr[low]
  while (left < right) {
    while (left < right && arr[right] > basic) {
      right--
    }
    while (left < right && arr[left] <= basic) {
      left++
    }

    if (left < right) {
      const temp = arr[left]
      arr[left] = arr[right]
      arr[right] = temp
    } else {
      const temp = arr[low]
      arr[low] = arr[left]
      arr[left] = temp
      console.log(arr, 'arr', low, left - 1, right + 1, high);
      QuickSort(arr, low, left - 1)
      QuickSort(arr, right + 1, high)
    }
  }

  return arr
}

let arr = [1, 3, 4, 2, 4, 3, 8, 4];
QuickSort(arr);

// 选择排序
/*
 寻找第i小的数的位置，放到i位置上
 */
function SelectionSort(arr) {
  const length = arr.length
  for (let i = 0; i < length; i++) {
    let minIndex = i
    for (let j = i + 1; j < length; j++) {
      minIndex = arr[minIndex] <= arr[j] ? minIndex : j
    }
    if (minIndex !== i) {
      const temp = arr[i]
      arr[i] = arr[minIndex]
      arr[minIndex] = temp

    }
  }
  return arr
}

/*
插入排序 

最好情况：数组升序排列，时间复杂度为：O(n)
最坏情况：数组降序排列，时间复杂度为：O(n²)*/

function InsertionSort(arr) {
  const length = arr.length
  for (let i = 1; i < length; i++) {
    const temp = arr[i]
    let j
    for (j = i - 1; j >= 0 && temp < arr[j]; j--) {
      arr[j + 1] = arr[j]
    }
    arr[j + 1] = temp
  }
  return arr
}

// 希尔排序

function ShellSort(arr) {
  const length = arr.length
  let gap = Math.floor(length)
  while (gap) {
    for (let i = gap; i < length; i++) {
      const temp = arr[i]
      let j
      for (j = i - gap; j >= 0 && temp < arr[j]; j = j - gap) {
        arr[j + gap] = arr[j]
      }
      arr[j + gap] = temp
    }
    gap = Math.floor(gap / 2)
  }
  return arr
}

// 归并排序


function MergeSort(arr, low, high) {
  const length = arr.length
  if (low === high) {
    return arr[low]
  }
  const mid = Math.floor((low + high) / 2)
  MergeSort(arr, low, mid)
  MergeSort(arr, mid + 1, high)
  merge(arr, low, high)
  return arr

}

function merge(arr, low, high) {
  const mid = Math.floor((low + high) / 2)
  let left = low
  let right = mid + 1
  const result = []
  while (left <= mid && right <= high) {
    if (arr[left] <= arr[right]) {
      result.push(arr[left++])
    } else {
      result.push(arr[right++])
    }
  }
  while (left <= mid) {
    result.push(arr[left++])
  }
  while (right <= high) {
    result.push(arr[right++])
  }

  arr.splice(low, high - low + 1, ...result)
}

const test = [2, 34, 452, 3, 5, 785, 32, 345, 567, 322, 5]

console.log(MergeSort(test, 0, test.length - 1))


// 堆排序

function HeapSort(arr) {
  const length = arr.length

  // 调整初始堆，调整完其实也确定了最大值
  // 但此时最大值是在 arr[0] 中
  for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
    adjustHeap(arr, i, length)
  }

  // 把 arr[0](最大值)换到后面
  for (let i = length - 1; i >= 0; i--) {
    const temp = arr[0]
    arr[0] = arr[i]
    arr[i] = temp
    adjustHeap(arr, 0, i)
  }

  return arr
}

// size 是还需要调整的堆的大小
// 随着一个个最大值的确定，size 会越来越小
function adjustHeap(arr, position, size) {
  const left = position * 2 + 1
  const right = left + 1
  let maxIndex = position
  if (left < size && arr[left] > arr[maxIndex]) {
    maxIndex = left
  }
  if (right < size && arr[right] > arr[maxIndex]) {
    maxIndex = right
  }
  if (maxIndex !== position) {
    const temp = arr[position]
    arr[position] = arr[maxIndex]
    arr[maxIndex] = temp
    adjustHeap(arr, maxIndex, size)
  }
  return arr
}
/* 
https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=&local_province_id=33
https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800&local_province_id=33
https://www.xx.cn/api?keyword=&level1=&local_batch_id=&elective=800,700&local_province_id=33

[] || ['800'] || ['800','700']
*/
function getUrlValue(url) {
  if (!url) return;
  let res = url.match(/(?<=elective=)(\d+(,\d+)*)/);
  return res ? res[0].split(',') : [];
}