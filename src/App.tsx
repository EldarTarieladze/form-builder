import { FormBuilder } from 'lib/form-builder'
import { useState } from 'react'
import { Layout } from 'Layout'
import { ResultDialog } from 'ResultDialog'
import { db } from 'fire'

export const App = () => {
  const [submittedData, setSubmittedData] = useState<any>(null)

    const saveInDatabase = (jsonData: any) => {
      try{
        db.collection("formData").add(jsonData)
      }catch(err){
        console.log(err)
      }
    }

  return (
    <Layout
      render={jsonInput => {
        // `jsonInput` is a raw string. You need to convert it to the object of `ObjectSchema` type.
        // There are two types of validations that must take place:
        // 1. Check that `jsonInput` is a valid json.
        // 2. Check that it matches the schema described by the `ObjectSchema` type.
        //    This step is called "Runtime data validation".

        // Replace hardcoded `studentProfileSchema` with the parsed `jsonInput`.

        return (
          <>
            <FormBuilder
              jsonData={JSON.parse(jsonInput)}
              // schema={studentProfileSchema}
              onSubmit={values => {
                setSubmittedData(values)
                saveInDatabase(values)
                // Send data to Firestore here.
              }}
            />

            <ResultDialog
              data={submittedData}
              onClose={() => {
                setSubmittedData(null)
                location.reload()
              }}
            />
          </>
        )
      }}
    />
  )
}
