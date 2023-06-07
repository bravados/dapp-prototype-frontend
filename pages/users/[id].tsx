import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { User } from '@domain/user';
import { UserAdapter } from '@services/users/user.adapter';
import { UserProfileScreen } from '@screens/UserProfile';
import { MainLayout } from '@ui/layouts';

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  let userIds: number[] = [];

  try {
    userIds = await new UserAdapter().getUserIds();
  } catch (e) {
    console.log(e);
  }

  return {
    paths: userIds.map((id) => ({ params: { id: id.toString() } })),
    fallback: true,
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
      <UserProfileScreen preloadedUser={user} />
    </MainLayout>
  );
};

export default Users;
