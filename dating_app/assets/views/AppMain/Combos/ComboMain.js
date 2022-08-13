import React from "react"
import { ComboCard } from "./ComboCard"

//on load, fetch combo data

export const Combos = () => {
    return (
        <div className="container">
            <div className="mb-5">
                <ComboCard title={"In Progress..."}/>
            </div>
            <div className="mt-5">
                <ComboCard title={"Completed"}/>
            </div>
        </div>
    )
}