import { useCallback, useEffect, useState } from 'react'

import { SideBar } from './components/SideBar'
import { Content } from './components/Content'

import { api } from './services/api'

import './styles/global.scss'

import './styles/sidebar.scss'
import './styles/content.scss'

interface GenreResponseProps {
  id: number
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  title: string
}

interface MovieProps {
  imdbID: string
  Title: string
  Poster: string
  Runtime: string
  Ratings: Array<{ Source: string; Value: string }>
}

export function App() {
  const [movies, setMovies] = useState<MovieProps[]>([])
  const [selectedGenreId, setSelectedGenreId] = useState(1)
  const [genres, setGenres] = useState<GenreResponseProps[]>([])
  const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
    {} as GenreResponseProps
  )

  const getGenre = useCallback(() => {
    api.get<GenreResponseProps[]>('genres').then(res => setGenres(res.data))
  }, [])

  const getMovies = useCallback(
    () =>
      api
        .get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
        .then(response => {
          setMovies(response.data)
        }),
    [selectedGenreId]
  )

  const getSelectedGenre = useCallback(() => {
    api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
      setSelectedGenre(response.data)
    })
  }, [selectedGenreId])

  useEffect(() => {
    getGenre()
  }, [getGenre])

  useEffect(() => {
    getMovies()
  }, [getMovies])

  useEffect(() => {
    getSelectedGenre()
  }, [getSelectedGenre])

  function handleClickButton(id: number) {
    setSelectedGenreId(id)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <SideBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        buttonClickCallback={handleClickButton}
      />

      <Content selectedGenre={selectedGenre} movies={movies} />
    </div>
  )
}
