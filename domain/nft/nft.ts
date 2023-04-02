import { transformAndValidateSync } from 'class-transformer-validator';
import { IsOptional } from 'class-validator';
import { Expose } from '@infrastructure/domain';
import { Scalars } from '@infrastructure/scalars';
import { NftResponse } from '@interfaces/NftResponse';
import { Blockchain, IsValidBlockchain } from '..';

class Nft {
  static fromData(data: NftResponse): Nft {
    return transformAndValidateSync(Nft, data);
  }

  @Expose()
  id: Scalars['UUID'];

  @Expose()
  @IsOptional()
  title: Scalars['String'];

  @Expose()
  @IsOptional()
  description: Scalars['String'];

  @Expose()
  media: Scalars['String'];

  @Expose()
  price: Scalars['String'];

  @Expose()
  @IsValidBlockchain()
  blockchain: Blockchain;
}

export { Nft };
