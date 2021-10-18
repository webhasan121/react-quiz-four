import classes from "../styles/Form.module.css";
export default function Form({ children, myclassName, ...rest }) {
  return (
    <form className={`${myclassName} ${classes.form}`} action="#" {...rest}>
      {children}
    </form>
  );
}
