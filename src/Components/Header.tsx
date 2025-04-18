import {
  motion,
  useAnimation,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Nav = styled(motion.nav)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2.875rem;
  width: 100%;
  height: 3.5rem;
  color: white;
  font-size: 12px;
  position: fixed;
  z-index: 999;
  top: 0;
`;

const Col = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.svg`
  width: 72px;
  height: 24px;
  fill: ${(props) => props.theme.red};
`;

const Items = styled.ul`
  display: flex;
  gap: 1.5rem;
  margin-left: 1.5rem;
`;

const Item = styled.li<{ $isActive: boolean }>`
  a {
    &:hover {
      color: ${(props) => props.theme.red};
    }
    color: ${(props) => (props.$isActive ? "#E51013" : "white")};
    transition: color 0.3s ease-in-out;
  }
`;

const Search = styled.form`
  color: white;
  &:hover {
    color: ${(props) => props.theme.red};
  }
  justify-content: center;
  svg {
    height: 20px;
    z-index: 99;
  }
  display: flex;
  align-items: center;
  position: relative;
  margin-right: 30px;
`;

const Input = styled(motion.input)`
  transform-origin: right center;
  position: absolute;
  left: -220px;
  color: #d9dada;
  padding: 10px 10px 10px 40px;
  background-color: black;
  border-radius: 5px;
  font-size: 12px;
  border: none;
  width: 250px;
  &:-webkit-autofill {
    background-color: black !important;
  }
`;

const navVar = {
  top: {
    backgroundColor: "rgba(0,0,0,0)",
  },
  scroll: {
    backgroundColor: "rgba(0,0,0,1)",
  },
};

interface IForm {
  keyword: string;
}

function Header() {
  const navigate = useNavigate();
  const [searchOpen, setSearchOpen] = useState(false);
  const homeMatch = useMatch("/");
  const tvMatch = useMatch("/tv");
  const navAnimation = useAnimation();
  const inputAnimation = useAnimation();
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", () => {
    if (scrollY.get() > 80) {
      navAnimation.start("scroll");
    } else {
      navAnimation.start("top");
    }
  });
  const toggleSearch = () => {
    if (searchOpen) {
      inputAnimation.start({
        scaleX: 0,
      });
    } else {
      inputAnimation.start({
        scaleX: 1,
      });
    }
    setSearchOpen((prev) => !prev);
  };
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onValid = ({ keyword }: IForm) => {
    navigate(`/search?keyword=${keyword}`, { state: { keyword } });
    setValue("keyword", "");
  };
  return (
    <Nav variants={navVar} animate={navAnimation} initial="top">
      <Col>
        <Link to="/">
          <Logo
            xmlns="http://www.w3.org/2000/svg"
            width="1024"
            height="276.742"
            viewBox="0 0 1024 276.742"
          >
            <path d="M140.803 258.904c-15.404 2.705-31.079 3.516-47.294 5.676l-49.458-144.856v151.073c-15.404 1.621-29.457 3.783-44.051 5.945v-276.742h41.08l56.212 157.021v-157.021h43.511v258.904zm85.131-157.558c16.757 0 42.431-.811 57.835-.811v43.24c-19.189 0-41.619 0-57.835.811v64.322c25.405-1.621 50.809-3.785 76.482-4.596v41.617l-119.724 9.461v-255.39h119.724v43.241h-76.482v58.105zm237.284-58.104h-44.862v198.908c-14.594 0-29.188 0-43.239.539v-199.447h-44.862v-43.242h132.965l-.002 43.242zm70.266 55.132h59.187v43.24h-59.187v98.104h-42.433v-239.718h120.808v43.241h-78.375v55.133zm148.641 103.507c24.594.539 49.456 2.434 73.51 3.783v42.701c-38.646-2.434-77.293-4.863-116.75-5.676v-242.689h43.24v201.881zm109.994 49.457c13.783.812 28.377 1.623 42.43 3.242v-254.58h-42.43v251.338zm231.881-251.338l-54.863 131.615 54.863 145.127c-16.217-2.162-32.432-5.135-48.648-7.838l-31.078-79.994-31.617 73.51c-15.678-2.705-30.812-3.516-46.484-5.678l55.672-126.75-50.269-129.992h46.482l28.377 72.699 30.27-72.699h47.295z" />
          </Logo>
        </Link>
        <Items>
          <Item $isActive={Boolean(homeMatch)}>
            <Link to="">Home</Link>
          </Item>
          <Item $isActive={Boolean(tvMatch)}>
            <Link to="tv">TV Show</Link>
          </Item>
        </Items>
      </Col>
      <Col>
        <Search onSubmit={handleSubmit(onValid)}>
          <motion.svg
            onClick={toggleSearch}
            animate={{ x: searchOpen ? -205 : 0 }}
            transition={{ type: "tween", duration: 0.1 }}
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            style={{ cursor: "pointer" }}
          >
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            ></path>
          </motion.svg>
          <Input
            {...register("keyword", { required: true, minLength: 2 })}
            animate={inputAnimation}
            initial={{ scaleX: 0 }}
            transition={{ type: "tween", duration: 0.1 }}
            placeholder="제목, 제작사, 감독으로 검색(초성)"
          />
        </Search>
        <span>로그인/가입</span>
      </Col>
    </Nav>
  );
}

export default Header;
