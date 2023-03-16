import Link from 'next/link';
import Webconnect from './Webconnect';

const Navbar = () => {
    return (
        <nav class='nav-container'>
            <div class='nav-item'><Link href="/" >Home</Link></div>
            <div class='nav-item'><Link href="/settings">Settings</Link></div>
            <div class='connectwallet-menu-item'><Webconnect /></div>
        </nav>
    )
}

export default Navbar;