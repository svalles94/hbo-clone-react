import Account from "../Account/Account";
import SearchModal from "../SearchModal/SearchModal";

const Header = (props) => {
    return(<header className="top-header">
        <div className="top-header__left-side">
            <div className="top-header__menu-btn">
                <i className="fas fa-bars" />
            </div>
            <div className="top-header__search-btn">
                <i className="fas fa-search" />
            </div>
        </div>
        <div className="top-header__logo"></div>
        <div className="top-header__account">
            <img className="top-header__user-img" src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e" />
            <div className="top-header__user-name">Jane</div>
        </div>
        <Account />
        <SearchModal />
    </header>)
}

export default Header;