import MeetupList from "../components/meetups/MeetupList";
import { IMeetupItem } from "@/types/meetup.types";
import { client } from "./api/dbConnect";
import Head from "next/head";
import { Fragment } from "react";
import { NextPage } from "next";

interface IHomePageProps {
  meetups: IMeetupItem[];
}

const Home: NextPage<IHomePageProps> = ({ meetups }) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Manage your meetups"></meta>
        <link
            href="https://fonts.googleapis.com/css2?family=Lato:wght@700&family=Open+Sans:wght@400;700&display=swap"
            rel="stylesheet"
            type="text/css"
          />
      </Head>
      <MeetupList meetups={meetups} />
    </Fragment>
  );
};

//this code will never be executed on the client side:
//revalidate: regenerate the page and data ON THE SERVER every X seconds
export const getStaticProps = async () => {
  await client.connect();
  const meetupsCollection = client.db("meetups").collection("meetups");

  const results = await meetupsCollection.find().toArray();

  client.close();

  const meetups: IMeetupItem[] = results.map((meetup) => ({
    id: meetup._id.toString(),
    title: meetup.title,
    image: meetup.image,
    address: meetup.address,
  }));


  return {
    props: {
      meetups,
    },
    revalidate: 1
  };
};

export default Home;
