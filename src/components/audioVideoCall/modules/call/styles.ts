import {StyleSheet} from 'react-native';
import {vh, vw} from '../../utils/Dimension';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileImageContainer: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageBackgroundContainer: {
    height: '100%',
    width: '100%',
    position: 'absolute',
  },
  profileIconImage: {
    width: '100%',
    resizeMode: 'contain',
    backgroundColor: 'white',
  },
  userImg: {
    height: '100%',
    width: '100%',
    backgroundColor: 'red',
  },
  imageContainer: {
    height: vh(100),
    width: vw(100),
  },
  float: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  top: {
    width: '100%',
    position: 'absolute',
    top: vh(100),
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    color: 'black',
  },
  local: {
    position: 'absolute',
    height: vw(100),
    width: vw(75),
    shadowColor: 'transparent',
    zIndex: 20,
    elevation: 20,
  },
  remoteContainer: {
    height: '100%',
    width: '100%',
  },
  singleRemote: {
    flex: 1,
  },
  rowRemote: {
    height: '50%',
    width: '100%',
  },
  columnRemote: {
    height: '50%',
    width: '50%',
  },
  remote: {
    minWidth: vw(150),
    maxHeight: '100%',
    maxWidth: '100%',
    minHeight: vh(150),
  },
  joinScreenContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  videoIcon: {
    height: '100%',
    width: '100%',
  },
  videoIconContainer: {
    height: vh(25),
    width: vw(25),
    marginHorizontal: vw(5),
  },
  audioIcon: {
    height: '100%',
    width: '100%',
  },
  audioIconContainer: {
    height: vh(25),
    width: vw(25),
    marginHorizontal: vw(10),
  },
  modalView: {
    margin: 0,
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  endcallButton: {
    height: vw(50),
    width: vw(50),
    backgroundColor: '#EB5545',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: vw(30),
    marginTop: vw(20),
    zIndex: 10,
    elevation: 10,
    shadowColor: '#00000000',
  },
  endcallIcon: {
    height: vw(30),
    width: vw(30),
    resizeMode: 'contain',
  },
  roundButtonContainer: {
    alignItems: 'center',
  },
  roundButton: {
    height: vw(50),
    width: vw(50),
    backgroundColor: '#FFFFFF29',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: vw(30),
  },
  roundButtonIcon: {
    height: vw(30),
    width: vw(30),
    resizeMode: 'contain',
  },
  buttonText: {color: 'white'},
  buttonParentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: vh(35),
    zIndex: 10,
    elevation: 10,
    shadowColor: '#00000000',
  },
  modalBottomContainer: {
    height: vh(250),
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#1E1E1Eb3',
    borderTopLeftRadius: vw(10),
    borderTopRightRadius: vw(10),
    overflow: 'hidden',
    zIndex: 8,
    elevation: 8,
    shadowColor: '#00000000',
  },
  connectingText: {
    fontSize: 21,
    color: '#FFFFFFCC',
  },
  nameText: {
    fontSize: 32,
    color: '#FFFFFFCC',
  },
  nameContainer: {
    marginLeft: 10,
  },
  profileImage: {
    backgroundColor: 'white',
    height: vw(60),
    width: vw(60),
    borderRadius: vw(45),
    resizeMode: 'contain',
  },
  profileContainer: {
    position: 'absolute',
    height: vh(90),
    backgroundColor: '#00000000',
    paddingHorizontal: vw(7),
    paddingVertical: vh(7),
    borderRadius: vw(5),
    width: 'auto',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    top: vh(100),
  },
});
