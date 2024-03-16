import './mailList.css'

const MailList = () => {
  return (
    <div className='mail'>
        <h1 className="mailTitle">Save time, save money</h1>
        <span className="mailDesc">sign up and we'll send you the best deal</span>
        <div className="mailInputContainer">
            <input type="text" placeholder='your Email' />
            <button>Subscribe</button>
        </div>
    </div>
  )
}

export default MailList