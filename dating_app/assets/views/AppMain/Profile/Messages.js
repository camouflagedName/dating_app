import React from "react";
import { CustomListGroup } from "./components/ListGroup";

export const Messages = () => {

    const entry = [{title: "Michael", data: "Message Title"}, {title: "Jess", data: "Message Title"}, {title: "Hampton", data: "Message Title"}, {title: "Leila", data: "Message Title"}]
    
    return (
        <CustomListGroup entry={entry}/>
    )

}