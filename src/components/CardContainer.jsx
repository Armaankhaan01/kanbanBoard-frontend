import NewCard from "./NewCard"
import { useDroppable } from "@dnd-kit/core"
import { SortableContext } from "@dnd-kit/sortable"
import DraggableCard from "./DraggableCard"
import { Button } from "@material-tailwind/react"
import { useState } from "react"

const CardContainer = ({
  category,
  color,
  cardData,
  deleteCard,
  saveNewCard,
  updateCard,
}) => {
  const [addNewCard, setAddNewCard] = useState(false)
  const handleClose = () => {
    setAddNewCard(false)
  }
  const bgColor = color || "bg-green-600" || "bg-yellow-200" || "bg-blue-400"
  return (
    <div className="w-[90vw]">
      <Droppable id={category}>
        <div
          className={` h-full min-w-[200px] me-5 ${color} rounded-xl p-5 relative my-5 max-w-[350px]`}
        >
          <div className="capitalize text-2xl absolute top-5 ">
            <h1 className="text-center w-full text-black">{category}</h1>
          </div>
          <div className="mt-10"></div>
          <SortableContext
            id={category}
            items={cardData
              .filter((card) => card.category === category)
              .map((card) => card.id)}
          >
            {cardData
              .filter((card) => card.category === category)
              .map((data) => (
                <DraggableCard
                  key={data.id}
                  data={data}
                  deleteCard={deleteCard}
                  updateCard={updateCard}
                />
              ))}
          </SortableContext>
          {addNewCard && (
            <NewCard
              category={category}
              handleClose={handleClose}
              saveNewCard={saveNewCard}
            />
          )}
          <Button onClick={() => setAddNewCard(true)} className="mt-8">
            Add Card
          </Button>
        </div>
      </Droppable>
    </div>
  )
}

function Droppable(props) {
  const { setNodeRef } = useDroppable({
    id: props.id,
  })
  return <div ref={setNodeRef}>{props.children}</div>
}

export default CardContainer
