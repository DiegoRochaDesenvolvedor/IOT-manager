const Telnet = require('telnet-client');
const express = require('express');
const app = express();
const port = 3000;

app.get('/devices', async (req, res) => {
  let connection = new Telnet();

  let params = {
    host: '127.0.0.1',
    port: 23,
    shellPrompt: '/ # ',
    timeout: 1500,
    // removeEcho: 4
  };

  try {
    await connection.connect(params);
    let res = await connection.send('your command');
    connection.end();
    res.send(res);
  } catch(error) {
    console.error(`Error: ${error}`);
    res.status(500).send(error);
  }
});

app.post('/configureDevices', async (req, res) => {
    let connection = new Telnet();
  
    let params = {
      host: '127.0.0.1',
      port: 23,
      shellPrompt: '/ # ',
      timeout: 1500,
      // removeEcho: 4
    };
  
    try {
      await connection.connect(params);
      let commandResponse = await connection.send(req.body.command);
      connection.end();
      res.send(commandResponse);
    } catch(error) {
      console.error(`Error: ${error}`);
      res.status(500).send(error);
    }
  });


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});