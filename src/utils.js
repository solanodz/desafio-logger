import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);

export const __dirname = path.dirname(__filename);

export default class Exception extends Error {
    constructor(message, status) {
        super(message);
        this.statusCode = status;
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = path.join(__dirname, '/public/img');
        cb(null, folderPath)
    },
    filename: (req, file, cb) => {
        const filname = `${Date.now()}-${file.originalname}`;
        cb(null, filname);
    }
});

export const uploader = multer({ storage });

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

export const tokenGenerator = (user, date) => {
    const { id, username, lastname, email, rol } = user;
    const payload = {
        id: id,
        username: username,
        lastname: lastname,
        email: email,
        rol: rol
    };
    const token = Jwt.sign(payload, JWT_SECRET, { expiresIn: date });
    return token;
};

export const jwtAuth = (req, res, next) => {
    const { authorization: token } = req.headers;
    if (!token) res.status(401).json({ message: 'Unauthorized' });
    Jwt.verify(token, config.JwtSecret, async (error, payload) => {
        if (error) res.status(403).json({ message: 'No authorized' });
        req.user = await userModel.findById(payload.id);
        next();
    })
}