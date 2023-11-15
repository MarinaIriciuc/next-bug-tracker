"use client"
import Draggable from "react-draggable";
export default function DraggableCard(){
    return (
        <>
            <Draggable>
                <div className="bg-black text-white">
                    <h1>I can now be moved around!</h1>
                </div>
            </Draggable>
        </>
    )
}