import { useGlobalSearchParams } from 'expo-router';
import { View, Text} from 'react-native'

const profile = ()=> {

    const{name,username} = useGlobalSearchParams();

    return(

        <View style={{flex: 1, alignItems: 'center',justifyContent: 'center'}}>
            <Text>Hi {name} @{username}</Text>
            <Text>Profile</Text>
        </View>
    )
}

export default profile;