
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
    let terms = req.params.name; //school name
    
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
    let terms = req.params.name;
    let result = cache[terms];
    console.log(terms);
    if(result !=null){
        console.log("Cache hit for " + terms);
        console.log(result);
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
 * @desc redis를 이용하여 인 메모리 캐싱 사용
 */
exports.testRedisWithCache = (req,res)=>{
    req.accepts('application/json');

    let terms = req.params.name;
    const key = 'schools/'+terms;
    /**
     * @desc 레디스 케시에서 먼저 확인후에 가져오기
     */
    req.cache.get(key,(err, result)=>{
        if(err){
            console.log(err);
            return;
        }
        // 캐시에 만약 없다면
        if(result == null){
            getFetchData(terms)
            .then(fetchData =>{
                console.log('Cache miss');
                return fetchData.json();
            })
            .then(json =>{
                console.log(json);
                // 캐시상에 올려주기
                req.cache.set(key,JSON.stringify(json),(err,data)=>{
                    if(err){
                        console.log(err);
                        return;
                    }else{
                        console.log(data);      //성공하면 OK
                        req.cache.expire(key,10);
                        return res.send(data);
                    }
                })
            })
            .catch(e=>{
                console.log(e);
            });
        }
        // 캐시에 있을경우     
        else{
            console.log('Cache HIT');
            result = JSON.parse(result);
            console.log(result);
            return res.send(result);
        }

        
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