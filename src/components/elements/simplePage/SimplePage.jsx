import React from "react"
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined"
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined"
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined"
import "./SimplePage.scss"
import ContentHeader from "../contentHeader/ContentHeader"
import Buttons from "../buttons/Buttons"

/**
 *
 * @param {string} title - Titulo a mostrarse
 * @param {string} description - Descripción a mostrarse
 * @param {string / jsx} icon - Icono a mostrarse (Puede ser texto: ok, info, error) o enviarse directamente el objeto del icono personalizado
 * @param {jsx} children - Clase que se aplicará al título
 * @param {string} classIcon - Clase que se aplicará al icono
 * @param {string} classChildren - Clase que se aplicará al contenedor del children descripción
 * @param {string} classTitle - Clase que se aplicará al título
 * @param {string} className - Clase que se aplicará al contenedor principal del componente
 * @param {string} classDescription - Clase que se aplicará a la descripción
 * @param {object} buttonAProps - Propiedades particulares para el primer botón
 * @param {object} buttonBProps - Propiedades particulares para el segundo botón
 * @param {string} buttonAText - Label del primer botón
 * @param {string} buttonBText - Label del segundo botón
 * @param {boolean} buttonADisabled - Condición para deshabilitar al primer botón (true deshabilita)
 * @param {boolean} buttonBDisabled - Condición para deshabilitar al segundo botón (true deshabilita)
 * @param {boolean} loading - True deshabilita ambos botones y reemplaza el texto por un CircularProgress
 * @param {function} buttonAAction - Función que se lanzará al hacer click en el primer botón
 * @param {function} buttonBAction - Función que se lanzará al hacer click en el segundo botón
 * @param {string} buttonsDisposition - Indica cual será la disposición entre los botones (horizontal/vertical)
 * @param {object} styleIcon - estilos a aplicarse para personalizar el icono (tamaño, color, etc.)
 * @returns
 */
const SimplePage = (props) => {
  const {
    title,
    description,
    icon = "ok",
    children = null,
    classIcon = "mt-3 pt-5",
    classChildren = "",
    classTitle,
    className,
    classDescription,
    buttonAProps = null,
    buttonBProps = null,
    buttonAText,
    buttonBText,
    buttonADisabled = false,
    buttonBDisabled = false,
    loading = false,
    buttonAAction = null,
    buttonBAction = null,
    buttonsDisposition = "vertical",
    styleIcon = null,
  } = props

  const actions = {
    ok: CheckCircleOutlineOutlinedIcon,
    info: InfoOutlinedIcon,
    error: ErrorOutlineOutlinedIcon,
  }

  let Icon = icon
  if (typeof icon === "string") {
    Icon = actions[icon]
  }

  return (
    <div className={`container mx-auto mt-4 ${className}`}>
      {Icon && (
        <div className="text-center d-flex justify-content-center">
          <span className={`colPri-secu ${classIcon}`}>
            <Icon style={{ fontSize: "60px", ...styleIcon }} />
          </span>
        </div>
      )}
      <ContentHeader
        title={title}
        subtitle={description}
        classNameTitle={classTitle}
        classNameSubtitle={classDescription}
      />
      {!!children && <div className={`${classChildren}`}>{children}</div>}
      <Buttons
        buttonAProps={buttonAProps}
        buttonBProps={buttonBProps}
        buttonAText={buttonAText}
        buttonBText={buttonBText}
        buttonAAction={buttonAAction}
        buttonBAction={buttonBAction}
        buttonsDisposition={buttonsDisposition}
        buttonADisabled={buttonADisabled}
        buttonBDisabled={buttonBDisabled}
        loading={loading}
      />
    </div>
  )
}

export default SimplePage
