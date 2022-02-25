import {useEffect, useState} from "react";
import {PopUp} from "../../../components/PopUp/PopUp";
import { EditPackForm } from "./EditPackForm";
import style from "./PopUpEditPack.module.css"

type PopUpEditPackPropsType = {
  renamePack: (_id: string, name: string) => void
  header: string
  PackId: string
}

export const PopUpEditPack = ({renamePack, header, PackId}: PopUpEditPackPropsType) => {

  const [activePopUp, setActivePopUp] = useState<boolean>(true)

  const handleSetActivePopUp = () => {
    setActivePopUp(false)
  }

  useEffect(() => {
    !activePopUp && document.body.classList.add('active')
    return () =>
      document.body.classList.remove('active')
  }, [activePopUp])

  return (
    <>
      <PopUp
        name={header}
        popUpStatus={activePopUp}
        popUpToggle={setActivePopUp}>
        <EditPackForm
          renamePack={renamePack}
          popUpToggle={setActivePopUp}
          id={PackId}/>
      </PopUp>
      <button
        onClick={handleSetActivePopUp}
        className={style.btn}
      >
        Edit
      </button>
    </>
  )
}