import React from 'react'

import { Fade, Grid } from '@material-ui/core'
import ContentContainer from 'components/ContentContainer'
import * as XLSX from 'xlsx'
import UserImportDropzone from './components/UserImportDropzone'
import UserImportPreview from './components/UserImportPreview'

type UserImportProps = {}

const UserImport: React.FC<UserImportProps> = () => {
  const [file, setFile] = React.useState<File | null>(null)
  const [data, setData] = React.useState<any[]>([])

  React.useEffect(() => {
    if (!file) return setData([])

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
      setData(data)
    }
    if (rABS) reader.readAsBinaryString(file)
    else reader.readAsArrayBuffer(file)
  }, [file])

  return (
    <ContentContainer>
      <Grid container spacing={2} direction="column">
        <Grid item>
          <UserImportDropzone file={file} setFile={setFile} />
        </Grid>
        {data.length > 0 && (
          <Fade in>
            <Grid item>
              <UserImportPreview data={data} />
            </Grid>
          </Fade>
        )}
      </Grid>
    </ContentContainer>
  )
}

export default UserImport
