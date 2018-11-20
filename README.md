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
 


hystrix

Netflix 분산서비스의 오픈소스로 하나의 서비스를 이용할때 서비스가 죽으면 스위치를 ON / OFF 할수 있는 기능을 진행한다.
만약, 해당서비스가 오버헤드되서 서비스가 죽게되면 다른 서비스까지 영향을 끼쳐 서비스 진행이 불가능할수 있다.

MSA 아키텍쳐는 성능 최적화 및 속도 향상을 위해 분산 아키텍쳐 방식이다.
예를 들어, API서버 한대를 이용하고 웹서버를 한대를 이용한다고 가정을 한다. 그 때 서비스로, 로그인 서비스와 게시판 서비스가있는데
해당 날에 따라 게시판에 게싯물을 등록하는 사람이 많아졌다. 그랬더니 로그인하는 서비스까지 오버헤드가 발생 되었다. 
이런 경우에 각모듈별 API 서버를 별개로 두고 각 API 서버마다 Thread Pool을 가진다면 성능이 더최적화 될것이다.

이런 경우에도 하나의 API 서버가 서비스가 오버헤드 되어 죽을수도있다. 그래서 hystrix를 이용하는것이다.
하나의 API 서버를 이용하는데 너무많은 사람들이 들어와 해당 API가 죽게되면 해당 서비스를 이용을 하지못하게된다.
그렇지만 hystrix를 이용하면 해당 쓰레드풀에 너무많은 가비지가 쌓여 서비스가 죽게되었을때 fallback을 일으켜 서비스를 정상화된것처럼 진행할수있다.
복구될때지 서비스가 제한적이지만 사용자입장에서는 오류라고 판단이 안들수가있다.

그래서 npm document 에 있는 hystrix 를 이용하여 진행 해보려고한다. 


[설정 함수 정의]

circuitBreakerSleepWindowInMilliseconds - API 서버가 응답시 최대 대기할수있는 milliseconds 
errorHandler - 서비스의 오류 응답이 실제 오류인지 확인하는 기능입니다. 이 함수가 오류 개체(기본 구현)를 반환하는 경우 이 요청 호출은 오류 백분율에 영향을 미치는 실패로 표시됩니다. null 또는 false를 반환하면 호출이 실패로 표시되지 않습니다. 예를 들어 고객을 찾을 수 없는 경우 404 오류가 발생할 수 있습니다.
circuitBreakerRequestVolumeThreshold - 회로 차단기가 상태를 계산하기 위해 전혀 성가시게 되기 전에, 초과해야 하는 롤링 윈도우의 최소 요청 수
circuitBreakerForceOpened - 서킷 브레이커 항상 오픈
circuitBreakerForceClosed - 서킷 브레이커 항상 클로즈
circuitBreakerErrorThresholdPercentage - error percentage threshold to trip the circuit
statisticalWindowLength -실행 횟수를 추적할 수 있는 윈도우의 길이 메트릭(성공, 실패)
statisticalWindowNumberOfBuckets - 통계 창의 버킷수
percentileWindowNumberOfBuckets - 백분위 창의 버킷수
fallbackto - 요청이 실패할 경우 실행되는 기능. 이 함수는 첫 번째 인수로, 두 번째 인수로 원래 args의 배열로 호출됩니다. 



