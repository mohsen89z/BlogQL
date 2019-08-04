import { User } from 'src/models/User.schema'

export const findById = async (id: string) => await User.findById(id)
