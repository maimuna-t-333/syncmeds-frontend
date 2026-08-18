export type TApiResponse<T = unknown> = {
    statusCode: number;
    status: 'success' | 'error';
    message: string;
    data: T;
};

export type TApiErrorCode = 'VALIDATION_ERROR' | 'INVALID_CREDENTIALS' | 'EMAIL_NOT_VERIFIED';

export type TApiErrorData =
    | { code: 'VALIDATION_ERROR'; fields: Record<string, string> }
    | { code: 'INVALID_CREDENTIALS' }
    | { code: 'EMAIL_NOT_VERIFIED'; email: string };

export type TErrorResponse = {
    statusCode: number;
    status: 'error';
    message: string;
    data: TApiErrorData | null;
};
