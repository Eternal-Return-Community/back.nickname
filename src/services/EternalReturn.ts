import axios, { AxiosInstance } from 'axios';

export default class EternalReturn {

  private readonly _instance: AxiosInstance;
  private readonly _nickname: string;

  constructor(nickname: string) {
    this._instance = axios.create({
      baseURL: 'https://open-api.bser.io/v1',
      method: 'GET',
      headers: {
        'x-api-key': process.env.TOKEN,
        'Content-Type': 'application/json'
      }
    })
    this._nickname = nickname;
  }

  async findUserID(): Promise<number> {
    return this._instance(`/user/nickname?query=${this._nickname}`)
      .then(response => response.data.user && (response.data.user.userNum) ? response.data.user.userNum : 0)
      .catch(e => console.error(e));
  };

  async findLastGame(): Promise<any> {
    const userId = await this.findUserID();

    try {
      const { data } = await this._instance(`/user/games/${userId}`);
      return {
        userNum: userId,
        lastGame: data.userGames && (data.userGames[0].startDtm) ? data.userGames[0].startDtm : 0,
        accountLevel: data.userGames && (data.userGames[0].accountLevel) ? data.userGames[0].accountLevel : 0
      }
    } catch (e) {
      console.error(e)
    };

  }
}