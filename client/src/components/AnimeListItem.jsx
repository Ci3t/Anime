import React, { useState } from 'react'
import {  BsPencilSquare, BsTrash } from 'react-icons/bs'
import { deleteAnimes } from '../api/anime';
import { useNotification } from '../hooks/themeHook';
import ConfirmModal from './modals/ConfirmModal'
import UpdateAnime from './modals/UpdateAnime';
import { getPoster } from './utils/helper';
import styles from './style/appInfoBox.module.css'
const classBlur = styles.blurAppInfo

const AnimeListItem =({anime,afterDelete,afterUpdate})=>{
    const [showConfirmModal, setShowConfirmModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [selectedAnimeId, setSelectedAnimeId] = useState(null);
    const [busy, setBusy] = useState(false);

    const{updateNotification} = useNotification()

    const handleOnDeleteConfirm = async () => {
        setBusy(true)
      const {error,message} = await deleteAnimes(anime.id)
        setBusy(false)
    
        if(error) return updateNotification('error',error);
    
        hideConfirmModal();
        updateNotification('success',message);
        afterDelete(anime)
        
      };

      const handleOnEditClick = () =>{
        setShowUpdateModal(true)
        setSelectedAnimeId(anime.id)
      }
      const handleOnUpdateClick = (anime) =>{
            afterUpdate(anime)
            setShowUpdateModal(false)
            setSelectedAnimeId(null)
      }

      const displayConfirmModal = ()=>setShowConfirmModal(true)
      const hideConfirmModal = ()=>setShowConfirmModal(false)

    return(
        <>
        <AnimeCard anime={anime} onDeleteClick={displayConfirmModal} onEditClick={handleOnEditClick} />
        <div className="p-0">

        <ConfirmModal
        busy={busy}
        visible={showConfirmModal}
        onConfirm={handleOnDeleteConfirm}
        onCancel={hideConfirmModal}
        title="Are you sure?"
        subTitle="This action will remove this movie permanently!"
        />
        <UpdateAnime
        
        onSuccess={handleOnUpdateClick}
        visible={showUpdateModal}
        animeId={selectedAnimeId}
      />
        </div>
        </>
    )
}
const AnimeCard =({anime,onDeleteClick,onEditClick,onOpenClick})=>{
    const {poster,title,genres=[],status,responsivePosters} = anime
    // console.log(anime);
return (
    <table className={classBlur +' w-full border-b sm:mb-0 mb-3 '}>
        <tbody>
            <tr className='sm:block flex flex-col'>
                <td>
                    <div className="w-24">
                    <img className='w-full aspect-video' src={getPoster(responsivePosters) || poster} alt={title} />
                    </div>

                </td>
                <td className='w-full md:pl-5 pl-1'>
                    <div>
                        <div className='space-x-1'>
                        <h1  className='text-xl font-semibold'>{title}</h1>

                        {genres.map((genre,index)=>{
                            return <span key={genre + index}  className='text-xs'>{genre}</span>
                        })}
                        </div>
                    </div>
                </td>
                <td className='md:px-5 px-1'>
                    <p >{status}</p>
                </td>
                <td className='space-y-2' >
                    <div className='flex items-center space-x-3 md:px-2 px-1'>
                      
                        <button onClick={onDeleteClick} type='button'>
                        <BsTrash/>
                        </button>
                        <button onClick={onEditClick} type='button'>
                        <BsPencilSquare/>
                        </button>
                       
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
)
}

export default AnimeListItem