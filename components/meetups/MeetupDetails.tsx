import { Fragment } from 'react';
import classes from './MeetupDetails.module.scss';
import { IMeetupData } from '@/types/meetup.types';


interface IMeetupDetailsProps {
  meetupData: IMeetupData
}

const MeetupDetails: React.FC<IMeetupDetailsProps> = ({ meetupData }) => {

  if (!meetupData) {
    return <p>Loading...</p>;
  }

  const {image, address, description, title } = meetupData;

  return (
    <Fragment>
      <img className={classes.image} src={image} alt="meetup image" />
      <h1>{title}</h1>
      <address>{address}</address>
      <details open>{description}</details>
    </Fragment>
  );
};

export default MeetupDetails;
