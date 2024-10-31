export function authorize(req, res, next) {
    try {
        let token = req.get("authorization").split(" ")[1];
        if (!token) {
            return res.status(404).json({
                success: false,
                msg: "Token not found",
            });
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        return res.status(403).json({ success: false, msg: error.message || 'Forbidden' });
    }
}