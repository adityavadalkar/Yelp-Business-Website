import {React, useEffect, useState} from 'react'

function Reviews(props) {
    const [reviews, setReviews] = useState([{}])

    useEffect(() => {
        fetch(`https://backend-dot-hw8-yelp-react.wl.r.appspot.com/reviews?id=${props.id}`)
        .then(response => response.json())
        .then(response => setReviews(response.reviews))
    }, [])
    if(reviews[0].id){
        return (
            <div>
                <table className='table table-striped rounded-3' style={{
                    height: 'auto',
                    width: '100%',
                    backgroundColor: '#fff',
                }}>
                <thead>
                </thead>
                <tbody>
                    {
                    reviews.map((review, i) => (
                    <tr scope="row" key={i}>
                        <td>
                            <p><strong>{review.user.name}</strong></p>
                            <p>Rating: {review.rating}/5</p>
                            <p>{review.text}</p>
                            <p>{review.time_created.slice(0, 11)}</p>
                        </td>
                    </tr>
                    ))
                    }
                </tbody>
            </table>
            </div>
        )
    }
}

export default Reviews