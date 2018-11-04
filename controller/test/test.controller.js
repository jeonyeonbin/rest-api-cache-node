
/*** 
 * 전역 변수 
*/
const apiKey = process.env.DATAGOVKEY;
const fetch = require('node-fetch');

/* cache 데이터 */
let cache = {};

/**
 * @param {request} req 
 * @param {response} res
 * @desc 캐시 사용 안하고 데이터 불러오기 테스트
 */
exports.testNonCache = (req,res)=>{
    let terms = req.query.name; //school name
    
    //data 가져오기 
    fetch(
        "https://api.data.gov/ed/collegescorecard/v1/schools?api_key=" +
          apiKey +
          "&school.name=" +
          terms +
         "&fields=school.name,location.lon,location.lat&per_page=100"
      )
      .then(result  => result.json())
      .then(result =>{
        return res.send(result);
      })
      .catch(e =>{
          console.log(e);
      });
};


/**
 * @param {request} req 
 * @param {response} res
 * @desc javascript 객체를 이용하여 캐시사용후  데이터 불러오기 테스트
 */
exports.testCache = (req,res)=>{
    let terms = req.query.name;
    let result = cahce[terms];

    if(result !=null){
        console.log("Cache hit for " + terms);
        return res.send(result);
    }
};

/**
 * @param {request} req 
 * @param {response} res
 * @desc redis를 이용하여 온메모리 캐싱 사용
 */
exports.testRedisWithCache = (req,res)=>{

};