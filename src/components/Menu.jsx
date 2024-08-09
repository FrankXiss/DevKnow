import { Button, Chip, MenuItem, Select, Stack } from "@mui/material"
import React from "react"
import { statusList } from "../utilis/utils"
import { useEffect } from "react"
import SimplePage from "./elements/simplePage/SimplePage"

const Menu = (props) => {
  const useKnow = props.UseKnow
  const {
    status,
    setStatus,
    knowTopics,
    knowTopicsSelect,
    setKnowTopicsSelect,
    testMode,
    setTestMode,
  } = useKnow
  useEffect(() => {
    setStatus(status)
  }, [status])

  function process(topic) {
    if (knowTopicsSelect.indexOf(topic) === -1) {
      setKnowTopicsSelect([...knowTopicsSelect, topic])
    } else {
      setKnowTopicsSelect(knowTopicsSelect.filter((item) => item !== topic))
    }
  }

  return (
    <SimplePage icon="" className="mb-10">
      <Stack spacing={2} direction="row">
        <Button
          variant={status === statusList.TRAINIG ? "contained" : "outlined"}
          onClick={() => setStatus(statusList.TRAINIG)}
          color="primary"
        >
          ENTRENAR
        </Button>
        <Button
          variant={
            status === statusList.ADDING_CONTENT ||
            status === statusList.EDITING_CONTENT
              ? "contained"
              : "outlined"
          }
          color="primary"
          onClick={() => setStatus(statusList.ADDING_CONTENT)}
        >
          {useKnow.status === useKnow.statusList.EDITING_CONTENT
            ? "EDITAR CONTENIDO"
            : "AGREGAR CONTENIDO"}
        </Button>
        <Button
          variant={
            status === statusList.ADDING_CONTENT_FROM_JSON
              ? "contained"
              : "outlined"
          }
          color="primary"
          onClick={() => setStatus(statusList.ADDING_CONTENT_FROM_JSON)}
        >
          AGREGAR DESDE JSON
        </Button>
        <Select
          labelId="demo-simple-select-label"
          id="test"
          value={testMode}
          label="Age"
          onChange={(event) => {
            setTestMode(event.target.value)
          }}
        >
          <MenuItem value="learn">Aprender</MenuItem>
          <MenuItem value="test">Evaluación</MenuItem>
          <MenuItem value="re-evaluation">Reevaluación</MenuItem>
        </Select>
      </Stack>
      <Stack spacing={2} direction="row" className="mt-4">
        {knowTopics.map((topic) => (
          <Chip
            className="mr-2"
            label={topic}
            key={topic}
            color="primary"
            variant={
              knowTopicsSelect.indexOf(topic) === -1 ? "outlined" : "filled"
            }
            onClick={() => {
              process(topic)
            }}
          />
        ))}
      </Stack>
    </SimplePage>
  )
}

export default Menu
