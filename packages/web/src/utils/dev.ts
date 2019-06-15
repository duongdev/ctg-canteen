export const sleep = (ms: number = 1000) =>
  new Promise((resolve) =>
    setTimeout(resolve, process.env.NODE_ENV === 'development' ? ms : 0),
  )
