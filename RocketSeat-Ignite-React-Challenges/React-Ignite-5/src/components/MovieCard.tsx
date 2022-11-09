import { Star, Clock } from 'react-feather'

import '../styles/movie-card.scss'
import React from 'react'

interface MovieCardProps {
  title: string
  poster: string
  rating: string
  runtime: string
}

function MovieCard(props: MovieCardProps) {
  return (
    <div className='movie-card'>
      <img src={props.poster} alt={props.title} />

      <div>
        <div className='movie-info'>
          <span>{props.title}</span>
          <div className='meta'>
            <div>
              <Star /> {props.rating}
            </div>

            <div>
              <Clock /> {props.runtime}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MovieCard
