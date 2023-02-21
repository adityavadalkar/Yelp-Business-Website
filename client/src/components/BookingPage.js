import {React, useState, useEffect} from 'react'

function BookingPage(props) {
    const [bookings, setBookings] = useState([])
    let [data, setData] = useState([{}])
    
    useEffect(() => {
        try{
            let books = JSON.parse(localStorage.getItem("bookings"))
            setData(books)
            let arr = []
            for (var key in books) {                
                for(var key1 in books[key]){
                    arr.push(books[key][key1])
                }
            }
            setBookings(arr)
        }
        catch(err){
            console.log("length updated")
        }
        
    }, [localStorage.getItem('len')])

    function handleDelete(e, id) {
        let dataNew = data
        if(bookings.length===0){
            setBookings([]);
        }
        for(var i in bookings){
            if(bookings[i].id==id){
                setBookings(bookings.splice(i, 1))
                dataNew.splice(i,1)
            }
        }
        localStorage.setItem('len', bookings.length)
        localStorage.setItem('bookings', JSON.stringify(dataNew))
        alert("Reservation cancelled!")
    }
        
    return (

        <div style={{height: "100vh", width:"100%"}}>
            {console.log(localStorage)}
            {(() => {
                if(!(bookings.length===0)){
                    return(
                    <table className='mx-auto table rounded-3' style={{
                        height: 'auto',
                        width: '60%',
                        backgroundColor: '#fff',
                    }}>
                    <thead>
                    <tr>
                        <th className="text-center" scope="col">#</th>
                        <th className="text-center" scope="col">Business Name</th>
                        <th className="text-center" scope="col" >Date</th>
                        <th className="text-center" scope="col" >Time</th>
                        <th className="text-center" scope="col" >E-mail</th>
                        <th className="text-center" scope="col" ></th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map((booking, i) => (
                        <tr scope="row" key={i} id="booking-table">
                            <td className="text-center"><b>{i+1}</b></td>
                            <td className='text-center'>{booking.name}</td>
                            <td className="text-center">{booking.date}</td>
                            <td className="text-center">{booking.hours}:{booking.mins}</td>
                            <td className="text-center">{booking.email}</td>
                            <td className="text-center"><i className="fa fa-trash-o" style={{fontSize:"24px", cursor: "pointer"}} onClick={event => handleDelete(event, booking.id)}></i></td>
                        </tr>
                    ))}
                    </tbody>
                  </table>)
                }
                else {
                    return(
                    <div className="mx-auto mt-5" style={{height: "100vh", width: "300px"}}>
                        <h4 className="text-center text-danger bg-light px-3 rounded">No Records found</h4>
                    </div> )    
                }
            })()}
        </div>
        )
}

export default BookingPage