const handleMongoDBErrors = (error) => {
    let handledError
    switch (error.code) {
        case 11000:
            handledError = {
                message: `Data already exists`
            }
            break
        default :
            handledError = {
                message: `Unknown error`,
                code: error.code
            }
    }
    return handledError
}

module.exports = handleMongoDBErrors
