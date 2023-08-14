import axios from "axios";

export const API_URL = import.meta.env.VITE_API_BASE_URL;
export class ApiService {
  private api;

  constructor(baseURL: string = API_URL) {
    this.api = axios.create({
      baseURL: baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  async fetchRates(): Promise<number> {
    const { data }: { data: RatesResponse } = await this.api.post(
      "/trade/rates",
      { data: JSON.stringify({}) }
    );
    return parseFloat(data.BTCEUR.price);
  }

  async postOrder(btcEquivalent: number): Promise<LightningTopupResponse> {
    const satoshis = btcEquivalent * 100000000;

    const userId = import.meta.env.VITE_STRIGA_USER_ID;
    const accountId = import.meta.env.VITE_STRIGA_ACCOUNT_ID;

    if (!userId || !accountId)
      throw new Error("User ID and Account ID are required.");

    const body = {
      userId: userId,
      accountId: accountId,
      amount: Math.round(satoshis).toString(),
      ttl: 10,
    };

    const response = await this.api.post(
      "/wallets/account/lightning/topup",
      body
    );
    return response.data;
  }
}
