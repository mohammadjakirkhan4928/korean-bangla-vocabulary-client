import React from "react";
import Search from "../search/Search";
import useTitle from "../../../shared/usetitle/useTitle";
import Tab from "../tab/Tab";

const Home = () => {
  useTitle("Home");
  return (
    <div>
      {/* <Tab></Tab> */}
      <Search></Search>
    </div>
  );
};

export default Home;
