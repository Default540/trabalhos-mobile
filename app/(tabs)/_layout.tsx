import { withLayoutContext } from 'expo-router';
import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions, MaterialTopTabNavigationEventMap } from '@react-navigation/material-top-tabs';
import { TabNavigationState, ParamListBase } from '@react-navigation/native';

const { Navigator } = createMaterialTopTabNavigator();

const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function TabLayout() {
    return (
        <MaterialTopTabs
            tabBarPosition="bottom"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#202225',
                    elevation: 0,
                    shadowOpacity: 0,
                    borderTopWidth: 1,
                    borderTopColor: '#202225',
                },
                tabBarIndicatorStyle: {
                    backgroundColor: '#5865F2',
                    height: 2,
                },
                tabBarShowIcon: true,
                swipeEnabled: true,
            }}
        >
            <MaterialTopTabs.Screen
                name="index"
                options={{
                    title: 'Servidores',
                }}
            />
        </MaterialTopTabs>
    );
} 