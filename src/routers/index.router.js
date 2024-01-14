import { Router } from "express";
import {
    privateRouter,
    publicRouter,
    authPolicies
} from "../middleware/session.validator.js";
import passport from "passport";
import { config } from "../config.js";
import Jwt from 'jsonwebtoken';


const router = Router();

router.get('/loggerTest', (req, res) => {
    req.logger.fatal('fatal');
    req.logger.error('error');
    req.logger.warning('warning');
    req.logger.info('info');
    req.logger.http('http');
    req.logger.debug('debug');
    res.status(200).send('ok');
})

router.get("/realTimeProducts", privateRouter, authPolicies(['admin']), passport.authenticate('jwt', { session: false }), (req, res) => {
    res.render("index", { title: "Cargas", style: "style.css" });
});

router.get("/login", publicRouter, (req, res) => {
    res.render("login", { title: "Login" });
});

router.get("/", privateRouter, authPolicies(['user']), passport.authenticate('jwt', { session: false }), (req, res) => {

    const token = req.signedCookies['accessToken']

    Jwt.verify(token, config.jwtSecret, async (error, payload) => {
        if (error) res.status(403).json({ message: 'No authorized' });
        req.user = payload
    })
    const user = req.user.username;
    const uid = req.user.id;

    res.render("home", { title: "Home", user, uid, style: "home.css" });
});

router.get("/register", publicRouter, (req, res) => {
    res.render("register", { title: "Register", style: "register.css" });
});

router.get("/cart", privateRouter, async (req, res) => {
    res.render("cart", { title: "Carrito", style: "carrito.css" });
});

router.get("/newPass/:uid", async (req, res) => {
    res.render("newPass", { title: "New Password", style: "register.css" });
});

router.get("/recoverPass", async (req, res) => {
    res.render("recoverPass", { title: "Recover Password", style: "register.css" });
});

router.get("/producto/:pid", privateRouter, (req, res) => {
    res.render("producto", { title: "Producto" });
});

router.get("/edit/:pid", privateRouter, (req, res) => {
    res.render("edit", { title: "Editar" });
});

export default router;