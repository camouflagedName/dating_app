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
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    return (
        <div className='container-fluid'>
            <div className='row'>
                {
                    isLoggedIn === false
                    ? <LoginMain login={setIsLoggedIn} />
                    : <AppMain />
                }
                
            </div>
        </div>

    )
}

export default App