import { IMeetupData } from "@/types/meetup.types";
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { toast, ToastContainer } from "react-toastify";

const NewMeetupPage = () => {
  const newMeetupHandler = async (meetupData: IMeetupData) => {
    await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetupData),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) =>
        toast.success(`Meetup ${JSON.stringify(data.details.title)} was created successfuly`, {
          autoClose: 3000,
          position: "bottom-center",
        })
      )
      .catch((error: Error) => {
        console.error(error);
        toast.error(error.message, {
          autoClose: 3000,
          position: "bottom-center",
        });
      });
  };

  return (
    <>
      <NewMeetupForm onAddMeetup={newMeetupHandler} />
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
      />
    </>
  );
};

export default NewMeetupPage;
