import React, { useState } from 'react';

const FilterMovies = () => {
    const [rating, setRating] = useState('');
    const [actor, setActor] = useState('');

    const handleFilter = () => {
        // 调用后端 API，并传递筛选参数（rating 和 actor）
        fetch(`http://localhost:8080/api/movies/filter?rating=${rating}&actor=${actor}`)
            .then((response) => response.json())
            .then((data) => console.log('Filtered Movies:', data))
            .catch((error) => console.error('Error:', error));
    };

    return (
        <div>
            <h2>Filter Movies</h2>
            <div>
                <label>
                    Rating:
                    <input
                        type="text"
                        value={rating}
                        onChange={(e) => setRating(e.target.value)}
                    />
                </label>
            </div>
            <div>
                <label>
                    Actor:
                    <input
                        type="text"
                        value={actor}
                        onChange={(e) => setActor(e.target.value)}
                    />
                </label>
            </div>
            <button onClick={handleFilter}>Filter</button>
        </div>
    );
};

export default FilterMovies;
