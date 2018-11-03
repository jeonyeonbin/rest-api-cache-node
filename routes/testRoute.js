
module.exports = (express) =>{
    const router = express.Router();

    router.get('/',function(req,res){
        console.log('test succcess');
        return res.render('test');
    });

    return router;
}