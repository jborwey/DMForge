import React, { useRef } from "react";
import {
    Chip,
    Box,
    TextField,
    useTheme
} from '@mui/material';
import "./ChipTextField.css";

const ChipTextField = () => {
    const inputRef = useRef(null);



    // Create a function to handle the addition of Chips
    const handleAddChip = (chip) => {
        const chipElement = document.createElement("span");
        chipElement.textContent = chip;
        chipElement.className = "chip"; // Add a class to style the chip
        chipElement.contentEditable = false; // Make the chip non-editable

        // Insert the chip into the contentEditable div
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(chipElement);
        range.insertNode(document.createTextNode(" ")); // Add an extra space

        // Move the cursor after the inserted chip
        range.setStartAfter(chipElement.nextSibling); // Use 'nextSibling' to skip the extra space
        range.collapse(true);
        selection.removeAllRanges();
        selection.addRange(range);

        inputRef.current.normalize(); // Merge adjacent text nodes
    };

    // Create a function to handle the TextField's input value change
    const handleChange = (event) => {
        const selection = window.getSelection();
        const range = selection.getRangeAt(0);

        // Check if the user typed the last character of "@today"
        const atIndex = range.endOffset - 6;
        const endContainer = range.endContainer;
        console.log(endContainer.textContent.slice(atIndex, atIndex + 6));
        if (
            event.nativeEvent.data === "y" &&
            atIndex >= 0 &&
            endContainer.textContent.slice(atIndex, atIndex + 6) === "@today"
        ) {
            const today = new Date().toLocaleDateString();
            range.setStart(endContainer, atIndex);
            range.setEnd(endContainer, atIndex+6);
            range.deleteContents();
            event.target.normalize();
            handleAddChip(today);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    return (
        <div
            contentEditable
            onInput={handleChange}
            onKeyDown={handleKeyDown}
            ref={inputRef}
            style={{
                border: "1px solid rgba(0, 0, 0, 0.23)",
                borderRadius: "4px",
                padding: "18.5px 14px",
                minHeight: "128px",
                fontSize: "1rem",
                fontFamily: "Roboto",
                width: "100%",
                outline: "none",
            }}
        />
    );
};

export default ChipTextField;