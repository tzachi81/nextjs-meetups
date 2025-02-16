import { useRef } from 'react';

import { IMeetupData } from '../../types/meetup.types';

import Card from '../ui/Card';
import classes from './NewMeetupForm.module.css';

interface INewMeetupFormProps{
  onAddMeetup: (meetupData: IMeetupData) => void,
}

const NewMeetupForm: React.FC<INewMeetupFormProps> = (props) => {
  const titleInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const addressInputRef = useRef<HTMLInputElement>(null);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);

  function submitHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current ? titleInputRef.current.value : '';
    const enteredImage = imageInputRef.current ? imageInputRef.current.value : '';
    const enteredAddress = addressInputRef.current ? addressInputRef.current.value : '';
    const enteredDescription = descriptionInputRef.current ? descriptionInputRef.current.value : '';

    const meetupData: IMeetupData = {
      title: enteredTitle,
      image: enteredImage,
      address: enteredAddress,
      description: enteredDescription,
    };

    props.onAddMeetup(meetupData);
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Meetup Title</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Meetup Image</label>
          <input type='url' required id='image' ref={imageInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='address'>Address</label>
          <input type='text' required id='address' ref={addressInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='description'>Description</label>
          <textarea
            id='description'
            required
            rows={5}
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Meetup</button>
        </div>
      </form>
    </Card>
  );
}

export default NewMeetupForm;
