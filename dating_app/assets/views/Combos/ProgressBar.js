import React, { useEffect, useState } from "react"
export default props => {
    const [progPercent, setProgPercent] = useState()

    useEffect(() => {
        setProgPercent((props.count / 5) * 100)
    }, [props.count])

    return (
        <div className="progress" style={{ height: "6%", marginBottom: "100px", marginLeft: "100px", marginRight: "100px" }}>
            <div className="progress-bar bg-success fs-5" role="progressbar" style={{ width: `${progPercent}%`}} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    )
}

/*

            <div className="progress-bar bg-transparent fs-5 text-black" role="progressbar" style={{ width: "20%" }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Q2</div>
            <div className="progress-bar bg-transparent fs-5 text-black" role="progressbar" style={{ width: "20%" }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Q3</div>
            <div className="progress-bar bg-transparent fs-5 text-black" role="progressbar" style={{ width: "20%" }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Q4</div>
            <div className="progress-bar bg-transparent fs-5 text-black" role="progressbar" style={{ width: "20%" }} aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">Q5</div>

*/