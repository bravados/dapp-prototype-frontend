import { Fragment } from 'react';
import { KirunaDialog } from '../KirunaDialog';

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
      <button onClick={onReject}>Reject</button>
      <button onClick={onAccept}>Accept</button>
    </KirunaDialog>
  );
};

export { TermsAndConditions };
