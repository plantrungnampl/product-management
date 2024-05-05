import { Route, Routes } from "react-router";
import { AuthLayout } from "./_auth/AuthLayout";
import { Signin } from "./_auth/form/Signin";
import { SignUp } from "./_auth/form/Signup";
import { RootLayout } from "./_root/RootLayout";
import { Home } from "./_root/Pages/Home";
import { AuthContextProvider } from "./context/AuthContextProvider";
import { ContextProvider } from "./context/ContextProvider";
import "./App.css";
import { Product } from "./_root/Pages/Product";
import { ContextProductProvider } from "./context/ContextProductProvider";
function App() {
  return (
    <>
      <main>
        <AuthContextProvider>
          <ContextProvider>
            <ContextProductProvider>
              <Routes>
                {/* public router */}
                <Route element={<AuthLayout />}>
                  <Route path="/Signin" element={<Signin />} />
                  {/* <Route path="/SignUp" element={<SignUp />} /> */}
                </Route>

                {/* private router */}
                <Route element={<RootLayout />}>
                  <Route index element={<Home />}></Route>
                  <Route path="/Products" element={<Product />}></Route>
                </Route>
              </Routes>
            </ContextProductProvider>
          </ContextProvider>
        </AuthContextProvider>
      </main>
    </>
  );
}

export default App;
