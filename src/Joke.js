import React from "react"
import "./Joke.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons';


const Joke = ({joke, updateVote, vote, id}) => {

    const upVote = () =>  {
       updateVote(id, +1)
    }
    const downVote = () => {
        updateVote(id, -1)
    }
   
    return (
        <div className="Joke">
            <button onClick = {upVote}><FontAwesomeIcon icon={faThumbsUp} /></button>
            <button onClick = {downVote}><FontAwesomeIcon icon={faThumbsDown} /></button>
            <span className="Joke-vote"> {vote} </span>
            <span className="Joke-content">{joke}</span>
        </div>
    )

}

export default Joke;