import React from "react";

export const NavButtonLayout = ({setCount, handleSubmit, count, showSubmit}) => {

    return (
        <div className="row">
            <div className="col">
                {
                    count === 1 ||

                    <button id="left-btn" type="button" className="btn btn-secondary" onClick={() => setCount(prev => --prev)}>
                        <i className="bi bi-caret-left-fill fs-1"></i>
                    </button>
                }
            </div>
            <div className="col m-auto text-center">
                {
                    showSubmit !== 5 ||

                    <button id="right-btn" type="button" className="btn btn-primary" onClick={handleSubmit}>
                        <h2 className="m-0">SUBMIT</h2>
                    </button>
                }
            </div>
            <div className="col text-end">
                {
                    count === 5 ||

                    <button id="right-btn" type="button" className="btn btn-secondary" onClick={() => setCount(prev => ++prev)}>
                        <i className="bi bi-caret-right-fill fs-1"></i>
                    </button>
                }
            </div>
        </div>
    )
}