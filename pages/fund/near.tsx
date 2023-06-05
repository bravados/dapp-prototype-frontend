import { MainLayout } from '@ui/layouts';
import { WalletConnectedRoute } from '@screens/WalletConnectedRoute';
import { Fund } from '@screens/Fund';

const FundAccount = () => {
  return (
    <MainLayout>
      <WalletConnectedRoute>
        <Fund />
      </WalletConnectedRoute>
    </MainLayout>
  );
};

export default FundAccount;
