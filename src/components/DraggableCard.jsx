import React, { useState } from "react";
import axios from "axios";

import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { DeleteIcon, EditIcon, SaveIcon, CancelIcon } from "../Icon";

function DraggableCard({ data, deleteCard, updateCard }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: data.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  const [isEdit, setIsEdit] = useState(false);
  const [editedName, setEditedName] = useState(data.name);
  const [editedDetails, setEditedDetails] = useState(data.details);

  const handleEditClick = (e) => {
    setIsEdit(true);
  };
  const handleDeleteClick = () => {
    deleteCard(data.id);
    axios
      .delete(`https://kanban-board-backend-iota.vercel.app/api/cards/${data._id}`)
      .then(function (response) {
        // Handle the success response here
        console.log(response.data);
      })
      .catch(function (error) {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  };
  const handleSaveClick = () => {
    const updatedData = {
      name: editedName,
      details: editedDetails,
    };
    axios
      .put(`https://kanban-board-backend-iota.vercel.app/api/cards/${data._id}`, updatedData)
      .then(function (response) {
        // Handle the success response here
        updateCard(data.id, updatedData);
      })
      .catch(function (error) {
        // Handle any errors that occurred during the request
        console.error(error);
      });
    setIsEdit(false);
    // You can also update the data in the parent component's state or make an API call here
  };

  const handleCancelClick = () => {
    // Cancel the edit mode and reset the edited values to the original data
    setIsEdit(false);
    setEditedName(data.name);
    setEditedDetails(data.details);
  };

  return (
    <Card className="mt-16 md:w-80 mx-auto z-10" style={style}>
      {isEdit ? (
        <CardBody>
          <div className="mb-2 py-2">
            <input
              className="px-2 border border-black w-full p-1 rounded-xl"
              type="text"
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>
          <div className="mt-2 py-2">
            <textarea aria-label="detail"
              className="px-2 border border-black w-full pt-1 rounded-xl"
              value={editedDetails}
              onChange={(e) => setEditedDetails(e.target.value)}
            />
          </div>
        </CardBody>
      ) : (
        <CardBody {...attributes} {...listeners} ref={setNodeRef}>
          <Typography variant="h6" color="blue-gray" className="mb-1">
            {data.name}
          </Typography>
          <Typography>{data.details}</Typography>
        </CardBody>
      )}
      <CardFooter className="pt-0 flex gap-4">
        {isEdit ? (
          <>
            <div onClick={handleSaveClick} className="mx-4 text-black">
              <SaveIcon />
            </div>
            <div onClick={handleCancelClick} className="text-red-600">
              <CancelIcon />
            </div>
          </>
        ) : (
          <>
            <div onClick={handleEditClick} className="text-black">
              <EditIcon className="mx-4" />
            </div>
            <div onClick={handleDeleteClick} className="text-red-600">
              <DeleteIcon />
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  );
}

export default DraggableCard;
