class Required {
    passes (attribute: string, value: any) {
        return value !== undefined && value !== null && value !== ""
    }

    message (attribute: string) {
        return `The ${attribute} field must be required.`
    }
}

export default Required