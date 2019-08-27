import bluebird from 'bluebird'
import { createDish as createDishService } from 'functions/dishes/dish.services'
import { CreateDishInput } from 'functions/dishes/dish.types'
import { FileUpload } from 'graphql-upload'
import { createResolver } from 'helpers/resolvers'
import { fileStorage } from 'utils/file-storage'

export const createDish = createResolver({
  use: {
    hasRole: 'admin',
  },
  resolve: async (
    _parent,
    { input }: { input: CreateDishInput & { images: FileUpload[] } },
  ) => {
    const imagePaths = await bluebird.map(input.images, (image) =>
      fileStorage(image, ['image/jpeg', 'image/jpg', 'image/png']),
    )

    const createdDish = await createDishService({
      name: input.name,
      price: input.price,
      images: imagePaths,
    })
    return createdDish
  },
})
