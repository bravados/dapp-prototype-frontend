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
      In this popup the user (you) is asked to accept or reject the terms and
      conditions. Typically, there will be a link to a document that would
      detail the terms and conditions. The user needs to accept them if they
      want to continue using the platform. When accepted, an account for the
      user is created in the back-end. This only happens once.
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
