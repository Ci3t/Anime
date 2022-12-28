import React from 'react'
import { BsBoxArrowUpRight, BsPencilSquare, BsTrash } from 'react-icons/bs'

const AnimeListItem =({anime,onDeleteClick,onEditClick,onOpenClick})=>{
    const {poster,title,genres=[],status} = anime
    // console.log(anime);
return (
    <table className='w-full border-b'>
        <tbody>
            <tr>
                <td>
                    <div className="w-24">
                    <img className='w-full aspect-video' src={poster} alt={title} />
                    </div>

                </td>
                <td className='w-full pl-5'>
                    <div>
                        <div className='space-x-1'>
                        <h1  className='text-xl font-semibold'>{title}</h1>

                        {genres.map((genre,index)=>{
                            return <span key={genre + index}  className='text-xs'>{genre}</span>
                        })}
                        </div>
                    </div>
                </td>
                <td className='px-5'>
                    <p >{status}</p>
                </td>
                <td className='space-y-2' >
                    <div className='flex items-center space-x-3 '>
                      
                        <button onClick={onDeleteClick} type='button'>
                        <BsTrash/>
                        </button>
                        <button onClick={onEditClick} type='button'>
                        <BsPencilSquare/>
                        </button>
                        <button onClick={onOpenClick} type='button'>
                        <BsBoxArrowUpRight/>
                        </button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
)
}

export default AnimeListItem