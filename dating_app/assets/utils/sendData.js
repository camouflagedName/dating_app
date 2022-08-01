import getCookie from "./CSRFToken"
const csrftoken = getCookie('csrftoken');

const sendData = async(data, page) => {
    const returnData = await fetch(page, {
        method: "POST",
        headers: {
            "Content-type": 'application/json',
            'X-CSRFToken': csrftoken
        },
        mode: "same-origin",
        body: JSON.stringify(data)
    })

    return returnData
}

export default sendData