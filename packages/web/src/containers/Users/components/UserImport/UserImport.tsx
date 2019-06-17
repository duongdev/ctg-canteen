import React from 'react'

import { Box, Container, Grid } from '@material-ui/core'
import * as XLSX from 'xlsx'
import UserImportDropzone from './components/UserImportDropzone'

type UserImportProps = {}

const UserImport: React.FC<UserImportProps> = () => {
  const [file, setFile] = React.useState<File | null>(null)

  React.useEffect(() => {
    if (!file) return

    const reader = new FileReader()
    const rABS = !!reader.readAsBinaryString
    reader.onload = (e: any) => {
      /* Parse data */
      const bstr = e.target.result
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' })
      /* Get first worksheet */
      const wsname = wb.SheetNames[0]
      const ws = wb.Sheets[wsname]
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_json(ws, { header: 2 })
      /* Update state */
      console.log(data)
    }
    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)
  }, [file])

  return (
    <Box mt={8} mb={8}>
      <Container maxWidth="md">
        <Grid container spacing={2} direction="column">
          <Grid item>
            <UserImportDropzone file={file} setFile={setFile} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default UserImport
