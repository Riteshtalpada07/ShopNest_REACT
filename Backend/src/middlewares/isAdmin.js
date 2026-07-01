export const isAdmin = (req, res, next) => {
    try {

        console.log("req.user:", req.user);

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "User not found in request"
            });
        }
        
        if (req.user.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied. Admin only."
            });
        }

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};