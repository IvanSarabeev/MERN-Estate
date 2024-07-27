class TypeError extends Error {
    constructor(message: string) {
        super(message)

        this.name = "TypeError";
    }
}

class RuntimeError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'RuntimeError';
    }
}

class ExpirationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ExpirationError';
    }
}

export { TypeError, RuntimeError, ExpirationError };