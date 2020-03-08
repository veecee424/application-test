
let HTTP_codes = {
    OK: 200,
    created: 201,
    NotFound: 404,
    TimeOut: 408,
    BadRequest: 400,

}

let responder = {

    requestOK: (data, res, message="Request successful") => {
        let response = {
            data,
            status: "success",
            statusCode: HTTP_codes.OK,
            message
        }
        return res.status(HTTP_codes.OK).send(response);
    },

    createSuccess: function (data, res, message = "Created successfully") {
        let response = {
            data,
            status: "success",
            statusCode: HTTP_codes.created,
            message
        }
        return res.status(HTTP_codes.created).send(response);
    },

    fileNotFound: function ( res, message = 'sorry, we are unable to find what you are looking for') {
        let response = {
            status: "error",
            statusCode: HTTP_codes.NotFound,
            message
        }
        return res.status(HTTP_codes.NotFound).send(response);
    },

    badRequest: function ( res, message = "REQUEST FAILED") {
        let response = {
            status: "error",
            statusCode: HTTP_codes.BadRequest,
            message
        }
        return res.status(HTTP_codes.BadRequest).send(response);
    },

    pageNotFound: function ( res, message = "Check request URI") {
        let response = {
            status: "error",
            statusCode: HTTP_codes.NotFound,
            message
        }
        return res.status(HTTP_codes.NotFound).send(response);
    },

    requestTimedOut: function ( res, message = "Something went wrong") {
        let response = {
            status: "error",
            statusCode: HTTP_codes.TimeOut,
            message
        }
        return res.status(HTTP_codes.TimeOut).send(response);
    },

    failure: function ( res, message = "Something went wrong") {
        let response = {
            status: "error",
            message
        }
        return res.status(HTTP_codes.BadRequest).send(response);
    },
}


module.exports =  responder;