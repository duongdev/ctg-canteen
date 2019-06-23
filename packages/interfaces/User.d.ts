export type IUserRole = 'admin' | 'student' | 'deactivated'

/** Thông tin máy chấm công */
export interface IUserChecker {
  id: string
  name: string
  card: string
}

interface IUser {
  id: string
  username: string
  name: string
  /** boarding: nội trú; outpatient: ngoại trú; semi-boarding: bán trú */
  group: 'boarding' | 'outpatient' | 'semi-boarding' | 'teacher' | 'other'
  /** Phòng nội trú/bán trú */
  boardingRoom?: string
  class?: string
  roles: IUserRole[]
  /** Thông tin máy chấm công */
  checker?: IUserChecker
}

export default IUser
