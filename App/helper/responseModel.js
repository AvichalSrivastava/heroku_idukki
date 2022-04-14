
module.exports = RequestModel =(state,obj,msg="",req)=>
{
    var model ={};
    switch(state)
    {
        case 200:
            model =
            {
                code : 200,
                data : obj,
                message : msg!=""?msg:"success"
            };
            req.status(200);
            break;

            case 201:
                model =
                {
                    code : 201,
                    message : msg!=""?msg:"error"
                };
                req.status(201);
                break;

        case 400:
            model =
            {
                code : 400,
                message : msg!=""?msg:"Bad request"
            };
            req.status(400);
            break;

        case 401:
            model =
            {
                code : 401,
                message : msg!="" ? msg : "Unautharized request"
            };
            req.status(401);
            break;

        case 500:
            model =
            {
                code : 500,
                message : msg!=""?msg:"Internal server error"
            };
            req.status(500);  
            break;

        case 501:
            model =
            {
                code : 501,
                message : msg!=""?msg:"Server error"
            };
            req.status(501);
            break;
        case 1000:
            model =
            {
                code : 1000,
                message : msg!=""?msg:"Server error"
            };
            req.status(200);
            break;
        default:
            
            break;

    }
    console.log(model);
    req.send(model);
};
