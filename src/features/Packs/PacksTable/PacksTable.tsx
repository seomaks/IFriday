import {CardPacksType} from "../../../api/packs-api";
import {Link} from "react-router-dom";
import style from "./PacksTable.module.css"
import {Sort} from "../../../components/Sort/Sort";
import {PopUpDeletePack} from "../PopUpDeletePack/PopUpDeletePack";
import {PopUpEditPack} from "../PopUpEditPack/PopUpEditPack";

type PacksTablePropsType = {
  packs: CardPacksType[]
  userId: string
  removePack: (packId: string) => void
  renamePack: (_id: string, name: string) => void
  sortItems: (sortValue: string) => void
}

export const PacksTable = (
  {
    packs,
    userId,
    removePack,
    renamePack,
    sortItems,
  }: PacksTablePropsType) => {

const dateConvertor = (dateString: string) => {
    const isoNumbers = Date.parse(dateString)
    return new Date(isoNumbers).toLocaleDateString().split('.').reverse().join('-')
  }

  const tableHead =
    <thead>
    <tr>
      <th>Name <Sort value="name" sortItems={sortItems}/></th>
      <th>Cards <Sort value="cardsCount" sortItems={sortItems}/></th>
      <th>Last Update <Sort value="updated" sortItems={sortItems}/></th>
      <th>Created by <Sort value="user_name" sortItems={sortItems}/></th>
      <th>Actions</th>
    </tr>
    </thead>

  const tableBodyMap = packs.map(item => {
    return (
      <tbody key={item._id}>
      <tr>
        <td>
          <Link
            className={style.linkToCard}
            to={`/cards/${item._id}`}>
            {item.name}
          </Link>
        </td>
        <td>{item.cardsCount}</td>
        <td>{dateConvertor(item.updated)}</td>
        <td>{item.user_name}</td>
        <td>
          <div className={style.btnWrapper}>
            {userId === item.user_id && <>
              <PopUpDeletePack
                deletePack={() => removePack(item._id)}
                header={'Delete Pack'}
                name={item.name}/>
              <PopUpEditPack
                renamePack={renamePack}
                header={'Rename Pack'}
                PackId={item._id}/>
            </>
            }
            {item.cardsCount !== 0 && <>
              <Link
                className={style.wrapperItem}
                to={`/learn/${item._id}/${item.name}`}
                role="button">
                Learn
              </Link>
            </>}
          </div>
        </td>
      </tr>
      </tbody>)
  })

  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <table className="table" style={{borderSpacing: '45px 15px'}}>
        {tableHead}
        {tableBodyMap}
      </table>
    </div>
  )
}