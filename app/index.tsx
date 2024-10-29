import React, { Fragment } from "react";
import { View, Text, Image } from "react-native";
import Swiper from "react-native-swiper";
import { welcomeSlides } from "@/data";
import PrimaryButton from "@/components/ui/Custombutton";
import { Link, router } from "expo-router";

const WelcomePage = () => {
  return (
    <Fragment>
      <Swiper
        containerStyle={{ flex: 4 }}
        showsButtons={false}
        autoplay
        autoplayTimeout={2.5}
        activeDotColor="#2C7075"
        loadMinimalSize={2}
        activeDotStyle={{
          width: 30,
          height: 6,
        }}
        dotStyle={{
          width: 10,
          height: 8,
          borderRadius: 50,
        }}
        paginationStyle={{
          bottom: 10,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          left: 0,
          right: 0,
        }}
        dotColor="#444444"
        loop={true}
        removeClippedSubviews={false}
        scrollEnabled={true}
      >
        {welcomeSlides.map((slide) => (
          <View key={slide.id} className="flex-1 justify-center items-center">
            <View className="w-[100%] relative">
              <Image
                source={slide.img}
                resizeMode="contain"
                className="h-full w-[100%]"
              />
            </View>
            <View className="absolute bottom-9">
              <Text className="font-Nunitosemi text-2xl text-primary-foreground leading-9 text-center">
                {slide.title}
              </Text>
              <Text className="font-Nunitosemi text-xs text-primary-foreground text-center p-2">
                {slide.description}
              </Text>
            </View>
          </View>
        ))}
      </Swiper>
      <View className={`flex-1 h-full`}>
        <PrimaryButton
          bgColor="bg-primary"
          onPress={() => router.navigate("/(auth)/Signup")}
        >
          <Text className="font-Nunitosemi text-base capitalize p-3 text-center color-secondary">
            sign up
          </Text>
        </PrimaryButton>
        <View>
          <Text className="text-center font-Nunitosemi text-base capitalize color-primary-foreground">
            have an account ?
            <Link href="/(auth)/Signin" className="color-primary">
              {" "}
              log in
            </Link>
          </Text>
        </View>
      </View>
    </Fragment>
  );
};

export default WelcomePage;
