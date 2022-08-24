import React from 'react'

export default function JournalEntry(props) {
    return (
        <div className='entry'>
            <img src={`../../public/${props.imageURL}`}  />
            <div className='entry--text'>
                <div className='entry--about'>
                    <img src='../../public/pin.png' alt='pin_image' />
                    <p className='entry--location'>{props.location}</p>
                    <a className='entry--google_maps_url' href={props.googleMapsUrl} target='_blank'>View On Google Maps</a>
                </div>
                <div className='entry--description'>
                    <h1 className='entry--title'>{props.title}</h1>
                    <h3 className='entry--travel_date'>{props.startDate} - {props.endDate}</h3>
                    <p className='entry--description'>{props.description}</p>
                </div>
            </div>
        </div>
    )
}