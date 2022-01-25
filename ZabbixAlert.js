const api = require('axios').default;

api.baseUrl = '';
if (process.argv.length <= 3) {
	console.error('Necessario Passar 3 argumentos (Tipo, Numero, Menssagem)');

} else if (process.argv[2] === 'private') {
	api.post('http://localhost:3000/send/private/', {
		number: process.argv[3],
		message: process.argv[4]
	})
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.log(error);
		});
} else if (process.argv[2] === 'group') {
	api.post('http://localhost:3000/send/group/', {
		number: process.argv[3],
		message: process.argv[4]
	})
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.log(error);
		});
} else {
	console.log('Tipo Invalido usar somente (private ou group)');
}
