import MeetupDetails from "@/components/meetups/MeetupDetails";
import { IMeetupData } from "@/types/meetup.types";

interface IMeetupDetailsProps {
  meetupData: IMeetupData
}

const MeetupDetailsPage: React.FC<IMeetupDetailsProps> = ({meetupData}) => {
  console.log("details", meetupData);

  return <MeetupDetails  meetupData={meetupData}/>;
};

export const getStaticPaths = async () => {
  return {
    fallback: true,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
      {
        params: {
          meetupId: "m3",
        },
      },
    ],
  };
};

//This code will never be executed on the client side:
//Prop: revalidate, regenerate the page and data ON THE SERVER every X seconds
export const getStaticProps = async (context: any) => {
  const { params } = context;

  return {
    props: {
      meetupData: {
        id: params.meetupId,
        image: 'https://dummyimage.com/300x250',
        title: "title",
        address: "Street, city, State, zip code",
        description: "meeting details",
      },
    },
    revalidate: 60,
  };
};

export default MeetupDetailsPage;
