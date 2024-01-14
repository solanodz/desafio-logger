
export const config = {
    port: process.env.PORT || 8080,
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/pre-entrega-3',
    jwtSecret: process.env.JWT_SECRET,
    accessToken: process.env.ACCESS_TOKEN,
    serverSecret: process.env.SERVER_SECRET,
}