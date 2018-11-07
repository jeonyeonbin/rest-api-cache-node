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


