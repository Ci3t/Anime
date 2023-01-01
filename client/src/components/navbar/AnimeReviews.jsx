import React, { useEffect, useState } from "react";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { deleteReview, getReviewByAnime } from "../../api/review";
import { useAuth, useNotification } from "../../hooks/themeHook";
import Container from "../Container";
import CustomButtonLink from "../CustomButtonLink";
import ConfirmModal from "../modals/ConfirmModal";
import EditRatingModal from "../modals/EditRatingModal";
import NotFoundText from "../NotFoundText";
import RatingStar from "../RatingStar";
const getNameInitial = (name = "") => {
  return name[0].toUpperCase();
};
function AnimeReviews() {
  const [reviews, setReviews] = useState([]);
  const [animeTitle, setAnimeTitle] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [busy, setBusy] = useState(false);
  const [profileOwnerReview, setProfileOwnerReview] = useState(null);
  const { animeId } = useParams();

  const { authInfo } = useAuth();
  const profileId = authInfo.profile?.id;

  const { updateNotification } = useNotification();

  const fetchReviews = async () => {
    const { anime, error } = await getReviewByAnime(animeId);

    if (error) return updateNotification("error", error);

    setReviews([...anime.reviews]);
    setAnimeTitle(anime.title);
  };

  const findProfileOwnerReview = () => {
    if (profileOwnerReview) return setProfileOwnerReview(null);
    const matched = reviews.find((review) => review.owner.id === profileId);
    if (!matched)
      return updateNotification("error", "You don't have any review!");

    setProfileOwnerReview(matched);
  };

  const handleDeleteConfirm =async()=> {
    setBusy(true)
    const {error,message} = await deleteReview(profileOwnerReview.id);
    setBusy(false)
    if(error) return updateNotification('error',error)
    updateNotification('success',message);

   const updatedReviews = reviews.filter(r=>r.id !== profileOwnerReview.id);

   setReviews([...updatedReviews]);
   setProfileOwnerReview(null)
   hideConfirmModal()
  }
  const handleOnEditClick = ()=>{
    const {id,content,rating}= profileOwnerReview
    setSelectedReview({
        id,content,rating
    })
    setShowEditModal(true)
  }
  const handleOnReviewUpdate = (review) =>{
    const updateReview = {
        ...profileOwnerReview,
        rating:review.rating,
        content:review.content,
    }

    setProfileOwnerReview({...updateReview});
   const newReviews = reviews.map((r)=>{
        if(r.id === updateReview.id) return updateReview;
        return r
    })
    setReviews([...newReviews]);
  }
  const displayConfirmModal =()=> setShowConfirmModal(true)
  const hideConfirmModal =()=> setShowConfirmModal(false)
  const hideEditModal =()=> {
    setShowEditModal(false);
    setSelectedReview(null)
    
  }
  useEffect(() => {
    if (animeId) fetchReviews();
  }, [animeId]);

  return (
    <div className="pb-10 min-h-screen">
      <Container className="xl:px-0 px-2 py-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold">
            <span className="text-red-300">Reviews for :</span> {animeTitle}
          </h1>

          {profileId ? (
            <CustomButtonLink
              label={profileOwnerReview ? "View All" : "Find My Review"}
              onClick={findProfileOwnerReview}
            />
          ) : null}
        </div>
        <NotFoundText text='No Reviews !' visible={!reviews.length} />
        {profileOwnerReview ? (
          <div >
            <ReviewCard review={profileOwnerReview} />
            <div className="flex space-x-3 text-main text-xl p-1">

            <button onClick={displayConfirmModal} type="button">
              <BsTrash />
            </button>
            <button onClick={handleOnEditClick} type="button">
              <BsPencilSquare />
            </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3 mt-3">
            {reviews.map((review) => (
              <ReviewCard review={review} key={review.id} />
            ))}
          </div>
        )}
      </Container>
      <ConfirmModal busy={busy} visible={showConfirmModal} title='Are you sure?' subTitle='This action will remove this review permanently' onCancel={hideConfirmModal} onConfirm={handleDeleteConfirm} />
      <EditRatingModal visible={showEditModal} initialState={selectedReview} onSuccess={handleOnReviewUpdate} onClose={hideEditModal} />
    </div>
  );
}

const ReviewCard = ({ review }) => {
  if (!review) return null;
  const { owner, content, rating } = review;
  return (
    <div className="flex space-x-3">
      <div className="flex items-center justify-center w-14 h-14 rounded-full bg-main select-none">
        {getNameInitial(owner.name)}
      </div>
      <div>
        <h1 className="text-second font-semibold text-lg">{owner.name}</h1>
        <RatingStar rating={rating} />
        <p>{content}</p>
      </div>
    </div>
  );
};
export default AnimeReviews;
