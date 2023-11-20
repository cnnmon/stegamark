/** @type {import('next').NextConfig} */

module.exports = {
  images: {
    domains: ['pbs.twimg.com', 'twitter.com'],
  },
  async rewrites() { //reroute upload requests to go to heroku server. 
    return [
      {
        source: '/api/upload',
        destination: 'https://rosteals-server-fbea1f0f4f47.herokuapp.com/upload', 
      },
    ];
  },
};
