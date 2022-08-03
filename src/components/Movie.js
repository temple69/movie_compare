import React, { useContext} from 'react'
import Header from './Header'
import LeftSearch from './Input/LeftSearch'
import LeftContainer from './Container/LeftContainer'
import RightContainer from './Container/RightContainer'
import RightSearch from './Input/RightSearch'
import classes from '../components/Styles/movies.module.css'
import MovieContext from '../store/movie-context'
function  Movie() {
    const context = useContext(MovieContext)
    return (
    <>
        <Header></Header>
        <section className={classes.section}>
            <LeftSearch>
           {context.isLeft&&context.LeftListMovies}
            </LeftSearch>
           <LeftContainer>
               {context.isLeft?'':context.leftConMovie}
            </LeftContainer>
            <RightContainer>
                {context.isRight?'':context.rightConMovie}
            </RightContainer>
            <RightSearch>
                {context.isRight&&context.rightListMovies}
            </RightSearch>
 </section>
 <div>
 {!context.isLeft&&!context.isRight&&<p><b>MOVIE RECOMMENDED</b>:{context.message}</p>}
 </div>
    </>
  )
}
export default Movie
