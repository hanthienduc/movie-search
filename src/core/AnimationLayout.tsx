import { motion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

type pageLayoutType = {
  children: JSX.Element
}

const pageVariants = {
  initial: {
    opacity: 0
  },
  in: {
    opacity: 1
  },
  out: {
    opacity: 0
  }
};

const pageTransition = {
  type: "tween",
  ease: "linear",
  duration: 0.5
};

const PageLayout = ({ children }: pageLayoutType) => children;

/**
 * 
 * @returns Wrapper of entire app with transition animation using the framer motion
 */
export const AnimationLayout = () => {
  const { pathname } = useLocation();
  return (
    <PageLayout>
      <motion.div
        key={pathname}
        initial="initial"
        animate="in"
        variants={pageVariants}
        transition={pageTransition}
      >
        <Outlet />
      </motion.div>
    </PageLayout>
  );
};