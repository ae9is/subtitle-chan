// FIFO stack of fixed size
export class ItemHistory<T> {
  size = 100
  stack: T[] = []

  constructor(size?: number) {
    if (size) {
      this.size = size
    }
  }

  push(item: T) {
    if (this.stack.length > this.size) {
      this.stack.shift()
    }
    this.stack.push(item)
  }

  join(sep = '') {
    return this.stack.join(sep)
  }
}

// Functional approach for useState
export function appendToFixedSizeString(current: string, newValue: string, size = 100) {
  const difference = current.length + newValue.length - size
  if (difference > 0) {
    return current.slice(difference) + newValue
  }
  return current + newValue
}
