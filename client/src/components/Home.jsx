
import {React, Footer, Arc, FirstFold, SecondFold, ThirdFold} from "./Import"

function Home() {
  return (
    <div className="container-fluid">
      <FirstFold/>
      <Arc/>
      <SecondFold />
      <Arc/>
      <ThirdFold/>
      <Arc/>
      <Footer/>
    </div>
  );
}

export default Home;
