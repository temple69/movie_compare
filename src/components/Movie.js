import React, { useContext} from 'react'
import Header from './Header'
import SearchInput from './Reusable/Input/SearchInput'
import Container from './Reusable/Container/Container'
import classes from '../components/Styles/movies.module.css'
import MovieContext from '../store/movie-context'
function  Movie() {
    const context = useContext(MovieContext)
    return (
    <>
        <Header></Header>
        <section className={classes.section}>
            <SearchInput position = 'left'>
           {context.isLeft&&context.LeftListMovies}
            </SearchInput>
           <Container>
               {context.isLeft?'':context.leftConMovie}
            </Container>
            <Container>
                {context.isRight?'':context.rightConMovie}
            </Container>
            <SearchInput>
                {context.isRight&&context.rightListMovies}
            </SearchInput>
 </section>
 <div className={classes.message}>
 {!context.isLeft&&!context.isRight&&<article><b>MOVIE RECOMMENDED</b>:{context.message}</article>}
 </div>
    </>
  )
}
export default Movie
