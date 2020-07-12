import React, { useState, useEffect, useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'
import { AuthContext } from '../context/AuthContext'

export const Login = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const { loading, request, error, clearError } = useHttp()

    let [form, setForm] = useState ({
        email: '',
        password: '',
    })

    useEffect( () => {
        message(error)
        clearError()
    }, [error, message, clearError])

    const changeHandler = (event) => {
        setForm ({...form, [event.target.id]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {

        }
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {

        }
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h3 className="center-align"> Short the link </h3>
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
                               onClick={loginHandler}
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