import { StyleSheet, Dimensions } from "react-native"
import { ITEM_MIN_SIZE } from "."

const {width} = Dimensions.get('window')

console.log(width);


export default StyleSheet.create({
    container: {
        width,
        height: ITEM_MIN_SIZE,
        justifyContent: "flex-end",
        alignItems: 'center'
    },
    picture: {
     ...StyleSheet.absoluteFillObject,
     width: undefined,
     height: undefined
    },
    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold'
    }
})