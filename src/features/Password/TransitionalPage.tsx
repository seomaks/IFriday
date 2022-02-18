import style from "./Password.module.css";
import env from "./../../assets/img/env.png";

export const TransitionalPage = () => {
  return (
    <div className={style.container}>
      <h1>Congratulations!</h1>
      <img className={style.img} src={env}/>
      <h4 className={style.title}>Check your email!</h4>
      <p className={style.text}>We've emailed you instructions on how to proceed. You can close this page now!</p>
    </div>
  )
}