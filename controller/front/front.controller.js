
/**
 * @desc feedUI 접속시
 * @param {request} req 
 * @param {response} res 
 */
exports.feedUIGET = (req,res) =>{
    return res.render('naverHackDay/feedUi');
}