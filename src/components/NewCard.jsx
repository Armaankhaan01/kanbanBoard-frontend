import { Card, CardBody, CardFooter } from "@material-tailwind/react";
import axios from 'axios';
import { useState } from "react";
import { CancelIcon, SaveIcon } from "../Icon";
const api_uri = `${import.meta.env.REACT_APP_BASE_URL}/api/cards`;

const NewCard = ({ category, handleClose, saveNewCard }) => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState("");
  const handleSaveClick = () => {
    let newCard = {
      id: Date.now(),
      name,
      details,
      category,
    };
    saveNewCard(newCard);
    axios.post("https://kanban-board-backend-iota.vercel.app/api/cards", newCard)
    .then(function (response) {
      // Handle the success response here (if needed)
      // console.log(response.data);
      handleClose();
    })
    .catch(function (error) {
      // Handle any errors that occurred during the request
      console.error(error);
    });
  };
  const handleCancelClick = () => {
    handleClose();
  };
  return (
    <Card className="mt-16 md:w-80 mx-auto">
      <CardBody>
        <h2 className="text-xl text-black text-center py-2">New Card</h2>
        <div className="mb-2 py-2">
          <input
            className="px-2 border border-black w-full p-1 rounded-xl"
            type="text"
            placeholder="Name"
            value={name}
                        name="name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mt-2 py-2">
          <textarea
            className="px-2 border border-black w-full pt-1 rounded-xl"
            value={details}
            placeholder="Detail"
            name="details"
            onChange={(e) => setDetails(e.target.value)}
          />
        </div>
      </CardBody>
      <CardFooter className="pt-0 flex gap-4">
        <div onClick={handleSaveClick} className="px-4 text-black">
          <SaveIcon />
        </div>
        <div onClick={handleCancelClick} className="text-red-600">
          <CancelIcon />
        </div>
      </CardFooter>
    </Card>
  );
};
export default NewCard;
