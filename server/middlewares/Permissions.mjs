const permit = (roles = []) => {
    if (typeof roles === 'number') {
        roles = [roles]
    }
  
    return (req, res, next) => {
        // CHECK ACCOUNT'S PERMISSIONS
        if (roles.length && !roles.includes(req.account.account_type_id)) {
            return res.status(403).json({
                success: false,
                error: 'User not allowed to access this resource'
            })
        }

        next() // RETURN NEXT IF ACCOUNT HAS ACCESS TO RESOURCE
    }
}
  
export default permit