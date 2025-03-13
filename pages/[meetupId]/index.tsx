import MeetupDetails from "@/components/meetups/MeetupDetails";
import { IMeetupCollectionItem, IMeetupData } from "@/types/meetup.types";
import { client } from "../api/dbConnect";
import { ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";
import { NextPage } from "next";

interface IMeetupDetailsProps {
  meetupData: IMeetupData;
}

const MeetupDetailsPage: NextPage<IMeetupDetailsProps> = ({ meetupData }) => {
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
  await client.connect();
  const db = client.db();
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


  //TODO: handle no item found
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
    revalidate: 1,
  };
};

export default MeetupDetailsPage;
