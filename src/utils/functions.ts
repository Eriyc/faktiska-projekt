export const throttle = (func: Function, limit: number) => {
  let lastFunc: NodeJS.Timeout
  let lastRan: number
  return function (...args: any) {
    if (!lastRan) {
      func(args)
      lastRan = performance.now()
    } else {
      clearTimeout(lastFunc)
      lastFunc = setTimeout(function () {
        if (performance.now() - lastRan >= limit) {
          func(args)
          lastRan = Date.now()
        }
      }, limit - (performance.now() - lastRan))
    }
  }
}
