import React, {useEffect, useState} from 'react'
import Search from './Search'
import Results from './Results'
import DetailsCard from './DetailsCard'

function SearchPage() {
    let [search, setSearch] = useState({})
    let [business, setBusiness] = useState('')
    let [bookings, setBookings] = useState([{}])
    let [back, setBack] = useState(false)
    let [toggle, setToggle] = useState(false)
    return (
    <div>
        <Search getSearch={setSearch} setBookings={setBookings} setBack={setBack} setToggle={setToggle}/>
        {(() => {
            if(toggle){
                return <div></div>
            }
            else{
                    if(!back){
                    {
                        if (search.keyword) {
                        return <Results details={search} getId={setBusiness} setBack={setBack}/>
                        }
                    }
                    }
                    else {
                    {
                        if (business) {
                        return <DetailsCard id={business} setbookings={setBookings} setBack={setBack}/>
                        }
                    }
                    }
            }
        })()}
    </div>
    )
}

export default SearchPage