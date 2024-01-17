import Auth from "../Auth/Auth";

const Header = () => {
    return (
        <header>
            <h1>GymJoy</h1>
            <nav>
                <Auth />
            </nav>
        </header>
    );
;}

export default Header;