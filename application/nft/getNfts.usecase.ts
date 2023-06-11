import { NftService } from '@services/nfts/nft.port';
import { NftAdapter } from '@services/nfts/nft.adapter';

class GetNftsUsecase {
  private nftService: NftService;

  constructor() {
    this.nftService = new NftAdapter();
  }

  getNfts() {
    return this.nftService.getNfts();
  }
}

const useGetNfts = () => {
  return new GetNftsUsecase().getNfts();
};

export { useGetNfts };
