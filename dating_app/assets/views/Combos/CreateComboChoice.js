import React from "react";

export default ({ handleClick, isComplete, handleReturn }) => {

    return (
        <>
            <div className="row flex-column my-auto">
                {
                    <>
                        {
                            isComplete ?
                                <>
                                    <h1 className="text-center mb-5 text-muted">Your COMBO is setup!</h1>

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
                        <button id="profile" type="button" className="btn btn-success col-8 col-md-4 mx-auto my-5 fs-2" onClick={handleReturn}>
                            Return
                        </button>

                    </>
                }

            </div>
        </>

    )
}