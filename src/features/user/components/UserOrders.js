import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from "../userSlice";
import { Link } from "react-router-dom";
import { discountedPrice } from "../../../app/constants";

export default function UserOrders() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(true);
  const userInfo = useSelector(selectUserInfo);
  const orders = useSelector(selectUserOrders);

  useEffect(() => {
    // console.log(userInfo);
    if (userInfo) {
      dispatch(fetchLoggedInUserOrdersAsync(userInfo.id));
    }
  }, [dispatch, userInfo]);

  return (
    <div>
      {orders.map &&
        orders.map((order, index) => (
          <div className="mt-12 bg-white mx-auto max-w-4xl px-4 py-5 sm:px-6 lg:px-8" key={order.id}>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-3xl text-blue-900 mt-8 mb-4 font-bold tracking-tight">
                Order Number is : {index +1} / <span className="text-xl">(ID : {order.id})</span>
              </h1>
              <h3 className="text-xl text-red-600 mt-4 mb-6 font-bold tracking-tight">
                 Order status : {order.status}
              </h3>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {order.items.map((item) => (
                    <li key={item.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <img
                          src={item.product.thumbnail}
                          alt={item.product.title}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <p href={item.product.id}>{item.product.title}</p>
                            </h3>
                            <p className="ml-4">${discountedPrice(item.product)}</p>
                          </div>
                          <p className="mt-1 text-sm text-gray-500">
                            {item.product.brand}
                          </p>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex flex-1 items-end justify-start">
                            <label
                              htmlFor="quantity"
                              className="block mr-2 text-sm font-medium leading-6 text-gray-900"
                            >
                              {item.quantity}
                            </label>
                          </div>

                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-2 sm:px-6">
              <div className="flex justify-between mx-4 my-3 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>$ {order.totalAmount}</p>
              </div>
              <div className="flex justify-between mx-4 my-3 text-base font-medium text-gray-900">
                <p>Total items in cart</p>
                <p>{order.totalItems} items</p>
              </div>
              <p className="mt-0.5 -ml-4 text-sm text-gray-500">
                Shipping Address
              </p>
            </div>
            
                <div className="flex justify-between gap-x-2 px-5 py-5 mb-2 border-solid border-2 border-red-500">
                <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    {order.selectedAddress.name}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress.street}
                  </p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                    {order.selectedAddress.pincode}
                  </p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">
                  Phone : {order.selectedAddress.phone}
                </p>
                <p className="text-sm leading-6 text-gray-900">
                  {order.selectedAddress.city}
                </p>
              </div>
                </div>
          </div>
        ))}
    </div>
  );
}
