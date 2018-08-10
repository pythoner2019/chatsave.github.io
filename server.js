const express = require('express');
const bodyParser = require('body-Parser');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');


app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.Promise = Promise;

const dburl = 'mongodb://user:123456a@ds119072.mlab.com:19072/learning-node';

//-----------------------------------------------------------------//

const Message = mongoose.model('Message',  {
	name: String,
	message: String
})

app.get('/messages', (req, res) => {
	Message.find({}, (err, message) => {
		res.send(message);
	})
})

app.get('/messages/:user', (req, res) => {
	const user = req.params.user

	Message.find({name: user}, (err, message) => {
		res.send(message);
	})
})

app.post('/messages', async (req, res) => {
	const message = new Message(req.body);
		
	try {
		const savedMessage = await message.save();
		console.log('saved');

		const cencored = await Message.findOne({message: 'badword'});
		if (cencored) {
			await Message.remove({_id: cencored.id});
		} else {
			io.emit('message', req.body);
		}
		res.sendStatus(200);
	} catch(error) {
		res.sendStatus(500)
		return console.error(error);
	} finally {
		console.log('message post called');
	}
})


io.on('connection', (socket) => {
	console.log('a user connected');
})

mongoose.connect(dburl, { useNewUrlParser: true } , (err) => {
	console.log('mongo db connected...', err);
})


const server = http.listen(3000, () => {
	console.log('Listen to port: ', server.address().port);
});











