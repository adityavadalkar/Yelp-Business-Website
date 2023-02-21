import React, { useEffect, useState } from 'react'

function Results(props) {
  let [businesses, setBusinesses] = useState([])
  let [details, setDetails] = useState([])
  const searchDetails = props.details

  useEffect(() => {
    fetch(`https://backend-dot-hw8-yelp-react.wl.r.appspot.com/results?term=${searchDetails.keyword}&location=${searchDetails.location}&category=${searchDetails.category}&distance=${searchDetails.distance}`)
    .then(response => response.json())
    .then(response => setBusinesses(response.businesses))
  }, [])

  function handleClick(id){
    props.setBack(true)
    props.getId(id)
  }
  if(!(businesses.length===0)){
    return (
      <div id="results-card" className='' style={{
        display: 'flex',   
    }}>
        <table className='table table-striped rounded-3' style={{
              height: 'auto',
              width: '70vw',
              backgroundColor: '#fff',
              marginLeft: "auto",
              marginRight: "auto",
          }}>
          <thead>
          <tr>
              <th className="text-center" scope="col">No.</th>
              <th className="text-center" scope="col">Image</th>
              <th className="text-center" scope="col" style={{cursor: "pointer"}} >Business Name</th>
              <th className="text-center" scope="col" style={{cursor: "pointer"}} >Rating</th>
              <th className="text-center" scope="col" style={{cursor: "pointer"}} >Distance (miles)</th>
          </tr>
          </thead>
          <tbody>
              {
              businesses.map((business, i) => (
                <tr scope="row" key={i}>
                  <td className="text-center"><b>{i+1}</b></td>
                  <td><img src={business.image_url} className="img-thumbnail" onClick={() => props.getId(business.id)} style={{height: "100px", width:"100px", cursor: "pointer"}}/></td>
                  <td className="text-center" onClick={() => handleClick(business.id)} style={{cursor: "pointer",}}>{business.name}</td>
                  <td className="text-center">{business.rating}</td>
                  <td className="text-center">{(parseInt(business.distance)/1609).toFixed(2)}</td>
                </tr>
              ))
              }
          </tbody>
        </table>
      </div>
    )
  }
  else{
    return(
      <div id="results-card" style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',      
    }}>
      <p className='text-danger bg-light px-3 rounded'>No results found</p>
    </div>
    )
  }
}

export default Results