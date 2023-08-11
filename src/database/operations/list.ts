import nickname from "../schemas/nickname";
import { nicknameIsAvailable, diffDate } from '../../routine/CheckAccount';

export default async function list(size: number) {

  const all = await nickname.find({}).select({ _id: 0, __v: 0 });

  const decay = all.sort((a: any, b: any) => {
    const a_ = diffDate(a.lastGame, a.level);
    const b_ = diffDate(b.lastGame, b.level);
    return a_ - b_;
  });

  const page = decay.slice(0, size);

  return page.map((account: any) => {
    const decay_ = diffDate(account.lastGame, account.level);

    return {
      userNum: account.userNum,
      nickname: account.nickname,
      level: account.level,
      decay: decay_,
      isAvailable: nicknameIsAvailable(decay_),
    };
  });
}
