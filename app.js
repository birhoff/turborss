const express = require('express');
const app = express();

app.get('/api', function(req, res) {
    res.send('Hello World!');
});

app.use(express.static('build'));
app.use('/rss', express.static('rss'));

app.listen(80, function() {
    console.log('Example app listening on port 3000!');
});
