import React from 'react'
import Booking from './Booking';
import Carousel from 'react-bootstrap/Carousel';

function Details(props) {
    const details = props.details

    return (
    <div className='text-center'>
        <div className="form-group row mt-3">
            <div className="form-group col">
                <h5>Address</h5>
                <p>{details.location.display_address.join(" ")}</p>
            </div>
            <div className="form-group col mb-0">
                <h5>Category</h5>
                <p>{(() => {
                    if(details.categories.length==0){
                        return "Not found"
                    }
                    var cat = ''
                    details.categories.map(({title}) => {
                        cat += ' | ' + title
                    })
                    return cat.slice(2)
                })()}</p>
            </div>
        </div>
        <div className="form-group row">
            <div className="form-group col">
                <h5>Phone</h5>
                <p>{details.display_phone || "Not found"}</p>
            </div>
            <div className="form-group col">
                <h5>Price range</h5>
                <p>{details.price || "Not found"}</p>
            </div>
        </div>   
        <div className="form-group row">
            <div className="form-group col">
                <h5>Status</h5>
                {(() => {
                    try{
                        if(details.hours[0].is_open_now){
                            return <p className='text-success'>Open</p>
                        }
                        else if(details.hours[0].is_open_now==false){
                            return <p className='text-danger'>Closed</p>
                        }
                    }
                    catch(err) {
                        return <p>Not found</p>
                    }                
                })()}
            </div>
            <div className="form-group col">
                <h5>Visit yelp for more</h5>
                <p><a href={details.url || "Not found"} target="_blank">Business link</a></p>
            </div>
        </div>
        <Booking details={details}/>
        <div className='row'>
            <div className='col text-center'>
                {/* icons taken from icons8.com */}
            <p>Share on: <span><a href={(() => {
                var open = 'https://twitter.com/intent/tweet?text=Check%20'+details.name+'%20on%20Yelp.%0A'+details.url
                return open
            })()} target="_blank">
            <img src="/twitter.png" style={{width: '25px', height: "25px"}}></img></a></span>
            <span><a href={`http://www.facebook.com/share.php?u=${details.url}`} target="_blank"><img src="/facebook.png" style={{width: '25px', height: "25px"}}></img></a></span></p>
            </div>
        </div>
        <Carousel variant="dark" indicators={false} interval={10000} >
            <Carousel.Item style={{border: 'None'}}>
                <img
                className="d-block w-45 mx-auto mb-4"
                src={details.photos[0]}
                alt="First slide"
                style={{height: "300px"}}
                />
            </Carousel.Item>
            <Carousel.Item style={{border: 'None'}}>
                <img
                className="d-block w-45 mx-auto mb-4"
                src={details.photos[1]}
                alt="Second slide"
                style={{height: "300px"}}
                />

            </Carousel.Item>
            <Carousel.Item style={{border: 'None'}}>
                <img
                className="d-block w-45 mx-auto mb-4"
                src={details.photos[2]}
                alt="Third slide"
                style={{height: "300px"}}
                />
            </Carousel.Item>
        </Carousel>
    </div>
  )
}

export default Details