import getCookie from "./CSRFToken"


console.log(window.location.port)

const getCustomCookie = async () => {
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
    //getCustomCookie()
}

const sendData = async (data, page, formData) => {
    const csrftoken = getCookie('csrftoken')
    console.log("CSRF TOKEN:", csrftoken)
    const content = formData ? '' : {'content-type':'application/json'}
    const body = formData ? data : JSON.stringify(data)
    const returnData = await fetch(page, {
        method: "POST",
        headers: {
            'X-CSRFToken': csrftoken,
            content
        },
        //mode: same-origin, cors, no-cors
        
        mode: "same-origin",
        body: body
    })

    return returnData
}

const getData = async (page) => {
    
}


export default sendData