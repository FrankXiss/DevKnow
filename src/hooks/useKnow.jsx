import axios from "axios"
import { useEffect } from "react"
import { useState } from "react"
import { statusList } from "../utilis/utils"

const apiRoute = "https://devknow-backend.up.railway.app/know"

export const useKnow = () => {
  const [knowTotalList, setKnowTotalList] = useState([])
  const [knowList, setKnowList] = useState([])
  const [knowTopics, setKnowTopics] = useState([])
  const [knowTopicsSelect, setKnowTopicsSelect] = useState([])
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(statusList.TRAINIG)
  const [testMode, setTestMode] = useState("learn")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    knowLoad()
  }, [])

  useEffect(() => {
    const filteredKnow = filterList(knowTotalList)
    setKnowList(filteredKnow)
    KnowNext(filteredKnow)
  }, [knowTopicsSelect, knowTotalList, testMode])

  function filterList(list) {
    const filteredKnow = list.filter(
      (item) =>
        knowTopicsSelect.includes(item.topic) &&
        (item.test === testMode || (testMode === "learn" && !item.test))
    )
    return filteredKnow
  }

  function knowLoad() {
    axios.get(apiRoute).then((response) => {
      if (response.data.length === 0) return []
      setKnowTotalList(response.data)
      topicList(response.data)
      topicList(response.data, false)
    })
  }

  function KnowNext(list, save = false) {
    const knowList = filterList(list)
    if (knowTotalList.length > 1) {
      if (knowList.length < 1) return []
      let allElements
      let randomIndex
      if (testMode) {
        allElements = knowList
      } else {
        const sortedKnowList = [...knowList].sort(
          (a, b) => a.okCounter - b.okCounter
        )
        const minOkCounter = sortedKnowList[0].okCounter
        allElements = sortedKnowList.filter(
          (item) => item.okCounter === minOkCounter
        )
      }
      randomIndex = Math.floor(Math.random() * allElements.length)
      const currentId = allElements[randomIndex].id

      setCurrentIndex(
        allElements.findIndex((element) => element.id === currentId)
      )
      if (save) setKnowList(knowList)
      // 3. Coloca ese elemento en la primera posición
    } else {
      knowLoad()
    }
  }

  function knowProcess(operation, info = null) {
    if (operation === "next") {
      if (info) {
        axios
          .patch(apiRoute + "/" + knowList[currentIndex].id, {
            okCounter: knowList[currentIndex].okCounter + 1,
          })
          .then(() => {
            messageShow("Se incrementó la cantidad de respuestas acertadas")
            KnowNext(knowList)
          })
      } else KnowNext(knowList)
    }
    if (operation === "add") {
      const data = info.map((know) => {
        return {
          topic: info.topic || know.topic,
          question: know.question,
          expanded: know.expanded ?? "",
          answer: know.answer,
          video: know.video || "",
          time: know.time || "",
          test: "learn",
          okCounter: 0,
        }
      })
      addMultipleRecords(data)
    }
    if (operation === "saved") {
      axios
        .patch(apiRoute + "/" + knowList[currentIndex].id, {
          test: "re-evaluation",
        })
        .then(() => {
          knowList[currentIndex].test = "re-evaluation"
          KnowNext([...knowList], true)
        })
    }
    if (operation === "toTest") {
      axios
        .patch(apiRoute + "/" + knowList[currentIndex].id, {
          test: info,
        })
        .then(() => {
          knowList[currentIndex].test = !knowList[currentIndex].test
          KnowNext([...knowList], true)
        })
    }
    if (operation === "delete") {
      axios.delete(apiRoute + "/" + knowList[currentIndex].id).then(() => {
        knowList.slice(0, 1)
        KnowNext([...knowList], true)
      })
    }
    if (operation === "answered") {
      axios
        .patch(apiRoute + "/" + knowList[currentIndex].id, {
          test: info,
        })
        .then(() => {
          knowList[currentIndex].test = !knowList[currentIndex].test
          KnowNext([...knowList], true)
        })
    }
    if (operation === "delete") {
      axios.delete(apiRoute + "/" + knowList[currentIndex].id).then(() => {
        knowList.slice(0, 1)
        KnowNext([...knowList], true)
      })
    }
    if (operation === "edit") {
      axios.patch(apiRoute + "/" + knowList[currentIndex].id, info).then(() => {
        messageShow("Conocimiento editado")
        knowList[currentIndex] = {
          ...knowList[currentIndex],
          ...info,
        }
        setKnowList(knowList)
        setStatus(statusList.TRAINIG)
      })
    }
  }

  const addMultipleRecords = async (records) => {
    const requests = records.map((record) => axios.post(apiRoute, record))
    try {
      await Promise.all(requests)
      knowLoad()
      messageShow("Conocimiento añadido")
    } catch (error) {
      console.log("Error:", error)
      messageShow("Error al añadir el/los conocimiento:")
    }
  }

  function topicList(knowList) {
    if (knowList === 0) return []
    const topicsArray = [...new Set(knowList.map((item) => item.topic))].sort()
    setKnowTopics(topicsArray)
    /* if (knowTopicsSelect.length === 0) {
      setKnowTopicsSelect(topicsArray)
    } */
  }

  function messageClear() {
    setMessage("")
  }

  function messageShow(message) {
    setMessage(message)
  }

  const toSearch = async (web, text) => {
    try {
      if (web === "google") {
        window.open("https://google.com/", web)
      }
      if (web === "chatGPT") {
        window.open("https://chatgpt.com/", web)
      }
      await navigator.clipboard.writeText(text)
    } catch (err) {
      console.error("Error al copiar el texto: ", err)
    }
  }

  return {
    knowLoad,
    knowList,
    KnowNext,
    knowProcess,
    knowTopics,
    message,
    messageClear,
    messageShow,
    status,
    setStatus,
    statusList,
    toSearch,
    setKnowTopicsSelect,
    knowTopicsSelect,
    testMode,
    setTestMode,
    currentIndex,
  }
}
