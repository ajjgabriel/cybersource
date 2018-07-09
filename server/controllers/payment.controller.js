/**
 * Created by gaang on 18/4/18.
 */
const httpStatus = require('http-status'),
    constants = require('../helpers/constants'),
    logger = require('../../config/winston'),
    crypto = require('crypto'),
    randomstring = require('randomstring'),
    request = require('request');



module.exports = {

    //helloworld
    helloworld: function (req, res, next) {
        var resourcePath = 'helloworld';
        var queryParams = 'apikey=' + constants.apikey;
        var postBody = "";

        var timestamp = Math.floor(Date.now() / 1000);
        var sharedSecret = constants.sharedSecret;
        var preHashString = timestamp + resourcePath + queryParams + postBody;
        var hashString = crypto.createHmac('SHA256', sharedSecret).update(preHashString).digest('hex');
        var preHashString2 = resourcePath + queryParams + postBody;
        var hashString2 = crypto.createHmac('SHA256', sharedSecret).update(preHashString2).digest('hex');
        var xPayToken = 'xv2:' + timestamp + ':' + hashString;

        console.log(xPayToken);

        
        request.get({
            headers: {'x-pay-token' : xPayToken},
            url:     'https://sandbox.api.visa.com/vdp/helloworld?' + queryParams
          }, function(error, response, body){
            res.status(200).send(body);
          });
    },
    payment: function (req, res, next) {

        var resourcePath = 'v2/payments';
        var queryParams = 'apikey=' + constants.apikey;
        var postBody = JSON.stringify({
            "clientReferenceInformation": {
            "code": "TC50171_3"
            },
            "processingInformation": {
            "commerceIndicator": "internet"
            },
            "aggregatorInformation": {
            "subMerchant": {
            "cardAcceptorID": "1234567890",
            "country": "US",
            "phoneNumber": "650-432-0000",
            "address1": "900 Metro Center",
            "postalCode": "94404-2775",
            "locality": "Foster City",
            "name": "Visa Inc",
            "administrativeArea": "CA",
            "region": "PEN",
            "email": "test@cybs.com"
            },
            "name": "V-Internatio",
            "aggregatorID": "123456789"
            },
            "orderInformation": {
            "billTo": {
            "country": "US",
            "lastName": "VDP",
            "address2": "Address 2",
            "address1": "201 S. Division St.",
            "postalCode": "48104-2201",
            "locality": "Ann Arbor",
            "administrativeArea": "MI",
            "firstName": "RTS",
            "phoneNumber": "999999999",
            "district": "MI",
            "buildingNumber": "123",
            "company": "Visa",
            "email": "test@cybs.com"
            },
            "amountDetails": {
            "totalAmount": "102.21",
            "currency": "USD"
            }
            },
            "paymentInformation": {
            "card": {
            "expirationYear": "2031",
            "number": "5555555555554444",
            "securityCode": "123",
            "expirationMonth": "12",
            "type": "002"
            }
            }
            });

        var timestamp = Math.floor(Date.now() / 1000);
        var sharedSecret = constants.sharedSecret;
        var preHashString = timestamp + resourcePath + queryParams + postBody;
        var hashString = crypto.createHmac('SHA256', sharedSecret).update(preHashString).digest('hex');
        var preHashString2 = resourcePath + queryParams + postBody;
        var hashString2 = crypto.createHmac('SHA256', sharedSecret).update(preHashString2).digest('hex');
        var xPayToken = 'xv2:' + timestamp + ':' + hashString;

        console.log(xPayToken);

        var headers = {};
        headers["Content-Type"] = "application/json";
        headers["x-pay-token"] = xPayToken;
        
        request.post({
            headers: headers,
            url:     'https://sandbox.api.visa.com/cybersource/v2/payments?' + queryParams,
            body: postBody
          }, function(error, response, body){
            res.status(200).send(body);
          });
    }
};