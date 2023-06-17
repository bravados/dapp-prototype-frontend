import { Fragment } from 'react';
import { KirunaDialog } from '../KirunaDialog';
import { Button } from '@mui/material';

type Props = {
  isVisible: boolean;
  onAccept: () => void;
  onReject: () => void;
};

const TermsAndConditions = ({ isVisible, onAccept, onReject }: Props) => {
  const content = (
    <Fragment>
      These terms and conditions outline the rules and regulations for the use
      of Kirunalabs&apos;s Website. By accessing this website we assume you
      accept these terms and conditions in full. Do not continue to use
      Kirunalabs&apos;s website if you do not accept all of the terms and
      conditions stated on this page.
    </Fragment>
  );
  return (
    <KirunaDialog
      isOpen={isVisible}
      title={'Terms and Conditions'}
      content={content}
    >
      <Button variant="whiteBackground" onClick={onReject}>
        Reject
      </Button>
      <Button variant="whiteBackground" onClick={onAccept}>
        Accept
      </Button>
    </KirunaDialog>
  );
};

export { TermsAndConditions };
