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
    console.log(err)
  })  
})

apiRoutes.get('/getLyric', function(req, res) {
  var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'

  axios.get(url, {
    headers: {
      referer: 'https://c.y.qq.com/',
      host: 'c.y.qq.com'
    },
    params: req.query
  })
  .then((response) => {
    var result = response.data;
    if (typeof result === 'string') {
      var reg = /^\w+\(({[^()]+})\)$/
      var matches = result.match(reg)

      if(matches) {
        result = JSON.parse(matches[1])
      }
    }
    res.json(result)
  })
  .catch((error) => {
    console.log(error)
  })
})


app.use('/api', apiRoutes);

