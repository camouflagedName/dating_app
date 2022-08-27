import React from "react";

export default ({ handleClick, isComplete }) => {
    return (
        <>
            <div className="row flex-column">
                {
                    isComplete ?
                        <>
                            <div className="row text-center mb-5">
                                <h1>Your COMBO is setup!</h1>
                            </div>
                            <button id="edit" type="button" className="btn btn-primary col-8 col-md-4 mx-auto my-5 fs-2" onClick={handleClick}>
                                Edit Combo
                            </button>
                        </>
                        :
                        <>
                            <button id="create" type="button" className="btn btn-primary col-8 col-md-4 mx-auto my-5 fs-2" onClick={handleClick}>
                                Create Combo
                            </button>
                            <button id="default" type="button" className="btn btn-primary col-8 col-md-4 mx-auto my-5 fs-2" onClick={handleClick}>
                                Use Default
                            </button>
                        </>
                }

            </div>
        </>

    )
}