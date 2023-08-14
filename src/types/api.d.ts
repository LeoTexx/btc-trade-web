declare interface RatesResponse {
  BTCEUR: {
    price: string;
  };
}

declare interface InvoicePaidResponse {
  type: "invoice_paid";
  balanceAfter: {
    amount: string;
    currency: string;
  };
}

declare interface LightningTopupResponse {
  id: string;
  description: string;
  amount: string;
  invoice: string;
  expiry: number;
}
