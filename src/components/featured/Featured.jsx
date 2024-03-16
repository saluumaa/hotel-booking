import useFetch from "../../hooks/useFetch"
import "./featured.css"

const Featured = () => {
   const  {data, loading, error} = useFetch("/hotels/countbyCity?cities=borama,hargeisa,berbera")
   
  return (
    <div className="featured">
    {loading? (
      "loading please wait" 
    ) : (
    <>
    <div className="featuredItem">
        <img src="https://images.unsplash.com/photo-1625244724120-1fd1d34d00f6?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aG90ZWxzfGVufDB8fDB8fHww" alt="" className="featuredImg" />
         <div className="featuredTitles">
            <h1>Borama</h1>
            <h2>{data[0]} properties</h2>
         </div>
     </div>
     <div className="featuredItem">
        <img src="https://plus.unsplash.com/premium_photo-1677626376813-1ea652d15288?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8aG90ZWxzfGVufDB8fDB8fHww" alt="" className="featuredImg" />
         <div className="featuredTitles">
            <h1>Hargeisa</h1>
            <h2>{data[1]} properties</h2>
         </div>
     </div>
     <div className="featuredItem">
        <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8aG90ZWxzfGVufDB8fDB8fHww" alt="" className="featuredImg" />
         <div className="featuredTitles">
            <h1>Berbera</h1>
            <h2>{data[2]} properties</h2>
         </div>
     </div>
     </>
     )}
        
    </div>
  )
}

export default Featured