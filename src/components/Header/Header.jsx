import React from "react";
// Container → keeps layout consistent
// LogoutBtn → handles logout logic
// Logo → reusable branding component
import {Container, LogoutBtn, Logo} from "../index"
import {Link} from "react-router-dom"
// useSelector → read auth state from Redux store
import { useSelector } from "react-redux";
// useNavigate → programmatic navigation
import {useNavigate} from "react-router-dom"
import authService from "../../appwirte/auth";

const Header = () => {

    // Read authentication status from Redux
    // This decides which nav items are visibl
    const authStatus = useSelector((state) =>
        state.auth.status
    );

    // Used to navigate on button click
    const navigate = useNavigate();

    // Navigation configuration
    // `active` controls visibility based on auth status
    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus, // only when logged out

        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus, // only when logged in

        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        }
    ]

    return(
        <header className="py-3 shadow bg-gray-500">
            <Container>
                <nav className="flex">
                    <div className="mr-4">
                        <Link to='/'>
                            <Logo width="70px"/>
                        </Link>
                    </div>
                    <ul className="flex ml-auto">
                        {navItems.map((item) => 
                            item.active ? (
                                <li key={item.name}>
                                    <button onClick={()=> navigate(item.slug)} className="hover:bg-blue-100 rounded-full">{item.name}</button>
                                </li>
                            ) : null
                        )}
                        {/* short-circuit rendering to conditionally display components based on authentication state.” */}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}
                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header;


// Why navItems is an array of objects

// ❌ Without array (bad practice)
// {authStatus && <button>All Posts</button>}
// {authStatus && <button>Add Post</button>}
// {!authStatus && <button>Login</button>}

// Repetitive
// Hard to maintain
// Easy to make mistakes

// ✅ With array of objects (your approach)
// const navItems = [
//   { name, slug, active }
// ];

// One source of truth
// Clean conditional rendering
// Easy to add/remove items