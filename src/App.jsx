import { Button } from "./components/ui/button";
import { Switch } from "./components/ui/switch";

function handleClick() {
  console.log("Button Clicked");
}

function App() {
  return (
    <div className="border-2 border-black m-5 text-center p-3">
      <Button onClick={handleClick}>Click Me</Button>
      <Switch></Switch>
    </div>
  );
}

export default App;
