function sleep(time) {
  function* gen() {
    yield new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, time)
    })
  }
  return gen().next().value;
}


sleep(1000).then(() => {
  console.log('sleep end');
});

const sleep1 = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

sleep1(1000).then(() => {
  // 这里写你的骚操作
})


const sleep2 = (time) => {
  return new Promise(resolve => setTimeout(resolve, time))
}

async function sleepAsync() {
  console.log('fuck the code')
  await sleep2(1000)
  console.log('fuck the code again')
}

sleepAsync()