import MeetupList from "../components/meetups/MeetupList";
import Layout from "../components/layout/Layout";
import { useEffect } from "react";
import { IMeetupData, IMeetupItem } from "@/types/meetup.types";
import { revalidateTag } from "next/cache";
const meetups = [
  {
    id: 'm1',
    image: "https://dummyimage.com/300x250",
    title: "meetup title",
    address: "some address 12345, city",
    description: "first meetup",
  },
  {
    id: 'm2',
    image: "https://dummyimage.com/300x250",
    title: "meetup title 2",
    address: "some address 12345, city",
    description: "Second meetup",
  },
  {
    id: 'm3',
    image: "https://dummyimage.com/300x250",
    title: "meetup title 3",
    address: "some address 12345, city",
    description: "Third meetup",
  },
];

interface IHomeProps {
  meetups: IMeetupItem[]
}
const Home: React.FC<IHomeProps> = ({meetups}) => {

  return (
      <MeetupList meetups={meetups} />
  );

};


// // this code will never be executed on the client side:
// // this code runs for every request or on-demand of some trigger

// export const getServerSideProps = (context: any) => {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups
//     }
//   }
// }

//this code will never be executed on the client side:
//revalidate: regenerate the page and data ON THE SERVER every X seconds 
export const getStaticProps = async() => {
  return {
    props: {
      meetups
    },
    revalidate: 60
  }
}

export default Home;
