import MeetupDetails from "@/components/meetups/MeetupDetails";
import { IMeetupCollectionItem, IMeetupData } from "@/types/meetup.types";
import { client } from "../api/dbConnet";
import { ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

interface IMeetupDetailsProps {
  meetupData: IMeetupData;
}

const MeetupDetailsPage: React.FC<IMeetupDetailsProps> = ({ meetupData }) => {
  return (
    <Fragment>
      <Head>
        <title>{meetupData?.title}</title>
        <meta name="description" content="View meetup details"></meta>
      </Head>

      <MeetupDetails meetupData={meetupData} />
    </Fragment>
  );
};

export const getStaticPaths = async () => {
  const clientInit = await client.connect();
  const db = clientInit.db();
  const meetupsCollection = db.collection("meetups");
  const meetups = await meetupsCollection
    .find({}, { projection: { _id: 1 } })
    .toArray();

  return {
    fallback: true,
    paths: meetups.map((meetup) => ({
      params: meetup._id,
    })),
  };
};

//This code will never be executed on the client side:
//Prop: revalidate, regenerate the page and data ON THE SERVER every X seconds
export const getStaticProps = async (context: any) => {
  const { meetupId } = context.params;

  const meetupsCollection = client.db('meetups').collection('meetups');

  const oId = ObjectId.createFromHexString(meetupId);

  const selectedMeetup = await meetupsCollection
    .findOne<IMeetupCollectionItem>({ _id: oId })
    .then((data) => {
      if(!data){
        console.log("### NO DATA");
        return null
      } else {
        console.log("### GOT DATA", data);
        return data;
      }
    })
    .catch((error: Error) => console.error(error.message));

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup && (selectedMeetup?._id).toString(),
        title: selectedMeetup?.title,
        image: selectedMeetup?.image,
        address: selectedMeetup?.address,
        description: selectedMeetup?.description,
      },
    },
    revalidate: 60,
  };
};

export default MeetupDetailsPage;
