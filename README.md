# react-native-fill-in-the-gaps

![Single select](https://raw.githubusercontent.com/VolkenoMakers/react-native-fill-in-the-gaps/main/demo.gif)

## Add it to your project

- Using NPM
  `npm install react-native-fill-in-the-gaps`
- or:
- Using Yarn
  `yarn add react-native-fill-in-the-gaps`

## Usage

```javascript
import React from "react";
import FillInTheGaps from "react-native-fill-in-the-gaps";

const FillInTheGapsApp = () => {
  const content =
    "Un texte à ##pantalon## ou texte lacunaire est un ##exercice## qui consiste en un texte où des mots manquent, les ##pantalons##, et que l'élève doit remplir. C'est un type d'exercice ##courant## en apprentissage des ##langues.##";
  return (
    <FillInTheGaps
      title="C'est un type d'exercice courant en apprentissage des langues"
      titleStyle={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
      containerStyle={{ paddingVertical: 20, paddingHorizontal: 20 }}
      wordsContainerStyle={{ marginVertical: 30 }}
      wordContainerStyle={{ backgroundColor: "#000" }}
      wordStyle={{ color: "#FFF" }}
      textContentStyle={{ fontSize: 16 }}
      buttonStyle={{ backgroundColor: "#000" }}
      buttonTitleStyle={{ color: "#FFF" }}
      buttonContainerStyle={{
        marginTop: "auto",
      }}
      responseRequired={false}
      content={content}
      onDone={(reults) => {
        console.log("reults", reults);
      }}
      additionalWords={["test 1", "test 2"]}
    />
  );
};

export default FillInTheGapsApp;
```

## Properties

| Property name            | Type       | Description                                                               |
| ------------------------ | ---------- | ------------------------------------------------------------------------- |
| **title**                | _String_   | the title of the exercie                                                  |
| **titleStyle**           | _Object_   | Custom style for the title                                                |
| **containerStyle**       | _Object_   | Custom style for the container                                            |
| **wordsContainerStyle**  | _Object_   | Custom style for the words container                                      |
| **wordContainerStyle**   | _Object_   | Custom style for the container of each word                               |
| **wordStyle**            | _Object_   | Custom style for the word                                                 |
| **textContentStyle**     | _Object_   | Custom style the text                                                     |
| **buttonContainerStyle** | _Object_   | Custom style for the container of the button                              |
| **buttonStyle**          | _Object_   | Custom style for the button                                               |
| **buttonTitleStyle**     | _Object_   | Custom style for the title of the button                                  |
| **content**              | _String_   | content of the question, the words to be removed must be surrounded by ## |
| **content**              | _Array_    | extra words to make the question more difficult                           |
| **responseRequired**     | _Boolean_  | make the answer mandatory if true. default to false                       |
| **onDone**               | _Function_ | Function to handle the results                                            |

**ISC Licensed**
