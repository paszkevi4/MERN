import { createContext } from 'react'

function noop() {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    loggin: noop,
    loggout: noop,
    isAuth: false,
})