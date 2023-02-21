import React, { useState } from 'react'
import axios from 'axios'

function Search(props) {
    const [text, setText] = useState('') 
    const [suggestions, setSuggestions] = useState([])
    const [inputs, setInputs] = useState({category: "all", location: "", distance: "10", checked: false})

    var categories = []
    async function handleChange(value) {
        setText(value)
        if(value.length>1){
            var response = await fetch(`https://backend-dot-hw8-yelp-react.wl.r.appspot.com/auto?text=${text}`).then(response => response.json())
            response.categories.forEach(({title}) => categories.push(title))
            response.terms.forEach(({text}) => categories.push(text))
            setSuggestions(categories)
        }
        else{
            setSuggestions([])
        }
    }

    const suggestHandler = (text) => {
        setText(text)
        setSuggestions([])
    }

    function clearFields(e) {
        setSuggestions([])
        props.setBookings([{}])
        setText('')
        props.getSearch({})
        props.setToggle(true)
        props.setBack(false)
        setInputs({category: "all", location: "", distance: "10", checked: false})
        document.getElementById("keyword").value = "";
        document.getElementById("distance").value = "10";
        document.getElementById("category").selectedIndex = 0;
        document.getElementById("location").value = "";
        document.getElementById("location").disabled = false;
        document.getElementById("box").checked = false;
    }

    const submitChange = (event) => {
        if(event.target.value.length>0){
            const name = event.target.name;
            const value = event.target.value;
            setInputs(values => ({...values, [name]: value}))
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        var response;
        props.setToggle(false)
        props.setBack(false)
        props.getSearch({})
        let searchTerms = ({...inputs, keyword: text})
        if(inputs.checked){
            response = await axios.get("https://ipinfo.io/json?token=14601627481175")
            searchTerms = ({...searchTerms, location: response.data.loc})
        }
        else{
            response = await axios.get(`https://backend-dot-hw8-yelp-react.wl.r.appspot.com/geocode?location=${inputs.location}`)
            var location = response.data.results[0].geometry.location
            let temp = String(location.lat) + "," + String(location.lng)
            searchTerms = ({...searchTerms, location: temp})
        }
        props.getSearch(searchTerms)
    }

    function checkBox(e) {
        if(!inputs.checked){
            setInputs(values => ({...values, location: ""}))
        }
        setInputs(values => ({...values, checked: !inputs.checked}))
    }

    return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '94.5vh',
    }}>
            <form className="m-4 px-5 py-3 rounded-3" id="business" onSubmit={ handleSubmit} style={{ 
                    backgroundColor: "white",
                    width: '600px',
                    }}>
                <h3 className="text-center">Business Search</h3>
                <div className='form-group mt-3'>
                    <label htmlFor="keyword">Keyword<span className="text-danger">*</span></label>
                    <input type="text" className='form-control' id="keyword" name="keyword"onChange={ e=>  handleChange(e.target.value)} 
                    autoComplete="off" value={text} onBlur={event => setSuggestions([])} required/>
                    <div className="border" style={{
                        overflowY: "scroll",
                        maxHeight: "100px",
                        width: "32vw",
                        position: "absolute",
                    }}>
                    {suggestions && suggestions.map((suggestion, i) =>
                    <div id="autocomplete" key={i} className="col-md-12 justify-content-md-center"     
                    onMouseDown={() =>suggestHandler(suggestion)}>{suggestion}</div>
                    )}
                    </div>
                </div>
                <div className="form-group row mt-3 ">
                    <div className="form-group col">
                        <label htmlFor="distance">Distance(miles)</label>
                        <input type="text" className='form-control' id="distance" name="distance" onChange={submitChange} defaultValue="10"/>
                    </div>
                    <div className="form-group col">
                        <label htmlFor="category">Category<span className="text-danger">*</span></label>
                        <select id="category" name="category" className='form-control' onChange={submitChange}>
                        <option value="all">Default</option>
                        <option value="arts">Arts & Entertainment</option>
                        <option value="health">Health & Medical</option>
                        <option value="hotelstravel">Hotels & Travel</option>
                        <option value="food">Food</option>
                        <option value="professional">Professional Services</option>
                        </select>
                    </div>
                </div>    
                <div className="form-group mt-3">
                    <label htmlFor="location">Location<span className="text-danger">*</span></label>
                    <input type="text" className='form-control'id="location" disabled={inputs.checked} name="location" value={inputs.location} onChange={submitChange} required/>
                </div>
                <div className="form-group mt-3">
                    <input className="mr-4" type="checkbox" id="box" name="box" onClick={event => checkBox(event)}/>
                    <label htmlFor="vehicle1">Auto-detect my location</label>
                </div>
                <div className="col-md-12 text-center">
                        <button className="m-2 btn btn-danger" id="submit" value="SUBMIT">SUBMIT</button>
                        <button className="btn btn-primary" id="clear" value="CLEAR" onClick={event => clearFields(event)}>CLEAR</button>
                </div>
            </form>
    </div>
  )
}

export default Search