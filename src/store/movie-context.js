import React from "react";
const MovieContext =React.createContext({
    leftValue:undefined,
    rightValue:undefined,
    leftHandler:()=>{},
    rightHandler:()=>{},
    leftMovies:[],
    rightMovies:[],
    singleHandler:()=>{},
    rightSingleHandler:()=>{},
    leftSingleMovie:[],
    rightSingleMovie:[],
    leftConMovie:'',
    rightConMovie:'',
    LeftListMovies:'',
    rightListMovies:'',
    isLeft:true,
    isRight:true,
    message:''
})
export default MovieContext