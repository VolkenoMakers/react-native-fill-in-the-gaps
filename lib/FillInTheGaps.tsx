import React from "react";
import { ViewStyle } from "react-native";
import {
  ScrollView,
  TouchableOpacity,
  View,
  Modal,
  Dimensions,
  Text,
  TextStyle,
} from "react-native";

const Layout = Dimensions.get("window");
type FillInTheGapsProps = {
  additionalWords: Array<string>;
  content: string;
  title: string;
  containerStyle?: ViewStyle;
  titleStyle?: TextStyle;
  textContentStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  buttonContainerStyle?: ViewStyle;
  buttonTitleStyle?: TextStyle;
  wordStyle?: TextStyle;
  responseRequired?: boolean;
  wordsContainerStyle?: ViewStyle;
  wordContainerStyle?: ViewStyle;
  onDone: (texts: Array<any>) => any;
};
const FillInTheGaps = ({
  additionalWords = [],
  content = "",
  title = "",
  containerStyle,
  titleStyle,
  textContentStyle,
  buttonStyle,
  buttonContainerStyle,
  buttonTitleStyle,
  responseRequired,
  wordsContainerStyle,
  wordContainerStyle,
  wordStyle,
  onDone,
}: FillInTheGapsProps) => {
  const [words, setWords] = React.useState([]);
  const [wordsList, setWordsList] = React.useState([]);

  const [texts, setTexts] = React.useState([]);
  React.useEffect(() => {
    let data2 = [];
    let wordsList = [];
    let text = content;
    while (true) {
      let indexOf = text.indexOf("##");
      if (indexOf === -1) {
        data2.push({
          text: text,
        });
        break;
      } else {
        let copy = text.substring(indexOf + 2);
        let indexOf2 = copy.indexOf("##");
        if (indexOf2 === -1) {
          data2.push({
            text: text,
          });
          break;
        } else {
          let right = copy.substring(0, indexOf2);
          data2.push({
            text: text.substring(0, indexOf),
            right: right,
          });
          wordsList.push(right);
          text = copy.substring(indexOf2 + 2);
        }
      }
    }

    setTexts(
      data2.map((d, index) => ({
        response: "",
        id: index,
        text: d.text,
        right: d.right,
      }))
    );
    setWords(
      [...wordsList, ...additionalWords].sort(() => Math.random() - 0.5)
    );
    setWordsList(wordsList);
  }, []);

  const [text, setText] = React.useState(null);
  const onSetText = React.useCallback(
    (text: any, response: string) => {
      const index = texts.findIndex((t: any) => t?.id === text?.id);
      texts[index].response = response;
      setTexts([...texts]);
      let responses = texts.map((t) => t.response).filter((t) => !!t);
      setWords([
        ...wordsList.filter((w) => !responses.includes(w)),
        ...additionalWords.filter((w) => !responses.includes(w)),
      ]);
    },
    [texts, additionalWords, wordsList]
  );

  const onRemoveText = React.useCallback((text) => {
    const index = texts.findIndex((t) => t?.id === text?.id);
    setWords([...words, texts[index].response]);
    texts[index].response = "";
    setTexts([...texts]);
  }, []);

  const done = React.useCallback(async () => {
    onDone(
      texts
        .filter((t) => !!t.right)
        .map((t) => {
          return {
            ...t,
            isRight: t.right === t.response,
          };
        })
    );
  }, []);
  let isValid = true;
  for (let t of texts) {
    if (t.right && !t.response) {
      isValid = false;
      break;
    }
  }
  return (
    <View style={{ flex: 1, ...containerStyle }}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={!!text && words.length > 0}
        onRequestClose={() => {
          setText(null);
        }}
      >
        <View
          style={{
            flex: 1,
            padding: 40,
            width: Layout.width,
            height: Layout.height,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(200,200,200,.2)",
          }}
        >
          <ScrollView
            style={{
              width: Layout.width * 0.85,
            }}
            contentContainerStyle={{
              minHeight: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ backgroundColor: "#FFF" }}>
              <View
                style={{
                  width: "100%",
                  margin: 5,
                  alignSelf: "flex-end",
                }}
              >
                <Button
                  containerStyle={{
                    backgroundColor: "#000",
                    paddingVertical: 0,
                    paddingHorizontal: 5,
                  }}
                  title={"X"}
                  titleStyle={{ color: "#FFF" }}
                  onPress={() => setText(null)}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  flexWrap: "wrap",
                  padding: 20,
                }}
              >
                {words.map((w, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      onSetText(text, w);
                      setText(null);
                    }}
                  >
                    <Word
                      wordStyle={wordStyle}
                      wordContainerStyle={wordContainerStyle}
                      text={w}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>
        </View>
      </Modal>

      <Text
        style={{
          fontSize: 16,
          color: "#011F3B",
          ...titleStyle,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          marginVertical: 20,
          ...wordsContainerStyle,
        }}
      >
        {words.map((w, index) => (
          <Word
            wordStyle={wordStyle}
            wordContainerStyle={wordContainerStyle}
            key={index}
            text={w}
          />
        ))}
      </View>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        {texts.map((text, i) => {
          return (
            <React.Fragment key={i}>
              {/*@ts-ignore*/}
              <MyText
                style={{ fontSize: 14, ...textContentStyle }}
                text={text.text.trim()}
              />
              {!!text.right && (
                <Space
                  onPress={() => {
                    if (text.response) {
                      onRemoveText(text);
                    } else {
                      setText(text);
                    }
                  }}
                  wordStyle={wordStyle}
                  wordContainerStyle={wordContainerStyle}
                  text={text.response}
                />
              )}
            </React.Fragment>
          );
        })}
      </View>
      <View
        style={{
          ...buttonContainerStyle,
        }}
      >
        <Button
          disabled={!isValid && responseRequired}
          containerStyle={{ backgroundColor: "#000", ...buttonStyle }}
          title={"Envoyer"}
          titleStyle={{ color: "#FFF", ...buttonTitleStyle }}
          onPress={() => done()}
        />
      </View>
    </View>
  );
};

export default FillInTheGaps;

type SpaceProps = {
  onPress: () => any;
  text: string;
  wordContainerStyle: ViewStyle;
  wordStyle: TextStyle;
};
function Space({ onPress, text, wordContainerStyle, wordStyle }: SpaceProps) {
  return (
    <Text
      style={{
        minWidth: 60,
        paddingHorizontal: 10,
        margin: 2,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#FCF4E8",
        ...wordContainerStyle,
        ...wordStyle,
      }}
      onPress={onPress}
    >
      {text}
    </Text>
  );
}

type WordProps = {
  text: string;
  wordStyle: TextStyle;
  wordContainerStyle: ViewStyle;
};
function Word({ text, wordStyle, wordContainerStyle }: WordProps) {
  const style: ViewStyle = {
    minHeight: 23,
    width: 80,
    paddingHorizontal: 10,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "#FCF4E8",
    ...wordContainerStyle,
  };
  if (text) delete style.width;
  return (
    <View style={style}>
      {!!text && (
        <Text style={{ color: "#000", fontSize: 14, ...wordStyle }}>
          {text}
        </Text>
      )}
    </View>
  );
}

type ButtonProps = {
  titleStyle: TextStyle;
  containerStyle: ViewStyle;
  title: string;
  onPress: () => any;
  disabled: boolean;
};

const Button = ({
  titleStyle,
  containerStyle,
  title,
  onPress,
  disabled,
}: ButtonProps) => {
  const style: ViewStyle = {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    ...containerStyle,
  };
  if (disabled) {
    style.backgroundColor = "#EEE";
  }
  return (
    <TouchableOpacity disabled={disabled} onPress={onPress}>
      <View style={style}>
        <Text
          style={{
            textTransform: "uppercase",
            fontSize: 18,
            fontWeight: "bold",
            backgroundColor: "transparent",
            letterSpacing: 1.5,
            ...titleStyle,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

type MyTextProps = {
  style: TextStyle;
  text: string;
};
function MyText({ style, text }: MyTextProps) {
  return text.split(" ").map((t, i) => (
    <Text key={i} style={style}>
      {"  "}
      {t}
      {"  "}
    </Text>
  ));
}
