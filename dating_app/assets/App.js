import React from 'react'
//LoginMain
//Register New
//Returning User

//AppMain
//NavBar
//Dashboard
//Profile
//Message
//Puzzle
import LoginMain from './views/LoginMain/LoginMain'
import AppMain from './views/AppMain/AppMain'
import { useState, useEffect } from 'react'

const App = () => {
    const [login, setLogin] = useState({activated: false, id: null})

    return (
        <div className='container-fluid'>
            <div className='row'>
                {
                    login.activated === false
                        ? <LoginMain login={setLogin} />
                        : <AppMain id={login.id} />
                }

            </div>
        </div>

    )
}

export default App