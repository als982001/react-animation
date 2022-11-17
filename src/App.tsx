import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import Animation from "./Components/Animation";
import Variants from "./Components/Variants";
import MotionValues from "./Components/MotionValuesAndScroll";
import SVG from "./Components/SVG";
import Ap from "./Components/AnimationPresence";
import LayoutId from "./Components/LayoutId";
import Boxes from "./Components/Boxes";
import { useState } from "react";

const Wrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  width: 70vw;
  height: 70vh;
  gap: 10px;
`;

const Box = styled(motion.div)`
  background-color: rgba(255, 255, 255, 0.3);
  box-shadow: 0 2px 3px rbga(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 550px;
  height: 250px;
  &:hover {
  }
`;

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Btn = styled(motion.button)`
  position: fixed;
  margin: 0 auto;
  top: 90vh;
`;

const Circle = styled(motion.div)`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: white;
`;

const overlay = {
  hidden: { backgroundColor: "rgba(0, 0, 0, 0)" },
  visible: { backgroundColor: "rgba(0, 0, 0, 0.5)" },
  exit: { backgroundColor: "rgba(0, 0, 0, 0)" },
};

const boxVariants = {
  hidden: {},
  visible: { backgroundColor: "rgba(255, 255, 255, 1)" },
  exit: {},
};

function App() {
  const [id, setId] = useState<null | string>(null);
  const [switched, setSwithced] = useState(false);
  const toggleSwithced = () => {
    setSwithced((prev) => !prev);
  };

  return (
    <Wrapper>
      <Grid>
        <Box
          whileHover={{ scale: 1.3 }}
          style={{ transformOrigin: "bottom right" }}
          onClick={() => setId("1")}
          key="1"
          layoutId="1"
        />
        <Box
          whileHover={{ scale: 1.3 }}
          style={{ transformOrigin: "bottom left" }}
          onClick={() => setId("2")}
          key="2"
          layoutId="2"
        >
          {switched ? null : <Circle layoutId="circle" />}
        </Box>
        <Box
          whileHover={{ scale: 1.3 }}
          style={{ transformOrigin: "top right" }}
          onClick={() => setId("3")}
          key="3"
          layoutId="3"
        >
          {switched ? <Circle layoutId="circle" /> : null}
        </Box>
        <Box
          whileHover={{ scale: 1.3 }}
          style={{ transformOrigin: "top left" }}
          onClick={() => setId("4")}
          key="4"
          layoutId="4"
        />
      </Grid>
      <AnimatePresence>
        {id ? (
          <Overlay
            variants={overlay}
            onClick={() => setId(null)}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <Box
              layoutId={id}
              variants={boxVariants}
              style={{ width: 700, height: 350 }}
            />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Btn
        onClick={toggleSwithced}
        whileHover={{ scale: 1.3 }}
        style={{
          color: switched ? "red" : "black",
        }}
      >
        Switch
      </Btn>
    </Wrapper>
  );
}

export default App;
