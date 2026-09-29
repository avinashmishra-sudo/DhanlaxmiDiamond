// server.js - Production entry point for Hostinger Node.js deployment
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = process.env.HOSTNAME || '0.0.0.0';
const rawPort = process.env.PORT || 3000;
const port = isNaN(rawPort) ? rawPort : parseInt(rawPort, 10);

const app = next({ dev, hostname, port: typeof port === 'number' ? port : 3000 });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error handling request:', req.url, err);
      res.statusCode = 500;
      res.end('Internal Server Error');
    }
  });

  server.once('error', (err) => {
    console.error('Server startup error:', err);
    process.exit(1);
  });

  if (typeof port === 'string' && isNaN(Number(port))) {
    // Named pipe or UNIX socket (used by some Hostinger/Passenger setups)
    server.listen(port, () => {
      console.log(`> Dhanlaxmi Diamond production server listening on socket ${port}`);
    });
  } else {
    server.listen(port, hostname, () => {
      console.log(`> Dhanlaxmi Diamond production server listening on http://${hostname}:${port}`);
    });
  }

  process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });
  });
});
