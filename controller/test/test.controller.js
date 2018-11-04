
/*** 
 * 전역 변수 
*/
const apiKey = process.env.DATAGOVKEY;
const fetch = require('node-fetch');
const redis = require('redis');     //redis 연결용
const client = redis.createClient(process.env.REDIS_URL);
/* cache 데이터 */
let cache = {};

/**
 * @param {request} req 
 * @param {response} res
 * @desc 캐시 사용 안하고 데이터 불러오기 테스트
 */
exports.testNonCache = (req,res)=>{
    let terms = req.param.name; //school name
    
    //data 가져오기 
    getFetchData(terms)
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
    let terms = req.param.name;
    let result = cache[terms];

    if(result !=null){
        console.log("Cache hit for " + terms);
        return res.send(result);
    }else{
        console.log("Cache Miss for" + terms);
        getFetchData(terms)
        .then(result => result.json())
        .then(result =>{
            cache[terms] = result;
            return res.send(result);
        })
        .catch(e =>{
            console.log(e);
        });
    }   
};

/**
 * @param {request} req 
 * @param {response} res
 * @desc redis를 이용하여 온메모리 캐싱 사용
 */
exports.testRedisWithCache = (req,res)=>{
    let terms = req.param.name;
    client.get('schools/'+terms,(err, result)=>{
        return JSON.parse(result);
    }).then(json =>{
        client.setex('schools/'+terms,300,JSON.stringify(json));
        res.send(json);
    });
};


/**
 * @desc 가져온 데이터 객체를 리턴 
 * @param {string} terms
 * @return fetch 
 */
function getFetchData(terms){
    return fetch(
        "https://api.data.gov/ed/collegescorecard/v1/schools?api_key=" +
          apiKey +
          "&school.name=" +
          terms +
         "&fields=school.name,location.lon,location.lat&per_page=100"
      );
}