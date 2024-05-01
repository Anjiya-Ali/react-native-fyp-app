// CommunityPage.js
import React, { useRef, useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  ScrollView,
  Pressable,
} from "react-native";
import RealHeader from "./RealHeader";
import AdminContext from "../context/Admin/AdminContext";
import Empty from "./Empty";
import Header from "./Header";
const AdminPayment = () => {
  const adminContext = useContext(AdminContext);
  const {
    getOrders,
    payment,
    setPayment,
    markAsReleased,
    markAsPaid,
    getPendOrders,
    getRelOrders,
    getPaidOrders,
  } = adminContext;
  const [message, setMessage] = useState("No Orders Found");
  useEffect(() => {
    getOrders();
    console.log(payment);
  }, []);
  useEffect(() => {
    if (!payment) {
      getOrders();
    }
  }, [payment]);
  const [rendered, setRendered] = useState("All");
  const payments = [
    {
      id: "1",
      name: "inshaSamnani",
      purpose: "Course",
      amount: "400",
      status: "1",
    },
    {
      id: "2",
      name: "inshaSamnani",
      purpose: "Course",
      amount: "400",
      status: "2",
    },
    {
      id: "3",
      name: "inshaSamnani",
      purpose: "Course",
      amount: "400",
      status: "0",
    },
    {
      id: "4",
      name: "inshaSamnani",
      purpose: "Course",
      amount: "400",
      status: "1",
    },
    {
      id: "5",
      name: "inshaSamnani",
      purpose: "Course",
      amount: "400",
      status: "1",
    },
    {
      id: "6",
      name: "inshaSamnani",
      purpose: "Course",
      amount: "400",
      status: "1",
    },
    {
      id: "7",
      name: "Muhummad Rafi ud Din",
      purpose: "Course",
      amount: "400",
      status: "0",
    },
    {
      id: "8",
      name: "inshaSamnani",
      purpose: "Course",
      amount: "400",
      status: "1",
    },
    {
      id: "9",
      name: "samnani",
      purpose: "Course",
      amount: "400",
      status: "2",
    },
  ];
  // const [items, setItems] = useState(payment);
  const checker = (item) => {
    switch (item) {
      case "pending":
        return "Mark as Paid";
      case "released":
        return "Released";
      case "paid":
        return "Mark as Released";
      default:
        return "";
    }
  };
  const colorPicker = (item) => {
    switch (item) {
      case "pending":
        return "#F14436";
      case "released":
        return "#94D82D";
      case "paid":
        return "#373eb2";
      default:
        return "black";
    }
  };
  const handlePending = () => {
    setRendered("Pending");
    setMessage("No Pending Orders Found");
    getPendOrders();
  };

  const handleReleased = () => {
    setRendered("Released");
    setMessage("No Released Orders Found");
    getRelOrders();
  };

  const handlePaid = () => {
    setRendered("Paid");
    setMessage("No Paid Orders Found");
    getPaidOrders();
  };

  const handleAll = () => {
    if (message !== "No Orders Found") {
      setMessage("No Orders Found");
      getOrders();
    }
    setRendered("All");
  };

  const meso1 = 123;
  const meso2 = 1231;
  const handleChangingOfStatus = (index, status, id) => {
    if (status.toLowerCase() === "pending") {
      const updatedPayment = [...payment];
      updatedPayment[index].payment_status = "paid";
      setPayment(updatedPayment);
      markAsPaid(id);
    } else if (status.toLowerCase() === "paid") {
      const updatedPayment = [...payment];
      updatedPayment[index].payment_status = "released";
      setPayment(updatedPayment);
      markAsReleased(id);
    } else if (status.toLowerCase() === "released") {
      console.log("mil gaye paise phir bhi hushiyari");
    }
  };
  return (
    <>
      <Header heading="Manage Payments" navigate="AdminHomePage" />

      <View style={{ flex: 1 }}>
        <View
          style={{
            height: 60,
            backgroundColor: "#d9d9d9",
            flexDirection: "row",
            marginVertical: 10,
          }}
        >
          <View
            style={{
              flex: 2 / 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                fontFamily: "Calibri",
                color: "black",
              }}
            >
              ID
            </Text>
          </View>

          <View
            style={{
              flex: 1 / 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                fontFamily: "Calibri",
                color: "black",
              }}
            >
              Purpose
            </Text>
          </View>
          <View
            style={{
              flex: 1 / 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                fontFamily: "Calibri",
                color: "black",
              }}
            >
              Amount
            </Text>
          </View>
          <View
            style={{
              flex: 1 / 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 15,
                fontWeight: "700",
                fontFamily: "Calibri",
                color: "black",
              }}
            >
              Status
            </Text>
          </View>
        </View>
        <ScrollView style={{ flex: 1 }}>
          {!payment ? (
            <View key={meso1}>
              <Text>Loading Orders...</Text>
            </View>
          ) : payment.length === 0 ? (
            <Empty message={message} top={10} key={meso2} />
          ) : (
            <View>
              {payment.map((item, index) => {
                return (
                  <View key={item._id}>
                    <View
                      style={{
                        height: 60,
                        backgroundColor: "#f5f5f5",
                        flexDirection: "row",
                      }}
                    >
                      <View
                        style={{
                          flex: 2 / 4,
                          justifyContent: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: "Calibri",
                            color: "black",
                          }}
                        >
                          {item.student_id}
                        </Text>
                      </View>

                      <View
                        style={{
                          flex: 1 / 4,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: "Calibri",
                            color: "black",
                          }}
                        >
                          {item.purpose}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 1 / 4,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: "Calibri",
                            color: "black",
                          }}
                        >
                          {item.amount} $
                        </Text>
                      </View>
                      <Pressable
                        style={{
                          flex: 1 / 4,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                        onPress={() => {
                          handleChangingOfStatus(
                            index,
                            item.payment_status,
                            item._id
                          );
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 12,
                            fontFamily: "Calibri",
                            color: colorPicker(item.payment_status),
                          }}
                        >
                          {checker(item.payment_status)}
                        </Text>
                      </Pressable>
                    </View>
                    <View
                      style={{ height: 1, backgroundColor: "black" }}
                    ></View>
                  </View>
                );
              })}
            </View>
          )}
        </ScrollView>
      </View>
      <View
        style={{
          width: "100%",
          height: 50,
          backgroundColor: "#373eb2",
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}
      >
        <View style={{ flex: 2 / 3, flexDirection: "row" }}>
          <TouchableOpacity
            style={{
              flex: 1 / 4,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleAll}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                fontFamily: "Calibri",
                color: "white",
              }}
            >
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1 / 4,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handlePending}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                fontFamily: "Calibri",
                color: "white",
              }}
            >
              Pending
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1 / 4,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handlePaid}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                fontFamily: "Calibri",
                color: "white",
              }}
            >
              Paid
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1.3 / 4,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={handleReleased}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "800",
                fontFamily: "Calibri",
                color: "white",
              }}
            >
              Released
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1 / 3,
            justifyContent: "center",
            alignItems: "flex-end",
            flexDirection: "row",
          }}
        >
          <View
            style={{
              flex: 1 / 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {rendered === "All" ? (
              <Image
                style={{
                  borderRadius: 50,
                  width: 10,
                  height: 10,
                  bottom: 5,
                }}
                source={require("../assets/Circle.png")}
              />
            ) : null}
          </View>
          <View
            style={{
              flex: 1 / 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {rendered === "Pending" ? (
              <Image
                style={{
                  borderRadius: 50,
                  width: 10,
                  height: 10,
                  bottom: 5,
                }}
                source={require("../assets/Circle.png")}
              />
            ) : null}
          </View>
          <View
            style={{
              flex: 1 / 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {rendered === "Paid" ? (
              <Image
                style={{
                  borderRadius: 50,
                  width: 10,
                  height: 10,
                  bottom: 5,
                }}
                source={require("../assets/Circle.png")}
              />
            ) : null}
          </View>
          <View
            style={{
              flex: 1.3 / 4,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {rendered === "Released" ? (
              <Image
                style={{
                  borderRadius: 50,
                  width: 10,
                  height: 10,
                  bottom: 5,
                }}
                source={require("../assets/Circle.png")}
              />
            ) : null}
          </View>
        </View>
      </View>
    </>
  );
};

export default AdminPayment;
