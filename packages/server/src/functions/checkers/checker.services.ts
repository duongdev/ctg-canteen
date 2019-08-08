import CheckerModel, { IChecker } from 'models/Checker'

export type FindCheckerInput = {
  id: IChecker['id']
}

export const findChecker = async ({ input }: { input: FindCheckerInput }) => {
  const checker = await CheckerModel.findOne(input).exec()

  return checker
}
