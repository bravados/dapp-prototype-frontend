import { useNear } from '@infrastructure/blockchain/near';
import { Home } from '@ui/viewComponents';

const HomeScreen = () => {
  const { isSignedIn } = useNear();

  return <Home isSignedIn={isSignedIn} />;
};

export { HomeScreen };
