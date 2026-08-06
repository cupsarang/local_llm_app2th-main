import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Header from './components/Header'
import Greeting from './components/Greeting'
import Counter from './components/Counter'
import InputState from './components/InputState'
import ListRendering from './components/ListRendering'
// import './App.css'

function App() {

  return (
    <>
      <h1>안녕 리액트</h1>
      <ListRendering />
      <InputState />
      <Counter />
      <Header />
      <Greeting name="joy" haha="반갑습니다" />
    </>
  )
}

export default App
