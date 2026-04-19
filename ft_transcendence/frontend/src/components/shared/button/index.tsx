import { motion } from 'framer-motion';

type Props = {
    children: JSX.Element[] | JSX.Element;
    onClick: () => void;
}

const Button = (props: Props ) => {
  return (
    <motion.button
        className='flex items-center justify-between m-2 gap-20 w-full cursor-pointer'
      onClick={props.onClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 3 }}
      transition={{ duration: 3 }}
    >
        {props.children}
    </motion.button>
  )
}

export default Button