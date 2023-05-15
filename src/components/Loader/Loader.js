import { Oval } from 'react-loader-spinner';
import css from './Loader.module.css';
const Loader = () => {
  return (
    <div className={css.overlay}>
      <Oval
        className={css.loader}
        height={80}
        width={80}
        color="#3f51b5"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="oval-loading"
        secondaryColor="#3f51b5"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </div>
  );
};

export default Loader;