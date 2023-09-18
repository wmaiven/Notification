const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/send-notification', (req, res) => {
  const employeeIds = req.body.employeeIds;
  const message = req.body.message;

  if (!employeeIds || !message) {
    return res.status(400).json({ error: 'Parâmetros inválidos' });
  }

  // Simulando o envio da notificação
  employeeIds.forEach(employeeId => {
    console.log(`Enviando notificação para Employee ID ${employeeId}: ${message}`);
  });

  return res.status(200).json({ message: 'Notificação enviada com sucesso' });
});

app.listen(3001, () => {
  console.log(`Serviço de Notificação rodando na porta 3001`);
});
