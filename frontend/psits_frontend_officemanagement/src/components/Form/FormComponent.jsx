import React, { useState } from 'react'

function FormComponent({onSubmit}) {
    const [rfid, setRfid] = useState('');
    const [password, setPassword] = useState('');

    function handleInput(e){
        if(e.target.id === 'rfid'){
            setRfid(e.target.value);
        }
        if(e.target.id === 'password'){
            setPassword(e.target.value);
        }
    }

    function handleSubmit(e){
        e.payload = {
            rfid, password
        }
        setPassword('')
        onSubmit(e);
    }
    return (
        <>
            <div className='form-container'>
                <form className="form center-abs">
                    <p className="form-title">Welcome to Office Management</p>
                        <div className="input-container">
                            <label>RFID</label>
                            <input id='rfid' type="text" placeholder="Enter RFID / Tap ID" value={rfid} onInput={handleInput} />
                            <span>
                            </span>
                        </div>
                        <div className="input-container">
                            <label>Password</label>
                            <input id='password' type="password" placeholder="Enter password" value={password} onInput={handleInput} />
                            </div>
                            <button type="button" className="submit" onClick={handleSubmit}>
                                Sign in
                            </button>

                        <p className="signup-link">
                            Forgot password?
                            <a href="">Reset Password</a>
                        </p>
                </form>
            </div>
        </>
    )
}

export default FormComponent