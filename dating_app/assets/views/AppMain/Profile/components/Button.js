import React, { useEffect, useState } from "react";

export const CustomButton = ({label, handleClick, colorProp}) => {
    const [color, setColor] = useState('primary')

    useEffect(() => {
        if (colorProp) setColor(colorProp)
    })

    return (
        <div className="row mt-4">
            <div className="d-flex col justify-content-center">
                <button type="button" className={`btn btn-${color} fs-4`} onClick={handleClick}>{label}</button>
            </div>
        </div>
    )
}