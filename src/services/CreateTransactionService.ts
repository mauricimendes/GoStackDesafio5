import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Request {
	title: string
	value: number
	type: 'income' | 'outcome'
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request): Transaction {
	// O Repositório vai cuidar dos dados, consumir, vamos manipular os dados...
	if(!['income', 'outcome'].includes(type)) {
		throw new Error('Transaction type ins valid')
	}
	
	const { total } = this.transactionsRepository.getBalance()

	if(type === 'outcome' && total < value) {
		throw new Error('You do not have enough balance.')
	} 


	const transaction = this.transactionsRepository.create({
		title, 
		value, 
		type
	})

	return transaction
  }
}

export default CreateTransactionService;
