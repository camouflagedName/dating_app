import React from "react";

export const CreateComboMain = () => {

    const handleClick = (event) => {
        if (event.target.id === "create") {
            //set page to create combo
        }

        else {
            //create a default combo
        }

    }

    return (
        <div className="row flex-column">
            <button id="create" type="button" className="btn btn-primary col-4 mx-auto my-5" onClick={handleClick}>
                Create Combo
            </button>
            <button id="default" type="button" className="btn btn-primary col-4 mx-auto my-5" onClick={handleClick}>
                Use Default
            </button>
        </div>
    )
}