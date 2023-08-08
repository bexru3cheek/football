import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import CategoriesP from "./pages/CategoriesP";
import PleyersP from "./pages/PleyersP";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index  element={<CategoriesP />} />
          <Route index path="products" element={<CategoriesP />} />
          <Route path="players" element={<PleyersP />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
