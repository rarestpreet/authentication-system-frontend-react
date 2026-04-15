import Header from "../components/Header";
import MenuBar from "../components/MenuBar";

const Home = () => {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center min-vh-100 text-white" style={{ backgroundColor: "var(--bg-primary)" }}
        >
            <MenuBar />
            <Header />
        </div>
    )
}

export default Home;