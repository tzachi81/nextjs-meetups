import { IMeetupData } from "@/types/meetup.types";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/router";
import { Fragment } from "react";
import Head from "next/head";
import { NextPage } from "next";

const NewMeetupPage: NextPage = () => {
  const router = useRouter();

  const TIMEOUT = 2000;
  type TToastTypes = "success" | "error" | "info" | "warn";

  const raiseToast = async (type: TToastTypes, message: string) => {
    return toast[type](message, {
      autoClose: TIMEOUT,
      position: "bottom-center",
    });
  };

  const newMeetupHandler = async (meetupData: IMeetupData) => {
    await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => {
        const message = `Meetup ${JSON.stringify(
          meetupData.title
        )} was created successfuly`;
        raiseToast("success", message);
      })
      .catch((error: Error) => {
        console.error(error);
        raiseToast("error", error.message);
      })
      .finally(() => {
        router.push("/");
      });
  };

  return (
    <Fragment>

      <Head>
        <title>Create New Meetup</title>
        <meta name="description" content="Create new meetup"></meta>
      </Head>

      <NewMeetupForm onAddMeetup={newMeetupHandler} />

      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
      />
    </Fragment>
  );
};

export default NewMeetupPage;
