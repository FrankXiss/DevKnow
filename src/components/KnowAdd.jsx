import { Autocomplete, Button, Stack, TextField } from "@mui/material"
import React from "react"
import SimplePage from "./elements/simplePage/SimplePage"
import { useEffect } from "react"
import { useState } from "react"

const knowBlank = {
  topic: "",
  question: "",
  answer: "",
  expanded: "",
  video: "",
  time: "",
}
const KnowAdd = (props) => {
  const useKnow = props.UseKnow
  const { knowTopics } = useKnow
  const [know, setKnow] = useState(knowBlank)
  const editing = useKnow.status === useKnow.statusList.EDITING_CONTENT
  const { currentIndex } = useKnow

  useEffect(() => {
    if (useKnow.status === useKnow.statusList.EDITING_CONTENT) {
      setKnow(useKnow.knowList[currentIndex])
      document.getElementById("question").value =
        useKnow.knowList[currentIndex].question
      document.getElementById("answer").value =
        useKnow.knowList[currentIndex].answer
      document.getElementById("expanded").value =
        useKnow.knowList[currentIndex].expanded
      document.getElementById("video").value =
        useKnow.knowList[currentIndex].video
      document.getElementById("time").value =
        useKnow.knowList[currentIndex].time
    }
  }, [])

  function submitForm(e) {
    e.preventDefault()
    const formData = new FormData(event.target)
    const data = Object.fromEntries(formData)
    if (editing) {
      data.id = know.id
      useKnow.knowProcess("edit", data)
    } else {
      useKnow.knowProcess("add", [data])
    }
  }

  function countChars(e) {
    const lenght = e.target.value.length
    if (lenght > 2000)
      useKnow.messageShow("Precaución, se excedieron los 2000 caracteres")
  }

  function findIn(web) {
    {
      const expanded = document.getElementById("expanded")
      const expandedSelect = expanded.value.substring(
        expanded.selectionStart,
        expanded.selectionEnd
      )
      const answer = document.getElementById("answer").value
      const answerSelect = answer.substring(
        answer.selectionStart,
        answer.selectionEnd
      )

      const selectText = answerSelect + expandedSelect
      let searchText = ""
      if (web === "google") {
        searchText = know.topic + " " + selectText
      }
      if (web === "chatGPT") {
        searchText = `que me puedes decir de ${know.answer}${
          expandedSelect ? ":" : ""
        } ${expandedSelect} en ${know.topic}; Una respuesta corta`
      }
      useKnow.toSearch(web, searchText)
    }
  }

  return (
    <SimplePage icon="" title="Añadir conocimiento">
      <form onSubmit={submitForm}>
        <div className="w-full mt-2">
          <Autocomplete
            freeSolo
            value={know.topic}
            options={knowTopics.map((option) => option)}
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
            minRows={3}
            name="question"
            id="question"
            label="Pregunta"
            variant="outlined"
            className="w-full"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="w-full mt-2">
          <TextField
            name="answer"
            id="answer"
            label="Respuesta"
            variant="outlined"
            className="w-full"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="w-full mt-2">
          <TextField
            multiline={true}
            minRows={5}
            name="expanded"
            id="expanded"
            label="Explicación"
            variant="outlined"
            className="w-full"
            onChange={countChars}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className="flex">
          <div className="flex-1 mt-2 pr-2 ">
            <TextField
              name="video"
              id="video"
              label="Vídeo"
              variant="outlined"
              className="w-full"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
          <div className="w-[160px] mt-2 float-right">
            <TextField
              name="time"
              id="time"
              label="Tiempo"
              variant="outlined"
              className="w-full"
              InputLabelProps={{
                shrink: true,
              }}
            />
          </div>
        </div>
        <Stack spacing={2} direction="row" className="flex justify-end mt-4">
          <Button
            className="mt-2 ml-5"
            variant="contained"
            type="submit"
            color="primary"
          >
            Guardar
          </Button>
          {!editing ? (
            <Button
              type="reset"
              className="mt-2 ml-2"
              variant="outlined"
              color="primary"
            >
              Limpiar formulario
            </Button>
          ) : (
            <>
              <Button
                className="mt-2 ml-2"
                variant="outlined"
                color="primary"
                onClick={() => {
                  findIn("chatGPT")
                }}
              >
                chatGPT
              </Button>
              <Button
                className="mt-2 ml-2"
                variant="outlined"
                color="primary"
                onClick={() => {
                  findIn("google")
                }}
              >
                Google
              </Button>
              <Button
                className="mt-2 ml-2"
                variant="outlined"
                color="primary"
                onClick={() => useKnow.setStatus(useKnow.statusList.TRAINIG)}
              >
                Cancelar
              </Button>
            </>
          )}
        </Stack>
      </form>
    </SimplePage>
  )
}

export default KnowAdd
