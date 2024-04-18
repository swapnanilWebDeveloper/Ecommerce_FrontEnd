import { useEffect, useState } from "react";
import { ITEMS_PER_PAGE } from "../../../app/constants";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from "../../order/orderSlice";
import { EyeIcon } from "@heroicons/react/24/solid";
import { PencilIcon, ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline";
import Pagination from "../../common/Pagination";

function AdminOrders() {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({});
  const [sortOrder, setSortOrder] = useState('');
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const totalOrders = useSelector(selectTotalOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };

  const handleShow = () => {};

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, status: e.target.value };
    dispatch(updateOrderAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const chooseColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-purple-200 text-purple-600";
      case "dispatched":
        return "bg-yellow-200 text-yellow-600";
      case "delivered":
        return "bg-green-200 text-green-600";
      case "cancelled":
        return "bg-red-200 text-red-600";
      default:
        return "bg-purple-200 text-purple-600";
    }
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (option) => {
    const sort = { _sort: sortOrder + option.sort };
    console.log({ sort });
    setSort(sort);
    sortOrder === "" ? setSortOrder('-') : setSortOrder('');
  };

  useEffect(() => {
    const pagination = { _page: page, _per_page: ITEMS_PER_PAGE };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);

  // console.log(orders);
  return (
    <div>
      {orders ? (
        <div className="p-6 overflow-scroll px-0">
          <table className="mt-12 mb-10 mx-10 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <p
                    onClick={(e) =>
                      handleSort({
                        sort: "id",
                      })
                    }
                    className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    Order ID / Order No.
                    {sort._sort === '-id' ? (<ArrowUpIcon className="ml-2 w-6 h-6 text-green-700"></ArrowUpIcon>) 
                      : (<ArrowDownIcon className="ml-2 w-6 h-6 text-red-700"></ArrowDownIcon>)}
                  </p>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    Items Ordered....
                  </p>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                    <p
                     onClick={(e) =>
                        handleSort({
                           sort: "totalAmount",
                        })
                      }
                    className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                   Total Amount
                {sort._sort === '-totalAmount' ? (<ArrowUpIcon className="ml-2 w-6 h-6 text-green-700"></ArrowUpIcon>) 
                  : (<ArrowDownIcon className="ml-2 w-6 h-6 text-red-700"></ArrowDownIcon>)}
              </p>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    Shipping Address
                  </p>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    Status
                  </p>
                </th>
                <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                  <p className="antialiased font-sans text-sm text-blue-gray-900 flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                    Actions
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr className="bg-gray-200 hover:bg-gray-300" key={order.id}>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                          {order.id} / order Number : {index + 1}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    {order.items.map((item, index) => (
                      <div className="flex items-center gap-6 my-8">
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="inline-block relative object-cover object-center w-9 h-9 rounded-md mt-3 mx-2"
                        />
                        <div className="flex flex-col gap-y-3">
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                            Product number : {index + 1}
                          </p>
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                            Title : {item.title}
                          </p>
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                            Category : {item.category}
                          </p>
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                            Brand : {item.brand}
                          </p>
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                            price : ${item.price}
                          </p>
                          <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                            quantity : {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        ${order.totalAmount}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex flex-col gap-y-3">
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        Name : {order.selectedAddress.name}
                      </p>
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        Email : {order.selectedAddress.email}
                      </p>
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        Phone :{order.selectedAddress.phone}
                      </p>
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        Street : {order.selectedAddress.street}
                      </p>
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        City : {order.selectedAddress.city}
                      </p>
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        State : {order.selectedAddress.state}
                      </p>
                      <p className="block antialiased font-sans text-sm leading-normal text-blue-gray-900 font-normal">
                        PinCode : {order.selectedAddress.pincode}
                      </p>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="w-max">
                      <div
                        className="relative grid items-center font-sans font-bold uppercase whitespace-nowrap select-none bg-green-200 text-green-600 py-1 px-2 text-xs rounded-md"
                        style={{ opacity: 1 }}
                      >
                        {order.id === editableOrderId ? (
                          <select onChange={(e) => handleUpdate(e, order)}>
                            <option value="pending">Pending</option>
                            <option value="dispatched">Dispatched</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        ) : (
                          <span
                            className={`${chooseColor(
                              order.status
                            )} py-1 px-3 rounded-full text-sm`}
                          >
                            {" "}
                            {order.status}{" "}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 border-b border-blue-gray-50">
                    <div className="flex justify-start gap-x-4">
                      <p>
                        <EyeIcon
                          onClick={(e) => handleShow(order)}
                          className="cursor-pointer w-6 h-6 text-yellow-500"
                        ></EyeIcon>
                      </p>
                      <p>
                        <PencilIcon
                          onClick={(e) => handleEdit(order)}
                          className="cursor-pointer w-6 h-6 text-blue-500"
                        ></PencilIcon>
                      </p>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h3>Orders are loading..</h3>
      )}
      <Pagination
        handlePage={handlePage}
        page={page}
        setPage={setPage}
        totalItems={totalOrders}
      ></Pagination>
    </div>
  );
}

export default AdminOrders;
