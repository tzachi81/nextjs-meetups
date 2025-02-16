import { IMeetupData } from "@/types/meetup.types";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";

const NewMeetupPAge = () => {

  const newMeetupHandler = (meetupData: IMeetupData) => {
    console.log(meetupData);
  };

  return <NewMeetupForm onAddMeetup={newMeetupHandler}/>;
};

export default NewMeetupPAge;
