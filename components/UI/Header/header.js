import Account from "../Account/Account";
import SearchModal from "../SearchModal/SearchModal";
import { useStateContext } from "../../HBOProvider";
import Link from 'next/link';

const Header = (props) => {
    const globalState = useStateContext();
    return(<header className={`top-header ${globalState.accountModalOpen || globalState.sideNavOpen ? 'top-header--menu-open' : ''}`}>
        <div className="top-header__left-side">
            <div className="top-header__menu-btn" onClick={() => globalState.setSideNavOpenAction(true)} >
                <i className="fas fa-bars" />
            </div>
            <div className="top-header__search-btn" onClick={() => globalState.setSearchOpenAction(true)}>
                <i className="fas fa-search" />
            </div>
        </div>
        <Link href="/">
            <a><div className="top-header__logo"></div>
</a>
        </Link>
        <div className="top-header__account" onClick={() => globalState.setAccountModalOpenAction(!globalState.accountModalOpen)}>
            <img className="top-header__user-img" src="https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e" />
            <div className="top-header__user-name">Jane</div>
        </div>
        <Account />
        <SearchModal />
    </header>)
}

export default Header;