export interface AccountOperations {
  accId: string
  balance: number
  accountType: string
  currentPage: number
  totalPgaes: number
  size: number
  accountOperationDTOList: AccountOperationDtolist[]
}

export interface AccountOperationDtolist {
  accountId: any
  operationDate: string
  amount: number
  operationType: string
  description: string
}

export interface AccountOperation {
  accountId: string
  operationDate: string
  amount: number
  operationType: string
  description: string
}
