classNameName ApiError extends Error {
    statusCode: number;
    status: string;
    isOperational: boolean;
    data?: any;

    constructor(statusCode: number, message: string, data?: any) {
        super(message);
    
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.data = data;
        this.isOperational = true;
    
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ApiError;