import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'

export const Login = () => {

    const {loading, request, error} = useHttp()

    let [form, setForm] = useState ({
        email: '',
        password: '',
    })

    useEffect( () => {

    }, [error])

    const changeHandler = (event) => {
        setForm ({...form, [event.target.id]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('Data', data)
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h1> Short the link </h1>
                <div className="card">
                    <div className="card-content">
                        <span className="card-title center-align">Login</span>
                        <div>
                            <div className="input-field">
                                <input id="email" type="email" className="validate" onChange={changeHandler}></input>
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input id="password" type="password" className="validate" onChange={changeHandler}></input>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <div className="row">
                            <a className="waves-effect waves-light btn light-green col s8 offset-s2"
                               disabled={loading} >Login
                            </a>
                            <a className="waves-effect btn-flat grey-text center-align col s8 offset-s2"
                               onClick={registerHandler}
                               disabled={loading} >Registration
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}