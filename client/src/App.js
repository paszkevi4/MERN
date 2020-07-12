import React from 'react'
import { BrowserRouter } from 'react-router-dom'

import { Navbar } from './components/Navbar'
import { AuthContext } from './context/AuthContext'
import { useRoutes } from './routes'
import { useAuth } from './hooks/auth.hook'

function App() {
    const { token, login, logout, userId } = useAuth()
    const isAuth = !!token
    const routes = useRoutes( isAuth )
    return (
        <AuthContext.Provider value={{ token, login, logout, userId, isAuth }}>
            <BrowserRouter>
                { isAuth && <Navbar />}
                <div className="container">
                    { routes }
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
    )
}

export default App;
