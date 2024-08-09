import { Autocomplete, Button, Stack, TextField } from "@mui/material"
import React from "react"
import SimplePage from "./elements/simplePage/SimplePage"

const KnowAddFromJson = (props) => {
  const useKnow = props.UseKnow
  const { knowTopics } = useKnow

  function submitForm(e) {
    e.preventDefault()
    const formData = new FormData(event.target)
    const allData = Object.fromEntries(formData)
    const { textData } = allData
    try {
      const data = JSON.parse(textData)
      data.topic = allData.topic
      useKnow.knowProcess("add", data)
    } catch (error) {
      console.error("Error al convertir el campo de texto en JSON:", error)
    }
  }

  return (
    <SimplePage icon="" title="Añadir conocimiento">
      <form onSubmit={submitForm}>
        <div className="w-full mt-2">
          <Autocomplete
            freeSolo
            options={knowTopics?.map((option) => option)}
            renderInput={(params) => {
              if (!params) {
                return null
              }
              return (
                <TextField
                  required
                  name="topic"
                  id="topic"
                  {...params}
                  label="Temática"
                />
              )
            }}
          />
        </div>
        <div className="w-full mt-2">
          <TextField
            required
            multiline={true}
            minRows={5}
            name="textData"
            id="textData"
            label="Explicación"
            variant="outlined"
            className="w-full"
          />
        </div>
        <Stack spacing={2} direction="row" className="flex justify-end mt-4">
          <Button
            className="mt-2 ml-5"
            variant="contained"
            type="submit"
            color="primary"
          >
            Agregar
          </Button>
          <Button
            type="reset"
            className="mt-2 ml-2"
            variant="outlined"
            color="primary"
          >
            Limpiar formulario
          </Button>
        </Stack>
      </form>
    </SimplePage>
  )
}

export default KnowAddFromJson
