import getCookie from "./CSRFToken"

if (window.location.port === '8080') {
    //getCustomCookie()
}

const sendData = async (data, page, formData) => {
    const csrftoken = getCookie('csrftoken')
    const content = formData ? '' : {'content-type':'application/json'}
    const body = formData ? data : JSON.stringify(data)

    const returnData = await fetch(page, {
        method: "POST",
        headers: {
            'X-CSRFToken': csrftoken,
            content
        },
        
        mode: "same-origin",
        body: body
    })

    return returnData
}

export default sendData