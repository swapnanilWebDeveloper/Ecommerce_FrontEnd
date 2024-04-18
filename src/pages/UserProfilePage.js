import NavBar from "../features/navbar/Navbar";
import UserProfile from "../features/user/components/UserProfile";

function UserProfilePage() {
    return (  
           <div>
             <NavBar>
             <h1 className="sm:mx-16 lg:mx-20 text-2xl">My Profile</h1>
               <UserProfile></UserProfile>
             </NavBar>
           </div>
    );
}

export default UserProfilePage;