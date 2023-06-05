import { useNear } from '@infrastructure/blockchain/near';
import { FundForm } from '@ui/viewComponents/FundForm';

const Fund = () => {
  const { storageDeposit } = useNear();

  const handleFund = (amount: string, accountId: string) => {
    storageDeposit({ amount, accountId, callbackUrl: window.location.href });
  };

  return <FundForm onSubmit={handleFund} />;
};

export { Fund };
