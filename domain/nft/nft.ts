import { transformAndValidateSync } from 'class-transformer-validator';
import { IsOptional } from 'class-validator';
import { Expose } from '@infrastructure/domain';
import { Scalars } from '@infrastructure/scalars';
import { NftBackendResponse } from '@interfaces/backend/NftResponse';
import { NftNearResponse } from '@interfaces/blockchain/near/NftResponse';
import { Blockchain, IsValidBlockchain, buildAvatarUrl } from '..';
import { Transform, instanceToPlain } from 'class-transformer';

const mediaBaseUrl = process.env.NEXT_PUBLIC_IPFS_URL;

const buildMediaUrl = (media: string) => {
  if(!media) return '';
  
  if(media.includes(mediaBaseUrl!)) {
    return media;
  }
  return `${mediaBaseUrl}/${media}`;
}

const buildCreator = (creator: Creator) => {
  const { id, name, avatar } = creator;

  return {
    id,
    name,
    avatar: buildAvatarUrl(avatar),
  }
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

    return nft;
  }

  static toPlain(nft: NftBackend) {
    return instanceToPlain(nft);
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
  @Transform(({ obj }) => buildCreator(obj.creator))
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
  @Transform(({obj}) => obj.owner_id)
  owner: Scalars['String'];
}

export type { Nft };
export { NftBackend, NftNear };
