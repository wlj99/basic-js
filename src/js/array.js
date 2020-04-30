//给定一个整数数组 nums 和一个目标值 target，请你在该数组中找出和为目标值的那 两个 整数，并返回他们的数组下标
const twoSum = function (nums, target) {
  const hash = {}

  for (let [i, n] of nums.entries()) {
    console.log(i, n, hash);
    if (hash[n] >= 0) {
      return [hash[n], i]
    }
    hash[target - n] = i
  }
};
console.log(twoSum([1, 2, 3, 4, 5], 4)); // [0,2]


// 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组
// 需要继续研究以下
const threeSum = function (nums) {
  let result = []
  const arr = nums.sort((a, b) => a - b)
  let left, right
  arr.map((item, index) => {

    left = index + 1
    right = arr.length - 1
    if (item !== arr[index - 1]) {
      while (left < right) {
        let sum = arr[left] + arr[right] + item
        if (sum === 0) {
          result.push([item, arr[left], arr[right]])
          //过滤掉连续相等的值
          while (arr[left] === arr[left + 1] && left < right) ++left
          while (arr[right] === arr[right - 1] && left < right) --right
            ++left
            --right
        }
        if (sum > 0) --right
        if (sum < 0) ++left
      }
    }
  })
  return result
};

threeSum([4, 5, 4, 5, -4, -2, -5, -4, -4, -2, -5, 1]); // [-5,1,4] [-2,-2,4]
const threeSumSet = function (nums) {
  let result = []
  //不能去重 否则 类似 -2 -2 4 的数据会被过滤掉
  const arr = [...new Set(nums.sort((a, b) => a - b))]
  let left, right
  arr.map((item, index) => {

    left = index + 1
    right = arr.length - 1

    if (item !== arr[index - 1]) {
      while (left < right) {
        let sum = arr[left] + arr[right] + item
        if (sum === 0) {
          result.push([item, arr[left], arr[right]])
            ++left
            --right
        }
        if (sum > 0) --right
        if (sum < 0) ++left
      }
    }
  })
  return result
};
threeSumSet([4, 5, 4, 5, -4, -2, -5, -4, -4, -2, -5, 1]); // [-5,1,4] 去重过滤掉了 [-2,-2,4] 这样的结果

/*
 给定一个包括 n 个整数的数组 nums 和 一个目标值 target。
 找出 nums 中的三个整数，使得它们的和与 target 最接近。返回这三个数的和。假定每组输入只存在唯一答案。
 例如，给定数组 nums = [-1，2，1，-4], 和 target = 1.
与 target 最接近的三个数的和为 2 (-1 + 2 + 1 = 2)
*/

const threeSumClosest = function (nums, target) {
  const arr = nums.sort((a, b) => a - b)
  let result
  let left, right
  let tempDifference = arr[0] + arr[1] + arr[2] - target
  arr.map((item, index) => {
    left = index + 1
    right = arr.length - 1
    while (left < right) {
      let difference = item + arr[left] + arr[right] - target
      if (Math.abs(difference) <= Math.abs(tempDifference)) {
        tempDifference = difference
        result = difference + target
      }
      if (difference >= 0) --right
      if (difference < 0) ++left
    }
  })
  return result
};

/*
给定一个包含 n 个整数的数组 nums 和一个目标值 target，判断 nums 中是否存在四个元素 a，b，c 和 d ，
使得 a + b + c + d 的值与 target 相等？找出所有满足条件且不重复的四元组。
 注意：
  答案中不可以包含重复的四元组。
  示例：
  给定数组 nums = [1, 0, -1, 0, -2, 2]，和 target = 0。
  满足要求的四元组集合为：
  [
      [-1, 0, 0, 1],
      [-2, -1, 1, 2],
      [-2, 0, 0, 2]
  ]
*/

const fourSum = function (nums, target) {
  let result = []
  const len = nums.length
  if (nums == null || len < 4) return result;
  nums.sort((a, b) => a - b)
  for (let i = 0; i < len; ++i) {
    if (nums[i] === nums[i - 1]) continue
    for (let j = len - 1; j > i + 1; --j) {
      if (nums[j] === nums[j + 1]) continue
      let left = i + 1
      let right = j - 1
      while (left < right) {
        let sum = nums[i] + nums[left] + nums[right] + nums[j]
        if (sum === target) {
          result.push([nums[i], nums[left], nums[right], nums[j]])
          while (nums[left] === nums[left + 1] && left < right) ++left
          while (nums[right] === nums[right - 1] && left < right) --right
            ++left
            --right
        } else if (sum < target) ++left
        else if (sum > target) --right
      }
    }
  }
  return result
};


/* 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
示例 1:
给定数组 nums = [1, 1, 2],
函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。
你不需要考虑数组中超出新长度后面的元素。 */
const removeDuplicates = function (nums) {
  let point = 0
  for (let i = 0, j = nums.length; i < j; ++i) {
    if (nums[point] !== nums[i]) {
      nums[++point] = nums[i]
    }
  }
  console.log(nums);
  return nums.length ? point + 1 : 0

};
removeDuplicates([1, 2, 1, 1, 3, 2]);

/* 给定一个数组 nums 和一个值 val，你需要原地移除所有数值等于 val 的元素，返回移除后数组的新长度。
不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。
元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。
示例 1:
给定 nums = [3,2,2,3], val = 3,
函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。
你不需要考虑数组中超出新长度后面的元素。 */

const removeElement = function (nums, val) {
  let point = 0

  for (let i = 0, j = nums.length; i < j; ++i) {
    if (nums[i] !== val) nums[point++] = nums[i]
  }

  return point
}
removeElement([3, 2, 2, 3], 3) // 2
removeElement([3, 2, 2, 3, 2, 3, 2, 3, 2, 3], 3) //  输出了5 有问题


/* 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
输入: [-2,1,-3,4,-1,2,1,-5,4],
输出: 6
解释: 连续子数组[4, -1, 2, 1] 的和最大，为 6。 */

const maxSubArray = function (nums) {
  let max = nums[0]

  nums.reduce((sum, val) => {
    sum = Math.max(sum + val, val)
    max = Math.max(max, sum)
    return sum
  })

  return max
};
maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);

//数组扁平化 
function flat(arr) {
  let res = arr.toString().replace('/\[+\]+/g', '');
  return res.split(',');
}

function flatten(arr) {
  return arr.reduce(function (prev, next) {
    return prev.concat(Array.isArray(next) ? flatten(next) : next)
  }, [])
}

function flatten2(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}


let arr = [1, [2, [3, 4]],
  [5, 6]
];
console.log(flatten2(arr))


//数组去重

function uniqueIndex(arr) {
  let res = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    let current = arr[i];
    if (res.indexOf(current) === -1) {
      res.push(current);
    }
  }
  return res;
}

function uniqueSort(arr) {
  let res = [],
    last;
  let sortArray = arr.concat().sort(sortArr);
  for (let i = 0, len = sortArray.length; i < len; i++) {
    if (!i || last !== sortArray[i]) {
      res.push(sortArray[i]);
    }
    last = sortArray[i];
  }
  return res;
}

function sortArr(a, b) {
  return a - b;
}

let arr = [1, 6, 45, 6, 7, 8];
console.log(unique(arr));