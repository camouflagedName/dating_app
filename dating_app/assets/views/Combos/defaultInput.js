export const defaultInput = {
    allData: {
        question1: {
            content: "What is your favorite type of movie?",
            answerData: {
                answer1: "Romance",
                answer2: "Comedy",
                answer3: "Horror",
            }
        },
        question2: {
            content: "What is your favorite time of day?",
            answerData: {
                answer1: "Morning",
                answer2: "Afternoon",
                answer3: "Night",
            }
        },
        question3: {
            content: "Where is your favorite place to go on a first date?",
            answerData: {
                answer1: "Bar",
                answer2: "Movies",
                answer3: "Restaurant",
            }
        },
        question4: {
            content: "How many pets do you have or want to have?",
            answerData: {
                answer1: "0",
                answer2: "1",
                answer3: "Many",
            }
        },
        question5: {
            content: "How do you like to spend your free time?",
            answerData: {
                answer1: "Reading",
                answer2: "Exercising",
                answer3: "Playing a game",
            }
        }
    }
}

export const templateInput = {
    allData: {
        question1: {
            content: "",
            answerData: {
                answer1: "",
                answer2: "",
                answer3: "",
            }
        },
        question2: {
            content: "",
            answerData: {
                answer1: "",
                answer2: "",
                answer3: "",
            }
        },
        question3: {
            content: "",
            answerData: {
                answer1: "",
                answer2: "",
                answer3: "",
            }
        },
        question4: {
            content: "",
            answerData: {
                answer1: "",
                answer2: "",
                answer3: "",
            }
        },
        question5: {
            content: "",
            answerData: {
                answer1: "",
                answer2: "",
                answer3: "",
            }
        }
    }
}

export const ComboConstructor = (data, visible) => {
    let isCorrect
    let allData
    let answerData

    for (const entry of data) {
        for (const answer of entry.answers) {
            if (visible) {
                if (answer.is_correct === true) {
                    isCorrect = `${entry.name}-${answer.name}`
                }
            }
            answerData = {
                ...answerData,
                [answer.name]: answer.content
            }
        }

        allData = {
            ...allData,
            [entry.name]: {
                content: entry.content,
                correct_answer: isCorrect,
                answerData
            }
        }

    }

    return { allData }
}