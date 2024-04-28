import React, { useState, useEffect } from "react";
import "./JokeList.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons/faCircleNotch";
import Joke from "./Joke"
import axios from "axios"


const JokesList = () => {
    const [jokes, setJokes] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [displayedJokesId, setDisplayedJokesId] = useState ([])

/*===================================simultaneously fetch multiple jokes.======================================== */

    const numberOfJokesToFetch = 5;
    const fetchJoke = async () => {
        setIsLoading(true);
        
        const responses = await Promise.all(
            Array.from({ length: numberOfJokesToFetch }, () =>
                axios.get("https://icanhazdadjoke.com", {
                    headers: { Accept: "application/json" }
                })))
        const newJokes = responses.map(response => ({
            joke: response.data.joke,
            id: response.data.id,
            vote: 0
        }));

        const filteredJokes = newJokes.filter(joke => joke.id !== displayedJokesId)

        setJokes(filteredJokes)
        setIsLoading(false)
        setDisplayedJokesId(displayedJokesId => [...displayedJokesId, ...filteredJokes.map(joke => joke.id)])
        
    }

    useEffect(() => {
        fetchJoke();
    },[])

/*===========================Update the vote when the user upvote or downvote the joke========================================= */

    const updateVote = (id, changeInVote) => {
        setJokes(jokes =>
            jokes.map(joke =>
                joke.id === id ? { ...joke, vote: joke.vote + changeInVote } : joke
            )
        )
    }

    const sortedJokes = [...jokes].sort((a, b) => b.vote - a.vote)

/*=====================Render the Jokes or the spinner until joke data has loaded from the API================================ */
    return (
        <div>
            {isLoading ?
                <div className="spinner">
                    <FontAwesomeIcon icon={faCircleNotch} size="5x" spin/>
                    <h1>Loading...</h1>
                </div> :
                <div className="jokes-container">
                    <button onClick={fetchJoke}>Get New Jokes</button>
                    {sortedJokes.map(({ joke, vote, id }) => (
                        <Joke
                            key={id}
                            joke={joke}
                            updateVote={updateVote}
                            vote={vote}
                            id={id}
                        />
                    ))}
                </div>
            }

        </div>
    )

}

export default JokesList;