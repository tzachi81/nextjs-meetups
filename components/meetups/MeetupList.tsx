import { IMeetupCollectionItem, IMeetupItem } from "@/types/meetup.types";
import MeetupItem from "../../components/meetups/MeetupItem";
import classes from "./MeetupList.module.css";


interface IMeetupListProps {
  meetups: IMeetupItem[]
}

export const MeetupList: React.FC<IMeetupListProps> = ({ meetups }) => {
  
  return (
    <ul className={classes.list}>
      {meetups.map((meetup: IMeetupItem) => {
        const {id, image, title, address} = meetup;

        return (
          <MeetupItem
            key={id}
            id={id}
            image={image}
            title={title}
            address={address}
          />
        );
      })}
    </ul>
  );
};

export default MeetupList;
