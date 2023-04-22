import { transformAndValidateSync } from 'class-transformer-validator';
import { IsOptional } from 'class-validator';
import { Expose } from '@infrastructure/domain';
import { Scalars } from '@infrastructure/scalars';
import { NftBackendResponse } from '@interfaces/backend/NftResponse';
import { NftNearResponse } from '@interfaces/blockchain/near/NftResponse';
import { Blockchain, IsValidBlockchain } from '..';
import { Transform } from 'class-transformer';

interface Nft {
  id: Scalars['UUID'];

  title: Scalars['String'];

  description: Scalars['String'];

  media: Scalars['String'];

  blockchain: Blockchain;
}

class NftBackend implements Nft {
  static fromData(data: NftBackendResponse): Nft {
    return transformAndValidateSync(NftBackend, data, {
      transformer: { strategy: 'excludeAll' },
    });
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
  @IsValidBlockchain()
  blockchain: Blockchain;
}

class NftNear implements Nft {
  static fromData(data: NftNearResponse): Nft {
    return transformAndValidateSync(NftNear, data, {
      transformer: { strategy: 'excludeAll' },
    });
  }

  @Expose({ name: 'token_id' })
  id: Scalars['UUID'];

  @Expose()
  @IsOptional()
  @Transform(({ obj }) => obj.metadata.title)
  title: Scalars['String'];

  @Expose()
  @IsOptional()
  @Transform(({ obj }) => obj.metadata.description)
  description: Scalars['String'];

  @Expose()
  @Transform(({ obj }) => obj.metadata.media)
  media: Scalars['String'];

  @Expose()
  @IsValidBlockchain()
  @Transform(() => 'NEAR')
  blockchain: Blockchain;
}

export type { Nft };
export { NftBackend, NftNear };
