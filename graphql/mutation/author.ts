import { Context } from '../../context';
// import { generatePassword } from '../../utils/helpers';

export const register = async (parent: any, { data }: any, ctx: Context) => {
  try {
    const { name, email, password, username } = data;
    // const p = await generatePassword(password);
    const res = await ctx.prisma.author.create({
      data: { name, password, email: email || '', username },
    });
    return res;
  } catch (error) {
    ctx.catchError(error);
  }
};
