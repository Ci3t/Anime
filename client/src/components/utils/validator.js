export const validateAnime = (animeInfo)=>{

    const {title,description,language,releaseDate,type,status,genres,tags,cast} = animeInfo
  
    if(!title.trim()) return {error:'Title is missing!!'}
    if(!description.trim()) return {error:'Description is missing!!'}
    if(!language.trim()) return {error:'Language is missing!!'}
    if(!type.trim()) return {error:'Type is missing!!'}
    if(!releaseDate.trim()) return {error:'Release Date is missing!!'}
    if(!status.trim()) return {error:'Status is missing!!'}
    //genres validate if array
    if(!genres.length) return {error:'Genres are missing!!'}
    for (let gen of genres){
      // genres need to be string
      if (!gen.trim()) return {error:'Invalid genres'}
    }
    //checking for tags
    if(!tags.length) return {error:'Tags are missing!!'}
    for (let tag of tags){
      if (!tag.trim()) return {error:'Invalid tags!'}
    }
    //checking cast
    if(!cast.length) return {error:'Cast are missing!!'}
    for (let c of cast){
      if (typeof c !== 'object') return {error:'Invalid cast!'}
    }
    
    return {error:null}
  }