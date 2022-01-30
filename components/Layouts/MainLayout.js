import Header from '../UI/Header/header';
import SideNav from '../UI/SideNav/SideNav';

const MainLayout = (props) => {
    return(<div className="mainlayout">
    <Header />
    <SideNav />
    <section className="content-container" >
        {props.children}
    </section>
    </div>)
}

export default MainLayout;