/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from "react-native";

import { Col, Row, Grid } from "react-native-easy-grid";
import openMap from "react-native-open-maps";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  state = { current: {}, forecast: {} };

  goToMap = () => {
    openMap({ latitude: 31.008964, longitude: -97.62468 });
  };

  componentWillMount() {}
  render() {
    return (
      <View style={styles.container}>
        <Grid>
          <Row size={5}>
            <Text style={styles.title}>Cen-Tex Modelers</Text>
          </Row>
          <Text style={styles.subtitle}>Airfield Conditions</Text>
          <Row size={20}>
            <Col>
              <Row>
                <Text>Temperature</Text>
              </Row>
              <Row>
                <Text>Wind Speed</Text>
              </Row>
            </Col>
            <Col>
              <Row>
                <Row>
                  <Text>Max</Text>
                </Row>
                <Row>
                  <Text>Min</Text>
                </Row>
              </Row>
              <Row>
                <Text>Wind Direction</Text>
              </Row>
            </Col>
          </Row>
          <Row size={20}>
            <Text style={styles.subtitle}>Weather Forecast</Text>
          </Row>
          <Text style={styles.subtitle}>Directions to the Field</Text>
          <Row size={20} style={styles.airfield}>
            <TouchableOpacity onPress={this.goToMap}>
              <Image
                style={{ width: 150, height: 150 }}
                source={require("./airfield.png")}
              />
            </TouchableOpacity>
          </Row>
          <Row size={10}>
            <Text>Refresh</Text>
          </Row>
        </Grid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 35,
    textAlign: "center"
  },
  title: {
    fontSize: 30,
    width: "100%",
    textAlign: "center"
  },
  subtitle: {
    fontSize: 20,
    width: "100%",
    textAlign: "center"
  },
  airfield: {
    justifyContent: "center",
    alignItems: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
