import React, { useContext, useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Color, Border, FontFamily, FontSize } from "../GlobalStyles";
import TopicRequestContext from "../context/TopicRequest/TopicRequestContext";
import { useFocusEffect } from "@react-navigation/native";

const AcceptProposal = ({ route }) => {
  const { additionalData } = route.params;
  const navigation = useNavigation();
  const context = useContext(TopicRequestContext);
  const { GetPayDetails, PayTopicRequest } = context;
  const [allProposals, setAllProposals] = useState({});
  const [flag, setFlag] = useState(false);
  const host = "http://192.168.0.147:3000";

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        setFlag(false);
        const json = await GetPayDetails(additionalData);
        setAllProposals(json.proposalInfo || {});
        setFlag(true);
      };

      fetchData();
    }, [])
  );

  const handleAddToCart = async () => {
    await PayTopicRequest(allProposals.proposalId, allProposals.total);
    navigation.navigate("ProposalConfirmation", {
        additionalData: {
            teacher_name: allProposals.teacher_name,
            rate: allProposals.rate,
            title: allProposals.title,
            total: allProposals.total,
        },
    })
  };

  return (
    <>
      {flag && (
        <View style={[styles.buyCourseCart, styles.buyChildShadowBox1]}>
          <TouchableOpacity
            style={[styles.icons8Back481, styles.icons8Back481Position]}
            onPress={() => navigation.navigate("MyRequestedProposals")}
          >
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={require("../assets/icons8back48-1.png")}
            />
          </TouchableOpacity>
          <View style={styles.container}>
            <View style={styles.rectangleView}>
              <Image
                style={styles.topLeftLogo}
                source={require("../assets/picture4-2.png")}
              />
              <Image
                style={styles.bottomRightLogo}
                source={require("../assets/picture4-2.png")}
              />
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={styles.yourTotalIs}>Your Total is :</Text>
                <Text style={[styles.text, styles.textText]}>
                  {allProposals.total}$
                </Text>
              </View>
            </View>
            <View style={styles.rectangleView1}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={styles.div3}>
                  <View>
                    <Text style={styles.yourTotalIs2}>
                      {allProposals.title}
                    </Text>
                    <Text style={[styles.text22, styles.textText]}>
                      {allProposals.teacher_name}
                    </Text>
                    <View style={styles.div3}>
                      <Text style={[styles.text1, styles.textTypo]}>
                        {Math.round(allProposals.rate)}
                      </Text>
                      <Image
                        style={styles.starIcon}
                        resizeMode="cover"
                        source={require("../assets/star-1.png")}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    <Text style={[styles.yourTotalIs1]}>
                      {allProposals.total}$
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.checkout}>
              <View style={styles.paybox2}>
                <Text style={[styles.pay]}>Confirm to Pay</Text>
                <View style={styles.paybox}>
                  <Text style={[styles.bankname]}>Bank Name</Text>
                  <TextInput
                    style={styles.input}
                    value="Bank Al-Habib"
                    editable={false}
                  />
                  <Text style={[styles.bankname]}>Account Number/ IBAN</Text>
                  <TextInput
                    style={styles.input}
                    value="PK00-2324343252525"
                    editable={false}
                  />
                  <View style={styles.button}>
                    <TouchableOpacity onPress={handleAddToCart}>
                      <Text style={styles.buttonText}>Pay</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  myCommunities: {
    flex: 1,
    width: "100%",
    overflow: "hidden",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  profileTextContainer: {
    marginTop: 8,
    alignItems: "center",
    flex: 1,
    marginLeft: 5,
  },
  userDetails2: {
    fontWeight: "bold",
    color: "black",
    fontSize: FontSize.size_lg,
    fontFamily: FontFamily.calibri,
  },
  button: {
    alignSelf: "center",
    marginTop: "10%",
    backgroundColor: Color.colorSlateblue,
    padding: "2%",
    width: "50%",
    height: "10%",
    borderWidth: 1,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  input: {
    alignSelf: "center",
    marginTop: "2%",
    textAlign: "center",
    width: "80%",
    height: "10%",
    color: "white",
    backgroundColor: Color.colorSlateblue,
    borderWidth: 1,
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
  },
  bankname: {
    color: Color.colorSlateblue,
    fontSize: 17,
    // textAlign: "center",
    fontSize: FontSize.size_xl,
    fontWeight: "bold",
    marginLeft: "10%",
    marginTop: "5%",
    fontFamily: FontFamily.interExtraBold,
  },
  pay: {
    color: "white",
    fontSize: 22,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: "3%",
    fontFamily: FontFamily.interExtraBold,
  },
  cancel: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  checkoutchild: {
    alignSelf: "center",
    color: "white",
    textAlign: "center",
  },
  cross: {
    marginRight: "2%",
    color: "white",
    fontWeight: "bold",
  },
  checkout: {
    marginTop: "20%",
    flexDirection: "row",
    flex: 1,
  },
  addLayout: {
    marginRight: "5%",
    width: 120,
    height: 40,
    backgroundColor: Color.colorSlateblue,
  },
  div4: {
    flexDirection: "row", // Set flexDirection to 'row' for horizontal layout
    alignItems: "center",
    width: "100%",
    marginTop: "10%",
    paddingTop: "8%",
  },
  div3: {
    flex: 1,
    flexDirection: "row",
  },
  topLeftLogo: {
    position: "absolute",
    top: -20,
    left: -10,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  bottomRightLogo: {
    position: "absolute",
    bottom: -20,
    right: -10,
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  buyChildShadowBox1: {
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  buyChildBg: {
    backgroundColor: Color.colorSlateblue,
    borderRadius: Border.br_21xl,
  },
  container: {
    flex: 1,
  },
  icons8Back481Position: {
    position: "absolute",
    left: 0,
  },
  buyChildShadowBox: {
    flex: 1,
    height: 59,
    width: "100%",
    marginRight: "2%",
    borderWidth: 1,
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    borderRadius: Border.br_8xs,
    backgroundColor: Color.colorSlateblue,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  paybox: {
    height: "100%",
    width: "100%",
    marginTop: "5%",
    borderWidth: 1,
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    borderRadius: 20,
    backgroundColor: Color.colorGainsboro_200,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  paybox2: {
    height: "100%",
    width: "100%",
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: Color.colorSlateblue,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  textText: {
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
  },
  buyChildLayout4: {
    height: 74,
    width: 96,
    backgroundColor: Color.colorGainsboro_100,
    left: 12,
    borderWidth: 1,
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    borderRadius: Border.br_8xs,
    position: "absolute",
  },
  checkOutTypo: {
    color: Color.colorGainsboro_100,
    textAlign: "center",
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
  },
  muhummadTypo: {
    fontFamily: FontFamily.interRegular,
    fontSize: FontSize.size_4xs,
    color: Color.colorGainsboro_100,
    textAlign: "center",
  },
  buyChildLayout3: {
    height: 23,
    width: 23,
  },
  textTypo: {
    color: Color.colorWhite,
    fontFamily: FontFamily.interRegular,
  },
  buyChildLayout2: {
    height: 30,
    width: 26,
    left: 331,
    position: "absolute",
  },
  iconLayout1: {
    height: 56,
    width: 50,
    position: "absolute",
  },
  iconLayout: {
    height: 60,
    width: 70,
    borderWidth: 1,
    borderColor: "black",
    marginLeft: "2%",
    borderRadius: 10,
  },
  buyChildLayout1: {
    height: 9,
    width: 6,
    left: 340,
    position: "absolute",
  },
  buyChildLayout: {
    height: 8,
    width: 7,
    left: 340,
    position: "absolute",
  },
  buyCourseCartChild: {
    flex: 1,
    width: 360,
    height: 150,
    position: "absolute",
    left: 0,
  },
  buyCourseCartItem: {
    borderRadius: Border.br_11xl,
    width: 384,
    height: 437,
    left: 0,
  },
  rectangleView1: {
    flex: 0.2,
    alignSelf: "center",
    paddingTop: "0%",
    marginTop: "10%",
    backgroundColor: Color.colorSlateblue,
    width: 259,
    padding: "6%",
    borderWidth: 1,
    borderColor: "black",
    borderStyle: "solid",
    borderRadius: Border.br_8xs,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  rectangleView: {
    flex: 0.2,
    alignSelf: "center",
    paddingTop: "0%",
    marginTop: "20%",
    backgroundColor: Color.colorGainsboro_200,
    width: 259,
    padding: "6%",
    borderWidth: 1,
    borderColor: Color.labelColorLightPrimary,
    borderStyle: "solid",
    borderRadius: Border.br_8xs,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  text: {
    fontSize: 40,
    textAlign: "center",
    color: Color.colorSlateblue,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
  },
  text11: {
    fontSize: FontSize.size_2xs,
    color: "white",
    textAlign: "center",
    fontFamily: FontFamily.interExtraBold,
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
  },
  text22: {
    fontSize: FontSize.size_2xs,
    color: "white",
    fontFamily: FontFamily.interExtraBold,
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
    marginTop: 7,
  },
  yourTotalIs: {
    fontSize: FontSize.size_lg,
    textAlign: "center",
    color: Color.colorSlateblue,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    marginTop: 20,
  },
  yourTotalIs1: {
    fontSize: FontSize.size_lg,
    textAlign: "center",
    color: "white",
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    marginTop: 20,
  },
  yourTotalIs2: {
    fontSize: FontSize.size_lg,
    color: "white",
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
    marginTop: 15,
  },
  emptyottom: {
    marginTop: "30%",
    fontSize: FontSize.size_sm,
    textAlign: "center",
    color: Color.colorSlateblue,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
  },
  emptycart: {
    fontSize: 38,
    textAlign: "center",
    color: Color.colorSlateblue,
    fontFamily: FontFamily.interExtraBold,
    fontWeight: "800",
  },
  buyCourseCartChild1: {
    top: 258,
  },
  excelInAgile: {
    color: Color.colorGainsboro_100,
    fontSize: FontSize.size_sm,
  },
  text1: {
    marginLeft: "3%",
    marginTop: "1%",
    color: Color.colorWhite,
    fontSize: FontSize.size_4xs,
  },
  buyCourseCartChild2: {
    top: 359,
  },
  buyCourseCartChild3: {
    top: 352,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  probabilisticModel: {
    top: 365,
    left: 119,
    color: Color.colorGainsboro_100,
    fontSize: FontSize.size_sm,
  },
  muhummadRafi1: {
    top: 384,
  },
  buyCourseCartChild4: {
    top: 399,
  },
  text2: {
    top: 402,
    left: 137,
    color: Color.colorWhite,
    fontSize: FontSize.size_4xs,
  },
  buyCourseCartChild5: {
    top: 460,
  },
  buyCourseCartChild6: {
    top: 453,
    shadowOpacity: 1,
    elevation: 4,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowColor: "rgba(0, 0, 0, 0.25)",
  },
  softwareEngineering: {
    top: 466,
    left: 119,
    color: Color.colorGainsboro_100,
    fontSize: FontSize.size_sm,
  },
  romashaKhursheed: {
    top: 485,
  },
  buyCourseCartChild7: {
    top: 500,
  },
  text3: {
    top: 503,
    left: 137,
    color: Color.colorWhite,
    fontSize: FontSize.size_4xs,
  },
  text4: {
    marginRight: "2%",
    fontSize: FontSize.size_1xl,
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
  },
  text5: {
    top: 388,
    left: 284,
    fontSize: FontSize.size_6xl,
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
  },
  text6: {
    top: 489,
    left: 295,
    fontSize: FontSize.size_6xl,
    textShadowRadius: 4,
    textShadowOffset: {
      width: 0,
      height: 4,
    },
    textShadowColor: "rgba(0, 0, 0, 0.25)",
  },
  buyCourseCartChild8: {
    top: 554,
    left: 65,
    width: 230,
    height: 51,
  },
  yourCart: {
    fontSize: FontSize.bodyBold_size,
  },
  items: {
    fontSize: FontSize.size_6xl,
  },
  yourCartHasContainer: {
    top: 183,
    left: 69,
  },
  ellipseIcon: {
    top: 257,
  },
  buyCourseCartChild9: {
    top: 352,
  },
  buyCourseCartChild10: {
    top: 449,
  },
  picture42Icon: {
    top: 15,
    left: 30,
  },
  picture43Icon: {
    top: 111,
    left: 285,
  },
  picture51: {
    top: 345,
    height: 91,
    width: 100,
    left: 12,
    position: "absolute",
  },
  picture222Icon: {
    top: 461,
    left: 12,
    height: 53,
  },
  lineIcon: {
    top: 264,
  },
  buyCourseCartChild11: {
    top: 263,
  },
  buyCourseCartChild12: {
    top: 456,
  },
  buyCourseCartChild13: {
    top: 455,
  },
  buyCourseCartChild14: {
    top: 359,
  },
  buyCourseCartChild15: {
    top: 358,
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  icons8Back481: {
    top: 10,
    width: 35,
    height: 35,
    left: 10,
  },
  buyCourseCart: {
    backgroundColor: Color.colorWhite,
    flex: 1,
    width: "100%",
  },
});

export default AcceptProposal;