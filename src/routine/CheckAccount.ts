import nickname from '../database/schemas/nickname';
import EternalReturn from '../services/EternalReturn';

export default async function checkInfo(username: string): Promise<object> {

  const checkGame = new EternalReturn(username);
  const result = await checkGame.findLastGame();
  const checkUser = await addUser(username, result?.lastGame, result?.accountLevel, result?.userNum || 0);
  const decay = diffDate(checkUser, result?.accountLevel)

  return {
    userNum: result?.userNum,
    nickname: username,
    level: result?.accountLevel,
    decay: decay,
    isAvailable: nicknameIsAvailable(decay)
  };

}

async function addUser(username: string, lastGame: string, accountLevel: number, userNum: number): Promise<string> {
  const hasNickname = await nickname.findOne({ nickname: username.toLowerCase() });

  const diffLastGame = hasNickname ? diffGames(hasNickname?.lastGame, lastGame) : false;

  if (!hasNickname) {
    new nickname({
      nickname: username.toLowerCase(),
      userNum: userNum,
      level: accountLevel,
      lastGame: lastGame
    }).save()
      .then(() => console.log('New nickname add in database!'))
      .catch((e) => console.error(e));
  }

  if (diffLastGame) {
    nickname.findOneAndUpdate({ nickname: username.toLowerCase() }, {
      userNum: userNum,
      level: accountLevel,
      lastGame: lastGame
    }).then(() => console.log('New nickname updated in database!'));
  };

  return hasNickname ? hasNickname.lastGame : lastGame;
}

function diffGames(dbLastGame: string, lastGame: string): boolean {
  const db = new Date(dbLastGame);
  const game = new Date(lastGame);
  return game > db ? true : false;
}

export function diffDate(date: string, level: number): number {
  const now = new Date();
  const lastGame = new Date(date);

  const diff = now.getTime() - lastGame.getTime();
  const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
  return daysReaming(diffDays, level);
}

function daysReaming(days: number, level: number): number {
  if (level >= 1 && level <= 10) {
    return Math.max(90 - days, 0);
  } else if (level >= 11 && level <= 20) {
    return Math.max(180 - days, 0);
  } else if (level >= 21) {
    return Math.max(270 - days, 0);
  } else {
    return 0;
  }
}

export function nicknameIsAvailable(decay: number) {
  return decay > 1 ? false : true;
}
