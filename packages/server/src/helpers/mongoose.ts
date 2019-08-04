import * as mongoose from 'mongoose'

export const createSchema = (
  definition: mongoose.SchemaDefinition,
  options?: mongoose.SchemaOptions,
) => {
  const schema = new mongoose.Schema(definition, {
    timestamps: true,
    toJSON: {
      getters: true,
      virtuals: true,
    },
    toObject: {
      getters: true,
      virtuals: true,
    },
    ...options,
  })
  // schema.plugin(mongooseDelete, { deletedAt: true })
  // schema.plugin(mongoosePaginateV2)
  return schema
}

export const getSchemaOptions = (options?: mongoose.SchemaOptions) => {
  return {
    timestamps: true,
    toJSON: {
      getters: true,
      virtuals: true,
    },
    toObject: {
      getters: true,
      virtuals: true,
    },
    ...options,
  }
}
