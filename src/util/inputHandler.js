const handleChange = (e, index, inputRef) => {
    const value = e.target.value.replace(/\D/, "")
    e.target.value = value

    if (value && index < 5) {
        inputRef.current[index + 1].focus()
    }
}

const handleKeyDown = (e, index, inputRef) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
        inputRef.current[index - 1].focus()
    }
}


const handlePaste = (e, inputRef) => {
    e.preventDefault()
    const paste = e.clipboardData.getData("text").slice(0, 6).split("")
    paste.forEach((digit, i) => {
        if (inputRef.current[i]) {
            inputRef.current[i].value = digit
        }
    })
    const next = paste.length < 6 ? paste.length : 5
    inputRef.current[next].focus()
}

const inputHandler = {
    handleChange: handleChange,
    handleKeyDown: handleKeyDown,
    handlePaste: handlePaste,
}

export default inputHandler