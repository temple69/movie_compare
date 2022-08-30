async function fetchMovieData(movietitle,position){
    if (movietitle === ''|| movietitle === undefined) {
        return
    }
        const response = await fetch(`https://www.omdbapi.com/?s=${position==='left'?movietitle:movietitle}&apikey=e96f3e92&plot=short`)
        const Moviedata= await response.json()
        console.log(Moviedata)
        return Moviedata
}
async function fetchSingleMovie(movieid,position){
    if (movieid === '') {
        return
    }
    const response = await fetch(`https://www.omdbapi.com/?i=${position==='left'?movieid:movieid}&apikey=e96f3e92`)
    const singleMoviedata= await response.json()
    return singleMoviedata

    }
    try {
        fetchMovieData()
        fetchMovieData()
        
    } catch (error) {
        console.log(error)
    }
export{
    fetchMovieData,
    fetchSingleMovie
}  