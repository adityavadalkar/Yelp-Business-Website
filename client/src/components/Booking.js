import React, {useEffect, useState} from 'react'
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Booking(props) {
    const details = props.details
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = (event) => {
        if(event.target.value=="primary"){
            let data = JSON.parse(localStorage.getItem("bookings"))
            let arr = []
            for (var key in data) {                
                for(var key1 in data[key]){
                    if(key1==details.id){
                        continue
                    }
                    arr.push({[details.id]: data[key][key1]})
                }
            }        
            localStorage.setItem('len', arr.length)
            localStorage.setItem('bookings', JSON.stringify(arr))
            setButton(values => ({...values, color: "danger"}))
            setButton(values => ({...values, text: "Reserve Now"}))
            alert("Reservation cancelled!")
        }
        else{
            setShow(true)
        }
    };
    const [validated, setValidated] = useState(false);
    const [bookings, setBookings] = useState({"name": details.name, "id": details.id})
    const [button, setButton] = useState({color: 'danger', text: "Reserve Now"})

    useEffect(() => {
        try{
            var books = JSON.parse(localStorage.getItem("bookings"))
            for(var key in books){
                for(var key1 in books[key]){
                    if(key1==details.id){
                        setButton(values => ({...values, color: "primary"}))
                        setButton(values => ({...values, text: "Cancel reservation"}))
                    }
                }
            }
        }
        catch(err){
            console.log("length updated")
        }
        
    }, [])
    

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        else {
            event.preventDefault();
            var book = {[details.id]: bookings}
            var books;
            try{
                books = JSON.parse(localStorage.getItem('bookings'))
                books.push(book)
                localStorage.setItem('bookings', JSON.stringify(books))
                localStorage.setItem('len', books.length)
            }
            catch(err){
                localStorage.setItem('bookings', JSON.stringify([ book ]))
                localStorage.setItem('len', 1)
            }
            
            alert("Reservation created!")
            setShow(false)
            setButton(values => ({...values, color: "primary"}))
            setButton(values => ({...values, text: "Cancel reservation"}))
        }
        setValidated(true)
      };
    
    
    function handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        setBookings(values => ({...values, [name]: value}))
    }

  return (
    <div> 
        <div className='row'>
            <div className='col text-center'>
                <Button variant={button.color} onClick={handleShow} value={button.color}>
                    {button.text}
                </Button>
                {/* taken from react-bootstrap documentation */}
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header>
                    <Modal.Title>Reservation form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                    <h4 className='text-center'>{details.name}</h4>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control name="email" type="email" placeholder="Enter email" onChange={handleChange} required/>
                            <Form.Control.Feedback type="invalid">{(() => {
                                if(bookings.email==undefined){
                                    return "Email is required"
                                }
                                else{
                                    return "Email must be a valid email address"
                                }
                            })()}</Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formDate">
                            <Form.Label>Date</Form.Label>
                            <Form.Control name="date"  type="date" placeholder="date" min={(() => {
                                const date = new Date()
                                return date.toISOString().split('T')[0]})()} onChange={handleChange} required/>
                            <Form.Control.Feedback type="invalid">Date is required</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="time">
                            <Form.Label>Time</Form.Label>
                            <Form.Group className="mb-3 w-50 d-flex" controlId="time">
                                <Form.Select id="hours" name="hours" aria-label="Default select example" onChange={handleChange} required>
                                    <option hidden></option>
                                    <option value="10">10</option>
                                    <option value="11">11</option>
                                    <option value="12">12</option>
                                    <option value="13">13</option>
                                    <option value="14">14</option>
                                    <option value="15">15</option>
                                    <option value="16">16</option>
                                    <option value="17">17</option>
                                </Form.Select>
                                &nbsp;:&nbsp;
                                <Form.Select  id="mins" name="mins" aria-label="Default select example" onChange={handleChange} required>
                                    <option hidden></option>
                                    <option value="00">00</option>
                                    <option value="15">15</option>
                                    <option value="30">30</option>
                                    <option value="45">45</option>
                                </Form.Select>
                                <i className='far fa-clock mx-2 mt-2' style={{fontSize: "20px"}}></i>
                            </Form.Group>
                        </Form.Group>
                        <Button variant="danger" type="submit" className="d-flex mx-auto">
                            Submit
                        </Button>
                    </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="dark" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
            </Modal>
            </div>
        </div>
    </div>
  )
}

export default Booking