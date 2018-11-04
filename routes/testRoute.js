
const testController = require('../controller/test/test.controller');

/**
 * @desc test 라우터 url 은 /test/ 로시작
 * @param {express class} express
 * @return {express.Router} router 
 */
module.exports = (express) =>{
    const router = express.Router();

    // 캐시 기능 없는것
    router.get('/noCache/:name',testController.testNonCache); 
    // 캐시 기능 있는것
    router.get('/cache/:name',testController.testCache);
    // 레디스 캐싱
    router.get('/redisCache/:name',testController.testRedisWithCache);

    return router;
}