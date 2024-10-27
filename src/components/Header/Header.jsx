import React, { act } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Header() {

    // getting auth status
    const authStatus = useSelector((state) => state.auth.status);

    const navigate = useNavigate();

    const navItems = [
		{
			name: "Home",
			slug: "/", //path or url
			active: true,
		},
		{
			name: "Login",
			slug: "/login", //path or url
			active: !authStatus,
		},
		{
			name: "Signup",
			slug: "/signup", //path or url
			active: !authStatus,
		},
		{
			name: "All Posts",
			slug: "/all-posts", //path or url
			active: authStatus,
		},
		{
			name: "Add Post",
			slug: "/add-post", //path or url
			active: authStatus,
		},
	];
    

	return (
		<Header className="py-3 shadow bg-gray-500">
			<Container>
				<nav className="flex">
					{/* for Lgog */}
					<div className="mr-4">
						<Link width="70px" to="/">
							<Logo />
						</Link>
					</div>

					{/* for navbar */}
					<ul className="flex ml-auto">
						{navItems.map((item) =>
							item.active ? (
								<li key={item.name}>
									<button
										onClick={() => navigate(item.slug)}
										className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
									>
										{item.name}
									</button>
								</li>
							) : null
						)}

						{/* for logout. if auth status is true then show logout button */}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}

					</ul>

				</nav>
			</Container>
		</Header>
	);
}

export default Header;
