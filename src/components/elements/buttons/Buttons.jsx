import React from "react"
import { Button, CircularProgress } from "@mui/material"
/**
 *
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
 * @returns
 */
const Buttons = ({
  buttonAProps = null,
  buttonBProps = null,
  buttonAText = "",
  buttonBText = "",
  buttonADisabled = false,
  buttonBDisabled = false,
  loading = false,
  buttonAAction = null,
  buttonBAction = null,
  buttonsDisposition = "vertical",
}) => {
  if (buttonAText === "" && buttonBText === "") return null

  const ButtonProps = {
    variant: "contained",
    className: " btn-full-width",
    size: "large",
    fullWidth: true,
    type: "submit",
  }

  const colAClass =
    buttonsDisposition === "vertical"
      ? "col-lg-12 col-xs-12 col-md-12"
      : "col col-lg-6 col-xs-12 col-md-6 pr-2"
  const colBClass =
    buttonsDisposition === "vertical"
      ? "col-lg-12 col-xs-12 col-md-12"
      : "col col-lg-6 col-xs-12 col-md-6 pl-2"

  const ButtonAProps = {
    ...ButtonProps,
    color: "primary",
    "data-test-id": "confirm-action",
    ...buttonAProps,
    disabled: buttonADisabled || loading,
    onClick: buttonAAction,
  }

  const ButtonBProps = {
    ...ButtonProps,
    color: "secondary",
    "data-test-id": "cancel-action",
    ...buttonBProps,
    disabled: buttonBDisabled || loading,
    onClick: buttonBAction,
  }

  return (
    <div className="row buttons pt-3">
      {!!buttonAText && (
        <div className={`colA ${colAClass}`}>
          <Button {...ButtonAProps}>
            {loading ? <CircularProgress /> : buttonAText}
          </Button>
        </div>
      )}
      {!!buttonBText && (
        <div className={`colB ${colBClass}`}>
          <Button {...ButtonBProps}>
            {loading ? <CircularProgress /> : buttonBText}
          </Button>
        </div>
      )}
    </div>
  )
}

export default Buttons
