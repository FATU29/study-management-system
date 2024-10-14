import Footer from "../components/Home/Footer";
import Header from "../components/Home/Header";
import ThemeToggle from "../components/utils/toggleTheme";








const HomePage = () => {
    return <>
        <div>
            <ThemeToggle style={{
                width:"100px",
                height:"100px"
            }}></ThemeToggle>
            <div>
                <Footer></Footer>

            </div>
            <div>


            </div>
            <div>
                <Header></Header>

            </div>


        </div>
    
    </>
}


export default HomePage;