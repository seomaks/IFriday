import style from './SuccessRecovery.module.css'
import env from "./../../assets/img/env.png";

export const SuccessRecoveryPassword = () => {
  return (
    <div className={style.successRecovery}>
      <h1>Success!</h1>
      <img className={style.img} src={env}/>
      <h4 className={style.title}>You have successfully created a new password</h4>
      <a className={style.link} href={'/IFriday/#/sign-in'}>Go to login page</a>
    </div>
  )
}