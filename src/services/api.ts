import axios from "axios";

export class ApiService {
  private api;

  constructor(baseURL: string = "http://localhost:3000") {
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

    const userId = "23adb37b-a794-4156-af4e-afd752de6ae2";
    const accountId = "ee176181fe643024ab6d4389fbce5e3c";

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
