export const IDL: any = {
  version: '0.1.0',
  name: 'soon_vault',
  instructions: [
    {
      name: 'initUser',
      accounts: [
        { name: 'user', isMut: true, isSigner: false },
        { name: 'authority', isMut: true, isSigner: true },
        { name: 'systemProgram', isMut: false, isSigner: false },
      ],
      args: [],
    },
    {
      name: 'createInvestment',
      accounts: [
        { name: 'investment', isMut: true, isSigner: false },
        { name: 'user', isMut: true, isSigner: false },
        { name: 'authority', isMut: true, isSigner: true },
        { name: 'systemProgram', isMut: false, isSigner: false },
      ],
      args: [
        { name: 'investmentAmount', type: 'u64' },
        { name: 'investmentType', type: 'string' },
        { name: 'duration', type: 'u8' },
        { name: 'category', type: 'string' },
      ],
    },
    {
      name: 'buyInvestment',
      accounts: [
        { name: 'investment', isMut: true, isSigner: false },
        { name: 'ticket', isMut: true, isSigner: false },
        { name: 'investmentBuyer', isMut: true, isSigner: true },
        { name: 'user', isMut: true, isSigner: false },
        { name: 'systemProgram', isMut: false, isSigner: false },
      ],
      args: [
        { name: 'investmentId', type: 'u32' },
        { name: 'futureValue', type: 'u64' },
      ],
    },
    {
      name: 'withdrawInvestment',
      accounts: [
        { name: 'investment', isMut: true, isSigner: false },
        { name: 'ticket', isMut: false, isSigner: false },
        { name: 'authority', isMut: true, isSigner: true },
        { name: 'systemProgram', isMut: false, isSigner: false },
      ],
      args: [
        { name: 'investmentId', type: 'u32' },
        { name: 'ticketId', type: 'u32' },
      ],
    },
  ],
  accounts: [
    {
      name: 'User',
      type: {
        kind: 'struct',
        fields: [
          { name: 'lastId', type: 'u32' },
          { name: 'authority', type: 'publicKey' },
          { name: 'lastDeposited', type: 'u64' },
          { name: 'totalAssets', type: 'u64' },
          { name: 'totalInvestments', type: 'u64' },
          { name: 'totalReturns', type: 'u64' },
          { name: 'numberOfDepositedTimes', type: 'u8' },
        ],
      },
    },
    {
      name: 'Investment',
      type: {
        kind: 'struct',
        fields: [
          { name: 'id', type: 'u32' },
          { name: 'authority', type: 'publicKey' },
          { name: 'investmentAmount', type: 'u64' },
          { name: 'lastInvestmentId', type: 'u32' },
          { name: 'investmentType', type: 'string' },
          { name: 'totalAssets', type: 'u64' },
          { name: 'totalReturns', type: 'u64' },
          { name: 'duration', type: 'u8' },
          { name: 'totalInvestor', type: 'u8' },
          { name: 'category', type: 'string' },
          { name: 'timestamp', type: 'i64' },
          { name: 'claimed', type: 'bool' },
        ],
      },
    },
    {
      name: 'Ticket',
      type: {
        kind: 'struct',
        fields: [
          { name: 'id', type: 'u32' },
          { name: 'authority', type: 'publicKey' },
          { name: 'investmentId', type: 'u32' },
          { name: 'totalReturns', type: 'u64' },
        ],
      },
    },
  ],
  errors: [
    { code: 6000, name: 'InvestmentAlreadyPurchased', msg: 'Investment already purchased.' },
    { code: 6001, name: 'NoBuyer', msg: "Can't give an aggregate yield when there is no buyer yet." },
    { code: 6002, name: 'InvalidWithdrawal', msg: "Can't withdraw when you have not invested yet" },
    { code: 6003, name: 'AlreadyClaimed', msg: 'Investment returns already claimed' },
  ],
};
