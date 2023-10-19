import React, { Component } from 'react'
import { useRoutes } from 'react-router-dom'
import routes from './router/index'
import './index.css'
export default function App() {

  const element = useRoutes(routes)
  return (
    <>
      {element}
    </>
  )
}

