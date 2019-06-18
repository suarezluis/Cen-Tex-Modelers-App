/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  StatusBar,
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView
} from "react-native";

import { Col, Row, Grid } from "react-native-easy-grid";
import axios from "axios";
import openMap from "react-native-open-maps";

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  state = { weather: { main: {}, wind: {} }, forecast: { list: [] } };

  getForecast = () => {
    axios(
      "https://api.openweathermap.org/data/2.5/forecast?lat=31.008748&lon=-97.625177&units=imperial&appid=991660e562aeb201f32c6faaa300a2fe"
    )
      .then(response => {
        this.setState({ forecast: response.data });
        console.log("Forecast", response.data);
      })
      .catch(response => {
        alert("Network Error");
      });
  };

  getWeather = () => {
    axios(
      "https://api.openweathermap.org/data/2.5/weather?lat=31.008748&lon=-97.625177&units=imperial&appid=991660e562aeb201f32c6faaa300a2fe"
    )
      .then(response => {
        this.setState({ weather: response.data });
        console.log("Weather", response.data);
      })
      .catch(response => {
        alert("Network Error");
      });
  };

  refresh = () => {
    this.getWeather();
    this.getForecast();
  };

  goToMap = () => {
    openMap({ latitude: 31.008964, longitude: -97.62468 });
  };

  componentWillMount() {
    this.getWeather();
    this.getForecast();
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar translucent={true} backgroundColor="#cad0db" />
        <Grid>
          <Row size={5}>
            <Text style={styles.title}>Cen-Tex Modelers</Text>
          </Row>
          <Text style={styles.subtitle}>Airfield Conditions</Text>
          <Row size={20}>
            <Col>
              <Row style={styles.field}>
                <Text style={styles.label}>Temperature</Text>
                <Text style={styles.weatherData}>
                  {Math.round(this.state.weather.main.temp)} °F
                </Text>
              </Row>
              <Row style={styles.field}>
                <Text style={styles.label}>Wind Speed</Text>
                <Text style={styles.weatherData}>
                  {Math.round(this.state.weather.wind.speed)} mph
                </Text>
              </Row>
            </Col>
            <Col>
              <Row>
                <Row style={styles.field}>
                  <Text style={styles.label}>Max</Text>
                  <Text style={styles.weatherSubData}>
                    {Math.round(this.state.weather.main.temp_max)}
                  </Text>
                </Row>
                <Row style={styles.field}>
                  <Text style={styles.label}>Min</Text>
                  <Text style={styles.weatherSubData}>
                    {Math.round(this.state.weather.main.temp_min)}
                  </Text>
                </Row>
              </Row>
              <Row style={styles.field}>
                <Text style={styles.label}>Wind Direction</Text>
                <Text style={styles.weatherData}>
                  {Math.round(this.state.weather.wind.deg)} °
                </Text>
              </Row>
            </Col>
          </Row>
          <Text style={styles.subtitle}>Weather Forecast</Text>
          <Row size={27}>
            <ScrollView horizontal={true}>
              {this.state.forecast.list.map(element => {
                return (
                  <View key={element.dt} style={styles.forecastData}>
                    <Text style={styles.forecastTime}>{element.dt_txt}</Text>
                    <Text style={styles.forecastSubData}>
                      Temperature: {Math.round(element.main.temp)} °F
                    </Text>
                    <Text style={styles.forecastSubData}>
                      Wind Speed: {Math.round(element.wind.speed)} mph
                    </Text>
                    <Text style={styles.forecastSubData}>
                      Wind Direction: {Math.round(element.wind.deg)} °
                    </Text>
                  </View>
                );
              })}
            </ScrollView>
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
            <View
              style={{
                alignItems: "flex-end",
                width: "100%"
              }}
            >
              <TouchableOpacity onPress={this.refresh}>
                <Text>Refresh</Text>
                <Image
                  style={{
                    width: 50,
                    height: 50,
                    alignSelf: "flex-end",
                    marginRight: 20
                  }}
                  source={require("./refresh.png")}
                />
              </TouchableOpacity>
            </View>
          </Row>
        </Grid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 45,
    textAlign: "center",
    backgroundColor: "#cad0db"
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
  label: {
    textAlign: "center",
    width: "100%"
  },
  field: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  weatherData: {
    color: "black",
    justifyContent: "center",
    fontSize: 40
  },
  weatherSubData: {
    color: "black",
    justifyContent: "center",
    fontSize: 25
  },
  forecastTime: {
    fontSize: 30,
    padding: 10
  },
  forecastData: {
    alignItems: "center",
    backgroundColor: "#b8bbc1",

    margin: 10,
    padding: 0,
    borderRadius: 20
  },
  forecastSubData: {
    color: "black",
    fontSize: 25
  },
  airfield: {
    justifyContent: "center",
    alignItems: "center"
  }
});
