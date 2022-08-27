import React, { useEffect, useState } from "react";


export default ({ qCount, aCount, handleChange, input, label, solve }) => {
    const [state, setState] = useState(false)

    useEffect(() => {
        if (input[`question${qCount}`].answerData) {
            setState(true)
        }
    })

    return (
        <>
            {
                state === false ||
                <div className="input-group input-group-lg my-3">

                    {
                        solve ?

                            <div className="col">
                                <span className="input-group-text fs-3 d-flex" id="answer-${aCount}-label">
                                    <input
                                        id={`question${qCount}-answer${aCount}`}
                                        type="radio" name={`question${qCount}`}
                                        className="form-check-input me-2 my-0"
                                        aria-label="Radio button for correct answer" onChange={handleChange}
                                    />
                                    <span className="mx-auto">
                                        {input[`question${qCount}`].answerData[`answer${aCount}`]}
                                    </span>
                                </span>
                            </div>

                            :

                            <>
                                <span className="input-group-text" id="answer-${aCount}-label">
                                    <input
                                        id={`question${qCount}-answer${aCount}`}
                                        type="radio" name={`question${qCount}`}
                                        className="form-check-input me-2 my-0"
                                        aria-label="Radio button for correct answer" onChange={handleChange}
                                    />
                                    Answer
                                </span>
                                <input
                                    id={`question${qCount}-answer${aCount}-input`}
                                    type="text"
                                    name={`question${qCount}`}
                                    className="form-control"
                                    aria-label={`answer-${aCount}-input`}
                                    aria-describedby={`answer-${aCount}-label`}
                                    value={input[`question${qCount}`].answerData[`answer${aCount}`]}
                                    onChange={handleChange}
                                />
                            </>
                    }
                </div>
            }
        </>
    )
}