function uniqueIndex(arr){
  let res = [];
  for(let i=0,len = arr.length;i<len;i++){
    let current = arr[i];
    if(res.indexOf(current)=== -1){
      res.push(current);
    }
  }
  return res;
}

function uniqueSort(arr){
  let res = [], last;
  let sortArray = arr.concat().sort(sortArr);
  for(let i=0,len = sortArray.length;i<len;i++){
    if(!i || last !== sortArray[i]){
      res.push(sortArray[i]);
    }
    last = sortArray[i];
  }
  return res;
}
function sortArr(a,b){
  return a-b;
}

let arr = [1,6,45,6,7,8];
console.log(unique(arr));