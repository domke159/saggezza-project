import React from "react";
import {
  Button,
  Modal,
  SafeAreaView,
  ActivityIndicator,
  View
} from "react-native";
import { Input, Icon, Text } from "react-native-elements";
import AppContext from "../../context/AppContext";
import { axios } from "../../helpers/Axios";
import { useNavigation } from "@react-navigation/native";

const ClientNew = () => {
  const navigation = useNavigation();
  const { state, dispatch } = React.useContext(AppContext);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  const post = () => {
    var data = {};
    data.name = name;
    if (email != "") {
      data.email = email;
    }
    axios().then(instance => {
      instance
        .post("/client", data)
        .then(res => {
          dispatch({ type: "SET_CLIENT", payload: res.data.client });
          navigation.goBack();
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  return (
    <View>
      <Input
        label="Name of Client"
        //leftIcon=""
        placeholder="Enter name of Client"
        // errorStyle={{ color: "red" }}
        //="Some Validation Function"
        onChangeText={text => setName(text)}
        value={name}
        containerStyle={{ paddingBottom: 20 }}
      />
      <Input
        label="Contact Email"
        //leftIcon=""
        placeholder="Optional"
        // errorStyle={{ color: "red" }}
        //="Some Validation Function"
        onChangeText={text => setEmail(text)}
        value={email}
        containerStyle={{ paddingBottom: 20 }}
      />

      <Button
        style={{
          flexDirection: "row",
          justifyContent: "center"
        }}
        title="Submit"
        onPress={post}
      />
    </View>
  );
};

export default ClientNew;
