import type { TUser } from './user.types';

export type TAuthTokens = {
    accessToken: string;
    refreshToken: string;
};

export type TSignInResponse = TAuthTokens & {
    user: TUser;
};

export type TSignUpResponse = {
    user: TUser;
};

export type TOtpVerifyResponse = TAuthTokens & {
    user: TUser;
};
