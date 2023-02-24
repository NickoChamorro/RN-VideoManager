import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

function GoToButton({ screenName, text }) {
    const navigation = useNavigation();

    return (
        <Button
            title={`Go to ${text}`}
            onPress={() => navigation.navigate(screenName)}
        />
    );
};

export default GoToButton;  