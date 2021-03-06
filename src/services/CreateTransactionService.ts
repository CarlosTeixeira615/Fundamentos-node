import TransactionsRepository from "../repositories/TransactionsRepository";
import Transaction from "../models/Transaction";

interface Req {
  title: string;
  value: number;
  type: "income" | "outcome";
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Req): Transaction {
    if (!["income", "outcome"].includes(type)) {
      throw new Error("params not value");
    }

    const { total } = this.transactionsRepository.getBalance();
    if (type == "outcome" && total < value) {
      throw new Error("seta pobre");
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });
    return transaction;
  }
}

export default CreateTransactionService;
