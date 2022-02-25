import React, {Dispatch, SetStateAction, useState} from "react";
import {Button} from "../../../components/Button/Button";
import {useDispatch} from "react-redux";
import {InputText} from "../../../components/InputText/InputText";
import style from "./PopUpEditPack.module.css"
import {setAppErrorAC} from "../../../store/app-reducer";

type EditPackPropsType = {
  renamePack: (_id: string, name: string) => void
  popUpToggle: Dispatch<SetStateAction<boolean>>
  id: string
}

export const EditPackForm: React.FC<EditPackPropsType> = ({renamePack, popUpToggle, id}) => {

  const dispatch = useDispatch()

  const [newName, setNewName] = useState<string>('')

  const handleClick = () => {
    if (newName.trim() === '') {
      dispatch(setAppErrorAC('Name field is required!'))
    } else {
      renamePack(id,newName.trim())
      setNewName('')
      popUpToggle(true)
    }
  }

  const handleCancel = () => {
    newName ? setNewName('') : popUpToggle(true)
  }

  return (
    <div className={style.editPackWrapper}>
      <div>
        <span>Rename pack</span>
        <InputText
          value={newName}
          placeholder="new pack name..."
          onChangeText={setNewName}
        />
      </div>
      <div className={style.editPackBtnWrapper}>
        <Button
          className={style.editPackBtnCancel}
          padding={'45px'}
          onClick={handleCancel}>Cancel</Button>
        <Button
          padding={'45px'}
          onClick={handleClick}>Save</Button>
      </div>
    </div>
  )
}