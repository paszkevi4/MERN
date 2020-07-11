import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

import {Login} from './components/Login'
import {Create} from './components/CreatePage'
import {Detail} from './components/DetailPage'
import {Links} from './components/LinksPage'

export const useRoutes = ( isAuth ) => {
    if ( isAuth ) {
        return (
            <Switch>
                <Route path='/links' exact><Links /></Route>
                <Route path='/create' exact><Create /></Route>
                <Route path='/detail/:id?'><Detail /></Route>
                <Redirect to='/create' />
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path='/' exact><Login /></Route>
            <Redirect to='/' />
        </Switch>
    )
}