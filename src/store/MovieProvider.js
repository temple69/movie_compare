import React, { useEffect, useReducer} from 'react'
import MovieContext from "./movie-context";
import { fetchMovieData,fetchSingleMovie } from '../components/api/fetchData';
import MoviesList from '../components/List/Movies-List';
import classes from '../components/Styles/movies.module.css'
const initialState={
    leftValue:'',
    rightValue:'',
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
    //This function gets the value of the input and passes it on to to usereducer to manage and update state
    const inputVALUEHandler=(data,position)=>{
        if(position === 'left'){
            dispatch({type:'left',
            value:data})
        }
        else{
            dispatch({type:'right',
            value:data})
        }
    }
    const getMovies=(data,)=>{
        console.log(data)
    }
useEffect(()=>{
        const timeout = setTimeout(()=>{
            if(state.leftValue=== undefined || state.leftValue===''){
                dispatch({type:'leftreset'})
                return;
            }
            async function getMovies(){
                const leftdata = await fetchMovieData(state.leftValue,'left')
                if(leftdata.Error){
                    dispatch({
                        type:'show'
                    })
                       return []
                    }
                    dispatch({
                        type:'leftlistmovies',
                        value:leftdata.Search
                    })
            }
        getMovies()
 },1000)
        return ()=>{
            clearTimeout(timeout)
        }
       },[state.leftValue,])
       useEffect(()=>{
        if(state.rightValue=== undefined || state.rightValue===''){
            dispatch({type:'rightreset'})
            return;
        }
        const timeout = setTimeout(()=>{
           async function getRightMovies(){
                const rightdata = await fetchMovieData(state.rightValue,)
                if(rightdata.Error){
                    dispatch({
                        type:'rightshow'
                    })
                       return []
                    }
                    dispatch({
                        type:'rightlistmovies',
                        value:rightdata.Search
                    })
            }
            getRightMovies()
    },1000)
    return ()=>{
            clearTimeout(timeout)
        }
       },[state.rightValue])
       //This function fetches  single movie and shows information about the movie
    const singleHandler= async (id,position)=>{
        if (position === 'left') {
            const cloneLeftMovies=[...state.leftMovies]
            const imd = cloneLeftMovies[id]
            const cloneRightMovies=[...state.rightMovies]
            const rightimd = cloneRightMovies[id]
    
            dispatch({
                type:'leftsingle',
                value:imd.Title
            })
            dispatch({type:'lefttrue'})
            const data = await fetchSingleMovie(imd.imdbID,'left')
            dispatch({
                type:'leftsinglemovies',
                value:data
            })
        }
        else{
            const cloneRightMovies=[...state.rightMovies]
            const imd = cloneRightMovies[id]
            dispatch({
                type:'rightsingle',
                value:imd.Title
            })
            dispatch({type:'righttrue'})
            const data= await fetchSingleMovie(imd.imdbID)
                dispatch({
                    type:'rightsinglemovies',
                    value:data
                })
    }
       
    }
    
let LeftListMovies= state.leftMovies.map((movieinfo,index)=>(
        <MoviesList position='left' movieTitle={movieinfo.Title} movieSrc={movieinfo.Poster ==="N/A" ? " " : movieinfo.Poster} key={Math.random()} onCLICK={()=>{singleHandler(index,'left')}}></MoviesList>
     ))
 let rightListMovies= state.rightMovies.map((movieinfo,index)=>(
    <MoviesList movieTitle={movieinfo.Title} movieSrc={movieinfo.Poster ==="N/A" ? " " : movieinfo.Poster} key={Math.random()} onCLICK={()=>{singleHandler(index)}}></MoviesList>
 
))
if(state.show){
    LeftListMovies=<p>OOPS!! Movie Name:<i>{state.leftValue}</i> Not Found in Database</p>
}
if(state.rightshow){
    rightListMovies=<p>OOPS!! Movie Name:<i>{state.rightValue}</i> Not Found in Database</p>
}


    const leftConMovie=<section className={classes.flex2}>
    <img  src={state.leftSingleMovie.Poster} alt="" />
    <div>
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
        <img  src={state.rightSingleMovie.Poster} alt="" />
    <div>
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
else if(parseInt(state.rightSingleMovie.imdbRating) === parseInt(state.leftSingleMovie.imdbRating)){
    message=<p>Watch trailers of both <i>{state.leftSingleMovie.Title}</i> and <i>{state.rightSingleMovie.Title}</i> and watch the one that interests you </p>

} 
     const moviecontext={
         leftValue:state.leftValue,
         rightValue:state.rightValue,
         inputVALUEHandler,
         leftMovies:state.leftMovies,
         singleHandler,
         getMovies,
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
