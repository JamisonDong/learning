import React from "react";
import app from "./http";
import { renderToString } from "react-dom/server"
import Home from "../share/pages/Home"

app.get("/", (req, res) => {
  const content = renderToString(<Home />)

  res.send(`
    <html>
      <head>
        <title>
          React SSR
        </title>
      </head>
      <body>
        <div id="root">${content}<div>
      </body>
    </html>
  `)
})