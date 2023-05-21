import css from './Loader.module.css';
import {TailSpin} from 'react-loader-spinner';

const Loader = () => {
  return (
    <div className={css.Loader}>
      <TailSpin
  height="80"
  width="80"
  color="#3f51b5"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
    </div>
  );
};

export default Loader;
