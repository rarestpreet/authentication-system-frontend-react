import Header from "../components/Header";
import MenuBar from "../components/MenuBar";
import { useAppContext } from "../context/AppContext";

const Home = () => {
    const { userData } = useAppContext()
    console.log(userData)

    return (
        <div className="d-flex flex-column aling-items-center justify-content-center min-vh-100">
            <MenuBar />
            <Header />
        </div>
    )
}

export default Home;