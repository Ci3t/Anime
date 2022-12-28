import React from 'react'

import {BsBoxArrowUpRight,BsPencilSquare,BsTrash} from 'react-icons/bs'

function LatestUploads() {
  return (
    <div className="bg-white shadow  p-5 rounded col-span-2">

            <h1 className='text-2xl mb-2 font-semibold'>Recent Uploads</h1>

            <AnimeListItem anime={{poster:"https://images.unsplash.com/photo-1541562232579-512a21360020?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGFuaW1lfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=300&q=80",title:' Lorem ipsum dolor sit amet.',status:'public',genres:['Action','Romance'],}} />
           
    </div>
  )
}

const AnimeListItem =({anime,onDeleteClick,onEditClick,onOpenClick})=>{
    const {poster,title,genres=[],status} = anime
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

export default LatestUploads