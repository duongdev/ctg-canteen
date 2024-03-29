import { gql } from 'apollo-server'
import FormData from 'form-data'
import fs from 'fs'
import { createTestClient, mockingooseResetAll } from 'helpers/test-helpers'
import fetch from 'node-fetch'
import path from 'path'

const IMPORT_STUDENTS = gql`
  mutation ImportStudents($file: Upload!) {
    importStudents(file: $file) {
      id
    }
  }
`

describe('Test importStudents mutation', () => {
  const { mutate } = createTestClient()
  beforeEach(mockingooseResetAll)

  it.todo('should throw error if user is not sign in')

  it.todo('should throw error if user has no permission to import students')

  it.todo('should throw error if the file can not upload')

  it.todo('should throw error if the student data fields is incorrect')

  it.todo('should throw error if the student data is incorrect')

  it.todo(
    'should return created or updated user correctly if the studentId does not exist',
  )

  it.todo('should throw error if file upload failure')
})
