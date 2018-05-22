var express = require('express');
var app = express();
var axios = require('axios');

var apiRoutes = express.Router();
apiRoutes.get('/getList', function(req, res) {
  var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg';
  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  })
  .then(function(res) {
    res.json(res.data)
  })
  .catch(function(err) {
    
  })  
})










app.use('/api', apiRoutes);

var server = app.listen(8911, 'localhost', function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port)
})
