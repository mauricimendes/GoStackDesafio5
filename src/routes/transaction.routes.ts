import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
	try {
		const transactions = transactionsRepository.all()
		const balance = transactionsRepository.getBalance()
		return response.json({
			transactions,
			balance
		})
	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

transactionRouter.post('/', (request, response) => {
	try {
		const { title, value, type } = request.body

		// isso vai cuidar das regras de negócio
		const createTransaction = new CreateTransactionService(
			transactionsRepository
		)

		// o execute vai retornar o que a nós esperamos, ou seja, a própria transaction
		const transaction = createTransaction.execute({
			title,
			value,
			type
		})

		return response.json(transaction)

	} catch (err) {
		return response.status(400).json({ error: err.message });
	}
});

export default transactionRouter;
