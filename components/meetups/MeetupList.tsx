import { IMeetupItem } from '@/types/meetup.types';
import MeetupItem from '../../components/meetups/MeetupItem';
import classes from './MeetupList.module.css';

interface IMeetupListProps {
  meetups: IMeetupItem[];
};

export const MeetupList:React.FC<IMeetupListProps> = (props) => {
  return (
    <ul className={classes.list}>
      {props.meetups.map((meetup) => (
        <MeetupItem
          key={meetup.id}
          id={meetup.id}
          image={meetup.image}
          title={meetup.title}
          address={meetup.address}
        />
      ))}
    </ul>
  );
}

export default MeetupList;
