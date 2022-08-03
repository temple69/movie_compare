import React, { useEffect, useReducer, useState } from 'react'
import MovieContext from "./movie-context";
import classes from '../components/Styles/movies.module.css'
import LeftList from '../components/List/Leftlist';
import Rightlist from '../components/List/Rightlist';
const initialState={
    leftValue:undefined,
    rightValue:undefined,
    leftMovies:[],
    leftSingleMovie:[],
    rightMovies:[],
    rightSingleMovie:[],
    isLeft:true,
    isRight:true,
    show:false,
    rightshow:false
}
const inputs =(state,action)=>{
    if(action.type=== 'left'){
        return{
            ...state,leftValue:action.value
        }
    }
    else if(action.type=== 'leftsingle'){
        return{
            ...state,leftValue:action.value
        }
    }
    else if(action.type=== 'leftlistmovies'){
        return{
            ...state,leftMovies:action.value
        }
    }
    else if(action.type=== 'leftsinglemovies'){
        return{
            ...state,leftSingleMovie:action.value
        }
    }
    else if(action.type=== 'right'){
        return{
            ...state,rightValue:action.value
        }
    }
    else if(action.type=== 'rightsingle'){
        return{
            ...state,rightValue:action.value
        }
    }
    else if(action.type=== 'rightlistmovies'){
        return{
            ...state,rightMovies:action.value
        }
    }
    else if(action.type=== 'rightsinglemovies'){
        return{
            ...state,rightSingleMovie:action.value
        }
    }
    else if(action.type=== 'lefttrue'){
        return{
            ...state,isLeft:false
        }
    }
    else if(action.type=== 'righttrue'){
        return{
            ...state,isRight:false
        }
    }
    else if(action.type=== 'leftreset'){
        return{
            ...state,isLeft:true,
            leftMovies:[],
            leftSingleMovie:[],
            show:false
        }
    }
    else if(action.type=== 'rightreset'){
        return{
            ...state,isRight:true,
            rightMovies:[],
            rightSingleMovie:[],
            rightshow:false
        }
    }
    else if(action.type=== 'show'){
        return{
            ...state,show:true
        }
    }
    else if(action.type=== 'rightshow'){
        return{
            ...state,rightshow:true
        }
    }
    
}
 function MovieProvider(props) {
    const[state,dispatch]=useReducer(inputs,initialState)

    const leftHandler=(data)=>{
        dispatch({type:'left',
        value:data})
    }
    const rightHandler=(data)=>{
        dispatch({type:'right',
        value:data})
        
    }
    useEffect(()=>{
        const timeout = setTimeout(()=>{
            if(state.leftValue=== undefined || state.leftValue===''){
                dispatch({type:'leftreset'})
                return;
            }
            const movieRequest= fetch(`http://www.omdbapi.com/?s=${state.leftValue}&apikey=e96f3e92&plot=short`)
       movieRequest.then((response)=>{
           if (!response.ok) {
               console.log(response)
               }
           return response.json()
           })
       .then(data=>{
           if(data.Error){
            dispatch({
                type:'show'
            })
               return []
            }
           
           dispatch({
               type:'leftlistmovies',
               value:data.Search
           })
       })
    
        },1000)
        
        return ()=>{
            clearTimeout(timeout)
        }
       },[state.leftValue])
       useEffect(()=>{
        const timeout = setTimeout(()=>{
            if(state.rightValue=== undefined || state.rightValue===''){
                dispatch({type:'rightreset'})
                return;
            }
            const movieRequest= fetch(`http://www.omdbapi.com/?s=${state.rightValue}&apikey=e96f3e92&plot=short`)
       movieRequest.then((response)=>{
           return response.json()
            })
       .then(data=>{
           if(data.Error){
                dispatch({
                    type:'rightshow'
                })
            return []
           }
           dispatch({
               type:'rightlistmovies',
               value:data.Search
           })
       })
        },1000)
        return ()=>{
            clearTimeout(timeout)
        }
       },[state.rightValue])
    
       const singleHandler=(id)=>{
        const cloneLeftMovies=[...state.leftMovies]
        const imd = cloneLeftMovies[id]
        dispatch({
            type:'leftsingle',
            value:imd.Title
        })
        dispatch({type:'lefttrue'})
        const singleMovieRequest=fetch(`http://www.omdbapi.com/?i=${imd.imdbID}&apikey=e96f3e92&`)
        singleMovieRequest.then((response)=>{
            return response.json()
        })
        .then(data=>{
            dispatch({
                type:'leftsinglemovies',
                value:data
            })
        })
    }
    const rightSingleHandler=(id)=>{
        const cloneLeftMovies=[...state.rightMovies]
        const imd = cloneLeftMovies[id]
        dispatch({
            type:'rightsingle',
            value:imd.Title
        })
        dispatch({type:'righttrue'})
        const singleMovieRequest=fetch(`http://www.omdbapi.com/?i=${imd.imdbID}&apikey=e96f3e92&`)
        singleMovieRequest.then((response)=>{
            return response.json()
        })
        .then(data=>{
            dispatch({
                type:'rightsinglemovies',
                value:data
            })
        })
    }
    
    let LeftListMovies= state.leftMovies.map((movieinfo,index)=>(
        <LeftList movieTitle={movieinfo.Title} movieSrc={movieinfo.Poster ==="N/A" ? " " : movieinfo.Poster} key={Math.random()} onCLICK={()=>{singleHandler(index)}}></LeftList>
     ))
 let rightListMovies= state.rightMovies.map((movieinfo,index)=>(
    <Rightlist movieTitle={movieinfo.Title} movieSrc={movieinfo.Poster ==="N/A" ? " " : movieinfo.Poster} key={Math.random()} onCLICK={()=>{rightSingleHandler(index)}}></Rightlist>
 
))
if(state.show){
    LeftListMovies=<p>OOPS!! Movie Name:<i>{state.leftValue}</i> Not Found in Database</p>
}
if(state.rightshow){
    rightListMovies=<p>OOPS!! Movie Name:<i>{state.rightValue}</i> Not Found in Database</p>
}

    const leftConMovie=<section className={classes.flex2}>
    <img style={{height:'300px',width:'300px'}} src={state.leftSingleMovie.Poster} alt="" />
    <div style={{position:'relative'}}>
    <p><b>Movie-Name</b>:{state.leftSingleMovie.Title}</p>
    <p><b>Plot</b>:{state.leftSingleMovie.Plot}</p>
    <p><b>Genre</b>:{state.leftSingleMovie.Genre}</p>
    <p><b>Runtime</b>:{state.leftSingleMovie.Runtime}</p>
    <p><b>ReleaseDate</b>:{state.leftSingleMovie.Released}</p>
    <p><b>Writer</b>:{state.leftSingleMovie.Writer}</p>
    <p><b>Rating</b>:{state.leftSingleMovie.imdbRating}</p>
    </div>
    </section>
    const rightConMovie=<section className={classes.flex2}>
        <img style={{height:'300px',width:'300px'}} src={state.rightSingleMovie.Poster} alt="" />
    <div style={{position:'relative'}}>
    <p><b>Movie-Name</b>:{state.rightSingleMovie.Title}</p>
    <p><b>Plot</b>:{state.rightSingleMovie.Plot}</p>
    <p><b>Genre</b>:{state.rightSingleMovie.Genre}</p>
    <p><b>Runtime</b>:{state.rightSingleMovie.Runtime}</p>
    <p><b>ReleaseDate</b>:{state.rightSingleMovie.Released}</p>
    <p><b>Writer</b>:{state.rightSingleMovie.Writer}</p>
    <p><b>Rating</b>:{state.rightSingleMovie.imdbRating}</p>
    
    </div>
</section>
let message=''
 if (parseInt(state.leftSingleMovie.imdbRating)>parseInt(state.rightSingleMovie.imdbRating)) {
    message=<p>With a rating of {state.leftSingleMovie.imdbRating} The movie recommended to watch first is <i>{state.leftSingleMovie.Title}</i></p>
}
else if(parseInt(state.rightSingleMovie.imdbRating)>parseInt(state.leftSingleMovie.imdbRating)){
    message=<p>With a rating of {state.rightSingleMovie.imdbRating} The movie recommended to watch first is <i>{state.rightSingleMovie.Title}</i></p>

} 
     const moviecontext={
         leftValue:state.leftValue,
         rightValue:state.rightValue,
         leftHandler,
         rightHandler,
         leftMovies:state.leftMovies,
         singleHandler,
         rightSingleHandler,
         leftConMovie,
         rightConMovie,
         isLeft:state.isLeft,
         isRight:state.isRight,
         LeftListMovies,
         rightListMovies,
         message

     }
  return (
      <MovieContext.Provider value={moviecontext}> 
          {props.children}
      </MovieContext.Provider>
  )
}
export default MovieProvider
