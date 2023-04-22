import { NftService } from '@services/nfts/nft.port';
import { NftAdapter } from '@services/nfts/nft.adapter';

class GetNftUsecase {
  private nftService: NftService;

  constructor() {
    this.nftService = new NftAdapter();
  }

  getNft() {
    return this.nftService.getNft();
  }
}

const useGetNft = () => {
  return new GetNftUsecase().getNft();
};

export { useGetNft };
