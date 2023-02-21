import React, {useEffect, useState, useRef } from 'react'
import Maps from './Maps'
import Details from './Details';
import Reviews from './Reviews';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function DetailsCard(props) {
    const [details, setDetails] = useState({})


    useEffect(() => {
        fetch(`https://backend-dot-hw8-yelp-react.wl.r.appspot.com/details?id=${props.id}`)
        .then(response => response.json())
        .then(response => setDetails(response))
    }, [props.id])

    if(details.name){
        return (
            <div id="business-card" className="mx-auto rounded-4" style={{
                    width: '70vw',
                    backgroundColor: 'white',
                }}>
                <div className='mx-auto'>
                <div style={{marginLeft: "10px", marginBottom: "0px"}} onClick={() => props.setBack(false)}>
                    <i className="fa fa-arrow-left" style={{fontSize: "20px", cursor: "pointer"}}></i>
                </div>
                <h2 className='text-center '>{details.name}</h2>
                <Tabs
                    className='navbar navbar-dark bg-warning'
                    defaultActiveKey="details"
                    id="fill-tab-example"
                    fill
                    style={{color: "black", textDecoration:"none"}}
                    animation="true"
                    activestyle={{border: "2px solid black"}}
                    >
                    <Tab eventKey="details" title="Business details" style={{border: 'None'}}>
                        <Details details={details}/>
                    </Tab>
                    <Tab eventKey="maps" title="Map location" style={{border: 'None'}}>
                        <Maps details={details}/>
                    </Tab>
                    <Tab eventKey="reviews" title="Reviews" style={{border: 'None'}}>
                        <Reviews id={details.id} />
                    </Tab>
                </Tabs>
                </div>
            </div>
        )
    }
    else{

    }
}

export default DetailsCard