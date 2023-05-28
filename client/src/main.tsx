import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import './index.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DndProvider backend={HTML5Backend}>
    <App />
    </DndProvider>
  </React.StrictMode>,
)
