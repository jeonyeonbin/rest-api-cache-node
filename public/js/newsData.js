/**
 * @desc document ready
 */
$(document).ready(function(){

    /***
     * click Event
     */

    /**
     * @desc 신규 데이터 가져오기
     */
    $('#newData').click(()=>{
        alert('new Data');
    });

    /**
     * @desc 과거 데이터가져오기
     */
    $('#pastData').click(()=>{
        alert('past Data');
    });

});

/**
 * @desc 과거 및 신규 데이터 가져오기
 * @param {*} type , {String} url, {class} data
 * @return ajax 
 */
function getNewsData(data,url,type){
    return $.ajax({
        url:url,
        method : POST,
        data : data
    });
}

/**
 * @desc 과거데이터 리스트에서추가해서 보여주기
 * @param {서버에서 받은 데이터} data 
 */
function appendPastData(data){

}

/**
 * @desc 신규 데이터 리스트에 추가해서 보여주기
 * @param {서버에서 받은 데이터} data 
 */
function appendNewData(data){

}