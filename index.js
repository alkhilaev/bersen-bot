const TelegramApi = require('node-telegram-bot-api');
const {gameOptions, againOptions} = require('./options');
const token = '5102242175:AAFpRfTImne0Ijsq632ule0AQU-YuAT5nJQ';

const bot = new TelegramApi(token, {polling: true});

const chats = {}

const startGame = async (chatId) => {
	await bot.sendMessage(chatId, 'Сейчас БОТ загадает цифру от 0 до 10, а ты должен угадать!');
	const randomNumber = Math.floor(Math.random() * 10);
	chats[chatId] = randomNumber;
	await bot.sendMessage(chatId, 'Отгадывай', gameOptions);
}

const start = () => {
	bot.setMyCommands ( [
		{command: '/start', description: 'Начало'},
		{command: '/info', description: 'Информация'},
		{command: '/game', description: 'Игра'},
	])

	bot.on('message', async msg => {
		const text = msg.text;
		const chatId = msg.chat.id;

		if (text === '/start') {
			await bot.sendSticker(chatId, 'CAACAgIAAxkBAAEEbwxiUzPSrxydOg2Piq5MIZkZP779JQACRwoAAveSoUljlWvKBjg9dSME');
			return bot.sendMessage(chatId, 'Ассаламу Алейкум ахи');
		}
		if (text === '/info') {
			await bot.sendSticker(chatId, 'CAACAgIAAxkBAAEEbxBiUzjuw-_bngiOhwAB-UQ4hAPkCesAAhQAA-6DgB8f6U72fEHTiiME');
			return bot.sendMessage(chatId, `Этот бот создан Абдульчиком. Твой ник: ${msg.from.username}`);
		}
		if (text === '/game') {
			return startGame(chatId);
		}
		return bot.sendMessage(chatId, 'Неверная команда, попробуйте другую!');
	})

	bot.on('callback_query', async msg => {
		const data = msg.data;
		const chatId = msg.message.chat.id;
		if(data === '/again') {
			return startGame(chatId);
		}
		if (data === chats[chatId]) {
			return bot.sendMessage(chatId, `Поздравляю, Вы угадали цифру ${chats[chatId]}`, againOptions)
		} else {
			return bot.sendMessage(chatId, `Вы не угадали цифру, бот загадал цифру ${chats[chatId]}`, againOptions)
		}
	})
}

start()
