import { IMeetupCollectionItem, IMeetupItem } from '@/types/meetup.types';
import Card from '../ui/Card';
import classes from './MeetupItem.module.css';

import { useRouter } from 'next/router';

type TMeetupItemProps = IMeetupItem;

const  MeetupItem: React.FC<TMeetupItemProps> = (props) => {

  const {id, title, address, image} = props;
  const router = useRouter();

  const showDetailsHandler = () => {
    router.push(`/${id}`);
  }

  return (
    <li className={classes.item}>
      <Card>
        <div className={classes.image}>
          <img src={image} alt={title} />
        </div>
        <div className={classes.content}>
          <h3>{title}</h3>
          <address>{address}</address>
        </div>
        <div className={classes.actions}>
          <button onClick={showDetailsHandler}>Show Details</button>
        </div>
      </Card>
    </li>
  );
}

export default MeetupItem;
