//get signature for AWS authorized request
function getSignedQuery(constants, options, keyword) {

var URI=constants.URI;
var AccessKeyId=constants.AWSAccessKeyId;
var AWSsecretkeyId=constants.AWSsecretkeyId;
  //set AWS API query parameters
  var params = {
    Service: "AWSECommerceService",
    AWSAccessKeyId: AccessKeyId,
    SignatureMethod: "HmacSHA256",
    SignatureVersion: "2",
    Timestamp: getISO8601Timestamp(),
    ResponseGroup: "Medium",
    AssociateTag: options.AssociateTag,
    Operation: options.Operation,
    SearchIndex: options.SearchIndex,
    Keywords: keyword,
  };

  var query = [];
  Object.keys(params).forEach(function(name) {
    params[name] = encodeURIComponent(params[name]);
    query.push(name + "=" + params[name]);
  });
  query = query.sort().join("&");
  var str_signature = "GET" + "\n" + URI + "\n" + "/onca/xml" + "\n" + query;
  var hash = CryptoJS.HmacSHA256(str_signature, AWSsecretkeyId);
  var sign = hash.toString(CryptoJS.enc.Base64);

  var request = "http://" + URI + "/onca/xml?" + query + "&Signature=" + encodeURIComponent(sign);

  return request;
}

function getISO8601Timestamp() {
  var d = new Date();
  var ye = d.getUTCFullYear();
  var mo = zeroPlus(d.getUTCMonth() + 1);
  var da = zeroPlus(d.getUTCDate());
  var ho = zeroPlus(d.getUTCHours());
  var mi = zeroPlus(d.getUTCMinutes());
  var se = zeroPlus(d.getUTCSeconds());

  return ye + "-" + mo + "-" + da + "T" + ho + ":" + mi + ":" + se + "Z";

  function zeroPlus(value) {
    return ("0" + value).slice(-2);
  }
}
