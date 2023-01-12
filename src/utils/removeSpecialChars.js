
export const removeAccentsAndLowercase = (event) => {
        
    const value = event.target.value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[\u00f1]/gi, "n")
        .replace(/[^a-zA-Z0-9\s]/g, "")

    return value
}