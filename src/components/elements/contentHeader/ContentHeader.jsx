import React from "react"

const ContentHeader = ({
  title = null,
  subtitle = null,
  classNameTitle = "text-center font-bold text-2xl mb-2 mt-2",
  styleTitle,
  classNameSubtitle = "",
  styleSubtitle,
}) => {
  return (
    <div className="columns-1 my-2">
      {title && (
        <h1 className={classNameTitle} style={styleTitle}>
          {title.toUpperCase()}
        </h1>
      )}
      {subtitle ? (
        <p className={`${classNameSubtitle} text-center`} style={styleSubtitle}>
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}

export default ContentHeader
