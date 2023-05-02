import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { User } from '@domain/user';
import { UserAdapter } from '@services/users/user.adapter';
import { UserScreen } from '@screens/UserProfile';
import { MainLayout } from 'components/layouts';

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

export const getStaticProps: GetStaticProps<any, Params> = async ({
  params,
}: GetStaticPropsContext<Params>) => {
  const userId = parseInt(params!.id);
  const user = await new UserAdapter().getUserById(userId);
  const plainUser = User.toPlain(user);

  return {
    props: plainUser,
  };
};

const Users = (user: User) => {
  return (
    <MainLayout>
      <UserScreen preloadedUser={user} />
    </MainLayout>
  );
};

export default Users;