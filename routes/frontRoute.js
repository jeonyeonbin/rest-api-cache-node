

const frontController = require('../controller/front/front.controller');    // front controller
/**
 * @desc 화면 라우터
 * @param {express class} express
 * @return {Express Router}router 
 */
module.exports = (express)=>{
    
    const router = express.Router();
    // feed형 UI GET
    router.get('/',frontController.feedUIGET);

    return router;
}