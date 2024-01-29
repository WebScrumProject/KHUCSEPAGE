import passport from 'passport'

module.exports={
    getLogin = (req, res)=>{

    },
    postLogin = (req, res, next)=>{
        passport.authenticate('google',{
            failureRedirect: '/'
        }), async(req, res)=>{
            try{
                clien
            }
        }
    }
}

