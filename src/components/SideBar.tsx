import { MOCK_SERVERS } from "@/src/mock/discordData";
import {
    ScrollView,
    StyleSheet,
    View,
} from "react-native";
import Server from "@/src/components/Server";
import React from "react";

export interface SideBarProps {
    selectedServerId: string;
    onSelectServer: (serverId: string) => void;
}

export default React.memo(function SideBar({ selectedServerId, onSelectServer }: SideBarProps) {

    return (
        <View style={styles.serverSidebar}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <Server 
                    servers={MOCK_SERVERS}
                    selectedServerId={selectedServerId}
                    onSelectServer={onSelectServer}
                />
            </ScrollView>
        </View>
    );
});

const styles = StyleSheet.create({
    serverSidebar: {
        width: 72,
        backgroundColor: '#202225',
        alignItems: 'center',
        paddingTop: 12,
    },
    scrollContainer: {
        alignItems: 'center',
        paddingBottom: 24,
    },
});