import { render, screen, waitFor } from "@testing-library/react";
import { AuthContextProvider } from "../src/context/AuthContextProvider";
import { AuthContext } from "../src/context/AuthContext";

test("initial state", () => {
    render(<AuthContextProvider><div /></AuthContextProvider>);
    const { isLoggedIn } = render(<AuthContext.Consumer>{value => <div>{value.isLoggedIn}</div>}</AuthContext.Consumer>);
    expect(isLoggedIn).toBe(false);
});

test("login success", async () => {
    const mockAxios = jest.fn(() => Promise.resolve({ data: { success: true, token: "mockToken" } }));
    jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve({ success: true, token: "mockToken" }) }));
    render(<AuthContextProvider><div /></AuthContextProvider>);
    const { login } = render(<AuthContext.Consumer>{value => <div>{value.login({ email: "test@test.com", password: "password" })}</div>}</AuthContext.Consumer>);
    await login();
    expect(mockAxios).toHaveBeenCalledWith("https://api.gearfocus.div4.pgtest.co/api/authentication/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: "test@test.com",
            password: "password"
        })
    });
    expect(screen.getByText("Đăng nhập thành công")).toBeInTheDocument();
    expect(localStorage.getItem("userToken")).toBe("mockToken");
    expect(screen.getByText("Home")).toBeInTheDocument();
});

test("login failure", async () => {
    const mockAxios = jest.fn(() => Promise.resolve({ data: { success: false } }));
    jest.spyOn(global, "fetch").mockImplementation(() => Promise.resolve({ json: () => Promise.resolve({ success: false }) }));
    render(<AuthContextProvider><div /></AuthContextProvider>);
    const { login } = render(<AuthContext.Consumer>{value => <div>{value.login({ email: "test@test.com", password: "password" })}</div>}</AuthContext.Consumer>);
    await login();
    expect(mockAxios).toHaveBeenCalledWith("https://api.gearfocus.div4.pgtest.co/api/authentication/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: "test@test.com",
            password: "password"
        })
    });
    expect(screen.getByText("Login failed, invalid email or password")).toBeInTheDocument();
    expect(localStorage.getItem("userToken")).toBe(null);
    expect(screen.getByText("Signin")).toBeInTheDocument();
});

test("logout", async () => {
    render(<AuthContextProvider><div /></AuthContextProvider>);
    const { logout } = render(<AuthContext.Consumer>{value => <div>{value.logout()}</div>}</AuthContext.Consumer>);
    await logout();
    expect(localStorage.getItem("userToken")).toBe(null);
    expect(screen.getByText("Signin")).toBeInTheDocument();
});