import { useQuery } from 'react-query';
import { getMovies, getUpcomingMovies } from "../api/movies-api";

const MoviesPage = () => {
    const { data: moviesData, error: moviesError, isLoading: moviesLoading, isError: moviesIsError } = useQuery('discover', getMovies);
    const { data: upcomingData, error: upcomingError, isLoading: upcomingLoading, isError: upcomingIsError } = useQuery('upcoming', getUpcomingMovies);

    if (moviesLoading || upcomingLoading) {
        return <h1>Loading...</h1>;
    }

    if (moviesIsError) {
        return <h1>{moviesError.message}</h1>;
    }

    if (upcomingIsError) {
        return <h1>{upcomingError.message}</h1>;
    }

    const movies = moviesData.results || [];
    const upcomingMovies = upcomingData.results || [];

    const moviesDisplay = (
        <div>
            <h3>All Movies</h3>
            <ul>
                {movies.map(movie => (
                    <li key={movie.id}>
                        {movie.id}, {movie.title}
                    </li>
                ))}
            </ul>
        </div>
    );

    const upcomingMoviesDisplay = (
        <div>
            <h3>Upcoming Movies</h3>
            <ul>
                {upcomingMovies.map(movie => (
                    <li key={movie.id}>
                        {movie.id}, {movie.title}
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div>
            <h2>Movies</h2>
            {moviesDisplay}
            {upcomingMoviesDisplay}
        </div>
    );
};

export default MoviesPage;
