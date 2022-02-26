import React, {useEffect} from "react";
import {useState} from "react";
import {Button} from "../../../components/Button/Button";
import {PopUp} from "../../../components/PopUp/PopUp";
import {AddPackForm} from "./AddPackForm";

type PopUpAddPackPropsType = {
  action: (newName: string) => void
  header: string
}

export const PopUpAddPack = React.memo(({action,header}: PopUpAddPackPropsType) => {

  const [activePopUp, setActivePopUp] = useState<boolean>(true)

  const handleSetActivePopUp = () => {

  }

  useEffect(() => {

  }, [activePopUp])

  return (
    <>
      <PopUp
        name={header}
        popUpStatus={activePopUp}
        popUpToggle={setActivePopUp}>
        <AddPackForm addPack={action}
                     popUpToggle={setActivePopUp}/>
      </PopUp>
      <Button
        padding={'40px'}
        onClick={handleSetActivePopUp}>
        Add New Pack
      </Button>
    </>
  )
})