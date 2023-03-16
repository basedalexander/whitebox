import Link from 'next/link';
import Webconnect from './Webconnect';

const Navbar = () => {
    return (
        <nav>
            <div className="logo">
                <h1>Main navigation</h1>
            </div>
            <Link href="/">Home</Link>
            <Link href="/settings">Settings</Link>

            <Webconnect />
        </nav>
    )
}

export default Navbar;