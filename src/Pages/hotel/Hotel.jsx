import './hotel.css'
import { useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleArrowLeft, faCircleArrowRight, faCircleXmark, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import useFetch from '../../hooks/useFetch'
import { SearchContext } from '../../context/SearchContext'
import { AuthContext } from '../../context/AuthContext'
import { set } from 'date-fns'
import Reserve from '../../components/reserve/Reserve'

const Hotel = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]
  const [slideIndex, setSlideIndex] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModel, setOpenModel] = useState(false)
  const {data, loading, error} = useFetch(`/hotels/find/${id}`)
  
  const {dates, options} = useContext(SearchContext)
  const {user} = useContext(AuthContext)
const navigate = useNavigate()
  
  // const checkIn = new Date(dates[0].startDate)
  // const checkOut = new Date(dates[0].endDate)
  // const days = Math.round((checkOut - checkIn) / MILLISECONS_PER_DAY)
  const MILLISECONS_PER_DAY = 1000 * 60 * 60 * 24
  function dayDifference(date1, date2) {
    const checkIn = new Date(date1)
    const checkOut = new Date(date2)
    const daysDiff = Math.round((checkOut - checkIn) / MILLISECONS_PER_DAY)
    return daysDiff
  }

   const days =  dayDifference(dates[0].startDate, dates[0].endDate)

  const handleOpen = (i) => {
    setSlideIndex(i)
    setOpen(true)
  };

  const handleMove = (direction) => {
    let newSlideNumber;
    if (direction === "l") {
      newSlideNumber = slideIndex === 0 ? 5 : slideIndex - 1;
     
    } else {
      newSlideNumber = slideIndex  === 5 ? 0 : slideIndex + 1;
    }
    setSlideIndex(newSlideNumber);
  }

  const handleClick = () => {
    if(user) {
      setOpenModel(true)
    } else {
      navigate('/login')
    }
  }

  return (
    <div>
      <Navbar />
      <Header type='list' />
      {loading ? (
        "loading..."
      ) : (
        <div className="hotelContainer">  
      {open && <div className="slider">
      <FontAwesomeIcon onAuxClick={()=> setOpen(false)} icon={faCircleXmark} className='close' />
      <FontAwesomeIcon icon={faCircleArrowLeft} className='arrow' onClick={()=>handleMove("l")} />
      <div className="sliderWrapper" >
        <img src={data.photos[slideIndex]} alt="" className="sliderImg" />
      </div>
      <FontAwesomeIcon icon={faCircleArrowRight} className="arrow" onClick={()=>handleMove("r")} /> 
      </div>    }
      <div className="hotelWrapper">
        <button className="bookNow">
          Reserve or Book Now!
        </button>

        <h1 className="hotelTitle">{data.name}</h1>
        <div className="hotelAddress">
          <FontAwesomeIcon icon={faLocationDot} />
          <span className="hotelAddressText"> {data.address}</span>
        </div>
        <span className="hotelDistance">Excellent location -{data.distance}m from center</span>
      <span className="hotelPriceHighLight">
        Book a story over ${data.cheapestPrice} at this propertyu and get a free airport taxi
      </span>
      <div className="hotelImages">
        {data.photos?.map((img, i) => (
         <div className="hotelImgWrapper">
          <img onClick={()=>handleOpen(i)} src={img} alt="" className='hotelImg' />
         </div>
        ))}
      </div>

      <div className="hotelDetails">
        <div className="hotelDetailsTexts">
          <h1 className="hotelTitle">{data.title}</h1>
          <p className="hotelDesc">
         {data.descr}
          </p>
       </div>
...   <div className="hotelDetailsPrice">
          <h1>Perfect for a {days}-night stay</h1>
          <span>Located in the real heart of krakow, this property has an excellent location score of 9.8</span>
          <h2><b>${days * data.cheapestPrice * options.room }</b>({days})</h2>
          <button onClick={handleClick}
           className="hotelButton">Reserve or Book Now</button>
      </div>
      </div>
      </div>
      <MailList />
      <footer />
      </div>
      )}
      {openModel && <Reserve setOpen={setOpenModel} hotelId={id} />}
    </div>
  )
}

export default Hotel