import React from 'react'
import {AppContext} from '../context/AppContext'

export default function Budget() {

    const {budget} = React.useContext(AppContext)

    return (
        // Assigning Bootstrap Classes gives a gray background tto the element
        <div className='alert alert-secondary'>
            <span>Budget: ${budget}</span>
        </div>
    )
}