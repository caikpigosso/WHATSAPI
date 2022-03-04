import express from 'express';
import { Client, LocalAuth } from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import bodyParser from 'body-parser';

const port = 3001;
const server = express();

const client = new Client({
	authStrategy: new LocalAuth(),
	puppeteer: {
		executablePath: process.env.CHROME_BIN || undefined
	}
});

server.use(express.json());
server.use(bodyParser.json());
client.initialize();
client.on('qr', (qr) => {
	console.log('New QR CODE');
	qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
	console.log('Whatsapp Conectado e Pronto para Uso!');
});

server.post('/send/group/', (req, res) => {
	let { number, message } = req.body;
	number = number.includes('@g.us') ? number : `${number}@g.us`;
	client.sendMessage(number, message);

	res.json({ status: 'ok' });
});

server.post('/send/private/', (req, res) => {
	let { number, message } = req.body;
	number = number.includes('@c.us') ? number : `${number}@c.us`;
	client.sendMessage(number, message);

	res.json({ status: 'ok' });
});
client.on('message', async (msg) => {
	if (msg.body === '!groupinfo') {
		const chat = await msg.getChat();
		if (chat.isGroup) {
			msg.reply(`*Groupo ID*: ${msg.from}`);
		}
	}
});

server.listen(port, () => {
	console.log(`Servidor Iniciado na porta ${port}`);
});
