import React, {useState} from "react"

const PicCarousel = (props) => {
    const [randomUser, setRandomUser] = useState(null)

    const getRandomUser = () => {
        try {
            const fetchData = fetch(`get_random_user/${props.userID}`)

            /*
            if (fetchData.ok) {
                const userData = fetchData.json()  //userData will be an array of 2 arrays
            }
            */
        }
        
        catch (error) {
            console.log(error)
        }
    }

    const handleClick = () => {
        getRandomUser()
    }

    return (
        <div id="imageCarousel" className="carousel slide col-sm-8 offset-sm-2 col-md-6 offset-md-3 col-xl-4 offset-xl-4" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#imageCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active bg-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                    </svg>
                    <div className="carousel-caption d-block">
                        <h1>User Name</h1>
                        <p>Some data and symbols</p>
                    </div>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#imageCarousel" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#imageCarousel" data-bs-slide="next" onClick={handleClick}>
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default PicCarousel