// this file is to fix local tunnel crashing
var localtunnel = require('localtunnel')
localtunnel(5000, { subdomain: 'glargenflargen321' }, (err, tunnel) => {
  console.log('LT running')
})
