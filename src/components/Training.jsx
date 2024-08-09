import React from "react"
import SimplePage from "./elements/simplePage/SimplePage"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  MenuItem,
  Select,
  Stack,
} from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import { useState } from "react"

const Training = (props) => {
  const [expanded, setExpanded] = useState(false)
  const useKnow = props.UseKnow
  const [isSpeaking, setIsSpeaking] = useState(null)

  // eslint-disable-next-line no-unused-vars
  const [rate, setRate] = useState(1.75)
  const utteranceRef = React.useRef(null)
  const { knowList, knowProcess, currentIndex } = useKnow

  function timeToseconds(time) {
    const seconds = time.split(":").reduce((acc, time) => 60 * acc + +time)
    return `&t=${seconds}`
  }
  function read() {
    const toRead = `Respuesta: ${knowList[currentIndex].answer}
    Explicación: ${knowList[currentIndex].expanded}`
    if ("speechSynthesis" in window) {
      if (utteranceRef.current) {
        window.speechSynthesis.cancel()
      }
      const utterance = new SpeechSynthesisUtterance(toRead)
      utterance.rate = rate
      utteranceRef.current = utterance
      window.speechSynthesis.speak(utterance)
      setIsSpeaking(true)
      utterance.onend = () => {
        setIsSpeaking(null)
        utteranceRef.current = null
      }
    } else {
      alert("Tu navegador no soporta la síntesis de voz.")
    }
  }

  const pause = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.pause()
      setIsSpeaking(false)
    }
  }

  const resume = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.resume()
      setIsSpeaking(true)
    }
  }

  if (knowList.length === 0 || !knowList[currentIndex]) return null
  return (
    <>
      <SimplePage
        icon=""
        title={"Responda las siguientes preguntas (" + knowList.length + ")"}
        className="mb-6"
      >
        <Accordion expanded={expanded}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2-content"
            id="panel2-header"
            className="bg-slate-50"
            onClick={() => setExpanded(!expanded)}
          >
            <span className="pr-2">{knowList[currentIndex].topic} </span> |
            <span className="pl-2">
              <p className="whitespace-pre-line">
                {knowList[currentIndex].question} (
                {knowList[currentIndex].okCounter})
                {knowList[currentIndex].test && " EN EVALUACION"}
              </p>
            </span>
          </AccordionSummary>
          <AccordionDetails>
            <strong>Respuesta: </strong>
            {knowList[currentIndex].answer}

            <p className="mt-4">
              <strong>Explicación: </strong>
            </p>
            <p className="whitespace-pre-line">
              {knowList[currentIndex].expanded}
            </p>
            {knowList[currentIndex].video && (
              <div className="flex mt-4">
                <div className="flex-1 mt-2 pr-2 ">
                  <strong>Video: </strong>
                  <a
                    href={
                      knowList[currentIndex].video +
                      timeToseconds(knowList[currentIndex].time)
                    }
                    target="_blank"
                  >
                    {knowList[currentIndex].video}
                  </a>
                </div>
                {knowList[currentIndex].time && (
                  <div className="w-[160px] mt-2 float-right">
                    <strong>Tiempo: </strong>
                    {knowList[currentIndex].time}
                  </div>
                )}
              </div>
            )}
            <div className="pt-4">
              {isSpeaking === null && (
                <Stack spacing={2} direction="row" className="mt-6">
                  <Button
                    className="mt-2 ml-2"
                    variant="outlined"
                    onClick={() => {
                      read()
                    }}
                    color="primary"
                  >
                    leer
                  </Button>
                  <Select
                    labelId="demo-simple-select-label"
                    id="test"
                    value={
                      knowList[currentIndex].test
                        ? knowList[currentIndex].test
                        : "learn"
                    }
                    label="Age"
                    onChange={(event) => {
                      knowProcess("toTest", event.target.value)
                      setExpanded(!expanded)
                    }}
                  >
                    <MenuItem value="learn">Aprender</MenuItem>
                    <MenuItem value="test">Evaluación</MenuItem>
                    <MenuItem value="re-evaluation">Reevaluación</MenuItem>
                  </Select>
                </Stack>
              )}

              {isSpeaking && (
                <Button
                  className="mt-2 ml-2"
                  variant="outlined"
                  onClick={() => {
                    pause()
                  }}
                  color="primary"
                >
                  pausar
                </Button>
              )}
              {isSpeaking === false && (
                <Button
                  className="mt-2 ml-2"
                  variant="outlined"
                  onClick={() => {
                    resume()
                  }}
                  color="primary"
                >
                  continuar
                </Button>
              )}
            </div>
          </AccordionDetails>
        </Accordion>
        <Stack spacing={2} direction="row" className="mt-6">
          <Button
            className="mt-2 ml-5"
            variant="contained"
            onClick={() => {
              useKnow.toSearch("", knowList[currentIndex].question)
            }}
            color="primary"
          >
            copiar
          </Button>
          <Button
            className="mt-2 ml-5"
            variant="contained"
            onClick={() => {
              setIsSpeaking(null)
              setExpanded(false)
              knowProcess("next", false)
            }}
            color="primary"
          >
            Siguiente
          </Button>
          <Button
            className="mt-2 ml-5"
            variant="outlined"
            onClick={() => {
              setExpanded(false)
              knowProcess("answered", "test")
            }}
            color="primary"
          >
            respondí
          </Button>
          <Button
            className="mt-2 ml-2"
            variant="outlined"
            onClick={() => {
              useKnow.setStatus(useKnow.statusList.EDITING_CONTENT)
            }}
            color="primary"
          >
            editar
          </Button>
          <Button
            className="mt-2 ml-2"
            variant="outlined"
            onClick={() => {
              setExpanded(false)
              knowProcess("saved")
            }}
            color="primary"
          >
            archivar
          </Button>
          <Button
            className="mt-2 ml-2"
            variant="outlined"
            onClick={() => {
              knowProcess("delete")
              setExpanded(false)
            }}
            color="primary"
          >
            Borrar
          </Button>
        </Stack>
      </SimplePage>
    </>
  )
}

export default Training
