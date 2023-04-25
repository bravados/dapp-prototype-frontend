import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { User } from '@domain/user';
import { UserAdapter } from '@services/users/user.adapter';

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const userIds = await new UserAdapter().getUserIds();

  return {
    paths: userIds.map((id) => ({ params: { id: id.toString() } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<User, Params> = async ({
  params,
}: GetStaticPropsContext<Params>) => {
  const userId = parseInt(params!.id);
  const user = await new UserAdapter().getUserById(userId);

  return {
    props: user,
  };
};

const Users = (user: User) => {};

export default Users;
