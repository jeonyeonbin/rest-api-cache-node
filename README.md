# rest-api-cache-node
Node js 기반 rest api caching

no sql 기반 서버 캐싱
브라우저상 cdn 정적 파일 캐싱


![nocache](https://user-images.githubusercontent.com/33460988/48134023-04710b80-e2dc-11e8-92c1-586848ed265a.png)

nocache  https://api.data.gov/ed/collegescorecard/v1/schools
에서 데이터를 가져와 테스트 
캐시없이 여러번 fetch 요청하는 시간





![localcache](https://user-images.githubusercontent.com/33460988/48134163-79444580-e2dc-11e8-8bea-a747e122abaf.png)


javascript 객체 {} 키 밸류 형태인 맵형태를 이용하여 로컬에 캐시,
하지만, 이방식은 서버 사이드에서 계속 데이터를 보존할수 없으니 저장소를 이용해야함.
javascript 객체에 키 밸류형태로 데이터를 저장해놓고, 해당 데이터가 객체에 있으면, 데이터를 바로 던져줄수 있지만, 없다면
이것또한 fetch를 이용해서 데이터를 가져와야댄다.


![rediscache](https://user-images.githubusercontent.com/33460988/48134386-1f904b00-e2dd-11e8-84d7-7f907eb128e6.png)


서버사이드에서 데이터 보존은 서버가 꺼지면 보존을 할수가없다. 그래서 데이터를 꼭 보존을 해야되는데 In memory DB로 유명한 redis를 이용해보았다.
 get으로 조회할 때, 먼저 레디스에 있는지 확인을 해보고, 만약 없다면 데이터를 레디스에 저장한다.
 
 데이터를 캐시하고 꺼내오는 작업을 해봤는데, 성능 기존코드보다 몇배는 빨라졌다. 세션값도 저장해서 성능최적화를 해보려고한다.
