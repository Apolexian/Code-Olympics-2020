// this should be typescript lel
const http = require('http');
const express = require('express');
const MessagingResponse = require('twilio').twiml.MessagingResponse;
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const { accountSid, authToken, blizzAccessToken } = process.env;
const client = require('twilio')(accountSid, authToken);


async function fetchAuctions(realm) {
    let { auctions } = await (await fetch(`https://eu.api.blizzard.com/data/wow/connected-realm/${realm}/auctions?namespace=dynamic-eu&locale=en_GB&access_token=${blizzAccessToken}`)).json();
    return auctions
}


async function searchItem(searchTerm) {
    let { results } = await (await fetch(`https://eu.api.blizzard.com/data/wow/search/item?namespace=static-eu&locale=en_GB&name.en_GB=${searchTerm}&orderby=id&_page=1&access_token=${blizzAccessToken}`)).json();
    let item = results[0];
    console.log(item);
    let auctions = await fetchAuctions(3674); // makes perfect sense 😰
    console.log("finished fetching auctions! 😋")
    let resultAuctions = auctions.filter(a => a.item.id == item.data.id);
    console.log(resultAuctions);
    let presented = resultAuctions.map(a => (`${item.data.name.en_GB}: ${a.buyout || a.unit_price}, ${a.quantity}, ${a.time_left}`)).join('\n');

    return presented;
}
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/', async (req, res) => {
    const twiml = new MessagingResponse();

    if (req.body.Body == 'hello') {
        twiml.message('Well met 🐼');
    } else if (req.body.Body == 'bye') {
        twiml.message('Goodbye 🐨');
    } else {
        let results = await searchItem(req.body.Body);
        twiml.message(
            `${results}`
        );
    }

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

http.createServer(app).listen(1337, () => {
    console.log('Express server listening on port 1337');
});

//http://ef25d39c7d1f.ngrok.io/