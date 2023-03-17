import Link from 'next/link';
import Webconnect from './Webconnect';

const Navbar = () => {
    return (
        <nav className='nav-container'>
            <div className='nav-item'><Link href="/" >Home</Link></div>
            <div className='nav-item'><Link href="/settings">Settings</Link></div>
            <div className='nav-item'><Link href="/createalgo">Create Algo</Link></div>
            <div className='connectwallet-menu-item'><Webconnect /></div>
        </nav>
    )
}

export default Navbar;