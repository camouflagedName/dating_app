import React from "react";
import { useState, useEffect } from "react";

export const CreateCombo = () => {


    return (
        <>
            <h1 className="text-center">Build Your Combo</h1>
            <div className="container">
                <div className="row my-5">
                    <div className="col col-lg-6 offset-lg-3">
                        <div className="input-group input-group-lg">
                            <span className="input-group-text" id="question-1-label">Question 1</span>
                            <input type="text" className="form-control" aria-label="question-1-input" aria-describedby="question-1-label" />
                        </div>
                        <div className="input-group input-group-lg">
                            <span className="input-group-text" id="answer-1-label">Answer</span>
                            <input type="text" className="form-control" aria-label="answer-1-input-1" aria-describedby="answer-1-label" />
                            <input type="text" className="form-control" aria-label="answer-1-input-2" aria-describedby="answer-1-label" />
                            <input type="text" className="form-control" aria-label="answer-1-input-3" aria-describedby="answer-1-label" />
                            <input type="text" className="form-control" aria-label="answer-1-input-4" aria-describedby="answer-1-label" />
                            <input type="text" className="form-control" aria-label="answer-1-input-5" aria-describedby="answer-1-label" />
                        </div>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col col-lg-6 offset-lg-3">
                        <div className="input-group input-group-lg">
                            <span className="input-group-text" id="question-2-label">Question 2</span>
                            <input type="text" className="form-control" aria-label="question 2 input" aria-describedby="question-2-label" />
                        </div>
                    </div>
                </div>
                <div className="row my-5">
                    <div className="col col-lg-6 offset-lg-3">
                        <div className="input-group input-group-lg">
                            <span className="input-group-text" id="question-3-label">Question 3</span>
                            <input type="text" className="form-control" aria-label="question 3 input" aria-describedby="question-3-label" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}