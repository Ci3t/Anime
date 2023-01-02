import React, { forwardRef, useEffect, useRef, useState } from "react";
import { AiOutlineDoubleLeft, AiOutlineDoubleRight } from "react-icons/ai";
import { Link } from "react-router-dom";

import { getLatestUploads } from "../../api/anime";
import { useNotification } from "../../hooks/themeHook";

import styles from './heroSlideShow.module.scss'

let count = 0;
let intervalId;

let newTime = 0;
let lastTime = 0;
function HeroSlideShow() {
  const [slide, setSlide] = useState({});
  const [cloneSlide, setCloneSlide] = useState({});
  const [slides, setSlides] = useState([]);
  const [upNext, setUpNext] = useState([]);
  const [visible, setVisible] = useState(true);

  const slideRef = useRef();
  const cloneSlideRef = useRef();

  const { updateNotification } = useNotification();

  const fetchLatestUploads = async (signal) => {
    const { error, animes } = await getLatestUploads(signal);

    if (error) return updateNotification("error", error);

    setSlides([...animes]);
    setSlide(animes[0]);
  };

  const startSlideShow = () => {
    intervalId = setInterval(()=>{
      newTime = Date.now()
      const delta = newTime -lastTime;
      
      if(delta < 4000) return clearInterval(intervalId);

      handleOnNextClick()
    }, 3500);
  };
  const pauseSlideShow = () => {
    clearInterval(intervalId);
  };

  const updateUpNext = (currentIndex)=>{
    lastTime = Date.now()
    if(!slides.length) return;
    const upNextCount = currentIndex + 1;
    const end = upNextCount + 3

    let newSlides = [...slides];
    newSlides = newSlides.slice(upNextCount,end)

    if(!newSlides.length) {
        newSlides = [...slides].slice(0,3)
    }

    setUpNext([...newSlides]);
  }

  const handleOnNextClick = () => {
    pauseSlideShow()
    setCloneSlide(slides[count]);

    count = (count + 1) % slides.length;
    setSlide(slides[count]);

    cloneSlideRef.current.classList.add("slide-out-to-left");
    slideRef.current.classList.add("slide-in-from-right");

    updateUpNext(count)

    // setTimeout(() => {
    //     handleAnimationEnd()
    // }, 500);
    
  };

  const handleOnPrevClick = () => {
    pauseSlideShow()
    setCloneSlide(slides[count]);

    count = (count + slides.length - 1) % slides.length;
    setSlide(slides[count]);

    cloneSlideRef.current.classList.add("slide-out-to-right");
    slideRef.current.classList.add("slide-in-from-left");
    updateUpNext(count)
    // setTimeout(() => {
    //     handleAnimationEnd()
    // }, 500);
  };
  const handleAnimationEnd = () => {
    const classes = [
        "slide-out-to-left",
        "slide-in-from-right",
        "slide-out-to-right",
        "slide-in-from-left"

    ]
    slideRef.current.classList.remove(...classes);
    cloneSlideRef.current.classList.remove(...classes);
    setCloneSlide({});
    startSlideShow()
  };

  const handleOnVisibilityChange = ()=>{
   const visibility = document.visibilityState

   if(visibility === 'hidden') setVisible(false)
   if(visibility === 'visible') setVisible(true)
  }

  useEffect(() => {
      const ac = new AbortController()
    fetchLatestUploads(ac.signal);
    document.addEventListener('visibilitychange',handleOnVisibilityChange)

    return () => {
      pauseSlideShow();
      document.removeEventListener('visibilitychange',handleOnVisibilityChange)
      ac.abort()
    };
  }, []);

  useEffect(() => {
    if (slides.length && visible) {
        updateUpNext(count)
        startSlideShow();
    }
    else pauseSlideShow()
  }, [slides.length,visible]);
const {title} = slide
  return (
    <div className="w-full flex pt-4">
      <div className={" md:w-4/5 w-full aspect-video relative overflow-hidden rounded"}>
      <Slide title={slide.title} src={slide.poster} ref={slideRef} id={slide.id} className={styles.bigSliderImages } />
      <Slide ref={cloneSlideRef}
          onAnimationEnd={handleAnimationEnd}
          className={styles.bigSliderImages +" aspect-video object-cover absolute inset-0 "}
          src={cloneSlide.poster}
          title={cloneSlide.title}
          id={slide.id}
          />
          
       
        <SlideShowController
          onPrevClick={handleOnPrevClick}
          onNextClick={handleOnNextClick}
        />
      </div>
      <div className={styles.heroSmallRightSideUpNext +" md:block hidden w-1/5 aspect-video space-y-3 px-3"}>
        <h1 className="font-semibold text-2xl text-pink-300 text-center">
            Up Next
        </h1>
        {upNext.map(({poster,id})=>{
            return <img key={id} src={poster} alt="" className={styles.upNextImage +" aspect-video object-cover rounded "} />
        })}
      </div>
    </div>
  );
}

const SlideShowController = ({ onPrevClick, onNextClick }) => {
  const btnClass =
    " rounded text-purple-600  text-2xl p-2 outline-none ";
  return (
    <div className="absolute top-1/2 -translate-y-1/2 w-full flex items-center justify-between px-2">
      <button onClick={onPrevClick} className={btnClass} type="button">
        <AiOutlineDoubleLeft />
      </button>
      <button onClick={onNextClick} className={btnClass} type="button">
        <AiOutlineDoubleRight />
      </button>
    </div>
  );
};

const Slide = forwardRef((props,ref) =>{
    const {title,id,src,className='',...rest} = props
    return(
        <Link to={`/anime/${id}`} ref={ref} className={"w-full cursor-pointer block " + className} {...rest}>

       { src? <img
   
        //   onAnimationEnd={handleAnimationEnd}
        className="aspect-video object-cover rounded-t"
        src={src}
        alt={title}
        /> : null}
      { title?  <div className="absolute inset-0 flex flex-col justify-end p-3 bg-gradient-to-t from-purple-800 via-transparent">
            <h1 className="font-semibold text-4xl text-fuchsia-200">{title}</h1>
        </div>:null}
        </Link>
    )
})
export default HeroSlideShow;
