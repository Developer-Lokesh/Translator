// import To_From from "./components/To_From";
import Translate from "./components/Translate";

function App() {
  return (
    <div className="flex items-center justify-center graybg min-h-[100dvh]">
      <div className="flex flex-col justify-center-safe gap-4 p-2 w-[calc(100vw-20px)] h-full">
        {/* <To_From /> */}
        <Translate />
      </div>
    </div>
  )
}

export default App;