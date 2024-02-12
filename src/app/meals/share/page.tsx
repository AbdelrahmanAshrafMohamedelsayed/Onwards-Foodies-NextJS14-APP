import ImagePicker from "@/components/Image-Picker/image-picker";
import classes from "./page.module.css";
import ShareForm from "@/components/ShareForm/ShareForm";
import { shareMealHandler } from "@/lib/actions";
import MealsFormSubmit from "@/components/ShareForm/ShareForm";
export default function ShareMealPage() {
  // async function shareMealHandler(formData: FormData) {
  //   "use server";
  //   // handle the form submission on the server
  //   // "use server" grantees that this code will run only on the server
  //   // server actions always should be async
  //   // what will in papper
  //   const meal = {
  //     title: formData.get("title"), // "title" => the name of the input field
  //     //             <input type="text" id="title" name="title" required />
  //     creator: formData.get("name"), // "name" => the name of the input field
  //     creator_email: formData.get("email"), // "email" => the name of the input field
  //     summary: formData.get("summary"), // "summary" => the name of the input field
  //     instructions: formData.get("instructions"), // "instructions" => the name of the input field
  //     image: formData.get("image"), // "image" => the name of the input field
  //   };
  //   console.log(meal);
  // }
  return (
    <>
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
        </h1>
        <p>Or any other meal you feel needs sharing!</p>
      </header>
      <main className={classes.main}>
        <form className={classes.form} action={shareMealHandler}>
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>
              <input type="text" id="name" name="name" required />
            </p>
            <p>
              <label htmlFor="email">Your email</label>
              <input type="email" id="email" name="email" required />
            </p>
          </div>
          <p>
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" required />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            <input type="text" id="summary" name="summary" required />
          </p>
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows={10}
              required
            ></textarea>
          </p>
          <ImagePicker label="Image" name="image" />
          <p className={classes.actions}>
            <MealsFormSubmit />
          </p>
        </form>
      </main>
    </>
  );
}
