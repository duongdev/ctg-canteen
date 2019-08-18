import { createDefaultAdmin } from 'functions/users/user.services'

export default async () => {
  await createDefaultAdmin()
}
