

/**
 * 
 * @param {request} req 
 * @param {response} res 
 */
exports.facebookGET= (req,res)=>{
    const og= {
        title : 'SK Magic JIKSOO RAPI',
        type : 'website',
        url: 'https://m.skmagic.com.my',
        desc : 'test',
    };
    res.render('fb',{og: og});
};