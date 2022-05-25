const https = require("https")
const http = require("http")

let radios = require("./api/radios/radios.json")
let count = {
    "http": 0,
    "https": 0
}
radios.radios.forEach(function (radio) {
    if (radio.play.urlStream.substring(0, 5) == 'https') {
        count.https++

        https.get(radio.play.urlStream, function(res) {
            if (res.statusCode == 404) {
                console.log({
                    "id": radio.id,
                    "stream": radio.play.urlStream,
                    "statusCode": res.statusCode
                })
            }
        }).on('error', function(e) {
            console.log({
                "id": radio.id,
                "stream": radio.play.urlStream,
                "error": e
            })
        });
    }
    else {
        count.http++

        http.get(radio.play.urlStream, function(res) {
            if (res.statusCode == 404) {
                console.log({
                    "id": radio.id,
                    "stream": radio.play.urlStream,
                    "statusCode": res.statusCode
                })
            }
        }).on('error', function(e) {
            console.log({
                "id": radio.id,
                "stream": radio.play.urlStream,
                "error": e
            })
        });
    }
})
console.log(count)