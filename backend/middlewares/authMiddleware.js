import { getUser } from "../service/auth.js";

export function checkAuthCookie(cookie) {
    return (req, res, next) => {
        const cookieValue = req.cookies[cookie];
        if (!cookieValue) return next();

        try {
            const payload = getUser(cookieValue);
            req.user = payload;
            return next();
        } catch (error) {
            return next();
        }
    };
}
