import React, { useState } from "react"
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Button,
} from "@material-tailwind/react"

function MessageDialog(props) {
  const {
    open,
    onClose,
    onAddCard,
    onUpdateCard,
    onDeleteCard,
    category,
    card,
  } = props
  const [username, setUsername] = useState(card ? card.name : "")
  const [message, setMessage] = useState(card ? card.details : "")


  const handleUpdate = () => {
    const updatedCard = {
      id: card.id,
      name: username,
      details: message,
      categories: category,
    }
    onUpdateCard(updatedCard)
    onClose()
  }

  const handleDelete = () => {
    onDeleteCard(card.id)
    onClose()
  }

  return (
    <Dialog open={open} handler={onClose}>
      <div className="flex items-center justify-between">
        <DialogHeader>{card ? "Update Card" : "Add Card"}</DialogHeader>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-3 h-5 w-5"
          onClick={onClose}
        >
          {/* Close icon */}
        </svg>
      </div>
      <DialogBody divider>
        <div className="grid gap-6">
          <Input
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Textarea
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2">
        {card ? (
          <Button variant="outlined" color="red" onClick={handleDelete}>
            Delete Card
          </Button>
        ) : null}
        <Button variant="outlined" color="blue" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="gradient"
          color="green"
          onClick={card ? handleUpdate : onAddCard}
        >
          {card ? "Update Card" : "Add Card"}
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default MessageDialog
