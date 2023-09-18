const express = require('express');
const bodyParser = require('body-parser');
const redis = require('redis');
const client = redis.createClient();

client.on('error', (err) => {
  console.log(`Error: ${err}`);
});

const app = express();
app.use(bodyParser.json());

app.post('/send-notification', (req, res) => {
  const employeeIds = req.body.employeeIds;
  const message = req.body.message;

  if (!employeeIds || !message) {
    return res.status(400).json({ error: 'Parâmetros inválidos' });
  }

  // Verificar se as informações do Employee estão no cache
  const cacheKey = 'employee-info';
  client.get(cacheKey, (err, data) => {
    if (err) throw err;

    if (data !== null) {
      const cachedEmployeeInfo = JSON.parse(data);
      employeeIds.forEach(employeeId => {
        if (cachedEmployeeInfo[employeeId]) {
          console.log(`Enviando notificação para Employee ID ${employeeId}: ${message}`);
        }
      });
      return res.status(200).json({ message: 'Notificação enviada com sucesso' });
    } else {
      // Simulando o envio da notificação
      employeeIds.forEach(employeeId => {
        console.log(`Enviando notificação para Employee ID ${employeeId}: ${message}`);
      });

      // Atualize o cache com as informações dos Employees (por exemplo, após consultar o banco de dados)
      const employeeInfo = {
        '1': { /* Informações do Employee com ID 1 */ },
        '2': { /* Informações do Employee com ID 2 */ },
      };
      client.set(cacheKey, JSON.stringify(employeeInfo));

      return res.status(200).json({ message: 'Notificação enviada com sucesso' });
    }
  });
});

app.listen(3001, () => {
  console.log(`Serviço de Notificação rodando na porta 3001`);
});
