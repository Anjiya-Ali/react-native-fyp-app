import AdminContext from "./AdminContext";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminState = (props) => {
  const host = "http://192.168.0.147:3000";
  const userProfileInitial = [];
  // const [userProfile, setUserProfile] = useState(userProfileInitial)
  const [payment, setPayment] = useState(null);

  const GetUniqueUsersPerMonth = async () => {
    try {
      const token = await AsyncStorage.getItem("tokenn");
      const response = await fetch(`${host}/api/Admin/GetUniqueUsersPerMonth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (!response.ok) {
        console.error(
          "Error fetching unique users per month:",
          response.status
        );
        return;
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error fetching unique users per month:", error.message);
    }
  };

  const GetRevenuePerMonth = async () => {
    try {
      const token = await AsyncStorage.getItem("tokenn");
      const response = await fetch(`${host}/api/Admin/GetRevenuePerMonth`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (!response.ok) {
        console.error("Error fetching revenue per month:", response.status);
        return;
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error fetching revenue per month:", error.message);
    }
  };

  const ManageStudents = async () => {
    try {
      const token = await AsyncStorage.getItem("tokenn");
      const response = await fetch(`${host}/api/Admin/ManageStudents`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (!response.ok) {
        console.error("Error fetching students:", response.status);
        return;
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error fetching students:", error.message);
    }
  };

  const removeStudent = async (id) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");
      const response = await fetch(`${host}/api/Admin/DeleteStudent/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (!response.ok) {
        console.error("Error deleting student:", response.status);
        return;
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error deleting student:", error.message);
    }
  };

  const ManageTeachers = async () => {
    try {
      const token = await AsyncStorage.getItem("tokenn");
      const response = await fetch(`${host}/api/Admin/ManageTeachers`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (!response.ok) {
        console.error("Error fetching teachers:", response.status);
        return;
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error fetching teachers:", error.message);
    }
  };

  const removeTeacher = async (id) => {
    try {
      const token = await AsyncStorage.getItem("tokenn");
      const response = await fetch(`${host}/api/Admin/DeleteTeacher/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
      });
      if (!response.ok) {
        console.error("Error deleting teacher:", response.status);
        return;
      }
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error deleting teacher:", error.message);
    }
  };

  const getOrders = async () => {
    try {
      const token = await AsyncStorage.getItem("tokenn");
      const response = await fetch(`${host}/api/Payment/GetOrders`, {
        method: "GET",
        headers: {
          "auth-token": token,
        },
      });
      if (!response.ok) {
        console.error("Error fetching orders:", response.status);
        return;
      }
      const json = await response.json();
      setPayment(json.orders);
    } catch (error) {
      console.error("Error fetching orders:", error.message);
    }
  };
  const markAsPaid = async (id) => {
    try {
      console.log("bye", id);

      const token = await AsyncStorage.getItem("tokenn");
      const response = await fetch(`${host}/api/Payment/MarkAsPaid`, {
        method: "POST",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ order_id: id }),
      });
      if (!response.ok) {
        console.error("Error changing status:", response.status);
        return;
      }
    } catch (error) {
      console.error("Error changing status:", error.message);
    }
  };
  const markAsReleased = async (id) => {
    try {
      console.log("hello", id);
      const token = await AsyncStorage.getItem("tokenn");
      const response = await fetch(`${host}/api/Payment/MarkAsReleased`, {
        method: "POST",
        headers: {
          "auth-token": token,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ order_id: id }),
      });
      if (!response.ok) {
        console.error("Error changing status:", response.status);
        return;
      }
    } catch (error) {
      console.error("Error changing status:", error.message);
    }
  };
  const getPendOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/Payment/GetPendingOrders`, {
        method: 'GET',
        headers: {
          "auth-token": token
        },
      });
      if (!response.ok) {
        console.error('Error fetching pending orders:', response.status);
        return;
      }
      const json = await response.json();
      setPayment(json.orders)
    }
    catch (error) {
      console.error('Error fetching pending orders:', error.message);
    }
  }
  const getRelOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/Payment/GetReleasedOrders`, {
        method: 'GET',
        headers: {
          "auth-token": token
        },
      });
      if (!response.ok) {
        console.error('Error fetching released orders:', response.status);
        return;
      }
      const json = await response.json();
      setPayment(json.orders)
    }
    catch (error) {
      console.error('Error fetching released orders:', error.message);
    }
  }
  const getPaidOrders = async () => {
    try {
      const token = await AsyncStorage.getItem('tokenn');
      const response = await fetch(`${host}/api/Payment/GetPaidOrders`, {
        method: 'GET',
        headers: {
          "auth-token": token
        },
      });
      if (!response.ok) {
        console.error('Error fetching paid orders:', response.status);
        return;
      }
      const json = await response.json();
      setPayment(json.orders)
    }
    catch (error) {
      console.error('Error fetching paid orders:', error.message);
    }
  }

  return (
    <AdminContext.Provider
      value={{
        markAsReleased,
        markAsPaid,
        getOrders,
        payment,
        setPayment,
        GetUniqueUsersPerMonth,
        GetRevenuePerMonth,
        ManageTeachers,
        ManageStudents,
        removeStudent,
        removeTeacher,
        getPendOrders, getRelOrders, getPaidOrders
      }}
    >
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminState;
