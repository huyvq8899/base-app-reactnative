import styled from 'styled-components';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
const StatusBarHeight = Constants.statusBarHeight;
import { Dimensions } from 'react-native';
let ScreenHeight = Dimensions.get('window').height;
//colors
export const Colors = {
  primary: '#ffffff',
  secondary: '#FCFCFD',
  tertiary: '#1F2937',
  darkLight: '#9CA3AF',
  brand: '#6D28D9',
  green: '#10B981',
  red: '#EF4444',
  darkIcon: '#7E838C',
  buttonColor: '#1890ff',
  disable: '#f2f2f2'
};
const { primary, secondary, tertiary, darkLight, brand, green, red, darkIcon, buttonColor, disable } = Colors;
export const StyledContainer = styled.View`
  flex: 1;
  padding: 25px;
  padding-top: ${StatusBarHeight + 30}px;
  background-color: ${primary};
`;
export const InnerContainer = styled.View`
    flex: 1;
    width 100%;
    align-items: center;
`;
export const PageLogo = styled.Image`
  width: 50%;
`;
export const PageTitle = styled.Text`
  font-size: 30px;
  text-align: center;
  font-weight: bold;
  color: ${brand};
  padding: 10px;
`;
export const SubTitle = styled.Text`
  font-size: 18px;
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-weight: bold;
  color: ${tertiary};
`;
export const StyledFormArea = styled.View`
  width: 90%;
  height: ${ScreenHeight}px;
`;
export const StyledTextInput = styled.TextInput`
  background-color: ${secondary};
  padding: 15px;
  padding-left: 55px;
  border-radius: 5px;
  font-size: 16px;
  height: 50px;
  margin-vertical: 3px;
  margin-bottom: 10px;
  color: ${tertiary};
`;
export const StyledInputLabel = styled.Text`
  color: ${tertiary};
  font-size: 13px;
  text-align: left;
`;
export const LeftIcon = styled.View`
  left: 15px;
  top: 30px;
  position: absolute;
  z-index: 1;
`;
export const RightIcon = styled.TouchableOpacity`
  right: 15px;
  top: 30px;
  position: absolute;
  z-index: 1;
`;

export const StyledButton = styled.TouchableOpacity`
  padding: 15px;
  background-color: ${buttonColor};
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  margin-vertical: 5px;
  height: 50px;
`;

export const ButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;
`;
export const TimKiemIcon = styled.View`
  left: 20px;
  top: 28px;
  position: absolute;
  z-index: 1;
`;
export const TimKiemTextInput = styled.TextInput`
  background-color: ${primary};
  padding: 0px;
  padding-left: 35px;
  border-radius: 10px;
  font-size: 16px;
  height: 35px;
  margin-vertical: 3px;
  color: ${tertiary};
  border: 0.3px solid black;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: -30px;
  margin-top: 20px;
`;
export const StyledTextInputForm = styled.TextInput`
  background-color: ${primary};
  padding-left: 5px;
  border: 0.5px solid black;
  font-size: 16px;
  height: 35px;
  margin-vertical: 3px;
  margin-bottom: 0px;
  color: ${tertiary};
`;
export const StyledTextInputAreaForm = styled.TextInput`
  background-color: ${primary};
  padding-left: 5px;
  border: 0.5px solid black;
  font-size: 16px;
  height: 70px;
  margin-vertical: 3px;
  margin-bottom: 0px;
  color: ${tertiary};
`;
export const StyledInputLabelForm = styled.Text`
  color: ${tertiary};
  font-size: 16px;
  text-align: left;
  margin-bottom: 5px;
`;
// export const StyledDateInputForm = styled.TextInputMask`
//   background-color: ${primary};
//   padding-left: 5px;
//   border: 0.5px solid black;
//   font-size: 16px;
//   height: 35px;
//   margin-vertical: 3px;
//   margin-bottom: 0px;
//   color: ${tertiary};
// `;
export const StyledTextInputFormDisable = styled.TextInput`
  background-color: ${disable};
  padding-left: 5px;
  border: 0.5px solid black;
  font-size: 16px;
  height: 35px;
  margin-vertical: 3px;
  margin-bottom: 0px;
  color: ${tertiary};
`;
export const StyledTextInputAreaFormDisable = styled.TextInput`
  background-color: ${disable};
  padding-left: 5px;
  border: 0.5px solid black;
  font-size: 16px;
  height: 70px;
  margin-vertical: 3px;
  margin-bottom: 0px;
  color: ${tertiary};
`;
export const StyledLoadDate = styled.TextInput`
  background-color: ${primary};
  padding-left: 5px;
  borderBottomColor: #D8D8D8;
  borderBottomWidth: 0.3px;
  borderTopColor: #D8D8D8;
  borderTopWidth: 0.3px;
  font-size: 16px;
  height: 35px;
  margin-vertical: 3px;
  margin-bottom: 0px;
  margin-right: 10px;
  color: ${tertiary};
  width:100px;
`;
export const TimKiemIconButton = styled.View`
  left: 9px;
  margin-top: 14px;
  position: absolute;
  z-index: 1;
`;
export const StyledButtonSearch = styled.TouchableOpacity`
  background-color: ${buttonColor};
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-vertical: 3px;
  height: 35px;
  width:110px;
`;
export const ButtonTextIcon = styled.Text`
  color: ${primary};
  font-size: 16px;
  margin-left: 16px;
`;
export const StyledButtonSubmit = styled.TouchableOpacity`
  padding: 0px;
  background-color: ${buttonColor};
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-vertical: 5px;
  height: 40px;
  width:120px;
  margin-bottom: 100px;
`;
export const global = StyleSheet.create({
  errorText: {
    color: 'crimson',
    fontWeight: 'bold',
    marginTop: 0,
    marginLeft: 5,
    marginBottom: 0,
    fontStyle: 'italic',
  },
});
