module.exports = {
  apps: [{
    name: 'overview-service',
    script: './index.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: 'ec2-18-222-188-11.us-east-2.compute.amazonaws.com',
      key: '~/.ssh/keyanureeves.pem',
      ref: 'origin/master',
      repo: 'git@github.com:the-home-repot/overview-service.git',
      path: '/home/ubuntu/overview-service',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}