import { Middleware } from '../types'

export const checkUserExistsByEmail = (checkUserExistsByEmail: string): Middleware => {
  return (store: any) => (next: any) => (action: any) => {
    next(action)
  }
}
