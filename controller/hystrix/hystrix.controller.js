/**
 * @desc hystrix 이용 controller( 라우터 이용?)
 */

/******
 * 전역 변수
 ******/
const CommandFactory = require('hystrixjs').commandFactory;

/* hystrix config  */
const hystrixConfig = {

};
 /**
  * @desc hystrix code 작성
  * @param {request} req
  * @param {response} res
  */
 exports.hystrixTest = (req,res) =>{
    /**
     * @desc hystrix 설정
     */
    const commandBuilder = CommandFactory.getOrCreate();


 }

 /**
  * @desc fallbackto
  * 서버의 오버헤드가 발생되었을때 fallbackto 설정해줘야댐
  */
 function fallbackTo(){

 }