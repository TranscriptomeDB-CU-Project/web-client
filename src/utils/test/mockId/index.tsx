import { beforeEach, vi } from 'vitest'

export class Counter {
  private static _id = 0

  static id() {
    this._id += 1
    return this._id.toString()
  }

  static reset() {
    this._id = 0
  }
}

export const mockId = () => {
  beforeEach(() => {
    vi.mock('@/utils/id', () => {
      return {
        id: () => {
          return Counter.id()
        },
      }
    })

    return () => {
      vi.restoreAllMocks()
      Counter.reset()
    }
  })
}
