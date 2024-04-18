import NavBar from "../features/navbar/Navbar";
import UserOrders from "../features/user/components/UserOrders";

function UserOrdersPage() {
    return (  
           <div>
             <NavBar>
               <h1 className="sm:mx-16 lg:mx-20 text-2xl">My Orders</h1>
               <UserOrders></UserOrders>
             </NavBar>
           </div>
    );
}

export default UserOrdersPage;