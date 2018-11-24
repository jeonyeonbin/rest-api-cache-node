const port = 5555;
const path = require('path');
const session = require('express-session');
const bodyParser =require('body-parser');
const redis = require('redis');     //redis 연결용
const client = redis.createClient(process.env.REDIS_URL);
module.exports = (app,express) =>{

    /********************
     *  handlebar setting
     * ******************/
    const handlebars = handlebarSetting();
    app.engine('hbs',handlebars.engine).set('view engine','hbs');
    app.set('views',path.join(__dirname,'../','views/'));

    /*************
     * json 처리를 위한 설정 
     *************/
    app.use(bodyParser.urlencoded({extended:true}));
    app.use(bodyParser.json());
    /***************
     * redis setting
     ***************/
    app.use((req,res,next)=>{
        req.cache = client;
        next(); 
    })
     /*************
      * session 설정
      *************/
    app.use(session({
        resave:false,
        saveUninitialized:true,
        secret: '%$MYSECRET$%',
        cookie:{secure:true},
    }));

    /****************
     * route setting
     ****************/
    
    app.use('/',require('./frontRoute')(express));    //front router
    app.use('/test',require('./testRoute')(express)); //test router
    app.use('/fb',require('./fbRoute')(express));     //facebook router
    /***************
     * 404 error 500 err page
     **************/

    app.use((req,res,next)=>{
        res.status(404);
        res.render('error/404');
    });
    // server 에러
    app.use(function errorHandler(err,req,res,next){
        if (res.headerSent) {
            return next(err)
        }
        res.status(500);
        res.render('error/500', { error: err });
    });

    // 포트로 시작
    app.listen(port,()=>{
        
        console.log('Server Started!!');
    });


}

/**
 * @param
 * @desc 핸들바 셋팅
 * @return handlebar
 */
function handlebarSetting(){

    const handlebars =require('express-handlebars').create({
        extname:'hbs',
        defaultLayout:path.join(__dirname,'../views/layouts/main.hbs'),
        partialsDir:path.join(__dirname,'../views/partials'),
    });
    return handlebars;
}