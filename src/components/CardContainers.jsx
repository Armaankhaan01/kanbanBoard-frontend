import { useEffect, useState } from "react"
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
} from "@dnd-kit/core"
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { Button, Input, Spinner } from "@material-tailwind/react"
import CardContainer from "./CardContainer"
import axios from "axios"

const CardContainers = () => {
  const [containerName, setContainerName] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categoryName, setCategoryName] = useState("")
  const [cardData, setCardData] = useState([])

  //Sensor Handling
  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)
  const keyboardSensor = useSensor(KeyboardSensor)

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

  const handleCategoryInput = (e) => {
    setCategoryName(e.target.value)
  }

  useEffect(() => {
    axios
      .get("https://kanban-board-backend-iota.vercel.app/api/cards")
      .then(function (response) {
        // console.log(response.data);
        setCardData(response.data)
        setIsLoading(false)
      })
      .catch(function (error) {
        setIsLoading(false)
        console.error(error)
      })
    axios
      .get("https://kanban-board-backend-iota.vercel.app/api/categories")
      .then(function (response) {
        // console.log(response.data);
        setContainerName(response.data)
      })
      .catch(function (error) {
        setIsLoading(false)
        console.error(error)
      })
  }, [])
  const addCategories = () => {
    if (categoryName) {
      const newCategory = { category: categoryName, color: "bg-pink-600" }
      axios
        .post(
          "https://kanban-board-backend-iota.vercel.app/api/categories",
          newCategory
        )
        .then((response) => {
          console.log("Category added:", response.data)
          setContainerName([...containerName, newCategory])
          setCategoryName("")
        })
        .catch((error) => {
          console.error("Error adding category:", error)
        })
    }
  }

  // Function to delete a card
  const deleteCard = async (cardId) => {
    const newCardData = cardData.filter((item) => item.id !== cardId)
    setCardData(newCardData)
  }

  const saveNewCard = (newCard) => {
    // Create a new array with the new card added
    const updatedCardData = [...cardData, newCard]

    // Update the state with the new array
    setCardData((prevCardData) => [...prevCardData, newCard])
    // console.log(cardData);
  }
  // Function to update a card by ID
  const updateCard = (id, updatedData) => {
    // Find the index of the card with the given ID
    const cardIndex = cardData.findIndex((card) => card.id === id)

    if (cardIndex !== -1) {
      // Create a copy of the cards array
      const updatedCards = [...cardData]

      // Update the card data at the found index
      updatedCards[cardIndex] = {
        ...updatedCards[cardIndex],
        ...updatedData,
      }

      // Set the updated cards array in state
      setCardData(updatedCards)
    }
  }

  const onDragEnd = (event) => {
    const { active, over } = event

    if (active && over) {
      // Get the dragged card and target category
      const draggedCard = cardData.find((card) => card.id === active.id)
      const targetCategory = over.id
      draggedCard.category = targetCategory

      // Update the card's category and state locally
      const updatedCardData = cardData.map((card) => {
        if (card.id === active.id) {
          return draggedCard
        }
        return card
      })
      setCardData(updatedCardData)

      // Send a PUT request to update the card on the server
      axios
        .put(
          `https://kanban-board-backend-iota.vercel.app/api/cards/${draggedCard._id}`,
          draggedCard
        )
        .then(function (response) {})
        .catch(function (error) {
          // Handle any errors that occurred during the request
          console.error(error)
          setCardData(cardData)
        })
    }
  }

  if (isLoading) {
    return (
      <div className="flex justify-center content-center text-center pt-[20rem] h-screen flex-row">
        <Spinner className="h-16 w-16 text-gray-900/50" />
        <h2 className="text-xl pt-5 px-10"> Please Wait ...</h2>
      </div>
    )
  }

  return (
    <DndContext
      onDragEnd={onDragEnd}
      collisionDetection={closestCenter}
      sensors={sensors}
    >
      <div className="flex md:mx-5 mx-auto flex-col md:flex-row items-center md:items-start min-h-[100vh] overflow-auto">
        {containerName.map(({ category, color }) => (
          <CardContainer
            key={category}
            category={category}
            color={color}
            cardData={cardData}
            deleteCard={deleteCard}
            saveNewCard={saveNewCard}
            updateCard={updateCard}
          />
        ))}
        {/* Add categories */}
        <div className="h-full mb-28 md:w-96 me-5 relative justify-center">
          <div className="capitalize text-2xl absolute top-5 w-100 truncate">
            <h1 className="text-center">Add New Category</h1>
          </div>
          <div className="mt-16 md:w-96 m-auto flex md:flex-col">
            {" "}
            <Input
              label="Category Name"
              name="categoryName"
              onChange={handleCategoryInput}
            />
            <Button
              variant="outlined"
              onClick={addCategories}
              className="md:mt-8 ms-5 md:ms-0"
            >
              +
            </Button>
          </div>
        </div>
      </div>
    </DndContext>
  )
}

export default CardContainers
