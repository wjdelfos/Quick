import { Link } from "expo-router";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  View,
} from "react-native";
import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import Categories from "./Categories";
import Profile from "./Profile";
import MyTickets from "./MyTickets";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc, getDocs } from "@firebase/firestore";

//import auth from "@react-native-firebase/auth";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA58KI0AeJ0rxh_4xnqGvegBYqYU5yg4I0",
  authDomain: "quick-b3b52.firebaseapp.com",
  projectId: "quick-b3b52",
  storageBucket: "quick-b3b52.appspot.com",
  messagingSenderId: "932738395009",
  appId: "1:932738395009:web:de2663986eb684ed39d680",
  measurementId: "G-H9PWQDBCXX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const collectionRef = collection(db, "backenddata");

// Write function to add data to Firestore
const addDataToFirestore = async (data) => {
  try {
    const docRef = await addDoc(collectionRef, data);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const readDataFromFirestore = async () => {
  try {
    const querySnapshot = await getDocs(collectionRef);

    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });

    return data;
  } catch (error) {
    console.error("Error fetching data from Firestore:", error);
    throw error;
  }
};

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Theater show",
    time: "19:00 - 21:00",
    location: "The Little Comedy Theater",
    price: "25.00",
    imageUrl:
      "https://img.dekleinekomedie.nl/i1Flo-Q1ewaIa-ri-PBfnb2k7oveF8nRLDTQmModfnU/c:3763:1765:nowe:7:490/s:1920:900:1/aHR0cHM6Ly93d3cuZGVrbGVpbmVrb21lZGllLm5sLy9jbXNfZmlsZXMvc3lzdGVtL2ltYWdlcy9pbWcxMzQ1Nl9vcmlnLmpwZw#174",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Bouldering class",
    time: "14:00 - 16:00",
    location: "Indoor Climbing Center",
    price: "20.00",
    imageUrl:
      "https://img.luxortheater.nl/hjujhkcnXZlFUY3VjjjZu17BGDxjjw7JOQVyb1qa67k/c:5504:5504/s:900:900:1/aHR0cHM6Ly93d3cubHV4b3J0aGVhdGVyLm5sLy9jbXNfZmlsZXMvc3lzdGVtL2ltYWdlcy9pbWczMDk0M19vcmlnLmpwZw#267",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Wine tasting",
    time: "18:30 - 20:30",
    location: "Wine Bar on SS Rotterdam",
    price: "30.00",
    imageUrl:
      "https://ssrotterdam.nl/wp-content/uploads/sites/2/2020/04/20191209-wijnbar-SS-Rotterdam-Westcord-011-600x350.jpg",
  },
  {
    id: "4a2e8ef3-892b-4182-9a6e-439d63e021ba",
    title: "Art Exhibition",
    time: "10:00 - 18:00",
    location: "Rotterdam Art Gallery",
    price: "15.00",
    imageUrl:
      "https://artindexrotterdam.nl/img/Advertisement,RebootCampaign.jpg",
  },
  {
    id: "d8d22b46-16eb-4a63-bd39-c107086a9e4f",
    title: "Cooking Class",
    time: "17:00 - 19:00",
    location: "Rainarai Cooking School",
    price: "40.00",
    imageUrl:
      "https://www.rainarai.nl/wp-content/uploads/elementor/thumbs/1-1-q6vxcib3s4yolcba1vnxj80mx5jtqakv1yr9d0f0ne.jpeg",
  },
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.cardContainer, { backgroundColor }]}
  >
    <Image source={{ uri: item.imageUrl }} style={styles.cardImage} />
    <View style={styles.cardInfoContainer}>
      <Text style={[styles.cardTitle, { color: textColor }]}>{item.title}</Text>
      <View style={styles.detailsContainer}>
        <AntDesign name="clockcircleo" size={14} color="#555" />
        <Text style={styles.cardDetails}>{item.time}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <AntDesign name="enviromento" size={14} color="#555" />
        <Text style={styles.cardDetails}>{item.location}</Text>
      </View>
    </View>
    <View style={styles.cardPriceContainer}>
      <Text style={styles.cardPrice}>€ {item.price}</Text>
    </View>
  </TouchableOpacity>
);

const Home = ({ navigation }) => {
  const [selectedId, setSelectedId] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newData = await readDataFromFirestore();
        setData(newData);
      } catch (error) {
        console.log("jongens dit ging helemaal fout");
        // Handle error
      }
    };

    fetchData();
  }, []);
  const renderItem = ({ item }) => {
    const backgroundColor = "#FFFFFF";
    const color = "black";

    return (
      <Item
        item={item}
        onPress={() => {
          setSelectedId(item.id);
          //addDataToFirestore(item);
          navigation.navigate("Details", { item });
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Filtering</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

const DetailsScreen = ({ route }) => {
  const { item } = route.params;

  return (
    <View>
      <Text>{item.title}</Text>
      {/* Display other details of the item */}
    </View>
  );
};

const Stack = createStackNavigator();

const createStackScreen = (name, component) => (
  <Stack.Screen
    name={name}
    component={component}
    options={{ headerShown: false }}
  />
);

const HomeStackScreen = () => (
  <Stack.Navigator mode="card" screenOptions={{ cardStyle: { flex: 1 } }}>
    {createStackScreen("Home", Home)}
    {createStackScreen("Details", DetailsScreen)}
  </Stack.Navigator>
);

const CategoriesStackScreen = () => (
  <Stack.Navigator>
    {createStackScreen("Categories", Categories)}
    {/* You can add more screens for the Categories tab if needed */}
  </Stack.Navigator>
);

const ProfileStackScreen = () => (
  <Stack.Navigator>
    {createStackScreen("Profile", Profile)}
    {/* You can add more screens for the Profile tab if needed */}
  </Stack.Navigator>
);

const MyTicketsStackScreen = () => (
  <Stack.Navigator>
    {createStackScreen("MyTickets", MyTickets)}
    {/* You can add more screens for the MyTickets tab if needed */}
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();

const MainNavigator = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: "white",
      inactiveTintColor: "white",
      labelStyle: { fontSize: 12 },
    }}
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 80,
        paddingHorizontal: 5,
        padding: 15,
        backgroundColor: "#FF4D4D",
        position: "absolute",
        borderTopWidth: 0,
      },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <FontAwesome5 name="home" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Categories"
      component={CategoriesStackScreen}
      options={{
        tabBarLabel: "Categories",
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="ios-list" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStackScreen}
      options={{
        tabBarLabel: "Profile",
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="MyTickets"
      component={MyTicketsStackScreen}
      options={{
        tabBarLabel: "My Tickets",
        tabBarIcon: ({ color, size }) => (
          <Entypo name="ticket" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "#FFE6E6",
    marginBottom: 80,
  },
  cardContainer: {
    flexDirection: "column",
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#FFF",
  },
  cardImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  cardInfoContainer: {
    padding: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  cardDetails: {
    fontSize: 14,
    marginLeft: 5,
    color: "#555",
  },
  cardPriceContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 10,
    borderRadius: 5,
  },
  cardPrice: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  title: {
    fontSize: 32,
    marginBottom: 10,
  },
});

export default MainNavigator;
