import React, { useState, useEffect, useContext } from "react";
import { defaultInput, templateInput, ComboConstructor } from "./defaultInput";
import ProgressBar from "./ProgressBar";
import sendData from "../../utils/sendData";
import { GlobalData } from "../../utils/GlobalData";
import AnswerRow from "./components/AnswerRow";
import { NavButtonLayout } from "./NavButtonsLayout";
import { CustomModal } from "./ComboCompleteModal";
import { CreateOrEditModal } from "./CreateOrEditModal";



export const ComboMain = props => {
    const [input, setInput] = useState(templateInput.allData)
    const [count, setCount] = useState(1)
    const [showSubmit, setShowSubmit] = useState(0)
    const [ansLabel, setAnsLabel] = useState(["Wrong", "Wrong", "Wrong"])
    const [showModalAfterCreating, setShowModalAfterCreating] = useState(false)
    const [showModalAfterSolving, setShowModalAfterSolving] = useState(false)
    const [numCorrect, setNumCorrect] = useState(0)

    const userData = useContext(GlobalData)

    //check if each page is completely filled in
    useEffect(() => {
        if (input) {
            setShowSubmit(0)
            for (const index in input) {
                if (input[index]["content"].length > 0 && input[index].answerData["answer1"].length > 0
                    && input[index].answerData["answer2"].length > 0 && input[index].answerData["answer3"].length > 0
                    && input[index]["correct_answer"]) {
                    setShowSubmit(prev => ++prev)
                }
            }
        }

    }, [input, count])

    //reset radio btns, check data, and update radio btn state
    useEffect(() => {
        const radioBtnArr = document.querySelectorAll("input.form-check-input")
        const radioBtn = document.querySelector(`#${input[`question${count}`]["correct_answer"]}`)

        radioBtnArr.forEach(element => {
            element.checked = false
        });

        if (radioBtn) radioBtn.checked = true

    }, [input, count])

    //get data 
    useEffect(() => {
        const visible = 'visible'
        //console.log(props.default)
        if (props.default === true) {
            setInput(defaultInput.allData)
        }
        else if (props.edit === true) {
            const editInput = new ComboConstructor(props.comboData[0].data, visible)
            setInput(editInput.allData)
        }
        else if (props.solve) {
            const solveInput = new ComboConstructor(props.comboData.data)
            setInput(solveInput.allData)
        }


    }, [props.default, props.edit, userData, props.comboData])


    const handleChange = (evt) => {

        setInput(prev => {
            //handle text changes
            if (evt.target.type === "text") {
                if (evt.target.id.substring(10, evt.target.id.length) === 'content') prev[evt.target.name]["content"] = evt.target.value
                else {
                    const idName = evt.target.id.substring(10, 17)
                    prev[evt.target.name].answerData[idName] = evt.target.value
                }

            }

            //handle radio button changes
            else {
                const ansNumString = evt.target.id.substring(16, 17)
                const ansNum = parseInt(ansNumString, 10)

                setAnsLabel(prev => {
                    prev = ["Wrong", "Wrong", "Wrong"]
                    prev[ansNum - 1] = "Correct"
                    return prev
                })
                prev[evt.target.name]["correct_answer"] = evt.target.id
            }
            return { ...prev }
        })
    }

    const handleSubmit = async () => {
        if (props.solve) {

            try {
                const send = await sendData(input, `solve_combo/${userData.private.id}/${props.comboData.combo_id}`)

                if (send.ok) {
                    const returnData = await send.json()
                    setNumCorrect(parseInt(returnData.num_correct, 10))
                    setShowModalAfterSolving(true)
                }
            }

            catch (error) {
                console.log(error)
            }

        }
        else {
            try {
                const send = await sendData(input, `create_combo/${userData.private.id}`)

                if (send.ok) {
                    const returnData = await send.json()
                    setShowModalAfterCreating(true)
                }
            }

            catch (error) {
                console.log(error)
            }
        }

    }

    //console.log(input)
    return (
        <>
            {
                showModalAfterCreating === false ||
                <CreateOrEditModal setMainPage={props.setMainPage} setReturn={props.setReturn} />
            }
            {
                showModalAfterSolving === false ||
                <CustomModal numberCorrect={numCorrect} comboData={{ username: props.comboData.creator, combo_id: props.comboData.combo_id }} setPage={props.setPage} />
            }
            <h1 className="text-center mb-5 text-muted" style={{fontSize: "75px", marginTop: "100px"}}>{props.solve ? `Complete ${props.comboData.creator}'s` : props.edit === true ? "Edit Your" : "Build Your"} Combo</h1>
            <div className="container mb-5">
                <div className="row my-auto">
                    <div className="col d-flex flex-column">
                        <div className="input-group input-group-lg mb-4">

                            {
                                props.solve ?

                                    <span className="input-group-text col justify-content-center fs-3" id={`question${count}-content`} aria-label={`question-${count}-input`} aria-describedby={`question-${count}-label`}>
                                        {input[`question${count}`]["content"]}
                                    </span>

                                    :
                                    
                                    <>
                                        <span className="input-group-text" id={`question-${count}-input`}>Question {count}</span>
                                        <input
                                            id={`question${count}-content`}
                                            type="text"
                                            name={`question${count}`}
                                            className="form-control"
                                            aria-label={`question-${count}-input`}
                                            aria-describedby={`question-${count}-label`}
                                            value={input[`question${count}`]["content"]}
                                            onChange={handleChange}
                                        />
                                    </>
                            }
                        </div>
                        <div className="col-10 col-lg-6 d-flex flex-column mx-auto">
                            <AnswerRow aCount={1} qCount={count} handleChange={handleChange} input={input} label={ansLabel[0]} solve={props.solve} />
                            <AnswerRow aCount={2} qCount={count} handleChange={handleChange} input={input} label={ansLabel[1]} solve={props.solve} />
                            <AnswerRow aCount={3} qCount={count} handleChange={handleChange} input={input} label={ansLabel[2]} solve={props.solve} />
                        </div>
                    </div>
                </div>
                <NavButtonLayout setCount={setCount} handleSubmit={handleSubmit} count={count} showSubmit={showSubmit} />
            </div>
            <ProgressBar count={count} />
        </>
    )
}