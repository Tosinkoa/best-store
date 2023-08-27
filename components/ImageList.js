import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <main className="App">
      <DndProvider backend={HTML5Backend}>
        <ImageList images={images} moveImage={moveImage} />
      </DndProvider>
    </main>
  );
}
