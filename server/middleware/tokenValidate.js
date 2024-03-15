import errorHandler from '~/server/utils/errorHandler'

export default errorHandler(defineEventHandler((event) => {
    const bypass = {
        '/api/auth/signUp': true,
        '/api/auth/login': true,
        '/api/auth/refresh': true,
    };

    if (!bypass[event.path]) {
        const authorizationHeader = getHeader(event, 'Authorization');
        const [, accessToken] = authorizationHeader.split(' ');
        const { userData } = verifyAccessToken(accessToken);
        event.context.userData = { ...userData };
    }
}));
