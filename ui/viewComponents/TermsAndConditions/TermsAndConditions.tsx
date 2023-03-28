import { Fragment } from 'react';

type Props = {
  isVisible: boolean;
  onAccept: () => void;
  onReject: () => void;
};

const TermsAndConditions = ({ isVisible, onAccept, onReject }: Props) => {
  return (
    <Fragment>
      {isVisible && (
        <Fragment>
          <h1>Terms and Conditions</h1>
          <p>
            These terms and conditions outline the rules and regulations for the
            use of Kirunalabs&apos;s Website.
          </p>
          <p>
            By accessing this website we assume you accept these terms and
            conditions in full. Do not continue to use Kirunalabs&apos;s website
            if you do not accept all of the terms and conditions stated on this
            page.
          </p>
          <button onClick={onReject}>Reject</button>
          <button onClick={onAccept}>Accept</button>
        </Fragment>
      )}
    </Fragment>
  );
};

export { TermsAndConditions };
