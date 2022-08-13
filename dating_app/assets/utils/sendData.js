import getCookie from "./CSRFToken"
let csrftoken = getCookie('csrftoken')

console.log(window.location.port)

const getData = async () => {
    try {
        const getC = await fetch('get_cookie')

        if (getC.ok) {
            const data = await getC.json()
            csrftoken = data.cookie
        }
    }

    catch (error) {
        console.log(error)
    }

}

if (window.location.port === '8080') {
    getData()
}


const sendData = async (data, page) => {
    console.log(csrftoken)
    const returnData = await fetch(page, {
        method: "POST",
        headers: {
            "Content-type": 'application/json',
            'X-CSRFToken': csrftoken
        },
        //mode: same-origin, cors, no-cors
        mode: "cors",
        body: JSON.stringify(data)
    })

    return returnData
}


export default sendData