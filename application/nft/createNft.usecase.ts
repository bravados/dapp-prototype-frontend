import { NftService } from '@services/nfts/nft.port';
import { NftAdapter } from '@services/nfts/nft.adapter';

class CreateNftUsecase {
  private nftService: NftService;

  constructor() {
    this.nftService = new NftAdapter();
  }

  createNft() {
    return this.nftService.createNft();
  }
}

const useCreateNft = () => {
  return new CreateNftUsecase().createNft();
};

export { useCreateNft };
