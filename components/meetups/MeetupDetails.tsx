import { Fragment } from 'react';
import classes from './MeetupDetails.module.scss';
import { IMeetupData, IMeetupItem } from '@/types/meetup.types';


interface IMeetupDetailsProps {
  meetupData: IMeetupData
}

const MeetupDetails: React.FC<IMeetupDetailsProps> = ({meetupData}) => {

  const {image, address, description, title } = meetupData;

  return (
    <Fragment>
      <img className={classes.image} src={image} alt="meetup image" />
      <h1>{title}</h1>
      <address>{address}</address>
      <details>{description}</details>
    </Fragment>
  );
};

export default MeetupDetails;
