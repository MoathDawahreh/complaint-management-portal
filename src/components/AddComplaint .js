import React from 'react'
import {useState,useEffect } from 'react'
const AddComplaint = ({onAdd}) => {

    const [text,setText] = useState('')
 
    const onSubmit = (e) =>{
        e.preventDefault()
        if(!text){
            alert("Please insert a complmnet")
            return
        }

        // onAdd({text,day,reminder})
        setText('')
 
    }
    return (
        <form className="add-form" onSubmit={onSubmit} > 
            <div className='form-control'>
                 <input type='text' placeholder='Add a complaint ...' value={text} onChange={ (e)=> setText(e.target.value)} /> 

            </div>
            
            <div className='form-control form-control-check'>
 
            </div>

            <input className='btn btn-block' type='submit' value='Add'/>
            
        </form>
    )
}

export default AddComplaint
