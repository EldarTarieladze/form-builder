import { Box, Paper, Typography, TextField, Button } from '@material-ui/core'
import { log } from 'console'
import { StringDecoder } from 'node:string_decoder'
import { getConstantValue } from 'typescript'
import { ObjectSchema } from './types'
import React, {useEffect, useState} from "react"

type Props = {
  schema: ObjectSchema
  onSubmit: (values: any) => void
}

export const FormBuilder = ({ schema, onSubmit }: Props) => {
  const [data, setData] = useState("");
  const func = (value: string, property: string): void =>{
      setData(value)
      console.log(value, property)
  }
  const onsub = (): void =>{
    console.log(data)

  }

  const App = () => {
  };


  return (
    <Paper>
      <Box
        p={2}
        display="flex"
        flexDirection="column"
        component="form"
        onSubmit={event => {
          onsub()
        }}
      >
        <Typography variant="h5" gutterBottom>
          {schema.label}
        </Typography>
        {
          schema.properties.map((item) => {
            return(
              <>
                <TextField
                name={item.name}
                type={item.type}
                id="outlined-basic"
                label={item.label}
                variant="outlined"
                onChange={(e) =>{
                    func(e.target.value, e.target.name)
                }}
              >
            </TextField>
              </>
            )
          })
        }
        {/* Code here */}
        <Button
        variant="contained"
        color="primary"
        onClick={() =>{
          onsub()
        }}

        >
          Submitt
        </Button>
      </Box>
    </Paper>
  )
}
