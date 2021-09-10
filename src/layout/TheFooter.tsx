import { useRef, useCallback, useState, useEffect } from "react";
import { Box, Container } from "@chakra-ui/layout";
import { Icon } from "@chakra-ui/react";
import { ChevronUpIcon } from "@chakra-ui/icons";

const TheFooter = () => {
  const backToTopRef = useRef(null);

  const [display, setDisplay] = useState("none");

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (window.pageYOffset > 600) {
      setDisplay("flex");
    } else {
      setDisplay("none");
    }
  }, []);

  useEffect(() => {
    // handleScroll can be refactored with debounce
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return (
    <Box as={"footer"}>
      <Box py={[2, 2, 3, 4, 4]} bg="#fff">
        <Container maxW={"1553px"}>
          <Box
            ref={backToTopRef}
            pos={"fixed"}
            bottom={"60px"}
            right={"30px"}
            display={display}
            // zIndex={300}
            bgColor={"#ccc"}
          >
            <Box onClick={scrollToTop} cursor={"pointer"}>
              <Icon as={ChevronUpIcon} w={"32px"} h={"32px"} />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default TheFooter;
