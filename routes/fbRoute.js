const fbController = require('../controller/facebook/fb.controller');


/**
 * @desc facebook 공유하기 테스트 -> 페이스북은 해당사이트를 스크래핑 해오는데 스크립트가 먹혀있는상태가아닌 문자열로 판단해 스크래핑되어
 * 스크립트가 먹히질 않는다 그래서 백에서 데이터를 밀어넣어줘야한다.
 * @param {express class} express
 * @return {express.Router} router 
 */
module.exports = (express) =>{
    const router = express.Router();

    // facebook og tag test
    router.get('/',fbController.facebookGET);
    
    return router;
}