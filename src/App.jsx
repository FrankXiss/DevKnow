import "./App.css"
import Menu from "./components/Menu"
import Training from "./components/Training"
import KnowAdd from "./components/KnowAdd"
import KnowAddFromJson from "./components/KnowAddFromJson"
import { useKnow } from "./hooks/useKnow"
import { Snackbar } from "@mui/material"
import { statusList } from "./utilis/utils"

function App() {
  const UseKnow = useKnow()
  const { status } = UseKnow
  return (
    <div className="appContainer columns-1 p-4">
      <Menu UseKnow={UseKnow} />
      {status === statusList.TRAINIG && <Training UseKnow={UseKnow} />}
      {(status === statusList.ADDING_CONTENT ||
        status === statusList.EDITING_CONTENT) && <KnowAdd UseKnow={UseKnow} />}
      {status === statusList.ADDING_CONTENT_FROM_JSON && (
        <KnowAddFromJson UseKnow={UseKnow} />
      )}
      <Snackbar
        open={UseKnow.message !== ""}
        autoHideDuration={6000}
        onClose={UseKnow.messageClear}
        message={UseKnow.message}
      />
    </div>
  )
}

export default App
