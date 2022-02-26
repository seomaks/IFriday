import preloader from "../../assets/img/preloader.svg";
import style from './Preloader.module.css'

let Preloader = () => {
  return <div className={style.preloader}>
    <img src={preloader} alt={''}/>
  </div>
}

export default Preloader