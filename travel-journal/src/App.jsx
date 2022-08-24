import React from 'react'
import Navbar from './components/Navbar'
import JournalEntry from './components/JournalEntry'
import data from './data'

export default function App() {
  const entries = data.map(item =>{
    return (
      <JournalEntry
        key={item.id}
        {...item}
      />
    )
  })

  return (
    <div className='container'>
      <Navbar />
      <section className='entries-list'>
        {entries}
      </section>
    </div>
  )
}
