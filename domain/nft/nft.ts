import { transformAndValidateSync } from 'class-transformer-validator';
import { IsOptional } from 'class-validator';
import { Expose } from '@infrastructure/domain';
import { Scalars } from '@infrastructure/scalars';
import { NftBackendResponse } from '@interfaces/backend/NftResponse';
import { NftNearResponse } from '@interfaces/blockchain/near/NftResponse';
import { Blockchain, IsValidBlockchain } from '..';
import { Transform, instanceToPlain } from 'class-transformer';

const mediaBaseUrl = process.env.NEXT_PUBLIC_IPFS_URL;

const buildMediaUrl = (media: string) => {
  if(!media) return '';
  
  if(media.includes(mediaBaseUrl!)) {
    return media;
  }
  return `${mediaBaseUrl}/${media}`;
}

interface Nft {
  id: Scalars['UUID'];

  title: Scalars['String'];

  description: Scalars['String'];

  media: Scalars['String'];

  blockchain: Blockchain;
}

type Creator = {
  id: number;
  name: string;
  email: Maybe<string>;
  avatar: string;
};

interface NftWithCreator extends Nft {
  creator: Creator
}

class NftBackend implements NftWithCreator {
  static fromData(data: NftBackendResponse): NftWithCreator {
    const nft = transformAndValidateSync(NftBackend, data, {
      transformer: { strategy: 'excludeAll' },
    });
    //nft.creator = data.creator;

    return nft;
  }

  static toPlain(nft: NftBackend) {
    let plainNft = instanceToPlain(nft);
    plainNft.creator = nft.creator;// TODO maybe this is not necessary

    return plainNft;
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
  @Transform(({ obj }) => buildMediaUrl(obj.media))
  media: Scalars['String'];

  @Expose()
  @IsValidBlockchain()
  blockchain: Blockchain;

  @Expose()
  creator: Creator;
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

  @Transform(({ obj }) => buildMediaUrl(obj.metadata.media))
  media: Scalars['String'];

  @Expose()
  @IsValidBlockchain()
  @Transform(() => 'NEAR')
  blockchain: Blockchain;

  @Expose()
  owner: Scalars['String'];
}

export type { Nft };
export { NftBackend, NftNear };
