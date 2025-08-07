import Divider from "@/components/base/divider";
import { IIconName } from "@/components/base/icon.tsx";
import ListItem from "@/components/base/listItem";
import PageBackground from "@/components/base/pageBackground";
import ThemeText from "@/components/base/themeText";
import { showDialog } from "@/components/dialogs/useDialog";
import { showPanel } from "@/components/panels/usePanel";
import { useI18N } from "@/core/i18n";
import { ROUTE_PATH, useNavigate } from "@/core/router";
import { checkUpdateAndShowResult } from "@/hooks/useCheckUpdate.ts";
import rpx from "@/utils/rpx";
import { useScheduleCloseCountDown } from "@/utils/scheduleClose";
import timeformat from "@/utils/timeformat";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import React, { memo } from "react";
import { Platform, StyleSheet, View } from "react-native";
import { default as DeviceInfo, default as deviceInfoModule } from "react-native-device-info";

const ITEM_HEIGHT = rpx(108);

interface ISettingOptions {
    icon: IIconName;
    title: string;
    onPress?: () => void;
}

function HomeDrawer(props: any) {
    const navigate = useNavigate();
    function navigateToSetting(settingType: string) {
        navigate(ROUTE_PATH.SETTING, {
            type: settingType,
        });
    }

    const { t, getSupportedLanguages, getLanguage, setLanguage } = useI18N();

    const basicSetting: ISettingOptions[] = [
        {
            icon: "cog-8-tooth",
            title: t("sidebar.basicSettings"),
            onPress: () => {
                navigateToSetting("basic");
            },
        }, {
            icon: "javascript",
            title: t("sidebar.pluginManagement"),
            onPress: () => {
                navigateToSetting("plugin");
            },
        },
        {
            icon: "t-shirt-outline",
            title: t("sidebar.themeSettings"),
            onPress: () => {
                navigateToSetting("theme");
            },
        },
    ];

    const otherSetting: ISettingOptions[] = [
        {
            icon: "circle-stack",
            title: t("sidebar.backupAndResume"),
            onPress: () => {
                navigateToSetting("backup");
            },
        },
    ];

    if (Platform.OS === "android") {
        otherSetting.push({
            icon: "shield-keyhole-outline",
            title: t("sidebar.permissionManagement"),
            onPress: () => {
                navigate(ROUTE_PATH.PERMISSIONS);
            },
        });
    }


    return (
        <>
            <PageBackground />
            <DrawerContentScrollView {...[props]} style={style.scrollWrapper}>
                <View style={style.header}>
                    <ThemeText fontSize="appbar" fontWeight="bold">
                        {DeviceInfo.getApplicationName()}
                    </ThemeText>
                    {/* <IconButton icon={'qrcode-scan'} size={rpx(36)} /> */}
                </View>
                <View style={style.card}>
                    <ListItem withHorizontalPadding heightType="smallest">
                        <ListItem.ListItemText
                            fontSize="subTitle"
                            fontWeight="bold">
                            {t("common.setting")}
                        </ListItem.ListItemText>
                    </ListItem>
                    {basicSetting.map((item, index) => (
                        <ListItem
                            withHorizontalPadding
                            key={"basic-setting-" + index}
                            onPress={item.onPress}>
                            <ListItem.ListItemIcon
                                icon={item.icon}
                                width={rpx(48)}
                            />
                            <ListItem.Content title={item.title} />
                        </ListItem>
                    ))}
                </View>
                <View style={style.card}>
                    <ListItem withHorizontalPadding heightType="smallest">
                        <ListItem.ListItemText
                            fontSize="subTitle"
                            fontWeight="bold">
                            {t("common.other")}
                        </ListItem.ListItemText>
                    </ListItem>
                    <CountDownItem />
                    {otherSetting.map((item, index) => (
                        <ListItem
                            withHorizontalPadding
                            key={"other-setting-" + index}
                            onPress={item.onPress}>
                            <ListItem.ListItemIcon
                                icon={item.icon}
                                width={rpx(48)}
                            />
                            <ListItem.Content title={item.title} />
                        </ListItem>
                    ))}
                    <ListItem withHorizontalPadding key='language' onPress={() => {
                        showDialog("RadioDialog", {
                            "content": getSupportedLanguages().map(item => ({
                                title: item.name,
                                value: item.locale,
                                label: item.name,
                            })),
                            title: t("sidebar.languageSettings"),
                            onOk(value) {
                                setLanguage(value as string);
                            },
                            defaultSelected: getLanguage().locale,
                        });
                    }}>
                        <ListItem.ListItemIcon icon='language' width={rpx(48)} />
                        <ListItem.Content title={t("sidebar.languageSettings")} />
                        <ListItem.ListItemText fontSize='subTitle' position='right'>{getLanguage().name}</ListItem.ListItemText>
                    </ListItem>
                </View>

                <View style={style.card}>
                    <ListItem withHorizontalPadding heightType="smallest">
                        <ListItem.ListItemText
                            fontSize="subTitle"
                            fontWeight="bold">
                            {t("common.software")}
                        </ListItem.ListItemText>
                    </ListItem>

                    <ListItem
                        withHorizontalPadding
                        key={"update"}
                        onPress={() => {
                            checkUpdateAndShowResult(true);
                        }}>
                        <ListItem.ListItemIcon
                            icon={"arrow-path"}
                            width={rpx(48)}
                        />
                        <ListItem.Content title={t("sidebar.checkUpdate")} />
                        <ListItem.ListItemText
                            position="right"
                            fontSize="subTitle">
                            {`${t("sidebar.currentVersion")}${deviceInfoModule.getVersion()}`}
                        </ListItem.ListItemText>
                    </ListItem>
                    <ListItem
                        withHorizontalPadding
                        key={"about"}
                        onPress={() => {
                            navigateToSetting("about");
                        }}>
                        <ListItem.ListItemIcon
                            icon={"information-circle"}
                            width={rpx(48)}
                        />
                        <ListItem.Content
                            title={`${t("common.about")} ${deviceInfoModule.getApplicationName()}`}
                        />
                    </ListItem>
                </View>

                <Divider />
            </DrawerContentScrollView>
        </>
    );
}

export default memo(HomeDrawer, () => true);

const style = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: "#999999",
    },
    scrollWrapper: {
        paddingTop: rpx(12),
    },

    header: {
        height: rpx(120),
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginLeft: rpx(24),
    },
    card: {
        marginBottom: rpx(24),
    },
    cardContent: {
        paddingHorizontal: 0,
    },

    /** 倒计时 */
    countDownText: {
        height: ITEM_HEIGHT,
        textAlignVertical: "center",
    },
});

function _CountDownItem() {
    const countDown = useScheduleCloseCountDown();
    const { t } = useI18N();

    return (
        <ListItem
            withHorizontalPadding
            onPress={() => {
                showPanel("TimingClose");
            }}>
            <ListItem.ListItemIcon icon="alarm-outline" width={rpx(48)} />
            <ListItem.Content title={t("sidebar.scheduleClose")} />
            <ListItem.ListItemText position="right" fontSize="subTitle">
                {countDown ? timeformat(countDown) : ""}
            </ListItem.ListItemText>
        </ListItem>
    );
}

const CountDownItem = memo(_CountDownItem, () => true);
