import * as React from "react";
import firebase from "../../axios";
import { AuthContext } from "../../context/auth-context";
import IAmounts from "../../interfaces/IAmounts";
import Order from "./Order/Order";

interface IOrder {
  ingredients: IAmounts;
  price: number;
  id: string;
}

const Orders: React.FC = () => {
  const { authInfo } = React.useContext(AuthContext);
  const [orders, setOrders] = React.useState<IOrder[]>([]);
  const fetchOrders = () => {
    const queryParams = `?auth=${authInfo.token}&orderBy="userId"&equalTo="${authInfo.userId}"`;
    const fetchedOrders: IOrder[] = [];
    firebase
      .get("/orders.json" + queryParams)
      .then((response) => {
        for (const key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            id: key,
          });
        }
        setOrders(fetchedOrders);
      })
      .catch((error) => console.log(error));
  };

  React.useEffect(() => fetchOrders(), []);

  const ordersOutput = orders.map((order) => (
    <Order key={order.id} ingredients={order.ingredients} price={order.price} />
  ));

  return <div>{ordersOutput}</div>;
};

export default Orders;
