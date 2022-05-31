import React, { useState } from 'react';
function AddMarkForm(){

    const [newMark, setNewMark]=useState({ name:"T3", id:3, lat:60, lng:30 });

    const changeInputData=(e)=>{
        setNewMark({...newMark, [e.target.name]: e.target.value});
    }


    return(
        <form action="http://localhost:4000/api/marklist" method="post">
            <input placeholder="Name" type="text" name="name" onChange={changeInputData} /><br/>
            <input placeholder="Id"   type="text" name="id"   onChange={changeInputData} /><br/>
            <input placeholder="lat"  type="text" name="lat"  onChange={changeInputData} /><br/>
            <input placeholder="lng"  type="text" name="lng"  onChange={changeInputData} /><br/>
            <button type="submit" > Add mark </button>
        </form>
    )
}

export default AddMarkForm;
