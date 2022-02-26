import React from "react";
import debounce from "lodash.debounce";
import {PacksGetParams} from "../../api/packs-api";
import {useDispatch, useSelector} from "react-redux";
import {setPacksSearchField} from "../../store/packs-reducer";
import {useMemo} from "react";
import {AppStateType} from "../../store/store";
import {InputText} from "../InputText/InputText";
import {CardsStateType} from "../../store/cards-reducer";

type SearchPropsType = {
  fetchPacks: (payload?: PacksGetParams | CardsStateType) => any
  className: string
}

export const Search = React.memo(({fetchPacks,className}: SearchPropsType) => {
  const dispatch = useDispatch();
  const searchField = useSelector<AppStateType, string>(state => state.packs.searchField)
  const isLoading = useSelector<AppStateType, boolean>(state => state.app.isLoading)

  const debouncedFetchData = useMemo(() => debounce(() => {
    dispatch(fetchPacks())
  }, 500), [dispatch, fetchPacks]);

  const onSearchChange = (value: string): void => {
    dispatch(setPacksSearchField(value));
    debouncedFetchData()
  };

  return (
    <div style={{width: '196px'}}>
      <InputText
        className={className}
        disabled={isLoading}
        onChangeText={onSearchChange}
        value={searchField}
        placeholder="Search..."
      />
    </div>
  );
})