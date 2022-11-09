import MovieCard from './MovieCard'

interface ContentProps {
  selectedGenre: {
    id: number
    title: string
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family'
  }

  movies: Array<{
    imdbID: string
    Title: string
    Poster: string
    Runtime: string
    Ratings: Array<{ Source: string; Value: string }>
  }>
}

export const Content = ({ selectedGenre, movies }: ContentProps) => (
  <div className='container'>
    <header>
      <span className='category'>
        Categoria:<span> {selectedGenre.title}</span>
      </span>
    </header>

    <main>
      <div className='movies-list'>
        {movies.map(movie => (
          <MovieCard
            key={movie.imdbID}
            title={movie.Title}
            poster={movie.Poster}
            runtime={movie.Runtime}
            rating={movie.Ratings[0].Value}
          />
        ))}
      </div>
    </main>
  </div>
)
